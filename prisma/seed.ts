import db from "../src/services/db";
import bcrypt from "bcrypt";
import { fakerID_ID as faker } from "@faker-js/faker";

const main = async () => {
  for (let i = 0; i < 20; i++) {
    await db.user.create({
      data: {
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
        username: faker.internet.userName(),
        name: faker.person.fullName(),
      },
    });
  }
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
