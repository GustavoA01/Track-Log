import { notFound } from "next/navigation";
import { getFolders } from "@/actions/folders/getFolders";
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
  const [song, sessions, folders] = await Promise.all([
    getSongById(id),
    getSessionsBySongId(id),
    getFolders(),
  ]);

  if (!song) notFound();

  return (
    <SongDetailContent
      song={song}
      sessions={sessions}
      folders={folders}
      backHref={getSongDetailBackHref(from)}
    />
  );
};

export default MusicPage;
