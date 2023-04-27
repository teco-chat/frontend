import { Message } from "./message";

export class Chat {
  id: number;
  title: string;
  name: string;
  createdAt: number;
  body: string;
  messages: Message[];

  constructor(
    id: number,
    title: string,
    name: string,
    createdAt: number,
    body: string,
    messages: Message[]
  ) {
    this.id = id;
    this.title = title;
    this.name = name;
    this.createdAt = createdAt;
    this.body = body;
    this.messages = messages;
  }
}
