"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Chess, type Square } from "chess.js";
import { ArrowCounterClockwise, ArrowsDownUp, PaperPlaneTilt, Robot } from "@phosphor-icons/react";

const pieceSymbols: Record<string, Record<string, string>> = {
  w: { k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙" },
  b: { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" },
};

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

export function ChessProject() {
  const [game, setGame] = useState(() => new Chess());
  const [selected, setSelected] = useState<Square | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [chat, setChat] = useState(["Hello! I’m your chess opponent. Your move."]);
  const [message, setMessage] = useState("");
  const [stockfishReady, setStockfishReady] = useState(false);
  const [stockfishThinking, setStockfishThinking] = useState(false);
  const engineRef = useRef<Worker | null>(null);

  const squares = useMemo(() => {
    const result: Square[] = [];
    const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
    for (const rank of flipped ? [...ranks].reverse() : ranks) {
      for (const file of flipped ? [...files].reverse() : files) result.push(`${file}${rank}` as Square);
    }
    return result;
  }, [flipped]);

  const legalTargets = selected ? game.moves({ square: selected, verbose: true }).map((move) => move.to) : [];

  useEffect(() => {
    const engine = new Worker("/stockfish/stockfish-19-lite-single.js");
    engineRef.current = engine;
    engine.onmessage = (event: MessageEvent) => {
      const line = String(event.data);
      if (line === "uciok") {
        engine.postMessage("isready");
      } else if (line === "readyok") {
        setStockfishReady(true);
        engine.postMessage("setoption name Skill Level value 8");
      } else if (line.startsWith("bestmove")) {
        const move = line.split(" ")[1];
        if (!move || move === "(none)") {
          setStockfishThinking(false);
          return;
        }
        setGame((current) => {
          if (current.turn() !== "b" || current.isGameOver()) {
            setStockfishThinking(false);
            return current;
          }
          const next = new Chess(current.fen());
          next.move({ from: move.slice(0, 2) as Square, to: move.slice(2, 4) as Square, promotion: move[4] || "q" });
          setHistory(next.history());
          setStockfishThinking(false);
          return next;
        });
      }
    };
    engine.postMessage("uci");
    return () => engine.terminate();
  }, []);

  const askStockfish = (fen: string) => {
    const engine = engineRef.current;
    if (!engine || !stockfishReady) return;
    setStockfishThinking(true);
    engine.postMessage("stop");
    engine.postMessage(`position fen ${fen}`);
    engine.postMessage("go depth 10");
  };

  const playSquare = (square: Square) => {
    if (game.isGameOver() || game.turn() !== "w") return;

    if (!selected) {
      const piece = game.get(square);
      if (piece?.color === "w") setSelected(square);
      return;
    }

    if (selected === square) {
      setSelected(null);
      return;
    }

    try {
      const next = new Chess(game.fen());
      next.move({ from: selected, to: square, promotion: "q" });
      setSelected(null);
      setHistory(next.history());

      if (!next.isGameOver()) {
        setGame(next);
        window.setTimeout(() => askStockfish(next.fen()), 350);
      } else {
        setGame(next);
        setChat((items) => [...items, "That game is over. Start a new game when you’re ready!"]);
      }
    } catch {
      const piece = game.get(square);
      setSelected(piece?.color === "w" ? square : null);
    }
  };

  const newGame = () => {
    setGame(new Chess());
    setSelected(null);
    setHistory([]);
    setChat(["Fresh board, fresh start. White to move. Stockfish is ready."]);
  };

  const sendMessage = () => {
    const clean = message.trim();
    if (!clean) return;
    setChat((items) => [...items, clean, /hello|hi|hey/i.test(clean) ? "Hey! Glad you’re here. Make your move on the board." : "I’ll watch the board while you play!"]);
    setMessage("");
  };

  const status = game.isCheckmate()
    ? game.turn() === "w" ? "Black wins by checkmate" : "White wins by checkmate"
    : game.isDraw() ? "Draw"
    : game.inCheck() ? `${game.turn() === "w" ? "White" : "Black"} is in check`
    : `${game.turn() === "w" ? "White" : "Black"} to move`;

  return (
    <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#080a0f] text-[#e9edf7] shadow-2xl">
      <div className="grid min-h-[620px] lg:grid-cols-[280px_minmax(390px,520px)_240px] lg:justify-center">
        <aside className="flex min-h-[280px] flex-col border-b border-white/10 p-4 lg:min-h-0 lg:border-r lg:border-b-0">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold"><span className="size-2 rounded-full bg-emerald-400" /> Chat with opponent</div>
          <div className="space-y-3 lg:flex-1">
            {chat.map((line, index) => (
              <div key={`${line}-${index}`} className={`max-w-[90%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${index % 2 ? "ml-auto bg-indigo-500/20 text-indigo-100" : "bg-white/[0.055]"}`}>{line}</div>
            ))}
          </div>
          <div className="mt-4 flex gap-2 rounded-lg bg-white/[0.055] p-1">
            <input value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendMessage(); }} placeholder="Type a message…" className="min-w-0 flex-1 bg-transparent px-2 text-xs outline-none placeholder:text-white/30" />
            <button type="button" onClick={sendMessage} aria-label="Send message" className="grid size-9 place-items-center rounded-md bg-indigo-500 text-white"><PaperPlaneTilt size={16} weight="fill" /></button>
          </div>
        </aside>

        <main className="flex flex-col items-center p-4">
          <div className="mb-3 flex w-full items-center justify-between">
            <div className="flex items-center gap-2"><div className="grid size-7 place-items-center rounded-full bg-white/10"><Robot size={17} /></div><div><div className="text-xs font-semibold">Stockfish</div><div className="text-[10px] text-white/45">{stockfishReady ? (stockfishThinking ? "Calculating…" : "Ready · Level 8") : "Loading engine…"}</div></div></div>
            <span className="rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] text-white/50">You&apos;re White</span>
          </div>
          <div className="grid aspect-square w-full max-w-[520px] grid-cols-8 overflow-hidden rounded-sm ring-1 ring-white/15">
            {squares.map((square, index) => {
              const piece = game.get(square);
              const rank = Number(square[1]);
              const fileIndex = files.indexOf(square[0]);
              const dark = (fileIndex + rank) % 2 === 1;
              const isLegal = legalTargets.includes(square);
              return (
                <button key={square} type="button" onClick={() => playSquare(square)} aria-label={`Square ${square}`} className={`relative grid place-items-center text-[clamp(28px,6vw,58px)] leading-none ${dark ? "bg-[#6b665f]" : "bg-[#d9d4c9]"} ${selected === square ? "ring-2 ring-inset ring-indigo-400" : ""}`}>
                  {index < 8 && <span className={`absolute right-0.5 top-0 text-[8px] ${dark ? "text-[#d8d3c8]" : "text-[#777269]"}`}>{square[0]}</span>}
                  {index % 8 === 0 && <span className={`absolute left-1 top-0.5 text-[8px] ${dark ? "text-[#d8d3c8]" : "text-[#777269]"}`}>{square[1]}</span>}
                  {isLegal && <span className={`absolute size-[18%] rounded-full ${piece ? "ring-4 ring-emerald-400/50" : "bg-emerald-500/60"}`} />}
                  {piece && <span className={`relative drop-shadow-[0_2px_1px_rgba(0,0,0,.35)] ${piece.color === "w" ? "text-[#f7f7f2]" : "text-[#24232d]"}`}>{pieceSymbols[piece.color][piece.type]}</span>}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex w-full items-center justify-between"><div className="flex items-center gap-2"><div className="grid size-7 place-items-center rounded-full bg-indigo-500/20 text-xs">Y</div><div><div className="text-xs font-semibold">You</div><div className="text-[10px] text-white/45">{status}</div></div></div><span className="font-mono text-xs text-white/45">1200</span></div>
        </main>

        <aside className="border-t border-white/10 p-4 lg:border-l lg:border-t-0">
          <div className="text-xs font-semibold text-white/50">MOVES</div>
          <div className="mt-4 max-h-80 space-y-1 overflow-auto pr-1">
            {Array.from({ length: Math.ceil(history.length / 2) }, (_, index) => {
              const white = history[index * 2];
              const black = history[index * 2 + 1];
              return <div key={index} className="grid grid-cols-[24px_1fr_1fr] text-xs"><span className="text-white/30">{index + 1}.</span><span>{white}</span><span className="text-white/70">{black}</span></div>;
            })}
            {!history.length && <div className="py-8 text-center text-[11px] text-white/25">No moves yet</div>}
          </div>
          <div className="mt-8 space-y-2">
            <button type="button" onClick={newGame} className="flex w-full items-center justify-center gap-2 rounded-md bg-white/[0.065] py-2 text-xs font-medium hover:bg-white/10"><ArrowCounterClockwise size={15} /> New Game</button>
            <button type="button" onClick={() => setFlipped((value) => !value)} className="flex w-full items-center justify-center gap-2 rounded-md bg-white/[0.065] py-2 text-xs font-medium hover:bg-white/10"><ArrowsDownUp size={15} /> Flip Board</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
