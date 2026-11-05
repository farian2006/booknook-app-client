"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookX,
  CalendarClock,
  CalendarDays,
  CircleUserRound,
  RefreshCw,
  Undo2,
} from "lucide-react";
import { toast } from "react-toastify";

import HowBorrowingWorks from "../../components/HowBorrowingWorks";
import { authClient } from "../../lib/auth-client";
import { getApiAuthHeaders } from "../../lib/jwt-browser";
import { API_URL } from "../../lib/api";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
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
} from "../../components/ui/alert-dialog";

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const MyBorrowsPage = () => {
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const email = session?.user?.email;

  const [borrows, setBorrows] = useState(null);
  const [error, setError] = useState(null);
  const [returningBorrow, setReturningBorrow] = useState(null);
  const [isReturning, setIsReturning] = useState(false);

  const fetchBorrows = useCallback(() => {
    if (!email) return;

    getApiAuthHeaders()
      .then((authHeaders) => {
        if (!authHeaders) {
          throw new Error("Your session has expired. Please log in again.");
        }
        return fetch(
          `${API_URL}/my-borrows?userEmail=${encodeURIComponent(email)}`,
          { cache: "no-store", headers: authHeaders },
        );
      })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch your borrows (${res.status})`);
        }
        const data = await res.json();
        setBorrows(Array.isArray(data) ? data : (data.borrows ?? []));
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
      });
  }, [email]);

  useEffect(() => {
    if (email) {
      fetchBorrows();
    }
  }, [email, fetchBorrows]);

  const handleRetry = () => {
    setError(null);
    setBorrows(null);
    fetchBorrows();
  };

  const handleReturn = async () => {
    const borrow = returningBorrow;
    if (!borrow) return;

    setIsReturning(true);
    try {
      const authHeaders = await getApiAuthHeaders();
      if (!authHeaders) {
        toast.error("Your session has expired. Please log in again.");
        return;
      }

      const returnedDate = new Date().toISOString();
      const res = await fetch(
        `${API_URL}/my-borrows/${borrow._id}?userEmail=${encodeURIComponent(
          email ?? "",
        )}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders,
          },
          body: JSON.stringify({ returnDate: returnedDate }),
        },
      );

      if (!res.ok) {
        const { message } = await res.json().catch(() => ({}));
        toast.error(message || "Failed to return the book. Please try again.");
        return;
      }

      setBorrows((prev) =>
        prev.map((b) =>
          b._id === borrow._id
            ? { ...b, returnDate: new Date().toISOString() }
            : b,
        ),
      );
      toast.success(`“${borrow.bookTitle}” returned successfully!`);
      setReturningBorrow(null);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsReturning(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <Image
          src="/assests/borrowBooks.png"
          alt="Borrow Books Banner"
          height={100}
          width={900}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-12 pb-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
            <BookX className="size-8" aria-hidden />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Borrows</h1>
            <p className="text-muted-foreground">
              Books you&apos;ve borrowed from the library
            </p>
          </div>
          {borrows && borrows.length > 0 && !error ? (
            <Badge className="ml-auto">{borrows.length} total</Badge>
          ) : null}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        {error ? (
          <Card className="flex flex-col items-center gap-4 p-12 text-center">
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button onClick={handleRetry}>
              <RefreshCw className="size-4" /> Try again
            </Button>
          </Card>
        ) : isSessionPending || (email && borrows === null) ? (
          <Card className="p-12 text-center text-sm text-muted-foreground">
            Loading your borrows…
          </Card>
        ) : !email ? (
          <Card className="flex flex-col items-center gap-4 p-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <CircleUserRound className="size-7" aria-hidden />
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                You&apos;re not signed in
              </h2>
              <p className="text-sm text-muted-foreground">
                Sign in to see the books you&apos;ve borrowed.
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
        ) : borrows.length === 0 ? (
          <Card className="flex flex-col items-center gap-4 p-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <BookX className="size-7" aria-hidden />
            </div>
            <div>
              <h2 className="text-lg font-semibold">No borrows yet</h2>
              <p className="text-sm text-muted-foreground">
                You haven&apos;t borrowed any books. Explore the library and
                borrow your first one!
              </p>
            </div>
            <Button
              nativeButton={false}
              className="bg-indigo-600 hover:bg-indigo-700"
              render={<Link href="/all-books" />}
            >
              Browse Books
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {borrows.map((borrow) => (
              <Card key={borrow._id} className="overflow-hidden py-0">
                <div className="relative h-56 w-full bg-muted">
                  <Image
                    src={borrow.bookImage || "/assests/book-placeholder.png"}
                    alt={borrow.bookTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge
                      className={
                        borrow.returnDate
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : ""
                      }
                    >
                      {borrow.returnDate ? "Returned" : "Borrowed"}
                    </Badge>
                    <BookX
                      className="size-4 text-muted-foreground"
                      aria-hidden
                    />
                  </div>

                  <Link
                    href={`/all-books/${borrow.bookId}`}
                    className="block font-semibold leading-tight text-foreground transition-colors hover:text-primary"
                  >
                    <h3 className="line-clamp-2">{borrow.bookTitle}</h3>
                  </Link>

                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarDays
                        className="size-4 shrink-0 text-indigo-600"
                        aria-hidden
                      />
                      <span>
                        Borrowed on&nbsp;
                        <span className="font-medium text-foreground">
                          {formatDate(borrow.borrowDate) ?? "—"}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarClock
                        className="size-4 shrink-0 text-indigo-600"
                        aria-hidden
                      />
                      <span>
                        Returned on&nbsp;
                        <span
                          className={
                            borrow.returnDate
                              ? "font-medium text-foreground"
                              : "italic"
                          }
                        >
                          {formatDate(borrow.returnDate) ?? "not returned yet"}
                        </span>
                      </span>
                    </div>
                  </div>

                  {!borrow.returnDate ? (
                    <Button
                      size="sm"
                      className="mt-1 w-full bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => setReturningBorrow(borrow)}
                    >
                      <Undo2 className="size-3.5" /> Return Book
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog
        open={Boolean(returningBorrow)}
        onOpenChange={(open) => {
          if (!open) setReturningBorrow(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="rounded-lg bg-emerald-500/10 text-emerald-600">
              <Undo2 />
            </AlertDialogMedia>
            <AlertDialogTitle>Return this book?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to return “{returningBorrow?.bookTitle}”?
              Today&apos;s date will be recorded as the return date.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isReturning}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isReturning}
              onClick={handleReturn}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <Undo2 className="size-4" />
              {isReturning ? "Returning..." : "Confirm Return"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <HowBorrowingWorks />
    </div>
  );
};

export default MyBorrowsPage;
