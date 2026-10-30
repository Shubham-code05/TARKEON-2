"use client";

// Founder card ka chhota terminal. Screen pe aate hi lines ek-ek karke type hoti hain,
// phir cursor blink karta rehta hai. Reduced motion pe saara text seedha dikhta hai.
import { useEffect, useRef, useState } from "react";

const PREFIX = { cmd: "$ ", out: "> ", status: "> " };
const SPEED = { cmd: 70, out: 22, status: 22 }; // ms per character
const LINE_PAUSE = 350;

function Line({ line, text, cursor }) {
  return (
    <p className={`term-line term-${line.type}`}>
      <span className="term-prefix">{PREFIX[line.type]}</span>
      {text}
      {cursor && <span className="term-cursor" />}
    </p>
  );
}

export default function Terminal({ lines }) {
  const ref = useRef(null);
  const [phase, setPhase] = useState("idle"); // idle → typing → done
  const [pos, setPos] = useState({ line: 0, char: 0 });

  // Screen pe aane par shuru karo
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setPhase("done");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("typing");
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // Ek-ek character type karo
  useEffect(() => {
    if (phase !== "typing") return;
    const current = lines[pos.line];
    let next;
    let delay;
    if (pos.char < current.text.length) {
      next = { line: pos.line, char: pos.char + 1 };
      delay = SPEED[current.type];
    } else if (pos.line < lines.length - 1) {
      next = { line: pos.line + 1, char: 0 };
      delay = LINE_PAUSE;
    } else {
      setPhase("done");
      return;
    }
    const t = setTimeout(() => setPos(next), delay);
    return () => clearTimeout(t);
  }, [phase, pos, lines]);

  const last = lines.length - 1;
  let visible;
  if (phase === "done") {
    visible = lines.map((l, i) => <Line key={i} line={l} text={l.text} cursor={i === last} />);
  } else if (phase === "typing") {
    visible = lines
      .slice(0, pos.line + 1)
      .map((l, i) => <Line key={i} line={l} text={i < pos.line ? l.text : l.text.slice(0, pos.char)} cursor={i === pos.line} />);
  } else {
    visible = <Line line={lines[0]} text="" cursor />;
  }

  return (
    <div className="terminal" ref={ref}>
      <div className="term-bar" aria-hidden="true">
        <span className="term-dot term-red" />
        <span className="term-dot term-yellow" />
        <span className="term-dot term-green" />
      </div>
      <div className="term-body">
        {/* Screen reader ko poora text ek saath milta hai, animation wala hissa chhupa hai */}
        <div className="sr-only">
          {lines.map((l, i) => (
            <p key={i}>
              {PREFIX[l.type]}
              {l.text}
            </p>
          ))}
        </div>
        <div className="term-live" aria-hidden="true">
          {visible}
        </div>
        <noscript>
          <style>{".term-live{display:none}"}</style>
          <div aria-hidden="true">
            {lines.map((l, i) => (
              <Line key={i} line={l} text={l.text} />
            ))}
          </div>
        </noscript>
      </div>
    </div>
  );
}
