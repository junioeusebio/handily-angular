import type { Course } from './course.model';

/**
 * MOCK — cursos de exemplo até a publicação da lista oficial.
 * Substituir pela Course API (BE) quando o catálogo real estiver disponível.
 */
export const MOCK_COURSES: readonly Course[] = [
  {
    id: 'pensamento-computacional-na-pratica',
    title: 'Pensamento Computacional na prática',
    axis: 'pensamento-computacional',
    summary:
      'Decomposição, padrões, abstração e algoritmos com atividades plugadas e desplugadas para a sala de aula.',
    audience: 'Professores dos anos iniciais do Ensino Fundamental',
    workloadHours: 40,
  },
  {
    id: 'programacao-criativa-com-blocos',
    title: 'Programação criativa com blocos',
    axis: 'pensamento-computacional',
    summary:
      'Introdução à programação visual para criar jogos, animações e histórias interativas com os estudantes.',
    audience: 'Professores do Ensino Fundamental',
  },
  {
    id: 'mundo-digital-dados-e-redes',
    title: 'Mundo Digital: dados, redes e internet',
    axis: 'mundo-digital',
    summary:
      'Como a informação é representada, armazenada e transmitida, com exemplos do cotidiano escolar.',
    audience: 'Professores dos anos finais do Ensino Fundamental',
    workloadHours: 32,
  },
  {
    id: 'cultura-digital-e-cidadania',
    title: 'Cultura Digital e cidadania',
    axis: 'cultura-digital',
    summary: 'Ética, segurança, privacidade e uso crítico das tecnologias na comunidade escolar.',
    audience: 'Professores e coordenação pedagógica',
    workloadHours: 24,
  },
];
