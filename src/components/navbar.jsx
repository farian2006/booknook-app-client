"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookMarked,
  BookOpen,
  CircleUserRound,
  LogIn,
  Menu,
  Plus,
  Repeat2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: BookOpen },
  { href: "/all-books", label: "All Books", icon: BookMarked },
  { href: "/add-books", label: "Add Book", icon: Plus },
  { href: "/my-books", label: "My Books", icon: CircleUserRound },
  { href: "/borrows", label: "My Borrows", icon: Repeat2 },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Logo() {
  return (
    <Link
      href="/"
      className="flex h-10 shrink-0 items-center"
      aria-label="BookNook home"
    >
      <Image
        src="/assests/logo.png"
        alt="BookNook"
        width={144}
        height={40}
        priority
        className="object-cover object-[center_45%] h-9 w-32 md:w-36"
      />
    </Link>
  );
}

function NavLink({ href, label, icon, active, onNavigate }) {
  const Icon = icon;
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-foreground/80 hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className="size-4 shrink-0" strokeWidth={2.2} />
      {label}
    </Link>
  );
}

function AuthButtons({ className }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button variant="default">
        <LogIn data-icon="inline-start" />
        Login
      </Button>
      <Button
        variant="outline"
        className="border-primary text-primary hover:bg-primary/10"
      >
        <CircleUserRound data-icon="inline-start" />
        Register
      </Button>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              active={isActive(pathname, link.href)}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <AuthButtons className="hidden sm:flex" />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </Button>
        </div>
      </nav>
      {open && (
        <div id="mobile-nav" className="border-t bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                active={isActive(pathname, link.href)}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
