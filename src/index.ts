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

    console.log('BEFORE')
    users.forEach(user => console.log(`\t${user}`))
/*
BEFORE
        id: f58ab37b-c3dd-4e05-a0a8-2fcd7d323bc1, name: f58ab37b-c3dd-4e05-a0a8-2fcd7d323bc1, (consistent: true)
        id: 05e1517c-f571-411c-892a-81f01c39a7f3, name: 05e1517c-f571-411c-892a-81f01c39a7f3, (consistent: true)
*/
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(users)
      .execute();

    console.log('AFTER')
    users.forEach(user => console.log(`\t${user}`))
/*
AFTER
        id: 05e1517c-f571-411c-892a-81f01c39a7f3, name: f58ab37b-c3dd-4e05-a0a8-2fcd7d323bc1, (consistent: false)
        id: f58ab37b-c3dd-4e05-a0a8-2fcd7d323bc1, name: 05e1517c-f571-411c-892a-81f01c39a7f3, (consistent: false)
*/
    const persistedUsers = await connection.createQueryBuilder().select('user').from(User, 'user').getMany()

    console.log('PERSISTED')
    persistedUsers.forEach(user => console.log(`\t${user}`))
/*
PERSISTED
        id: 05e1517c-f571-411c-892a-81f01c39a7f3, name: 05e1517c-f571-411c-892a-81f01c39a7f3, (consistent: true)
        id: f58ab37b-c3dd-4e05-a0a8-2fcd7d323bc1, name: f58ab37b-c3dd-4e05-a0a8-2fcd7d323bc1, (consistent: true)
*/

  })
  .catch((error) => console.log(error));
