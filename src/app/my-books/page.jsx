"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookX,
  CircleUserRound,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import { authClient } from "../../lib/auth-client";
import { getApiAuthHeaders } from "../../lib/jwt-browser";
import { API_URL } from "../../lib/api";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import EditBookDialog from "../../components/EditBookDialog";
import DeleteBookDialog from "../../components/DeleteBookDialog";

const categoryVariantMap = {
  fiction: "fiction",
  "non-fiction": "nonfiction",
  mystery: "mystery",
  romance: "romance",
  history: "history",
  "science-fiction": "scifi",
  biography: "biography",
};

function displayCategory(category) {
  return (category ?? "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const MyBooksPage = () => {
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const email = session?.user?.email;

  const [books, setBooks] = useState(null);
  const [error, setError] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);

  const fetchBooks = useCallback(() => {
    if (!email) return;

    getApiAuthHeaders()
      .then((authHeaders) => {
        if (!authHeaders) {
          throw new Error("Your session has expired. Please log in again.");
        }
        return fetch(
          `${API_URL}/my-books?userEmail=${encodeURIComponent(email)}`,
          { cache: "no-store", headers: authHeaders },
        );
      })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch your books (${res.status})`);
        }
        const data = await res.json();
        setBooks(Array.isArray(data) ? data : (data.books ?? []));
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
      });
  }, [email]);

  useEffect(() => {
    if (email) {
      fetchBooks();
    }
  }, [email, fetchBooks]);

  const handleRetry = () => {
    setError(null);
    setBooks(null);
    fetchBooks();
  };

  const handleUpdated = (bookId, updatedBook) => {
    setBooks((prev) =>
      prev.map((book) =>
        book._id === bookId ? { ...book, ...updatedBook } : book,
      ),
    );
  };

  const handleDeleted = (bookId) => {
    setBooks((prev) => prev.filter((book) => book._id !== bookId));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} newestOnTop />

      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
          <CircleUserRound className="size-9" aria-hidden />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Books</h1>
          <p className="text-muted-foreground">
            Manage the books you&apos;ve added
          </p>
        </div>
      </div>

      {error ? (
        <Card className="flex flex-col items-center gap-4 p-12 text-center">
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={handleRetry}>
            <RefreshCw className="size-4" /> Try again
          </Button>
        </Card>
      ) : isSessionPending || (email && books === null) ? (
        <Card className="p-12 text-center text-sm text-muted-foreground">
          Loading your books…
        </Card>
      ) : !email ? (
        <Card className="flex flex-col items-center gap-4 p-12 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <CircleUserRound className="size-7" aria-hidden />
          </div>
          <div>
            <h2 className="text-lg font-semibold">You&apos;re not signed in</h2>
            <p className="text-sm text-muted-foreground">
              Sign in to see the books you&apos;ve added.
            </p>
          </div>
          <Button
            variant="default"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Sign in
          </Button>
        </Card>
      ) : books.length === 0 ? (
        <Card className="flex flex-col items-center gap-4 p-12 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <BookX className="size-7" aria-hidden />
          </div>
          <div>
            <h2 className="text-lg font-semibold">No books yet</h2>
            <p className="text-sm text-muted-foreground">
              You haven&apos;t added any books. Add your first one now!
            </p>
          </div>
          <Button
            nativeButton={false}
            className="bg-indigo-600 hover:bg-indigo-700"
            render={<Link href="/add-books" />}
          >
            <Plus className="size-4" /> Add Book
          </Button>
        </Card>
      ) : (
        <Card className="py-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-24 px-4 pl-6">Image</TableHead>
                <TableHead className="min-w-44">Title</TableHead>
                <TableHead className="min-w-32">Author</TableHead>
                <TableHead className="min-w-28">Category</TableHead>
                <TableHead className="min-w-56">Description</TableHead>
                <TableHead className="min-w-32">Added On</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book._id}>
                  <TableCell className="py-4 pl-6">
                    <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={book.imageUrl || "/assests/book-placeholder.png"}
                        alt={book.title}
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="py-4 font-semibold">
                    {book.title}
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground">
                    {book.author}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant={categoryVariantMap[book.category] ?? "default"}
                      className="font-medium"
                    >
                      {displayCategory(book.category)}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-56 py-4">
                    <p className="line-clamp-2 whitespace-normal text-sm text-muted-foreground">
                      {book.description || "—"}
                    </p>
                  </TableCell>
                  <TableCell className="py-4 text-sm text-muted-foreground">
                    {formatDate(book.createdAt ?? book.addedOn ?? book.addedAt)}
                  </TableCell>
                  <TableCell className="py-4 pr-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => setEditingBook(book)}
                      >
                        <Pencil className="size-3.5" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setDeletingBook(book)}
                      >
                        <Trash2 className="size-3.5" /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      <EditBookDialog
        book={editingBook}
        open={Boolean(editingBook)}
        onOpenChange={(open) => {
          if (!open) setEditingBook(null);
        }}
        onSaved={handleUpdated}
      />
      <DeleteBookDialog
        book={deletingBook}
        open={Boolean(deletingBook)}
        onOpenChange={(open) => {
          if (!open) setDeletingBook(null);
        }}
        onDeleted={handleDeleted}
      />
    </div>
  );
};

export default MyBooksPage;
