import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const HowBorrowingWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Choose a Book",
      text: "Browse our collection and find a book you would like to read.",
    },
    {
      number: "02",
      title: "Borrow the Book",
      text: "Open the book details and request the book you want to borrow.",
    },
    {
      number: "03",
      title: "Read & Enjoy",
      text: "Enjoy your book and make the most of your reading time.",
    },
    {
      number: "04",
      title: "Return the Book",
      text: "Return the book within the given borrowing period so others can enjoy it too.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-primary">
            Simple & Easy
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            How Borrowing Works
          </h2>

          <p className="mt-4 max-w-xl text-muted-foreground">
            Borrowing a book from our library is simple. Follow these four steps
            and start your reading journey.
          </p>

          <div className="mt-8 space-y-4">
            {steps.map((step) => (
              <Card
                key={step.number}
                className="border-none bg-muted/50 shadow-none"
              >
                <CardContent className="flex gap-5 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="font-semibold">{step.title}</h3>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowBorrowingWorks;
