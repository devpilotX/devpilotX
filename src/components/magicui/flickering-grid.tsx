"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  /** Share of squares that change per second, from 0 to 1. */
  flickerChance?: number;
  /** Any CSS colour. Defaults to the text colour of the current theme. */
  color?: string;
  maxOpacity?: number;
}

// The flicker is slow, so ten updates a second look the same as sixty and
// cost a sixth of the work.
const FRAME_MS = 100;

/**
 * Decorative grid of softly flickering squares, drawn on a canvas.
 * It draws one still frame straight away, starts moving only once the
 * browser is idle after loading, pauses while off screen, and never moves
 * for people who ask for reduced motion.
 */
export const FlickeringGrid = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color,
  maxOpacity = 0.3,
  className,
  ...props
}: FlickeringGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!container || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cols = 0;
    let rows = 0;
    let dpr = 1;
    let squares = new Float32Array(0);
    let fill = "rgb(0, 0, 0)";
    let frame = 0;
    let last = 0;
    let visible = false;
    let ready = false;

    const readColor = () => {
      fill = color ?? getComputedStyle(container).color;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = fill;
      const size = squareSize * dpr;
      const step = (squareSize + gridGap) * dpr;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          ctx.globalAlpha = squares[i * rows + j];
          ctx.fillRect(i * step, j * step, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      cols = Math.floor(width / (squareSize + gridGap));
      rows = Math.floor(height / (squareSize + gridGap));
      squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) squares[i] = Math.random() * maxOpacity;
      draw();
    };

    const tick = (time: number) => {
      frame = requestAnimationFrame(tick);
      if (time - last < FRAME_MS) return;
      const seconds = last ? (time - last) / 1000 : 0;
      last = time;
      const chance = flickerChance * seconds;
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < chance) squares[i] = Math.random() * maxOpacity;
      }
      draw();
    };

    const start = () => {
      if (reduceMotion || !ready || !visible || frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    readColor();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    // The theme toggle swaps the class on <html>, which changes the colour.
    const themeObserver = new MutationObserver(() => {
      readColor();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Leave the first moments of the page to loading and hydration. Safari
    // has no requestIdleCallback, so it gets a plain timeout instead.
    const begin = () => {
      ready = true;
      start();
    };
    const hasIdle = "requestIdleCallback" in window;
    const idleHandle = hasIdle ? window.requestIdleCallback(begin, { timeout: 3000 }) : 0;
    const timeoutHandle = hasIdle ? 0 : window.setTimeout(begin, 1500);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      if (hasIdle) window.cancelIdleCallback(idleHandle);
      else window.clearTimeout(timeoutHandle);
    };
  }, [color, squareSize, gridGap, flickerChance, maxOpacity]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("h-full w-full text-foreground", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="pointer-events-none block" />
    </div>
  );
};
