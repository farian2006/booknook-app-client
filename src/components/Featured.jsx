"use cache";
import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { API_URL } from "../lib/api";

export const instant = false;

async function getFeaturedBooks() {
  try {
    const res = await fetch(`${API_URL}/featured-books`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    // Backend unreachable (e.g. during a deploy): don't hard-fail the build.
    return null;
  }
}

const Featured = async () => {
  const featuredBooks = (await getFeaturedBooks()) ?? [];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-primary">
          Fresh From The Library
        </p>

        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          New Arrivals
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Discover the latest additions to our library and find your next
          favorite book.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-3">
        {featuredBooks.length === 0 ? (
          <p className="col-span-full text-center text-sm text-muted-foreground">
            Featured books are unavailable right now. Please check back soon.
          </p>
        ) : (
          featuredBooks.map((book) => (
            <Card
              key={book._id}
              className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-5/4 overflow-hidden bg-muted">
                <Image
                  src={book.imageUrl}
                  alt="Books"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <CardContent className="p-5">
                <Badge variant="secondary" className="mb-3">
                  {book.category}
                </Badge>

                <h3 className="line-clamp-1 text-xl font-semibold">
                  {book.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  By {book.author}
                </p>
              </CardContent>

              <CardFooter className="p-5 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/all-books/${book._id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg" variant="outline">
          <Link href="/all-books">See All Books</Link>
        </Button>
      </div>
    </section>
  );
};

export default Featured;
