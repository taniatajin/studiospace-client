"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";

const slides = [
  {
    badge: "Next-Gen Creative Studios",
    title: "Reserve Production Spaces Built for",
    highlight: "Visionary Creators",
    text: "Step into pre-rigged cyclorama soundstages, 4K multi-cam podcast lounges and Dolby Atmos mixing suites.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80",
  },
  {
    badge: "Photo and Film",
    title: "Shoot Your Next Project in",
    highlight: "Cinema-Grade Stages",
    text: "Book infinity cove walls, daylight lofts and fully lit sets by the hour, with transparent pricing.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1920&q=80",
  },
  {
    badge: "Podcast and Music",
    title: "Record Your Voice in",
    highlight: "Studio-Perfect Rooms",
    text: "From turnkey podcast lounges to analog recording suites, find the right room and reserve it instantly.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1920&q=80",
  },
];

export default function Hero() {
  return (
    <section className="[--swiper-theme-color:var(--primary)] [--swiper-navigation-size:22px]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-[560px] md:h-[640px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.highlight}>
            <div className="relative h-full w-full bg-zinc-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={slide.image} alt={slide.highlight} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />

              <div className="relative mx-auto flex h-full max-w-7xl items-center px-4">
                <div className="max-w-2xl px-2 sm:px-10">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
                    <Sparkles className="h-3.5 w-3.5" />
                    {slide.badge}
                  </span>
                  <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-6xl">
                    {slide.title} <span className="text-primary">{slide.highlight}</span>
                  </h1>
                  <p className="mt-5 max-w-lg text-sm leading-relaxed text-zinc-300 md:text-base">{slide.text}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button size="lg" asChild>
                      <Link href="/studios">
                        Explore All Studios <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                      asChild
                    >
                      <Link href="/add-studio">Host Your Space</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}