import { prisma } from "../lib/prisma.js";
import dotenv from "dotenv";
import * as bcrypt from "bcryptjs";

dotenv.config();

async function updateTestData() {
  const users = await prisma.user.findMany({
    where: {
      password: null,
    },
  });

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(process.env.TEST_PASSWORD, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    console.log("Updated password for user " + user.name);
  }
}

updateTestData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
