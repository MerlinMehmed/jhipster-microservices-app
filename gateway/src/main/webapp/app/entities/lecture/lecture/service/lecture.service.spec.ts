import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILecture, Lecture } from '../lecture.model';

import { LectureService } from './lecture.service';

describe('Service Tests', () => {
  describe('Lecture Service', () => {
    let service: LectureService;
    let httpMock: HttpTestingController;
    let elemDefault: ILecture;
    let expectedResult: ILecture | ILecture[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(LectureService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        name: 'AAAAAAA',
        lecturer: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Lecture', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Lecture()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Lecture', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            lecturer: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Lecture', () => {
        const patchObject = Object.assign(
          {
            name: 'BBBBBB',
            lecturer: 'BBBBBB',
          },
          new Lecture()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Lecture', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            lecturer: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Lecture', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addLectureToCollectionIfMissing', () => {
        it('should add a Lecture to an empty array', () => {
          const lecture: ILecture = { id: 123 };
          expectedResult = service.addLectureToCollectionIfMissing([], lecture);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(lecture);
        });

        it('should not add a Lecture to an array that contains it', () => {
          const lecture: ILecture = { id: 123 };
          const lectureCollection: ILecture[] = [
            {
              ...lecture,
            },
            { id: 456 },
          ];
          expectedResult = service.addLectureToCollectionIfMissing(lectureCollection, lecture);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Lecture to an array that doesn't contain it", () => {
          const lecture: ILecture = { id: 123 };
          const lectureCollection: ILecture[] = [{ id: 456 }];
          expectedResult = service.addLectureToCollectionIfMissing(lectureCollection, lecture);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(lecture);
        });

        it('should add only unique Lecture to an array', () => {
          const lectureArray: ILecture[] = [{ id: 123 }, { id: 456 }, { id: 78452 }];
          const lectureCollection: ILecture[] = [{ id: 123 }];
          expectedResult = service.addLectureToCollectionIfMissing(lectureCollection, ...lectureArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const lecture: ILecture = { id: 123 };
          const lecture2: ILecture = { id: 456 };
          expectedResult = service.addLectureToCollectionIfMissing([], lecture, lecture2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(lecture);
          expect(expectedResult).toContain(lecture2);
        });

        it('should accept null and undefined values', () => {
          const lecture: ILecture = { id: 123 };
          expectedResult = service.addLectureToCollectionIfMissing([], null, lecture, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(lecture);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
