import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { BNCC_AXIS_LABELS, type BnccAxis, type Course } from './course.model';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    service = TestBed.inject(CourseService);
  });

  async function listCourses(): Promise<Course[]> {
    return firstValueFrom(service.list());
  }

  it('deve listar entre 3 e 5 cursos mock com ids únicos', async () => {
    const courses = await listCourses();
    expect(courses.length).toBeGreaterThanOrEqual(3);
    expect(courses.length).toBeLessThanOrEqual(5);
    expect(new Set(courses.map((c) => c.id)).size).toBe(courses.length);
  });

  it('deve preencher campos obrigatórios e usar eixos BNCC válidos', async () => {
    const courses = await listCourses();
    const axes = Object.keys(BNCC_AXIS_LABELS) as BnccAxis[];
    for (const course of courses) {
      expect(course.title.trim()).not.toBe('');
      expect(course.summary.trim()).not.toBe('');
      expect(course.audience.trim()).not.toBe('');
      expect(axes).toContain(course.axis);
      if (course.workloadHours !== undefined) {
        expect(course.workloadHours).toBeGreaterThan(0);
      }
    }
  });

  it('deve cobrir os três eixos da BNCC Computação', async () => {
    const courses = await listCourses();
    expect(new Set(courses.map((c) => c.axis))).toEqual(
      new Set<BnccAxis>(['pensamento-computacional', 'mundo-digital', 'cultura-digital']),
    );
  });

  it('deve retornar uma cópia para evitar mutação do mock', async () => {
    const first = await listCourses();
    first.pop();
    const second = await listCourses();
    expect(second.length).toBe(first.length + 1);
  });
});
