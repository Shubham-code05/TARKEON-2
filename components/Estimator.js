"use client";

import { useState } from "react";
import { site } from "@/lib/site";

// Prices yahan badlo. Ye sirf andaza (estimate) hai, final quote call ke baad.
const TYPES = [
  { id: "landing", label: "Landing page", note: "1 page", base: 4999 },
  { id: "website", label: "Business website", note: "5 pages included", base: 9999 },
  { id: "webapp", label: "Custom web app", note: "Login, dashboard, database", base: 39999 },
];

const ADDONS = [
  { id: "ai", label: "AI chatbot (website + WhatsApp)", price: 15000 },
  { id: "booking", label: "Online booking or admission form", price: 7000 },
  { id: "payment", label: "Online payments (UPI, cards)", price: 4000 },
  { id: "hindi", label: "Hindi version of the site", price: 3000 },
  { id: "brand", label: "Logo and brand colours", price: 3000 },
  { id: "content", label: "We write all the text for you", price: 2000 },
];

const EXTRA_PAGE = 1000;
const MAX_PAGES = 15;

function inr(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}
function round500(n) {
  return Math.round(n / 500) * 500;
}

export default function Estimator() {
  const [type, setType] = useState("website");
  const [pages, setPages] = useState(5);
  const [addons, setAddons] = useState(["ai"]);
  const [express, setExpress] = useState(false);
  const [care, setCare] = useState(true);

  const t = TYPES.find((x) => x.id === type);
  let total = t.base;
  if (type === "website") total += Math.max(0, pages - 5) * EXTRA_PAGE;
  addons.forEach((id) => {
    const a = ADDONS.find((x) => x.id === id);
    if (a) total += a.price;
  });
  if (express) total *= 1.25;
  const low = round500(total);
  const high = round500(total * 1.2);
  const weeks = type === "webapp" ? "4–6 weeks" : type === "landing" ? "3–5 days" : "1–2 weeks";
  const time = express ? (type === "landing" ? "2–3 days" : "about half the usual time") : weeks;

  function toggle(id) {
    setAddons(addons.includes(id) ? addons.filter((x) => x !== id) : [...addons, id]);
  }

  const chosen = ADDONS.filter((a) => addons.includes(a.id)).map((a) => a.label);
  const message =
    `Hi Tarkeon, I used your cost calculator.\n` +
    `Project: ${t.label}${type === "website" ? ` (${pages} pages)` : ""}\n` +
    (chosen.length ? `Add-ons: ${chosen.join(", ")}\n` : "") +
    (express ? "Delivery: Express\n" : "") +
    (care ? "Care plan: Yes\n" : "") +
    `Estimate shown: ${inr(low)} – ${inr(high)}\n` +
    `Please send me a fixed quote.`;
  const waUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="estimator">
      <div className="est-controls">
        <fieldset className="est-group">
          <legend>1. What do you need?</legend>
          <div className="est-types">
            {TYPES.map((x) => (
              <button
                key={x.id}
                type="button"
                className={`est-type ${type === x.id ? "is-on" : ""}`}
                aria-pressed={type === x.id}
                onClick={() => setType(x.id)}
              >
                <span className="est-type-label">{x.label}</span>
                <span className="est-type-note">{x.note}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {type === "website" && (
          <div className="est-group">
            <label htmlFor="est-pages" className="est-legend">
              2. How many pages? <strong>{pages}</strong>
            </label>
            <input
              id="est-pages"
              type="range"
              min="5"
              max={MAX_PAGES}
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              className="est-range"
            />
            <p className="est-hint">Home, About, Services, Gallery, Contact are 5. Extra pages {inr(EXTRA_PAGE)} each.</p>
          </div>
        )}

        <fieldset className="est-group">
          <legend>{type === "website" ? "3." : "2."} Add what you need</legend>
          <div className="est-addons">
            {ADDONS.map((a) => (
              <label key={a.id} className={`est-addon ${addons.includes(a.id) ? "is-on" : ""}`}>
                <input type="checkbox" checked={addons.includes(a.id)} onChange={() => toggle(a.id)} />
                <span className="est-addon-label">{a.label}</span>
                <span className="est-addon-price">+{inr(a.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="est-group">
          <legend>{type === "website" ? "4." : "3."} Extras</legend>
          <div className="est-addons">
            <label className={`est-addon ${express ? "is-on" : ""}`}>
              <input type="checkbox" checked={express} onChange={() => setExpress(!express)} />
              <span className="est-addon-label">Express delivery</span>
              <span className="est-addon-price">+25%</span>
            </label>
            <label className={`est-addon ${care ? "is-on" : ""}`}>
              <input type="checkbox" checked={care} onChange={() => setCare(!care)} />
              <span className="est-addon-label">Monthly care plan (updates, backups, support)</span>
              <span className="est-addon-price">₹1,499/mo</span>
            </label>
          </div>
        </fieldset>
      </div>

      <aside className="est-result" aria-live="polite">
        <p className="est-result-label">Your estimate</p>
        <p className="est-price">
          {inr(low)} <span>–</span> {inr(high)}
        </p>
        {care && <p className="est-care">+ ₹1,499/month care plan</p>}
        <dl className="est-summary">
          <div>
            <dt>Project</dt>
            <dd>
              {t.label}
              {type === "website" ? `, ${pages} pages` : ""}
            </dd>
          </div>
          <div>
            <dt>Add-ons</dt>
            <dd>{chosen.length ? chosen.length + " selected" : "None"}</dd>
          </div>
          <div>
            <dt>Delivery</dt>
            <dd>{time}</dd>
          </div>
          <div>
            <dt>Payment</dt>
            <dd>50% to start, 50% after approval</dd>
          </div>
        </dl>
        <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-white btn-block">
          Get my fixed quote on WhatsApp
        </a>
        <p className="est-fine">This is an estimate. Your final price is fixed in writing after a free call.</p>
      </aside>
    </div>
  );
}
