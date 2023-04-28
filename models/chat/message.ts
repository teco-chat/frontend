
export class Message {
  id: number;
  content: string;
  role: string;
  createdAt: string;

  constructor(id: number, content: string, role: string, createdAt: string) {
    this.id = id;
    this.content = content;
    this.role = role;
    this.createdAt = createdAt;
  }
}
