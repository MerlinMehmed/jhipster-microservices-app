import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ILecture, Lecture } from '../lecture.model';
import { LectureService } from '../service/lecture.service';

@Component({
  selector: 'jhi-lecture-update',
  templateUrl: './lecture-update.component.html',
})
export class LectureUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    lecturer: [null, [Validators.required]],
  });

  constructor(protected lectureService: LectureService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lecture }) => {
      this.updateForm(lecture);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const lecture = this.createFromForm();
    if (lecture.id !== undefined) {
      this.subscribeToSaveResponse(this.lectureService.update(lecture));
    } else {
      this.subscribeToSaveResponse(this.lectureService.create(lecture));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILecture>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(lecture: ILecture): void {
    this.editForm.patchValue({
      id: lecture.id,
      name: lecture.name,
      lecturer: lecture.lecturer,
    });
  }

  protected createFromForm(): ILecture {
    return {
      ...new Lecture(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      lecturer: this.editForm.get(['lecturer'])!.value,
    };
  }
}
