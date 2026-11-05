"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import { getApiAuthHeaders } from "../lib/jwt-browser";
import { API_URL } from "../lib/api";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "./ui/alert-dialog";

function DeleteBookDialog({ book, open, onOpenChange, onDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!book) return;

    setIsDeleting(true);
    try {
      const authHeaders = await getApiAuthHeaders();
      if (!authHeaders) {
        toast.error("Your session has expired. Please log in again.");
        return;
      }

      const res = await fetch(
        `${API_URL}/books/${book._id}?email=${encodeURIComponent(
          book.email ?? "",
        )}`,
        { method: "DELETE", headers: authHeaders },
      );

      if (!res.ok) {
        const { message } = await res.json().catch(() => ({}));
        toast.error(message || "Failed to delete the book. Please try again.");
        return;
      }

      onDeleted?.(book._id);
      toast.success(`${book.title} deleted successfully!`);
      onOpenChange?.(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="rounded-lg bg-destructive/10 text-destructive">
            <Trash2 />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete this book?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete “{book?.title}”? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={handleDelete}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            <Trash2 className="size-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteBookDialog;
