export interface ILecture {
  id?: number;
  name?: string;
  lecturer?: string;
}

export class Lecture implements ILecture {
  constructor(public id?: number, public name?: string, public lecturer?: string) {}
}

export function getLectureIdentifier(lecture: ILecture): number | undefined {
  return lecture.id;
}
