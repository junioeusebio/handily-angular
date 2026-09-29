import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APP_ENVIRONMENT, resolveApiRoot } from '@core';

import type { Course } from './course.model';

/**
 * Reads the BNCC Computação course catalog from the Handily Commerce API.
 * BE owns the list (`GET {apiRoot}/courses`); FE only displays it.
 */
@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENVIRONMENT);

  /** `GET ${resolveApiRoot(env)}/courses` */
  list(): Observable<Course[]> {
    return this.http.get<Course[]>(`${resolveApiRoot(this.env)}/courses`);
  }
}
