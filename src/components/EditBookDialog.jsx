"use client";

import { useState } from "react";
import { ChevronDown, Pencil } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectList,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

function EditBookDialog({ book, open, onOpenChange, onSaved }) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!book) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    setIsSaving(true);
    try {
      const res = await fetch(
        `http://localhost:5000/books/${book._id}?userEmail=${encodeURIComponent(
          book.email ?? "",
        )}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: data.title,
            author: data.author,
            category: data.category,
            imageUrl: data.imageUrl,
            description: data.description,
            userName: book.userName,
            email: book.email,
          }),
        },
      );

      if (!res.ok) {
        const { message } = await res.json().catch(() => ({}));
        toast.error(message || "Failed to update the book. Please try again.");
        return;
      }
      onSaved?.(book._id, {
        title: data.title,
        author: data.author,
        category: data.category,
        imageUrl: data.imageUrl,
        description: data.description,
        userName: book.userName,
        email: book.email,
      });
      toast.success("Book updated successfully!");
      onOpenChange?.(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {book && (
        <DialogContent
          key={book._id}
          className="w-full max-w-lg gap-5 p-6 sm:max-w-lg"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="size-4 text-muted-foreground" />
              Edit Book
            </DialogTitle>
            <DialogDescription>
              Update the details of “{book.title}”.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label>Book Title</Label>
              <Input
                name="title"
                defaultValue={book.title}
                placeholder="Enter book title..."
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Author Name</Label>
              <Input
                name="author"
                defaultValue={book.author}
                placeholder="Enter author name..."
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select name="category" defaultValue={book.category} required>
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
            <div className="space-y-1.5">
              <Label>Book Image</Label>
              <Input
                type="url"
                name="imageUrl"
                defaultValue={book.imageUrl}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Short Description</Label>
              <Textarea
                name="description"
                defaultValue={book.description}
                placeholder="Write a short description about the book..."
                className="min-h-[100px]"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isSaving}
                onClick={() => onOpenChange?.(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                <Pencil className="size-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default EditBookDialog;
