import prisma from "config/database";

async function main(){
  const category = await prisma.categories.findFirst();
}