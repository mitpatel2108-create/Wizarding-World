import gryffindorImg from "@/assets/house-gryffindor.jpg";
import slytherinImg from "@/assets/house-slytherin.jpg";
import ravenclawImg from "@/assets/house-ravenclaw.jpg";
import hufflepuffImg from "@/assets/house-hufflepuff.jpg";

export type HouseId = "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";

export interface House {
  id: HouseId;
  name: string;
  founder: string;
  animal: string;
  element: string;
  trait: string;
  motto: string;
  description: string;
  ghost: string;
  image: string;
  particle: "ember" | "dust" | "snow" | "spark";
  gradient: string;
  glow: string;
  text: string;
  emblemPath: string;
}

export const HOUSES: House[] = [
  {
    id: "gryffindor",
    name: "Gryffindor",
    founder: "Godric Gryffindor",
    animal: "Lion",
    element: "Fire",
    trait: "Courage",
    motto: "Their daring, nerve, and chivalry set Gryffindors apart.",
    description:
      "Where the brave at heart find their welcome. The fire crackles louder here, and the curtains breathe with old battles remembered.",
    ghost: "Nearly Headless Nick",
    image: gryffindorImg,
    particle: "ember",
    gradient: "linear-gradient(135deg, oklch(0.40 0.18 25), oklch(0.10 0.06 25))",
    glow: "oklch(0.78 0.18 45)",
    text: "oklch(0.92 0.10 75)",
    emblemPath:
      "M50 8 C30 8 20 24 20 40 C20 60 35 78 50 92 C65 78 80 60 80 40 C80 24 70 8 50 8 Z",
  },
  {
    id: "slytherin",
    name: "Slytherin",
    founder: "Salazar Slytherin",
    animal: "Serpent",
    element: "Water",
    trait: "Ambition",
    motto: "You'll make your real friends — those cunning folk use any means.",
    description:
      "Beneath the black lake, the windows hum with green. The water remembers names you have not yet earned.",
    ghost: "The Bloody Baron",
    image: slytherinImg,
    particle: "dust",
    gradient: "linear-gradient(135deg, oklch(0.32 0.12 160), oklch(0.06 0.04 160))",
    glow: "oklch(0.65 0.18 160)",
    text: "oklch(0.92 0.06 150)",
    emblemPath:
      "M50 8 C30 8 20 24 20 40 C20 60 35 78 50 92 C65 78 80 60 80 40 C80 24 70 8 50 8 Z",
  },
  {
    id: "ravenclaw",
    name: "Ravenclaw",
    founder: "Rowena Ravenclaw",
    animal: "Eagle",
    element: "Air",
    trait: "Wisdom",
    motto: "Wit beyond measure is man's greatest treasure.",
    description:
      "A tower of stars and questions. Climb the spiral stair only after you have answered the door.",
    ghost: "The Grey Lady",
    image: ravenclawImg,
    particle: "snow",
    gradient: "linear-gradient(135deg, oklch(0.30 0.15 250), oklch(0.06 0.05 260))",
    glow: "oklch(0.70 0.18 240)",
    text: "oklch(0.92 0.06 240)",
    emblemPath:
      "M50 8 C30 8 20 24 20 40 C20 60 35 78 50 92 C65 78 80 60 80 40 C80 24 70 8 50 8 Z",
  },
  {
    id: "hufflepuff",
    name: "Hufflepuff",
    founder: "Helga Hufflepuff",
    animal: "Badger",
    element: "Earth",
    trait: "Loyalty",
    motto: "Just and loyal, those patient Hufflepuffs are true.",
    description:
      "Round windows and warm bread. Loyalty is not a soft virtue here — it is a quiet, unbreakable steel.",
    ghost: "The Fat Friar",
    image: hufflepuffImg,
    particle: "spark",
    gradient: "linear-gradient(135deg, oklch(0.50 0.15 75), oklch(0.10 0.06 60))",
    glow: "oklch(0.82 0.16 80)",
    text: "oklch(0.95 0.10 85)",
    emblemPath:
      "M50 8 C30 8 20 24 20 40 C20 60 35 78 50 92 C65 78 80 60 80 40 C80 24 70 8 50 8 Z",
  },
];

export const HOUSES_BY_ID: Record<HouseId, House> = HOUSES.reduce(
  (acc, h) => ((acc[h.id] = h), acc),
  {} as Record<HouseId, House>,
);
