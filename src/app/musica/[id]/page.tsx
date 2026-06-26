import { notFound } from "next/navigation";
import { getFolderById, getSongById } from "@/data/mock-data";
import { SongDetailContent } from "@/features/SongDetail/container/SongDetailContent";

type MusicPageProps = {
  params: Promise<{ id: string }>;
};

const MusicPage = async ({ params }: MusicPageProps) => {
  const { id } = await params;
  const song = getSongById(id);
  const folder = song ? getFolderById(song.folderId) : undefined;

  if (!song) notFound();

  return <SongDetailContent song={song} folder={folder} />;
};

export default MusicPage;
