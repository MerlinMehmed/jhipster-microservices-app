export interface IExam {
  id?: number;
  name?: string | null;
}

export class Exam implements IExam {
  constructor(public id?: number, public name?: string | null) {}
}

export function getExamIdentifier(exam: IExam): number | undefined {
  return exam.id;
}
