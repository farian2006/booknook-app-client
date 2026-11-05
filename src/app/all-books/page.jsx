"use cache";

import Image from "next/image";
import Link from "next/link";
import { API_URL } from "../../lib/api";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

const categoryVariantMap = {
  Fantasy: "fantasy",
  Fiction: "fiction",
  Classic: "classic",
  Dystopian: "dystopian",
  Romance: "romance",
  Programming: "programming",
  "Self-Help": "selfhelp",
  "Science Fiction": "scifi",
  Adventure: "adventure",
};

export default async function AllBooks() {
  let books = [];
  let failedToLoad = false;

  try {
    const res = await fetch(`${API_URL}/books`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      books = Array.isArray(data) ? data : (data.books ?? []);
    } else if (res.status !== 404) {
      failedToLoad = true;
    }
  } catch {
    failedToLoad = true;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center mb-8">
        <Image
          src="/assests/allBooks.png"
          alt="All Books"
          width={900}
          height={100}
          className="object-cover rounded-4xl object-center"
        />
      </div>
      {failedToLoad ? (
        <Card className="mb-8 p-8 text-center text-sm text-muted-foreground">
          We couldn&apos;t load the books right now. Please refresh the page to
          try again.
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book._id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-4 p-4">
                <div className="relative w-24 h-24 sm:w-32 sm:h-55 shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={book.imageUrl || "/assests/book-placeholder.png"}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center min-w-0 ">
                  <div>
                    <Link
                      href={`/all-books/${book._id}`}
                      className="block text-foreground hover:text-primary transition-colors"
                    >
                      <h3 className="text-lg font-semibold leading-tight">
                        {book.title}
                      </h3>
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {book.author}
                    </p>
                    <Badge
                      variant={categoryVariantMap[book.category] || "secondary"}
                      className="mt-2 inline-block"
                    >
                      {book.category}
                    </Badge>
                  </div>
                  <Button
                    nativeButton={false}
                    className="mt-4 w-full"
                    render={
                      <Link href={`/all-books/${book._id}`}>View Details</Link>
                    }
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
