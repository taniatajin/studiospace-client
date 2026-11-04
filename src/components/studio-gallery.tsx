"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function StudioGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border [--swiper-theme-color:var(--primary)] [--swiper-navigation-size:22px]">
      <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} loop className="h-72 md:h-[420px]">
        {images.map((src, i) => (
          <SwiperSlide key={src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${title} photo ${i + 1}`} className="h-full w-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}