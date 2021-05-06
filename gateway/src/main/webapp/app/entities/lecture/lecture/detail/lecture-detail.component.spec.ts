import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LectureDetailComponent } from './lecture-detail.component';

describe('Component Tests', () => {
  describe('Lecture Management Detail Component', () => {
    let comp: LectureDetailComponent;
    let fixture: ComponentFixture<LectureDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [LectureDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ lecture: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(LectureDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LectureDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load lecture on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.lecture).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
