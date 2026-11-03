import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const recentRequests = new Map<string, number[]>();

type ChatRequest = {
  messages?: Array<{ role?: string; content?: string }>;
  context?: {
    fen?: string;
    pgn?: string;
    status?: string;
    lastMove?: string;
    playerColor?: "w" | "b";
    difficulty?: string;
    evaluation?: string;
  };
};

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || "local";
  const now = Date.now();
  const attempts = (recentRequests.get(key) || []).filter((time) => now - time < 60_000);
  if (attempts.length >= 20) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute and try again." }, { status: 429 });
  }
  recentRequests.set(key, [...attempts, now]);

  let body: ChatRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 });
  }

  const messages = (body.messages || []).filter((item): item is { role: "user" | "assistant"; content: string } =>
    (item.role === "user" || item.role === "assistant") && typeof item.content === "string"
  ).slice(-12).map((item) => ({ role: item.role, content: item.content.slice(0, 1500) }));

  if (!messages.length || messages.at(-1)?.role !== "user") {
    return NextResponse.json({ error: "A user message is required." }, { status: 400 });
  }

  const context = body.context || {};
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      reply: "The chat service is not configured yet, but the chess engine is still fully available. Add OPENAI_API_KEY to enable conversational analysis."
    });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      instructions: `You are Ammar Alhawamdeh, speaking in the first person as the player's friendly but confident chess opponent. Call yourself Ammar, never mention Stockfish, UCI, engines, evaluations, or internal computer analysis. Talk in a concise, encouraging tone.
Use the supplied position context, but never invent moves or claim an engine move/evaluation unless it is included in engineEvaluation.
Stockfish controls all moves; you explain chess only. Never output FEN/PGN as a command and never offer to make a move. Discuss tactics, plans, openings, checkmates, forks, pins and discovered attacks when relevant.
Current context: FEN: ${context.fen || "unavailable"}; PGN: ${context.pgn || "none"}; status: ${context.status || "unknown"}; last move: ${context.lastMove || "none"}; player color: ${context.playerColor || "w"}; difficulty: ${context.difficulty || "Intermediate"}; engine evaluation: ${context.evaluation || "unavailable"}.`,
      input: messages.map((message) => ({ role: message.role, content: message.content })),
      max_output_tokens: 350,
    });

    return NextResponse.json({ reply: response.output_text || "I’m thinking about that position. Could you ask again?" });
  } catch (error) {
    console.error("Chess chat error", error);
    return NextResponse.json({ reply: "I’m temporarily unable to respond through the chat service. Your game and Stockfish analysis still work normally." });
  }
}
