-- CreateTable
CREATE TABLE "billing_settings" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "attach_invoices" BOOLEAN,
    "delivery_dates" BOOLEAN,
    "invoice_email" TEXT,
    "company_name" TEXT
);

-- CreateTable
CREATE TABLE "driver_app_settings" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "hide_payment" BOOLEAN,
    "disable_customer" BOOLEAN,
    "driver_pay" BOOLEAN
);

-- CreateTable
CREATE TABLE "factoring" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "attach_invoices" BOOLEAN,
    "delivery_dates" BOOLEAN,
    "invoice_email" TEXT,
    "company_name" TEXT
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "notifications_email" TEXT,
    "delivery_confirmations_email" TEXT
);

-- CreateTable
CREATE TABLE "terminal" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "billing_settings_user_id_key" ON "billing_settings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "driver_app_settings_user_id_key" ON "driver_app_settings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "factoring_user_id_key" ON "factoring"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "notifications_user_id_key" ON "notifications"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "terminal_user_id_key" ON "terminal"("user_id");

-- AddForeignKey
ALTER TABLE "billing_settings" ADD CONSTRAINT "billing_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_app_settings" ADD CONSTRAINT "driver_app_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "factoring" ADD CONSTRAINT "factoring_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "terminal" ADD CONSTRAINT "terminal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
