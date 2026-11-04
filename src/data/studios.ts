export type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  rating: number;
  location: string;
  image: string;
};

// TEMPORARY: server ready hole eta MongoDB theke ashbe
export const studios: Studio[] = [
  {
    _id: "1",
    title: "Halo Cyclorama Photo Loft",
    category: "Photo Studio",
    hourlyRate: 45,
    rating: 4.9,
    location: "Brooklyn, New York",
    image: "https://picsum.photos/seed/studio-photo1/800/600",
  },
  {
    _id: "2",
    title: "Blackbox Cinema Sound Stage",
    category: "Film Stage",
    hourlyRate: 120,
    rating: 4.8,
    location: "Burbank, California",
    image: "https://picsum.photos/seed/studio-film1/800/600",
  },
  {
    _id: "3",
    title: "Signal 4K Podcast Lounge",
    category: "Podcast Lounge",
    hourlyRate: 35,
    rating: 4.7,
    location: "Austin, Texas",
    image: "https://picsum.photos/seed/studio-podcast1/800/600",
  },
  {
    _id: "4",
    title: "Atmos Analog Recording Suite",
    category: "Music Suite",
    hourlyRate: 80,
    rating: 5.0,
    location: "Nashville, Tennessee",
    image: "https://picsum.photos/seed/studio-music1/800/600",
  },
  {
    _id: "5",
    title: "Kiln and Clay Maker Workshop",
    category: "Workshop",
    hourlyRate: 28,
    rating: 4.6,
    location: "Portland, Oregon",
    image: "https://picsum.photos/seed/studio-art1/800/600",
  },
  {
    _id: "6",
    title: "Daylight Corner Photo Studio",
    category: "Photo Studio",
    hourlyRate: 52,
    rating: 4.8,
    location: "Chicago, Illinois",
    image: "https://picsum.photos/seed/studio-photo2/800/600",
  },
];