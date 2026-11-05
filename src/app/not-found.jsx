import Link from "next/link";
import { BookOpen, Home } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-6 rounded-full">
            <BookOpen className="w-16 h-16 text-primary" />
          </div>
        </div>

        <h1 className="text-8xl font-extrabold text-primary">404</h1>

        <h2 className="text-2xl font-bold mt-4">Page Not Found</h2>

        <p className="text-muted-foreground mt-4">
          Sorry! We couldn&apos;t find the page you&apos;re looking for. It may have been
          moved or doesn&apos;t exist.
        </p>

        <div className="mt-8">
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
