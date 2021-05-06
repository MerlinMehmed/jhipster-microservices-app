jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { LectureService } from '../service/lecture.service';
import { ILecture, Lecture } from '../lecture.model';

import { LectureUpdateComponent } from './lecture-update.component';

describe('Component Tests', () => {
  describe('Lecture Management Update Component', () => {
    let comp: LectureUpdateComponent;
    let fixture: ComponentFixture<LectureUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let lectureService: LectureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [LectureUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(LectureUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LectureUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      lectureService = TestBed.inject(LectureService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const lecture: ILecture = { id: 456 };

        activatedRoute.data = of({ lecture });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(lecture));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const lecture = { id: 123 };
        spyOn(lectureService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ lecture });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: lecture }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(lectureService.update).toHaveBeenCalledWith(lecture);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const lecture = new Lecture();
        spyOn(lectureService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ lecture });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: lecture }));
        saveSubject.complete();

        // THEN
        expect(lectureService.create).toHaveBeenCalledWith(lecture);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const lecture = { id: 123 };
        spyOn(lectureService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ lecture });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(lectureService.update).toHaveBeenCalledWith(lecture);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
