import prisma from "@/config/database";

export async function cleanDb(){
  await prisma.$executeRaw`TRUNCATE TABLE "categories" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "customers" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "games" RESTART IDENTITY CASCADE;`
  await prisma.$executeRaw`TRUNCATE TABLE "rentals" RESTART IDENTITY CASCADE;`
}