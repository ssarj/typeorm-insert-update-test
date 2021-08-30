import { connect } from "net";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";

createConnection()
  .then(async (connection) => {
    await connection.createQueryBuilder().delete().from(User).execute();

    const users = [
      new User({
        id: "f58ab37b-c3dd-4e05-a0a8-2fcd7d323bc1",
        name: "f58ab37b-c3dd-4e05-a0a8-2fcd7d323bc1",
      }),
      new User({
        id: "05e1517c-f571-411c-892a-81f01c39a7f3",
        name: "05e1517c-f571-411c-892a-81f01c39a7f3",
      }),
    ];

    console.log('(Before insert) Users', users)
    users.forEach(user => user.assertConsistency())

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(users)
      .execute();

    console.log('(After insert) Users', users)
    users.forEach(user => user.assertConsistency())
  })
  .catch((error) => console.log(error));
