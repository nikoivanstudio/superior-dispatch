-- AlterTable
ALTER TABLE "billing_settings" ADD CONSTRAINT "billing_settings_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "driver_app_settings" ADD CONSTRAINT "driver_app_settings_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "terminal" ADD CONSTRAINT "terminal_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "carrier_information" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "state" TEXT,
    "city" TEXT,
    "zip" TEXT,
    "country" TEXT,
    "mc_number" TEXT,
    "phone" TEXT,
    "fax" TEXT,
    "email" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "contact_name" TEXT,
    "contact_phone" TEXT,
    "contact_email" TEXT,
    "terms" TEXT,

    CONSTRAINT "carrier_information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "p_mode_info" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "state" TEXT,
    "city" TEXT,
    "zip" TEXT,
    "country" TEXT,
    "mc_number" TEXT,
    "phone" TEXT,
    "fax" TEXT,
    "email" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "contact_name" TEXT,
    "contact_phone" TEXT,
    "contact_email" TEXT,
    "terms" TEXT,

    CONSTRAINT "p_mode_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "super_dispatch_info" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "client_id" TEXT,
    "client_secret" TEXT,
    "carrier_id" INTEGER,
    "default_driver_password" TEXT,
    "enable_super_dispatch" BOOLEAN,

    CONSTRAINT "super_dispatch_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "carrier_information_userId_key" ON "carrier_information"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "p_mode_info_userId_key" ON "p_mode_info"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "super_dispatch_info_userId_key" ON "super_dispatch_info"("userId");

-- AddForeignKey
ALTER TABLE "carrier_information" ADD CONSTRAINT "carrier_information_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p_mode_info" ADD CONSTRAINT "p_mode_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "super_dispatch_info" ADD CONSTRAINT "super_dispatch_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
