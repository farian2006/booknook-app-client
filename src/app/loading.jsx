import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <BookOpen className="absolute w-6 h-6 text-primary" />
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Loading Your Library</h2>
        <p className="text-sm text-muted-foreground">
          Please wait while we prepare your books...
        </p>
      </div>
    </div>
  );
}
