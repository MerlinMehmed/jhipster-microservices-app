import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILecture } from '../lecture.model';

@Component({
  selector: 'jhi-lecture-detail',
  templateUrl: './lecture-detail.component.html',
})
export class LectureDetailComponent implements OnInit {
  lecture: ILecture | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lecture }) => {
      this.lecture = lecture;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
