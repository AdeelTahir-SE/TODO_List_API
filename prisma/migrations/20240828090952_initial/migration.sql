-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NotStarted', 'InProgress', 'Done');

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "descreption" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NotStarted',

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
