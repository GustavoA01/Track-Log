import { notFound } from "next/navigation";
import { getFolderById } from "@/actions/folders/getFolderById";
import { getSessionsBySongId } from "@/actions/sessions/getSessionsBySongId";
import { getSongById } from "@/actions/songs/getSongById";
import { SongDetailContent } from "@/features/SongDetail/container/SongDetailContent";
import { getSongDetailBackHref } from "@/lib/navigation";

type MusicPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
};

const MusicPage = async ({ params, searchParams }: MusicPageProps) => {
  const { id } = await params;
  const { from } = await searchParams;
  const [song, sessions] = await Promise.all([
    getSongById(id),
    getSessionsBySongId(id),
  ]);

  if (!song) notFound();

  const folder = song.folderId ? await getFolderById(song.folderId) : undefined;

  return (
    <SongDetailContent
      song={song}
      sessions={sessions}
      folder={folder ?? undefined}
      backHref={getSongDetailBackHref(from)}
    />
  );
};

export default MusicPage;
