import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets
  })
}

seed();