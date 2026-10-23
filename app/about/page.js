import { PageHero, Eyebrow, CtaBand } from "@/components/Sections";
import FounderCard from "@/components/FounderCard";
import { values } from "@/lib/site";

export const metadata = {
  title: "About — Tark se tech tak | Tarkeon",
  description: "Tarkeon is a web, AI and automation studio from Lucknow. Logic first, then code.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Tarkeon"
        title="Tark se tech tak."
        text="Tarkeon is a web, AI and automation studio from Lucknow, helping growing businesses use technology without the confusion."
      />

      <section className="container section section-tight about-grid">
        <div className="about-story">
          <h2>Where the name comes from</h2>
          <p>
            <strong>Tark</strong> (तर्क) means logic. <strong>Eon</strong> means a long age. Together, Tarkeon stands for
            technology built on clear thinking, made to last.
          </p>
          <p>
            Many small businesses get websites that look fine but bring no customers, or software nobody on the team
            uses. We start with how your business actually works, then build the simplest thing that helps.
          </p>
          <p>
            We work online with clients across India, which keeps our costs low and our prices fair. Today we focus on
            websites, web apps, AI chatbots and automation for coaching institutes, clinics, restaurants and local
            businesses.
          </p>
        </div>
        <FounderCard />
      </section>

      <section className="band-white">
        <div className="container section">
          <div className="section-head">
            <Eyebrow>What we believe</Eyebrow>
            <h2>How we work with every client.</h2>
          </div>
          <div className="grid grid-4">
            {values.map((v) => (
              <div key={v.title} className="value">
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Let’s talk about your business." />
    </>
  );
}
