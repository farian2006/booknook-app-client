"use cache";
import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

export const instant = false;

const Featured = async () => {
  const res = await fetch("http://localhost:5000/featured-books", {
    cache: "no-store",
  });
  const featuredBooks = await res.json();

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
        {featuredBooks.map((book) => (
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
        ))}
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
