"use client";

import { useState } from "react";
import { Bookmark, Share2, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BookActions({ title }) {
  const [saved, setSaved] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied!");
      }
    } catch {
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full"
        aria-label="Bookmark"
        onClick={() => setSaved((s) => !s)}
      >
        <Bookmark className={saved ? "size-4 fill-current" : "size-4"} />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full"
        aria-label="Share"
        onClick={handleShare}
      >
        <Share2 className="size-4" />
      </Button>
    </div>
  );
}

export function BorrowButton({ bookId }) {
  function handleBorrow() {

    console.log("Borrow book:", bookId);
  }

  return (
    <Button
      onClick={handleBorrow}
      className="h-12 rounded-xl bg-indigo-700 px-8 text-base font-semibold text-white hover:bg-indigo-800"
    >
      <BookOpen className="size-5" />
      Borrow This Book
      <ArrowRight className="size-5" />
    </Button>
  );
}
