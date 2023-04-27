import { Message } from "./message";

export class Chat {
  id: number;
  title: string;
  name: string;
  course: string;
  createdAt: string;
  body: string;
  messages: Message[];

  constructor(
    id: number,
    title: string,
    name: string,
    course: string,
    createdAt: string,
    body: string,
    messages: Message[]
  ) {
    this.id = id;
    this.title = title;
    this.name = name;
    this.course = course;
    this.createdAt = createdAt;
    this.body = body;
    this.messages = messages;
  }
}
