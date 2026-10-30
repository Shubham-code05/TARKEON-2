"use client";

import { useState } from "react";
import { needs, site } from "@/lib/site";

// Form bhejne par client ka WhatsApp khulta hai, tumhare number pe
// pehle se likha message ke saath. Isliye koi server ya database nahi chahiye.
export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [need, setNeed] = useState(needs[1]);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    setError("");
    const message =
      `Hi Tarkeon, I'm ${name.trim()}.` +
      (phone.trim() ? ` My number: ${phone.trim()}.` : "") +
      ` I'm interested in: ${need}.`;
    const url = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="c-name">Your name</label>
        <input id="c-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="field">
        <label htmlFor="c-phone">WhatsApp number (optional)</label>
        <input id="c-phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <fieldset className="field">
        <legend>What do you need?</legend>
        <div className="chips">
          {needs.map((n) => (
            <button
              key={n}
              type="button"
              className={`chip ${need === n ? "is-on" : ""}`}
              aria-pressed={need === n}
              onClick={() => setNeed(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </fieldset>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-dark btn-block">
        Send on WhatsApp — takes 30 seconds
      </button>
      <p className="form-note">No spam. We only use your number to reply to you.</p>
    </form>
  );
}
