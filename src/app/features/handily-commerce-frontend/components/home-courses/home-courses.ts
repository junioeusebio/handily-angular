import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { BNCC_AXIS_LABELS, CourseService, type Course } from '@domains';
import { Button, Card } from '@shared';

/** Pedido de orçamento disparado a partir de um curso específico. */
export interface CourseLeadRequest {
  event: MouseEvent;
  course: Course;
}

@Component({
  selector: 'app-home-courses',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Card],
  templateUrl: './home-courses.html',
})
export class HomeCourses {
  private readonly courseService = inject(CourseService);

  protected readonly courses = toSignal(this.courseService.list(), { initialValue: [] });
  protected readonly axisLabels = BNCC_AXIS_LABELS;

  readonly requestCourseLead = output<CourseLeadRequest>();
}
