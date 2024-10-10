CREATE TABLE "gas_station" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(100),
  "email" VARCHAR(255) UNIQUE,
  "phone_number" VARCHAR(20),
  "address" VARCHAR(255),
  "created_at" DATETIME,
  "updated_at" DATETIME
);

CREATE TABLE "product" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(255),
  "price" DECIMAL(10,2),
  "created_at" DATETIME,
  "updated_at" DATETIME
);

CREATE TABLE "pumping_station" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(255),
  "gas_station_id" INT,
  "product_id" INT,
  "created_at" DATETIME,
  "updated_at" DATETIME
);

CREATE TABLE "customer" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(255),
  "number_plate" VARCHAR(12),
  "type" VARCHAR(20),
  "created_at" DATETIME,
  "updated_at" DATETIME
);

CREATE TABLE "staff" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(255),
  "dob" datetime,
  "phone_number" Varchar(20),
  "email" varchar(255),
  "address" VARCHAR(255),
  "created_at" DATETIME,
  "updated_at" DATETIME
);

CREATE TABLE "Transaction" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "time" DATETIME NOT NULL,
  "Amount" DECIMAL(10,2) NOT NULL,
  "price" DECIMAL(10,2) NOT NULL,
  "TotalValue" DECIMAL(10,2) NOT NULL,
  "status_payment" VARCHAR(255) NOT NULL,
  "status_transaction" VARCHAR(255) NOT NULL,
  "product_id" INT NOT NULL,
  "pumping_station_id" INT NOT NULL,
  "gas_station_id" INT NOT NULL,
  "customer_id" INT,
  "staff_id" INT,
  "created_at" DATETIME,
  "updated_at" DATETIME
);

ALTER TABLE "pumping_station" ADD FOREIGN KEY ("gas_station_id") REFERENCES "gas_station" ("id");

ALTER TABLE "pumping_station" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "Transaction" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "Transaction" ADD FOREIGN KEY ("pumping_station_id") REFERENCES "pumping_station" ("id");

ALTER TABLE "Transaction" ADD FOREIGN KEY ("gas_station_id") REFERENCES "gas_station" ("id");

ALTER TABLE "Transaction" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("id");

ALTER TABLE "Transaction" ADD FOREIGN KEY ("staff_id") REFERENCES "staff" ("id");
