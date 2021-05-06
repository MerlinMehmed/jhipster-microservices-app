import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { LectureComponent } from './list/lecture.component';
import { LectureDetailComponent } from './detail/lecture-detail.component';
import { LectureUpdateComponent } from './update/lecture-update.component';
import { LectureDeleteDialogComponent } from './delete/lecture-delete-dialog.component';
import { LectureRoutingModule } from './route/lecture-routing.module';

@NgModule({
  imports: [SharedModule, LectureRoutingModule],
  declarations: [LectureComponent, LectureDetailComponent, LectureUpdateComponent, LectureDeleteDialogComponent],
  entryComponents: [LectureDeleteDialogComponent],
})
export class LectureLectureModule {}
