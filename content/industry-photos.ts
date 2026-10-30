// Stock photos for each industry, sources in public/images/CREDITS.md.
// They show the kind of business we work with. Never present them as our team, office or clients.

export type IndustryPhoto = { src: string; alt: string; width: number; height: number };

const photo = (file: string, alt: string, width = 1600, height = 1067): IndustryPhoto => ({
  src: `/images/industries/${file}.webp`,
  alt,
  width,
  height,
});

const photos: Record<string, IndustryPhoto[]> = {
  coaching: [photo("coaching-1", "A student reading a textbook at a library desk")],
  clinics: [
    photo("clinics-1", "A doctor checking a patient’s blood pressure in a clinic"),
    photo("clinics-2", "A doctor examining a patient with a stethoscope at a clinic desk"),
  ],
  restaurants: [
    photo("restaurants-1", "A cosy restaurant with wooden chairs and warm hanging lamps"),
    photo("restaurants-2", "A café interior with woven lamps and indoor plants", 1200, 800),
  ],
  "real-estate": [
    photo("real-estate-1", "A residential building with green balconies", 1200, 800),
    photo("real-estate-2", "Close view of a modern apartment building with balconies"),
  ],
  "local-shops": [
    photo("local-shops-1", "A shopkeeper smiling behind the counter of a colourful grocery store"),
    photo("local-shops-2", "A small neighbourhood general store with goods displayed outside"),
  ],
};

/** The first photo leads on the homepage; the last one tops the industry's own page. */
export function industryPhotos(slug: string): [IndustryPhoto, IndustryPhoto] {
  const list = photos[slug]!;
  return [list[0]!, list[list.length - 1]!];
}
