"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { authClient } from "../lib/auth-client";

export function BorrowBookDialog({ book }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleConfirmBorrow = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error("Please sign in to borrow a book.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setIsSubmitting(true);
    try {
      const res = await fetch(`http://localhost:5000/my-borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book?._id,
          bookTitle: book?.title,
          bookImage: book?.imageUrl,
          userName: data.userName || user?.name,
          userEmail: data.email || user?.email,
          image: user?.image,
          borrowDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        }),
      });

      if (!res.ok) {
        toast.error("Failed to borrow the book. Please try again.");
        return;
      }

      toast.success(`${book?.title} borrowed successfully!`);
      setOpen(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="h-12 rounded-[14px] border-0 bg-[#4f36c9] px-8 text-base font-semibold text-white hover:bg-[#3f2aad]"
      >
        Borrow Book →
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          key={user?.id ?? "guest"}
          className="w-full max-w-md gap-5 p-6 sm:max-w-md"
        >
          <DialogHeader className="items-center text-center">
            <Image
              src="/assests/logo.png"
              alt="BookNook"
              width={120}
              height={70}
              className="h-12 w-auto"
            />
            <DialogTitle className="text-lg font-semibold">
              Borrow Book
            </DialogTitle>
            <DialogDescription>
              Request to borrow “{book?.title}”
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleConfirmBorrow} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="borrow-userName">User Name</Label>
              <Input
                id="borrow-userName"
                name="userName"
                type="text"
                placeholder="John Doe"
                defaultValue={user?.name ?? ""}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="borrow-email">Email</Label>
              <Input
                id="borrow-email"
                name="email"
                type="email"
                placeholder="john@example.com"
                defaultValue={user?.email ?? ""}
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-9 rounded-lg border-0 bg-[#4f36c9] px-4 font-semibold text-white hover:bg-[#3f2aad]"
              >
                {isSubmitting ? "Borrowing..." : "Confirm Borrow"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BorrowBookDialog;
