/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Transcription" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "transcript" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "words" INTEGER NOT NULL,

    CONSTRAINT "Transcription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- AddForeignKey
ALTER TABLE "Transcription" ADD CONSTRAINT "Transcription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
