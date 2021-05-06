import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LectureComponent } from '../list/lecture.component';
import { LectureDetailComponent } from '../detail/lecture-detail.component';
import { LectureUpdateComponent } from '../update/lecture-update.component';
import { LectureRoutingResolveService } from './lecture-routing-resolve.service';

const lectureRoute: Routes = [
  {
    path: '',
    component: LectureComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LectureDetailComponent,
    resolve: {
      lecture: LectureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LectureUpdateComponent,
    resolve: {
      lecture: LectureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LectureUpdateComponent,
    resolve: {
      lecture: LectureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(lectureRoute)],
  exports: [RouterModule],
})
export class LectureRoutingModule {}
