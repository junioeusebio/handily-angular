import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideAppEnvironment, resolveApiRoot, type AppEnvironment } from '@core';

import type { Course } from './course.model';
import { CourseService } from './course.service';

const testEnv: AppEnvironment = {
  production: false,
  apiBaseUrl: 'http://localhost:5228/api',
  apiVersion: 'v1',
};

const courses: Course[] = [
  {
    id: 'pensamento-computacional-na-pratica',
    title: 'Pensamento Computacional na prática',
    axis: 'pensamento-computacional',
    summary: 'Resumo',
    audience: 'Professores',
    workloadHours: 40,
  },
  {
    id: 'cultura-digital-e-cidadania',
    title: 'Cultura Digital e cidadania',
    axis: 'cultura-digital',
    summary: 'Resumo',
    audience: 'Coordenação',
  },
];

describe('CourseService', () => {
  let service: CourseService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideAppEnvironment(testEnv)],
    });
    service = TestBed.inject(CourseService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('deve fazer GET de courses na raiz versionada da API', () => {
    let body: Course[] | undefined;
    service.list().subscribe((items) => (body = items));

    const req = http.expectOne(`${resolveApiRoot(testEnv)}/courses`);
    expect(req.request.method).toBe('GET');
    req.flush(courses);

    expect(body).toEqual(courses);
  });

  it('deve propagar erro HTTP para o consumidor', () => {
    let status: number | undefined;
    service.list().subscribe({ error: (err: { status: number }) => (status = err.status) });

    http
      .expectOne(`${resolveApiRoot(testEnv)}/courses`)
      .flush('fail', { status: 503, statusText: 'Service Unavailable' });

    expect(status).toBe(503);
  });
});
