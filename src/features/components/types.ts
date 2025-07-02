export type Ticket = {
  id: string;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "DONE";
  content: string;
};