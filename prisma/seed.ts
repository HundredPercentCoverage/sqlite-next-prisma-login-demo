import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function seed() {
  try {
    await db.user.create({
      data: {
        username: 'testadmin',
        admin: true,
        passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u"
      }
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    db.$disconnect();
  }
}

seed();