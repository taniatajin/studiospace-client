export type Review = {
  name: string;
  rating: number;
  comment: string;
  date: string;
};

export type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  rating: number;
  location: string;
  image: string;
  gallery: string[];
  amenities: string[];
  overview: string;
  ownerName: string;
  ownerEmail: string;
  reviews: Review[];
};

const gallery = (seed: string) =>
  [1, 2, 3].map((n) => `https://picsum.photos/seed/${seed}-${n}/1200/800`);

const photoAmenities = ["Cyclorama wall", "Profoto strobes", "Natural daylight", "Makeup station", "Free Wi-Fi", "Dressing room"];
const filmAmenities = ["Green screen", "Camlock power", "Acoustic blackbox", "Drive-in access", "Grip and lighting kit", "Green room"];
const podcastAmenities = ["Multi-cam 4K switcher", "Shure SM7B mics", "Sound treated walls", "Video monitor", "Free Wi-Fi", "Coffee bar"];
const musicAmenities = ["Dolby Atmos monitoring", "Analog console", "Vocal booth", "Live room", "Backline gear", "Lounge area"];
const artAmenities = ["Ceramic kilns", "Pottery wheels", "Printmaking press", "Storage lockers", "Ventilation system", "Tools included"];

const sampleReviews: Review[] = [
  { name: "Rina Ahmed", rating: 5, comment: "Spotless space and the gear was exactly as listed. Easy to book and easy to access.", date: "Oct 2026" },
  { name: "Jordan Blake", rating: 4, comment: "Great light and a very helpful host. Would book again for our next shoot.", date: "Sep 2026" },
  { name: "Sofia Marin", rating: 5, comment: "Perfect for our team session. Setup was quick and everything worked first time.", date: "Aug 2026" },
];

// TEMPORARY: server ready hole eta MongoDB theke ashbe
export const studios: Studio[] = [
  {
    _id: "1",
    title: "Halo Cyclorama Photo Loft",
    category: "Photo Studio",
    hourlyRate: 45,
    securityDeposit: 100,
    maxCapacity: 12,
    rating: 4.9,
    location: "Brooklyn, New York",
    image: "https://picsum.photos/seed/studio-photo1/800/600",
    gallery: gallery("studio-photo1"),
    amenities: photoAmenities,
    overview:
      "A bright loft with a 20 foot cyclorama wall, large north-facing windows and a full strobe kit. Ideal for fashion, product and portrait shoots with a small crew.",
    ownerName: "Maya Collins",
    ownerEmail: "maya@studiospace.com",
    reviews: sampleReviews,
  },
  {
    _id: "2",
    title: "Blackbox Cinema Sound Stage",
    category: "Film Stage",
    hourlyRate: 120,
    securityDeposit: 300,
    maxCapacity: 40,
    rating: 4.8,
    location: "Burbank, California",
    image: "https://picsum.photos/seed/studio-film1/800/600",
    gallery: gallery("studio-film1"),
    amenities: filmAmenities,
    overview:
      "A fully acoustic blackbox stage with green screen, camlock power and drive-in loading access. Built for short films, commercials and music videos.",
    ownerName: "Daniel Ortiz",
    ownerEmail: "daniel@studiospace.com",
    reviews: sampleReviews,
  },
  {
    _id: "3",
    title: "Signal 4K Podcast Lounge",
    category: "Podcast Lounge",
    hourlyRate: 35,
    securityDeposit: 50,
    maxCapacity: 6,
    rating: 4.7,
    location: "Austin, Texas",
    image: "https://picsum.photos/seed/studio-podcast1/800/600",
    gallery: gallery("studio-podcast1"),
    amenities: podcastAmenities,
    overview:
      "A turnkey podcast room with four broadcast mics, a three camera 4K switcher and a comfortable lounge set. Walk in with an idea and walk out with an episode.",
    ownerName: "Priya Nair",
    ownerEmail: "priya@studiospace.com",
    reviews: sampleReviews,
  },
  {
    _id: "4",
    title: "Atmos Analog Recording Suite",
    category: "Music Suite",
    hourlyRate: 80,
    securityDeposit: 150,
    maxCapacity: 8,
    rating: 5.0,
    location: "Nashville, Tennessee",
    image: "https://picsum.photos/seed/studio-music1/800/600",
    gallery: gallery("studio-music1"),
    amenities: musicAmenities,
    overview:
      "A professional recording suite with Dolby Atmos monitoring, an analog console and a tuned live room. Engineer available on request.",
    ownerName: "Marcus Hill",
    ownerEmail: "marcus@studiospace.com",
    reviews: sampleReviews,
  },
  {
    _id: "5",
    title: "Kiln and Clay Maker Workshop",
    category: "Workshop",
    hourlyRate: 28,
    securityDeposit: 40,
    maxCapacity: 10,
    rating: 4.6,
    location: "Portland, Oregon",
    image: "https://picsum.photos/seed/studio-art1/800/600",
    gallery: gallery("studio-art1"),
    amenities: artAmenities,
    overview:
      "A shared maker workshop with pottery wheels, two kilns and a printmaking corner. Great for classes, content shoots and personal projects.",
    ownerName: "Elena Rossi",
    ownerEmail: "elena@studiospace.com",
    reviews: sampleReviews,
  },
  {
    _id: "6",
    title: "Daylight Corner Photo Studio",
    category: "Photo Studio",
    hourlyRate: 52,
    securityDeposit: 120,
    maxCapacity: 10,
    rating: 4.8,
    location: "Chicago, Illinois",
    image: "https://picsum.photos/seed/studio-photo2/800/600",
    gallery: gallery("studio-photo2"),
    amenities: photoAmenities,
    overview:
      "A corner studio with floor to ceiling windows, white and black backdrops and a rolling props wall. Perfect for lifestyle and product photography.",
    ownerName: "Tom Becker",
    ownerEmail: "tom@studiospace.com",
    reviews: sampleReviews,
  },
];