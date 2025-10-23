import { Header } from "@/components/layout/Header";
import { MovieGrid } from "@/components/features/movies/MovieGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <main className="mx-auto max-w-[1080px] px-4 py-10">
        <MovieGrid />
      </main>
    </div>
  );
}
