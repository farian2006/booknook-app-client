"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const slides = [
  {
    title: "Discover a World of Books",
    text: "Explore amazing stories, expand your knowledge, and find your next favorite book.",
    image: "/assests/banner1.jpg",
  },
  {
    title: "Find Your Next Favorite Story",
    text: "From timeless classics to modern adventures, there is something for every reader.",
    image: "/assets/banner2.jpg",
  },
  {
    title: "Read. Learn. Grow.",
    text: "Build your personal collection and discover books that inspire and educate.",
    image: "/assets/banner3.jpg",
  },
];

const Banner = () => {
  return (
    <section className="w-full px-4 py-6 md:px-8">
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        loop={true}
        className="overflow-hidden rounded-3xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative min-h-112.5 overflow-hidden rounded-3xl">
              <Image
                src={slide.image}
                alt={slide.title}
                height={450}
                width={1920}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50"></div>

              <div className="relative z-10 flex min-h-112.5 items-center px-8 md:px-16">
                <div className="max-w-2xl text-white">
                  <p className="mb-3 text-sm font-medium uppercase tracking-[4px] text-yellow-300">
                    Read • Learn • Grow
                  </p>

                  <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mb-8 text-base leading-7 text-gray-200 md:text-lg">
                    {slide.text}
                  </p>

                  <Link
                    href="/all-books"
                    className="inline-flex rounded-full bg-yellow-400 px-7 py-3 font-semibold text-gray-900 transition hover:bg-yellow-300"
                  >
                    Browse Books →
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
