"use client";

import { Chess, type Color, type PieceSymbol, type Square } from "chess.js";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowsClockwise, ArrowsLeftRight, ArrowUUpLeft, Download, Sparkle, SpinnerGap } from "@phosphor-icons/react";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const PIECES: Record<Color, Record<PieceSymbol, string>> = {
  w: { k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙" },
  b: { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" },
};
type Mode = "easy" | "hard";
type MoveChoice = { from: Square; to: Square };

const MODES = {
  easy: { label: "I'm going easy on you", skill: 1, depth: 2, elo: 1000 },
  hard: { label: "I'm going hard on you", skill: 20, depth: 18, elo: 2850 },
} as const;

export function ChessCompanion() {
  const [game, setGame] = useState(() => new Chess());
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<Mode>("easy");
  const [playerColor] = useState<Color>("w");
  const [flipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState<Square | null>(null);
  const [lastMove, setLastMove] = useState<MoveChoice | null>(null);
  const [promotion, setPromotion] = useState<(MoveChoice & { color: Color }) | null>(null);
  const [engineThinking, setEngineThinking] = useState(false);
  const [engineReady, setEngineReady] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const moveHistoryRef = useRef<HTMLDivElement | null>(null);
  const moves = game.history();

  const status = useMemo(() => {
    if (game.isCheckmate()) return `${game.turn() === "w" ? "I win" : "You win"}`;
    if (game.isDraw()) return "The game is drawn";
    if (game.isStalemate()) return "Draw by stalemate";
    if (game.inCheck()) return "Check";
    return game.turn() === playerColor ? "Your turn" : "Ammar is thinking";
  }, [game, playerColor]);

  const applyMove = useCallback((uci: string) => {
    if (!uci || uci === "(none)") { setEngineThinking(false); return; }
    setGame((current) => {
      if (current.isGameOver() || current.turn() === playerColor) { setEngineThinking(false); return current; }
      try {
        const next = new Chess(current.fen());
        next.move({ from: uci.slice(0, 2) as Square, to: uci.slice(2, 4) as Square, promotion: (uci[4] || "q") as PieceSymbol });
        setLastMove({ from: uci.slice(0, 2) as Square, to: uci.slice(2, 4) as Square });
        setEngineThinking(false);
        return next;
      } catch { setEngineThinking(false); return current; }
    });
  }, [playerColor]);

  const requestComputerMove = useCallback((fen: string, activeMode: Mode = mode) => {
    const worker = workerRef.current;
    if (!worker || !engineReady) return;
    setEngineThinking(true);
    worker.postMessage("stop");
    worker.postMessage(`position fen ${fen}`);
    const settings = MODES[activeMode];
    worker.postMessage(activeMode === "easy" ? `go depth ${settings.depth} movetime 120` : `go depth ${settings.depth} movetime 2600`);
  }, [engineReady, mode]);

  useEffect(() => {
    if (moveHistoryRef.current) moveHistoryRef.current.scrollTop = moveHistoryRef.current.scrollHeight;
  }, [moves.length]);

  useEffect(() => {
    const worker = new Worker("/stockfish/stockfish-19-lite-single.js");
    workerRef.current = worker;
    worker.onmessage = (event: MessageEvent) => {
      const line = String(event.data).trim();
      if (line === "uciok") worker.postMessage("isready");
      if (line === "readyok") {
        const settings = MODES[mode];
        worker.postMessage("setoption name UCI_LimitStrength value true");
        worker.postMessage(`setoption name UCI_Elo value ${settings.elo}`);
        worker.postMessage(`setoption name Skill Level value ${settings.skill}`);
        setEngineReady(true);
      }
      if (line.startsWith("bestmove")) applyMove(line.split(/\s+/)[1]);
    };
    worker.onerror = (event) => {
      event.preventDefault();
      setEngineReady(false);
      setEngineThinking(false);
    };
    worker.postMessage("uci");
    return () => worker.terminate();
    // The worker is intentionally created once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const worker = workerRef.current;
    if (!worker || !engineReady) return;
    const settings = MODES[mode];
    worker.postMessage("setoption name UCI_LimitStrength value true");
    worker.postMessage(`setoption name UCI_Elo value ${settings.elo}`);
    worker.postMessage(`setoption name Skill Level value ${settings.skill}`);
    if (mode === "hard") {
      worker.postMessage("setoption name UCI_LimitStrength value false");
      worker.postMessage("setoption name Skill Level value 20");
    }
  }, [engineReady, mode]);

  const startGame = (selectedMode: Mode) => {
    setMode(selectedMode);
    setStarted(true);
    setGame(new Chess());
    setSelected(null); setLastMove(null); setPromotion(null); setFlipped(false);
  };

  const squares = useMemo(() => {
    const ranks = flipped ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1];
    const files = flipped ? [...FILES].reverse() : FILES;
    return ranks.flatMap((rank) => files.map((file) => `${file}${rank}` as Square));
  }, [flipped]);
  const targets = selected ? game.moves({ square: selected, verbose: true }) : [];

  const commitMove = (from: Square, to: Square, promotionPiece: PieceSymbol = "q") => {
    if (engineThinking || game.isGameOver() || game.turn() !== playerColor) return false;
    try {
      const next = new Chess(game.fen());
      next.move({ from, to, promotion: promotionPiece });
      setGame(next); setLastMove({ from, to }); setSelected(null);
      if (!next.isGameOver()) window.setTimeout(() => requestComputerMove(next.fen()), 300);
      return true;
    } catch { return false; }
  };

  const clickSquare = (square: Square) => {
    if (!started || engineThinking || game.turn() !== playerColor || game.isGameOver()) return;
    const piece = game.get(square);
    if (!selected) { if (piece?.color === playerColor) setSelected(square); return; }
    if (selected === square) { setSelected(null); return; }
    const move = targets.find((candidate) => candidate.to === square);
    if (!move) { setSelected(piece?.color === playerColor ? square : null); return; }
    if (move.piece === "p" && (square.endsWith("8") || square.endsWith("1"))) setPromotion({ from: selected, to: square, color: playerColor });
    else commitMove(selected, square);
  };

  const undo = () => {
    const history = game.history({ verbose: true });
    if (!history.length) return;
    const next = new Chess();
    const remove = engineThinking ? 1 : 2;
    history.slice(0, Math.max(0, history.length - remove)).forEach((move) => next.move(move.san));
    setGame(next); setLastMove(null); setSelected(null); setEngineThinking(false);
  };

  const exportGame = (kind: "pgn" | "fen") => {
    const content = kind === "pgn" ? game.pgn() : game.fen();
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
    const link = document.createElement("a"); link.href = url; link.download = `ammar-chess.${kind}`; link.click(); URL.revokeObjectURL(url);
  };

  const captured = (capturingColor: Color) => {
    const pieces = game.history({ verbose: true }).filter((move) => move.color === capturingColor && move.captured).map((move) => PIECES[move.color][move.captured!]);
    return pieces.join("");
  };

  if (!started) {
    return <div className="relative min-h-[680px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#090a10] px-5 py-12 sm:px-10">
      <div className="absolute left-1/2 top-0 h-80 w-[600px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[100px]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-6 flex items-center justify-center"><Image src="/assets/Me.jpeg" alt="Ammar Alhawamdeh" width={88} height={88} className="size-[88px] rounded-full object-cover ring-4 ring-white/[0.08]" /></div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[.3em] text-violet-300">Chess Arena</p>
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Think you can beat me?</h2>
        <p className="mt-4 text-base text-[#aaaaba]">Choose how challenging you want me to be.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <button onClick={() => startGame("easy")} className="group rounded-2xl border border-emerald-400/20 bg-gradient-to-b from-emerald-400/[0.09] to-white/[0.025] p-6 text-left transition hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_20px_70px_rgba(16,185,129,.08)]">
            <div><span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">FRIENDLY</span></div>
            <h3 className="mt-7 text-2xl font-semibold text-white">Go Easy on Me</h3>
            <p className="mt-3 max-w-sm leading-relaxed text-[#c8c8d0]">I&apos;ll go easy on you. Let&apos;s have a friendly game.</p>
            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-emerald-300">Choose Easy <span className="transition-transform group-hover:translate-x-1">→</span></div>
          </button>
          <button onClick={() => startGame("hard")} className="group rounded-2xl border border-violet-400/25 bg-gradient-to-b from-violet-500/[0.12] to-white/[0.025] p-6 text-left transition hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-[0_20px_70px_rgba(139,92,246,.12)]">
            <div><span className="rounded-full bg-violet-400/10 px-3 py-1 text-[11px] font-semibold text-violet-300">COMPETITIVE</span></div>
            <h3 className="mt-7 text-2xl font-semibold text-white">Go Hard on Me</h3>
            <p className="mt-3 max-w-sm leading-relaxed text-[#d0cbd8]">No mercy. Bring your best game.</p>
            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-violet-300">Choose Hard <span className="transition-transform group-hover:translate-x-1">→</span></div>
          </button>
        </div>
      </div>
    </div>;
  }

  return <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#080910] shadow-[0_30px_100px_rgba(0,0,0,.55)]">
    <div className="grid md:grid-cols-[minmax(480px,570px)_250px] md:justify-center">
      <main className="mx-auto min-w-0 w-full max-w-[570px] p-2 sm:p-4">
        <div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-3"><Image src="/assets/Me.jpeg" alt="Ammar Alhawamdeh" width={42} height={42} className="size-[42px] rounded-full object-cover ring-2 ring-white/10" /><div><div className="text-sm font-semibold text-white">Ammar Alhawamdeh</div><div className="text-[10px] text-white/60">{MODES[mode].label}</div></div></div>{engineThinking && <div className="flex items-center gap-2 text-[10px] text-white/35"><SpinnerGap className="animate-spin" /> Thinking</div>}</div>
        <div className="grid aspect-square w-full max-w-[570px] grid-cols-8 overflow-hidden rounded-md border border-white/15 bg-[#2b2834] shadow-[0_20px_60px_rgba(0,0,0,.5)]">
          {squares.map((square) => {
            const piece = game.get(square); const rank = Number(square[1]); const file = FILES.indexOf(square[0]); const dark = (file + rank) % 2 === 1;
            const target = targets.find((move) => move.to === square); const active = selected === square; const recent = lastMove && (lastMove.from === square || lastMove.to === square);
            const checked = piece?.type === "k" && piece.color === game.turn() && game.inCheck();
            return <button key={square} type="button" onClick={() => clickSquare(square)} aria-label={`Square ${square}`} className={`relative grid aspect-square place-items-center overflow-hidden text-[clamp(30px,11vw,54px)] leading-none select-none touch-manipulation ${dark ? "bg-[#756f68]" : "bg-[#dedad0]"} ${recent ? "after:absolute after:inset-0 after:bg-yellow-300/30" : ""}`}>
              {checked && <span className="absolute inset-1 rounded-full bg-red-500/35" />}{target && <span className={`absolute z-[1] ${piece ? "size-[82%] rounded-full border-[5px] border-emerald-400/70" : "size-[22%] rounded-full bg-emerald-500/70"}`} />}{active && <span className="absolute inset-0 ring-[3px] ring-inset ring-violet-400" />}
              {piece && <span className={`relative z-[2] [font-family:'Arial_Unicode_MS','Segoe_UI_Symbol','Noto_Sans_Symbols_2',sans-serif] ${piece.color === "w" ? "text-[#fffefa] drop-shadow-[0_2px_0_rgba(0,0,0,.75)]" : "text-[#292633] drop-shadow-[0_1px_0_rgba(255,255,255,.35)]"}`}>{PIECES[piece.color][piece.type]}</span>}
              {square.startsWith(flipped ? "h" : "a") && <span className="absolute bottom-0 left-1 text-[8px] text-black/45">{square[1]}</span>}
            </button>;
          })}
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-white"><span>You · {playerColor === "w" ? "White" : "Black"}</span><span className={game.isGameOver() ? "text-violet-300" : "text-white/70"}>{status}</span></div>
      </main>

      <aside className="border-t border-white/[0.08] p-4 xl:border-l xl:border-t-0">
        <div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[.16em] text-white/70">Moves</span><span className="font-mono text-[11px] text-white/50">{game.history().length} ply</span></div>
        <div ref={moveHistoryRef} className="mt-3 h-[220px] overflow-y-auto rounded-xl border border-white/[0.08] bg-[#12131b] p-3 text-white md:h-[330px]">
          {moves.length > 0 ? Array.from({ length: Math.ceil(moves.length / 2) }, (_, index) => <div key={index} className="grid grid-cols-[32px_1fr_1fr] items-center rounded-md px-1 py-2 font-medium text-[15px] text-white"><span className="text-[#aaa9b5]">{index + 1}.</span><span className="text-[#f4f3f7]">{moves[index * 2]}</span><span className="text-[#e8e6ef]">{moves[index * 2 + 1] || ""}</span></div>) : <div className="grid min-h-[300px] place-items-center text-sm text-[#aaa9b5]">No moves yet</div>}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-y-2 text-[10px] text-[#aaa9b5]"><span>You captured <b className="ml-1 text-base text-white/75">{captured(playerColor)}</b></span><span>Ammar captured <b className="ml-1 text-base text-white/75">{captured(playerColor === "w" ? "b" : "w")}</b></span></div>
        <div className="mt-5 grid grid-cols-2 gap-2 text-white"><button onClick={() => setStarted(false)} className="flex items-center justify-center gap-2 rounded-lg bg-violet-500 py-2.5 text-xs font-medium text-white"><ArrowsClockwise /> New Game</button><button onClick={() => setFlipped((value) => !value)} className="flex items-center justify-center gap-2 rounded-lg bg-white/[0.06] py-2.5 text-xs"><ArrowsLeftRight /> Flip</button><button onClick={undo} disabled={!game.history().length} className="flex items-center justify-center gap-2 rounded-lg bg-white/[0.06] py-2.5 text-xs disabled:opacity-30"><ArrowUUpLeft /> Undo</button><button onClick={() => exportGame("pgn")} className="flex items-center justify-center gap-2 rounded-lg bg-white/[0.06] py-2.5 text-xs"><Download /> Export</button></div>
      </aside>
    </div>
    {game.isGameOver() && <div className="absolute inset-0 z-40 grid place-items-center rounded-[24px] bg-black/70 backdrop-blur-sm"><div className="rounded-2xl border border-white/10 bg-[#11121b] px-8 py-7 text-center"><Sparkle className="mx-auto text-violet-400" size={28} /><h3 className="mt-3 text-2xl font-bold text-white">{game.isCheckmate() ? status : "Game complete"}</h3><p className="mt-2 text-sm text-white/60">{game.isCheckmate() ? "That was a well-fought game." : "A worthy battle on the board."}</p><button onClick={() => setStarted(false)} className="mt-5 rounded-lg bg-violet-500 px-5 py-2.5 text-sm text-white">Play again</button></div></div>}
    {promotion && <div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4"><div className="rounded-2xl border border-white/10 bg-[#11121b] p-5"><div className="mb-4 text-center text-sm font-semibold">Choose promotion</div><div className="flex gap-2">{(["q", "r", "b", "n"] as PieceSymbol[]).map((piece) => <button key={piece} onClick={() => { commitMove(promotion.from, promotion.to, piece); setPromotion(null); }} className="grid size-16 place-items-center rounded-xl bg-white/[0.06] text-5xl hover:bg-violet-500/20">{PIECES[promotion.color][piece]}</button>)}</div></div></div>}
  </div>;
}
