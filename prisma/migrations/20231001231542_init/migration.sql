-- CreateTable
CREATE TABLE "loja" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,

    CONSTRAINT "loja_pkey" PRIMARY KEY ("id")
);
