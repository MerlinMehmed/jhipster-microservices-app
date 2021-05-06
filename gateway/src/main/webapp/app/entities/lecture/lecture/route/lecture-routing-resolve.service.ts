import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILecture, Lecture } from '../lecture.model';
import { LectureService } from '../service/lecture.service';

@Injectable({ providedIn: 'root' })
export class LectureRoutingResolveService implements Resolve<ILecture> {
  constructor(protected service: LectureService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILecture> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((lecture: HttpResponse<Lecture>) => {
          if (lecture.body) {
            return of(lecture.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Lecture());
  }
}
