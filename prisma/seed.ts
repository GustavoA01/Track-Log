import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEV_USER_ID = "dev-user";

async function main() {
  await prisma.song.deleteMany({ where: { userId: DEV_USER_ID } });
  await prisma.folder.deleteMany({ where: { userId: DEV_USER_ID } });

  const rock = await prisma.folder.create({
    data: {
      userId: DEV_USER_ID,
      name: "Rock",
      color: "#ef4444",
      imageUrl:
        "https://images.unsplash.com/photo-1498038432885-c6f3f1e91201?w=200&h=200&fit=crop",
    },
  });

  const violao = await prisma.folder.create({
    data: {
      userId: DEV_USER_ID,
      name: "Violão",
      color: "#3b82f6",
    },
  });

  const favoritas = await prisma.folder.create({
    data: {
      userId: DEV_USER_ID,
      name: "Favoritas",
      color: "#a855f7",
      imageUrl:
        "https://images.unsplash.com/photo-1511379938545-c1f69419868d?w=200&h=200&fit=crop",
    },
  });

  await prisma.song.createMany({
    data: [
      {
        userId: DEV_USER_ID,
        folderId: rock.id,
        title: "Stairway to Heaven",
        artist: "Led Zeppelin",
        genre: "Rock",
        instrument: "Violão",
        difficulty: 4,
        status: "learning",
        notes: "Focar na parte do solo",
        imageUrl:
          "https://images.unsplash.com/photo-1514320291840-7557229e927c?w=600&h=600&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=QkF3oxziUI4",
        tabUrl:
          "https://www.songsterr.com/a/wsa/led-zeppelin-stairway-to-heaven-tab",
        accentColor: "#6d28d9",
        createdAt: new Date("2026-01-15"),
      },
      {
        userId: DEV_USER_ID,
        folderId: violao.id,
        title: "Blackbird",
        artist: "The Beatles",
        genre: "Rock",
        instrument: "Violão",
        difficulty: 3,
        status: "learning",
        notes: "",
        createdAt: new Date("2026-03-02"),
      },
      {
        userId: DEV_USER_ID,
        folderId: null,
        title: "Neon Genesis",
        artist: "Angra",
        genre: "Power Metal",
        instrument: "Guitarra",
        difficulty: 4,
        status: "want_to_learn",
        notes: "Sem pasta — só na biblioteca geral",
        createdAt: new Date("2026-06-10"),
      },
      {
        userId: DEV_USER_ID,
        folderId: favoritas.id,
        title: "Wonderwall",
        artist: "Oasis",
        genre: "Rock",
        instrument: "Violão",
        difficulty: 2,
        status: "learned",
        notes: "Completa!",
        imageUrl:
          "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop",
        createdAt: new Date("2025-11-20"),
      },
      {
        userId: DEV_USER_ID,
        folderId: rock.id,
        title: "Comfortably Numb",
        artist: "Pink Floyd",
        genre: "Rock",
        instrument: "Guitarra",
        difficulty: 5,
        status: "want_to_learn",
        notes: "Próxima na fila",
        createdAt: new Date("2026-06-01"),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
