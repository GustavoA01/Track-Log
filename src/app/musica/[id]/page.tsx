import { notFound } from "next/navigation";
import { getSongById } from "@/data/mock-data";
import { SongDetail } from "@/features/SongDetail/container/SongDetail";

type MusicPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MusicPage({ params }: MusicPageProps) {
  const { id } = await params;
  const song = getSongById(id);

  if (!song) notFound();

  return <SongDetail song={song} />;
}
