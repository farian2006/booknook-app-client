"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub, SiFacebook, SiYoutube } from "react-icons/si";
import { Mail, MapPin, Share2, Heart } from "lucide-react";

const SOCIALS = [
  { href: "#", label: "GitHub", icon: SiGithub },
  { href: "#", label: "LinkedIn", icon: FaLinkedin },
  { href: "#", label: "Facebook", icon: SiFacebook },
  { href: "#", label: "YouTube", icon: SiYoutube },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-violet-100">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/background.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col items-start">
            <Link href="/" aria-label="BookNook Home">
              <Image
                src="/assests/logo.png"
                alt="BookNook"
                width={144}
                height={40}
                priority
                className="object-cover object-[center_45%] h-9 w-32 md:w-36"
              />
            </Link>

            <h2 className="mt-5 text-lg font-bold tracking-tight text-slate-900">
              Discover. Borrow. Read.
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-7 text-slate-600">
              Your next great read is just a click away. Explore a world of
              books, discover new stories, and share your love for reading.
            </p>
          </div>

          <div className="flex flex-col gap-6 border-t border-violet-200 pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-2">
            <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900">
              <span className="flex size-11 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                <Mail className="size-5" />
              </span>
              Contact Us
            </h3>

            <ul className="space-y-5 text-sm text-slate-600">
              <li className="flex items-center gap-3">
                <Mail className="size-5 shrink-0 text-violet-700" />
                <a
                  href="mailto:booknook@gmail.com"
                  className="transition-colors hover:text-violet-700"
                >
                  booknook@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MapPin className="size-5 shrink-0 text-violet-700" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-6 border-t border-violet-200 pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-2">
            <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900">
              <span className="flex size-11 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                <Share2 className="size-5" />
              </span>
              Follow Us
            </h3>

            <div className="flex flex-wrap items-center gap-3">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-12 items-center justify-center rounded-xl bg-violet-100 text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:text-white hover:shadow-lg hover:shadow-violet-200"
                >
                  <Icon className="size-5" />
                </Link>
              ))}
            </div>

            <p className="text-sm leading-6 text-slate-600">
              Stay connected with us and never miss an update.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-violet-200 pt-7">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
            <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-600">
              © 2026
              <span className="font-bold text-violet-700">
                BookNook. All Rights Reserved.
              </span>
            </p>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Heart className="size-4 fill-violet-700 text-violet-700" />
              <span className="font-medium italic">Read More. Grow More.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
