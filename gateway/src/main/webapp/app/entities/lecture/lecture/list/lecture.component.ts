import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILecture } from '../lecture.model';
import { LectureService } from '../service/lecture.service';
import { LectureDeleteDialogComponent } from '../delete/lecture-delete-dialog.component';

@Component({
  selector: 'jhi-lecture',
  templateUrl: './lecture.component.html',
})
export class LectureComponent implements OnInit {
  lectures?: ILecture[];
  isLoading = false;

  constructor(protected lectureService: LectureService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.lectureService.query().subscribe(
      (res: HttpResponse<ILecture[]>) => {
        this.isLoading = false;
        this.lectures = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ILecture): number {
    return item.id!;
  }

  delete(lecture: ILecture): void {
    const modalRef = this.modalService.open(LectureDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.lecture = lecture;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
