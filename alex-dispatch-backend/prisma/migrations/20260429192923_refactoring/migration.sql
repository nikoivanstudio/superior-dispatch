/*
  Warnings:

  - You are about to drop the `billing_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carrier_information` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `driver_app_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `p_mode_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `super_dispatch_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "billing_settings" DROP CONSTRAINT "billing_settings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "carrier_information" DROP CONSTRAINT "carrier_information_userId_fkey";

-- DropForeignKey
ALTER TABLE "driver_app_settings" DROP CONSTRAINT "driver_app_settings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "p_mode_info" DROP CONSTRAINT "p_mode_info_userId_fkey";

-- DropForeignKey
ALTER TABLE "super_dispatch_info" DROP CONSTRAINT "super_dispatch_info_userId_fkey";

-- DropTable
DROP TABLE "billing_settings";

-- DropTable
DROP TABLE "carrier_information";

-- DropTable
DROP TABLE "driver_app_settings";

-- DropTable
DROP TABLE "p_mode_info";

-- DropTable
DROP TABLE "super_dispatch_info";

-- CreateTable
CREATE TABLE "billingSettings" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "attach_invoices" BOOLEAN,
    "delivery_dates" BOOLEAN,
    "invoice_email" TEXT,
    "company_name" TEXT,

    CONSTRAINT "billingSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carrierInformation" (
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

    CONSTRAINT "carrierInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driverAppSettings" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "hide_payment" BOOLEAN,
    "disable_customer" BOOLEAN,
    "driver_pay" BOOLEAN,

    CONSTRAINT "driverAppSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pModeInfo" (
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

    CONSTRAINT "pModeInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "superDispatchInfo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "client_id" TEXT,
    "client_secret" TEXT,
    "carrier_id" INTEGER,
    "default_driver_password" TEXT,
    "enable_super_dispatch" BOOLEAN,

    CONSTRAINT "superDispatchInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "billingSettings_user_id_key" ON "billingSettings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "carrierInformation_userId_key" ON "carrierInformation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "driverAppSettings_user_id_key" ON "driverAppSettings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "pModeInfo_userId_key" ON "pModeInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "superDispatchInfo_userId_key" ON "superDispatchInfo"("userId");

-- AddForeignKey
ALTER TABLE "billingSettings" ADD CONSTRAINT "billingSettings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrierInformation" ADD CONSTRAINT "carrierInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driverAppSettings" ADD CONSTRAINT "driverAppSettings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pModeInfo" ADD CONSTRAINT "pModeInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "superDispatchInfo" ADD CONSTRAINT "superDispatchInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
