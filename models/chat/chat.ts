export class Chat {
  id: number;
  crewId: number;
  crewName: string;
  course: string;
  title: string;
  createdAt: string;

  constructor(
    id: number,
    crewId: number,
    crewName: string,
    course: string,
    title: string,
    createdAt: string
  ) {
    this.id = id;
    this.crewId = crewId;
    this.crewName = crewName;
    this.course = course;
    this.title = title;
    this.createdAt = createdAt;
  }
}
