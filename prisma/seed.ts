import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    username: "admin",
    email: "admin@admin.com"
  },
  {
    username: "user",
    email: "taulantbeqiraj94@gmail.com"
  },
];

const tickets = [
  {
    title: "Ticket 1",
    content: "This is a ticket from database",
    status: "DONE" as const,
    bounty: 499, //$4.99,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "Ticket 2",
    content: "This is a ticket from database",
    status: "OPEN" as const,
    bounty: 399, //$3.99,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "Ticket 3",
    content: "This is a ticket from database",
    status: "IN_PROGRESS" as const,
    bounty: 599, //$5.99,
    deadline: new Date().toISOString().split("T")[0],
  },
]

const seed = async () => {
  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();

  const passwordHash = await hash('gehimnis');

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    }))
  })

  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id
    }))
  })
}

const t1 = performance.now();
// console.log(`DB Seed: Finished (${t1 - t0}ms)`);

seed();