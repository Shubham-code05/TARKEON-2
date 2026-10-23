import Link from "next/link";
import ChatDemo from "@/components/ChatDemo";
import Icon from "@/components/Icon";
import { Eyebrow, ServicesGrid, WorkGrid, Testimonial, Process, CtaBand, Comparison } from "@/components/Sections";
import { industries } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="container hero">
        <div className="hero-text">
          <p className="pill">
            <span className="dot" aria-hidden="true" />
            For coaching institutes, clinics, restaurants and local businesses
          </p>
          <h1>Get more enquiries with a website and AI assistant that work 24×7.</h1>
          <p className="lead">
            Tarkeon builds fast websites, custom web apps and AI chatbots that answer your customers, take bookings and
            save you hours every week. Fixed price, clear deadline, in writing.
          </p>
          <div className="btn-row">
            <Link href="/contact" className="btn btn-accent">
              Get a free consultation <Icon name="arrow" size={18} strokeWidth={2} />
            </Link>
            <Link href="/work" className="btn btn-light">
              See our work
            </Link>
          </div>
          <ul className="trust">
            {["Free demo before you pay in full", "Reply within 1 working day", "English, Hindi, Hinglish"].map((t) => (
              <li key={t}>
                <Icon name="check" size={18} strokeWidth={2.2} className="check" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-demo">
          <ChatDemo />
        </div>
      </section>

      {/* SERVICES */}
      <section className="band-white">
        <div className="container section">
          <div className="section-head section-head-split">
            <div>
              <Eyebrow>Services</Eyebrow>
              <h2>Everything you need to grow online.</h2>
            </div>
            <Link href="/services" className="btn btn-light btn-sm">
              All services
            </Link>
          </div>
          <ServicesGrid linked />
        </div>
      </section>

      {/* WORK */}
      <section className="container section">
        <div className="section-head section-head-split">
          <div>
            <Eyebrow>Our work</Eyebrow>
            <h2>Websites we’ve built.</h2>
          </div>
          <Link href="/work" className="btn btn-light btn-sm">
            View all work
          </Link>
        </div>
        <WorkGrid limit={3} />
        <Testimonial />
      </section>

      {/* INDUSTRIES */}
      <section className="band-white">
        <div className="container section">
          <div className="section-head section-head-split">
            <div>
              <Eyebrow>Industries</Eyebrow>
              <h2>Made for your kind of business.</h2>
            </div>
            <Link href="/industries" className="btn btn-light btn-sm">
              See all industries
            </Link>
          </div>
          <div className="grid grid-4">
            {industries.map((x) => (
              <Link key={x.id} href={`/industries#${x.id}`} className="card card-soft industry-card">
                <h3>{x.name}</h3>
                <p>{x.pitch}</p>
                <span className="text-link">See what we build →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="container section">
        <div className="section-head">
          <Eyebrow>Why Tarkeon</Eyebrow>
          <h2>Agency quality. Freelancer honesty. Plus AI.</h2>
        </div>
        <Comparison />
      </section>

      {/* ESTIMATE TEASER */}
      <section className="container estimate-teaser-wrap">
        <div className="estimate-teaser">
          <div>
            <h2>What will your website cost?</h2>
            <p>Pick what you need and see an honest estimate in 30 seconds. No call, no email needed.</p>
          </div>
          <Link href="/pricing#estimator" className="btn btn-accent">
            Open the cost calculator <Icon name="arrow" size={18} strokeWidth={2} />
          </Link>
        </div>
      </section>

      <Process />
      <CtaBand />
    </>
  );
}
