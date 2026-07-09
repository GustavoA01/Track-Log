-- CreateTable
CREATE TABLE "SongFolder" (
    "songId" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("songId", "folderId"),
    CONSTRAINT "SongFolder_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SongFolder_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Migrate existing single-folder associations
INSERT INTO "SongFolder" ("songId", "folderId", "createdAt")
SELECT "id", "folderId", CURRENT_TIMESTAMP
FROM "Song"
WHERE "folderId" IS NOT NULL;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Song" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "genre" TEXT NOT NULL DEFAULT '',
    "instrument" TEXT NOT NULL DEFAULT '',
    "difficulty" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'want_to_learn',
    "notes" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "tabUrl" TEXT,
    "accentColor" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Song" ("accentColor", "artist", "createdAt", "difficulty", "genre", "id", "imageUrl", "instrument", "notes", "status", "tabUrl", "title", "updatedAt", "userId", "videoUrl") SELECT "accentColor", "artist", "createdAt", "difficulty", "genre", "id", "imageUrl", "instrument", "notes", "status", "tabUrl", "title", "updatedAt", "userId", "videoUrl" FROM "Song";
DROP TABLE "Song";
ALTER TABLE "new_Song" RENAME TO "Song";
CREATE INDEX "Song_userId_idx" ON "Song"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "SongFolder_songId_idx" ON "SongFolder"("songId");
CREATE INDEX "SongFolder_folderId_idx" ON "SongFolder"("folderId");
