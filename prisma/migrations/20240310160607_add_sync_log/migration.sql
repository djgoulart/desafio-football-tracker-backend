-- CreateTable
CREATE TABLE "SyncLog" (
    "id" TEXT NOT NULL,
    "page" INTEGER NOT NULL,
    "rows" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyncLog_pkey" PRIMARY KEY ("id")
);
