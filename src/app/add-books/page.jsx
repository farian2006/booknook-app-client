"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  ChevronDown,
  Plus,
  Image as ImageIcon,
} from "lucide-react";

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectList,
  SelectItem,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

export default function AddBooksPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-input bg-card text-card-foreground shadow-sm p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-square rounded-xl border border-dashed border-input bg-muted/50 flex items-center justify-center overflow-hidden group">
              <Image
                src="/assests/addBooks.png"
                alt="Book cover"
                fill
                className="object-cover h-full w-full group-hover:opacity-90 transition-opacity"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex-1 w-full space-y-6"
            noValidate
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <Label>Book Title</Label>
                <Input
                  name="title"
                  placeholder="Enter book title..."
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label>Author Name</Label>
                <Input
                  name="author"
                  placeholder="Enter author name..."
                  required
                />
              </div>
              <div className="col-span-2">
                <Label>Category</Label>
                <Select name="category" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                    <ChevronDown className="ml-auto size-4 text-muted-foreground" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectList className="p-1">
                      <SelectItem value="fiction">Fiction</SelectItem>
                      <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                      <SelectItem value="science-fiction">
                        Science Fiction
                      </SelectItem>
                      <SelectItem value="biography">Biography</SelectItem>
                    </SelectList>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label>Book Image</Label>
                <Input
                  type="url"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <div className="col-span-2">
                <Label>Short Description</Label>
                <Textarea
                  name="description"
                  placeholder="Write a short description about the book..."
                  className="min-h-[120px]"
                />
              </div>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  type="text"
                  name="userName"
                  placeholder="John Doe"
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-lg"
              variant="default"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Plus className="mr-2 size-5" /> Adding...
                </>
              ) : (
                <>
                  <Plus className="mr-2 size-5" /> Add Book
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
