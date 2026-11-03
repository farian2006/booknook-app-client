import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Ayesha Rahman",
    role: "Book Enthusiast",
    review:
      "BookShelf has completely changed the way I read. The collection is amazing and finding new books is so easy!",
    initials: "AR",
  },
  {
    name: "Rafiul Islam",
    role: "Regular Reader",
    review:
      "A simple and beautiful platform with a great collection of books. I love how easy it is to discover something new.",
    initials: "RI",
  },
  {
    name: "Nusrat Jahan",
    role: "Student",
    review:
      "The borrowing process is simple, and there are so many interesting books to choose from. Highly recommended!",
    initials: "NJ",
  },
];

const ReaderReviews = () => {
  return (
    <section className="bg-muted/30 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-primary">
            What Readers Say
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Loved by Our Readers
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            See what our readers have to say about their experience with
            BookShelf.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Card
              key={review.name}
              className="border-none bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-7">
                <div className="mb-5 flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="min-h-25 text-sm leading-7 text-muted-foreground">
                  “{review.review}”
                </p>

                <div className="mt-7 flex items-center gap-4">
                  <Avatar className="h-11 w-11">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {review.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{review.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      {review.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReaderReviews;
