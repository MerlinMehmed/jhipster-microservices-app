import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { LectureService } from '../service/lecture.service';

import { LectureComponent } from './lecture.component';

describe('Component Tests', () => {
  describe('Lecture Management Component', () => {
    let comp: LectureComponent;
    let fixture: ComponentFixture<LectureComponent>;
    let service: LectureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [LectureComponent],
      })
        .overrideTemplate(LectureComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LectureComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(LectureService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.lectures?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
