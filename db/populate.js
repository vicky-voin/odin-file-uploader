import { prisma } from "../lib/prisma.js";

async function populateWithTestData() {
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@test.com",
      passwoed: process.env.TEST_PASSWORD,
    },
  });

  console.log("Created user: ", user);

  const allUsers = await prisma.user.findMany();
  console.log("All users: ", JSON.stringify(allUsers, null, 2));
}

populateWithTestData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
