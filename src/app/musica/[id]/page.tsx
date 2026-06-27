import { notFound } from "next/navigation";
import { getFolderById } from "@/actions/folders/getFolderById";
import { getSongById } from "@/actions/songs/getSongById";
import { SongDetailContent } from "@/features/SongDetail/container/SongDetailContent";

type MusicPageProps = {
  params: Promise<{ id: string }>;
};

const MusicPage = async ({ params }: MusicPageProps) => {
  const { id } = await params;
  const song = await getSongById(id);

  if (!song) notFound();

  const folder = song.folderId ? await getFolderById(song.folderId) : undefined;

  return <SongDetailContent song={song} folder={folder ?? undefined} />;
};

export default MusicPage;
