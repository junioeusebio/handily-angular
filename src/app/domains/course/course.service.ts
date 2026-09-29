import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MOCK_COURSES } from './course.mock';
import type { Course } from './course.model';

/**
 * Fonte dos cursos de formação BNCC.
 * Hoje retorna dados mock; a assinatura `list(): Observable<Course[]>` já espelha
 * uma futura `GET {apiRoot}/courses`, para trocar por HttpClient sem mudar os consumidores.
 */
@Injectable({ providedIn: 'root' })
export class CourseService {
  list(): Observable<Course[]> {
    return of([...MOCK_COURSES]);
  }
}
