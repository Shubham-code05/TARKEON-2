import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container">
      <div className="page-hero-inner not-found">
        <p className="eyebrow">404</p>
        <h1>This page doesn’t exist.</h1>
        <p className="lead">The link may be old or mistyped.</p>
        <Link href="/" className="btn btn-accent">
          Go to homepage
        </Link>
      </div>
    </section>
  );
}
