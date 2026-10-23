import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Tarkeon home">
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="1" y="1" width="30" height="30" rx="8" fill="#0B0D12" />
        <path d="M9 11h14M16 11v12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="23" cy="22" r="2.5" fill="var(--accent)" />
      </svg>
      <span>Tarkeon</span>
    </Link>
  );
}
