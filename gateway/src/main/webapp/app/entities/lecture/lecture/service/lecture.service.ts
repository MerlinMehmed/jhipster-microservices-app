import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILecture, getLectureIdentifier } from '../lecture.model';

export type EntityResponseType = HttpResponse<ILecture>;
export type EntityArrayResponseType = HttpResponse<ILecture[]>;

@Injectable({ providedIn: 'root' })
export class LectureService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/lectures', 'lecture');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(lecture: ILecture): Observable<EntityResponseType> {
    return this.http.post<ILecture>(this.resourceUrl, lecture, { observe: 'response' });
  }

  update(lecture: ILecture): Observable<EntityResponseType> {
    return this.http.put<ILecture>(`${this.resourceUrl}/${getLectureIdentifier(lecture) as number}`, lecture, { observe: 'response' });
  }

  partialUpdate(lecture: ILecture): Observable<EntityResponseType> {
    return this.http.patch<ILecture>(`${this.resourceUrl}/${getLectureIdentifier(lecture) as number}`, lecture, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILecture>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILecture[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLectureToCollectionIfMissing(lectureCollection: ILecture[], ...lecturesToCheck: (ILecture | null | undefined)[]): ILecture[] {
    const lectures: ILecture[] = lecturesToCheck.filter(isPresent);
    if (lectures.length > 0) {
      const lectureCollectionIdentifiers = lectureCollection.map(lectureItem => getLectureIdentifier(lectureItem)!);
      const lecturesToAdd = lectures.filter(lectureItem => {
        const lectureIdentifier = getLectureIdentifier(lectureItem);
        if (lectureIdentifier == null || lectureCollectionIdentifiers.includes(lectureIdentifier)) {
          return false;
        }
        lectureCollectionIdentifiers.push(lectureIdentifier);
        return true;
      });
      return [...lecturesToAdd, ...lectureCollection];
    }
    return lectureCollection;
  }
}
