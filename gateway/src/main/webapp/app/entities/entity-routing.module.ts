import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'lecture',
        data: { pageTitle: 'gatewayApp.lectureLecture.home.title' },
        loadChildren: () => import('./lecture/lecture/lecture.module').then(m => m.LectureLectureModule),
      },
      {
        path: 'exam',
        data: { pageTitle: 'gatewayApp.examExam.home.title' },
        loadChildren: () => import('./exam/exam/exam.module').then(m => m.ExamExamModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
