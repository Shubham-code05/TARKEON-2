"use client";

import { useState } from "react";
import { chatQA } from "@/lib/site";

export default function ChatDemo() {
  const [asked, setAsked] = useState([]);

  const messages = [
    { from: "bot", text: "Namaste! I am a demo of the assistant Tarkeon builds. Tap a question below." },
  ];
  asked.forEach((id) => {
    const item = chatQA.find((x) => x.id === id);
    if (item) {
      messages.push({ from: "user", text: item.q });
      messages.push({ from: "bot", text: item.a });
    }
  });
  const remaining = chatQA.filter((x) => !asked.includes(x.id));

  return (
    <div className="chat">
      <div className="chat-head">
        <p className="chat-title">Try our demo assistant</p>
        <p className="chat-status">
          <span className="dot dot-green" aria-hidden="true" />
          Online
        </p>
      </div>
      <div className="chat-body" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`bubble bubble-${m.from}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="chat-replies">
        {remaining.map((x) => (
          <button key={x.id} type="button" className="chip-dark" onClick={() => setAsked([...asked, x.id])}>
            {x.q}
          </button>
        ))}
        {remaining.length === 0 && (
          <button type="button" className="chip-dark chip-quiet" onClick={() => setAsked([])}>
            Start again
          </button>
        )}
      </div>
      <p className="chat-note">This is the kind of assistant we build for your website or WhatsApp.</p>
    </div>
  );
}
