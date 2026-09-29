import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CourseService, type Course } from '@domains';

import { HomeCourses, type CourseLeadRequest } from './home-courses';

const stubCourses: Course[] = [
  {
    id: 'pc',
    title: 'Curso PC',
    axis: 'pensamento-computacional',
    summary: 'Resumo PC',
    audience: 'Professores A',
    workloadHours: 40,
  },
  {
    id: 'cd',
    title: 'Curso CD',
    axis: 'cultura-digital',
    summary: 'Resumo CD',
    audience: 'Professores B',
  },
];

@Component({
  imports: [HomeCourses],
  template: `<app-home-courses (requestCourseLead)="requests.push($event)" />`,
})
class Host {
  readonly requests: CourseLeadRequest[] = [];
}

describe('HomeCourses', () => {
  function setup(courses: Course[] = stubCourses) {
    TestBed.configureTestingModule({
      providers: [{ provide: CourseService, useValue: { list: () => of(courses) } }],
    });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    return { fixture, root: fixture.nativeElement as HTMLElement };
  }

  it('deve renderizar um card por curso com eixo, resumo e público-alvo', () => {
    const { root } = setup();
    expect(root.querySelector('#cursos')).toBeTruthy();
    const titles = Array.from(root.querySelectorAll('h3')).map((h) => h.textContent?.trim());
    expect(titles).toEqual(['Curso PC', 'Curso CD']);
    expect(root.textContent).toContain('Pensamento Computacional');
    expect(root.textContent).toContain('Cultura Digital');
    expect(root.textContent).toContain('Resumo PC');
    expect(root.textContent).toContain('Professores B');
    expect(root.textContent?.toLowerCase()).not.toContain('store');
  });

  it('deve exibir carga horária apenas quando informada', () => {
    const { root } = setup();
    const cards = root.querySelectorAll('article');
    expect(cards[0].textContent).toContain('Carga horária:');
    expect(cards[0].textContent).toContain('40 h');
    expect(cards[1].textContent).not.toContain('Carga horária');
  });

  it('deve emitir requestCourseLead com o curso ao clicar em Solicitar orçamento', () => {
    const { fixture, root } = setup();
    const buttons = Array.from(root.querySelectorAll('button')).filter((b) =>
      (b.textContent ?? '').includes('Solicitar orçamento'),
    );
    expect(buttons.length).toBe(2);
    expect(buttons[1].textContent).toContain('Curso CD');

    buttons[1].click();

    const [request] = fixture.componentInstance.requests;
    expect(fixture.componentInstance.requests.length).toBe(1);
    expect(request.course.id).toBe('cd');
    expect(request.event).toBeInstanceOf(MouseEvent);
  });

  it('deve renderizar a seção sem cards quando não houver cursos', () => {
    const { root } = setup([]);
    expect(root.querySelector('#cursos')).toBeTruthy();
    expect(root.querySelectorAll('article').length).toBe(0);
  });
});
