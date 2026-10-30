import { PageHero, WorkGrid, Testimonial, CtaBand } from "@/components/Sections";

export const metadata = {
  title: "Our Work — Websites We’ve Built | Tarkeon",
  description: "Websites built by Tarkeon’s founder, each with what was built and a link to the live site.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Real projects you can open and try."
        text="A few websites built by our founder. Open any of them live to see the work yourself."
      />
      <section className="container section section-tight">
        <WorkGrid />
        <Testimonial />
      </section>
      <CtaBand title="Want something like this for your business?" />
    </>
  );
}
