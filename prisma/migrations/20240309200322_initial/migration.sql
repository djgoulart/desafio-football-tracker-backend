-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL,
    "api_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "birth_place" TEXT NOT NULL,
    "birth_country" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "injuried" BOOLEAN NOT NULL,
    "photo" TEXT NOT NULL,
    "statistics_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_statistics" (
    "id" TEXT NOT NULL,
    "team_id" INTEGER NOT NULL,
    "team_name" TEXT NOT NULL,
    "team_logo" TEXT NOT NULL,
    "league_id" INTEGER NOT NULL,
    "league_name" TEXT NOT NULL,
    "league_country" TEXT NOT NULL,
    "league_logo" TEXT NOT NULL,
    "league_flag" TEXT NOT NULL,
    "league_season" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "player_statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "player_id" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_api_id_key" ON "players"("api_id");

-- CreateIndex
CREATE UNIQUE INDEX "players_statistics_id_key" ON "players"("statistics_id");

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_statistics_id_fkey" FOREIGN KEY ("statistics_id") REFERENCES "player_statistics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
