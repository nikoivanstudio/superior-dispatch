-- CreateTable
CREATE TABLE "drivers" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "phone" VARCHAR(80) NOT NULL,
    "email" VARCHAR(128) NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "truck_capacity" INTEGER NOT NULL,
    "status" VARCHAR(40) NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drivers_email_key" ON "drivers"("email");
