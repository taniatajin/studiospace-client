import { Camera, Clapperboard, Mic, Music, Palette, type LucideIcon } from "lucide-react";

export type Category = {
  label: string;
  value: string; // database e ei value save hobe, /studios?category= e ei value jabe
  description: string;
  count: string;
  icon: LucideIcon;
  color: string;
};

export const categories: Category[] = [
  {
    label: "Photo Studios",
    value: "Photo Studio",
    description: "Cyclorama walls, natural daylight lofts and profoto lighting setups.",
    count: "24+ Spaces",
    icon: Camera,
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    label: "Sound Stages",
    value: "Film Stage",
    description: "Acoustic blackboxes, green screens, camlock power and drive-in access.",
    count: "16+ Spaces",
    icon: Clapperboard,
    color: "bg-violet-500/10 text-violet-500",
  },
  {
    label: "Podcast Rooms",
    value: "Podcast Lounge",
    description: "Turnkey audio and video recording with multi-cam 4K switchers.",
    count: "19+ Spaces",
    icon: Mic,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    label: "Music Suites",
    value: "Music Suite",
    description: "Dolby Atmos monitoring, analog consoles, vocal booths and live rooms.",
    count: "14+ Spaces",
    icon: Music,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    label: "Art Workshops",
    value: "Workshop",
    description: "Ceramic kilns, pottery wheels, printmaking presses and maker space.",
    count: "11+ Spaces",
    icon: Palette,
    color: "bg-rose-500/10 text-rose-500",
  },
];