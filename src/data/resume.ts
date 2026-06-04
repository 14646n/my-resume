// src/data/resume.ts

// --- TYPES ---
export interface ProjectModule {
  name: string;
  description: string;
  features?: string[];
  stack: string[];
}

export interface Project {
  title: string;
  description: string;
  type: "fullstack" | "frontend" | "backend" | "commercial" | "research";
  features: string[];
  modules?: ProjectModule[];
  link?: string;
  repo?: string;
  stack: string[];
  demo?: boolean;
}

// --- PERSONAL INFO ---
export const personalInfo = {
  name: "Макеев Никита Павлович",
  role: "Fullstack Developer (Vue 3 / Firebase)",
  location: "Екатеринбург, РФ",
  email: "nikota555mak@gmail.com",
  telegram: "https://t.me/a14646",
  github: "https://github.com/14646n",
  about:
    "Fullstack-разработчик с 1 годом коммерческого опыта. Специализируюсь на создании сложных SPA на Vue 3 и интеграции с облачными сервисами. Разрабатываю enterprise-решения для автоматизации бизнес-процессов и научное ПО.",
};

// --- SKILLS ---
export const skills = {
  frontend: [
    "Vue 3",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "TailwindCSS",
    "Pinia",
    "Vite",
    "Vue Router",
  ],
  backend: [
    "Python", // 👈 Добавьте
    "Django 5", // 👈 Добавьте
    "Django REST Framework", // 👈 Добавьте
    "Node.js",
    "REST API",
    "OpenAPI 3.0",
  ],
  database: [
    "PostgreSQL",
    "Firebase Firestore",
    "Redis", // 👈 Добавьте (если использовали)
  ],
  devops: [
    "Git",
    "GitHub",
    "GitLab",
    "CI/CD",
    "Firebase Hosting",
    "Cloudflare Workers",
    "GitHub Actions",
  ],
  tools: [
    "Celery",
    "Sentry",
    "Prometheus",
    "Loki",
    "Vitest",
    "Pytest",
    "Playwright",
  ],
};

// --- EXPERIENCE ---
export const experience = [
  {
    company: 'АО «Группа "СВЭЛ»',
    role: "Fullstack Developer",
    period: "Июль 2025 — Наст. время",
    description:
      "Разработка внутренней ERP-системы для отдела продаж и технического сопровождения.",
    achievements: [
      "Разработал модуль расчета стоимости КРУ с динамической логикой и системой пресетов.",
      "Реализовал фильтрацию справочников оборудования на основе параметров опросного листа.",
      "Спроектировал архитектуру для работы со вложенными структурами данных (до 4-го уровня).",
      "Внедрил типизацию TypeScript для снижения ошибок при работе с JSON-структурами.",
    ],
    stack: [
      "Vue 3",
      "TypeScript",
      "Internal API",
      "Python",
      "Django 5",
      "DRF",
      "PostgreSQL",
      "Redis",
      "Celery",
    ],
  },
];

// --- PROJECTS ---
export const projects: Project[] = [
  {
    title: "Quiz Platform + PCR Editor",
    description:
      "Модульная образовательная платформа с интеграцией научного инструмента для Ритвельд-уточнения.",
    type: "fullstack",

    features: [
      "Модульная архитектура: ядро платформы + подключаемые инструменты (PCR Editor)",
      "Система создания и прохождения тестов с сохранением результатов в Firestore",
      "Ролевая модель доступа и история прохождений с детальной аналитикой",
      "CI/CD пайплайн через GitHub Actions для автоматического деплоя на Firebase",
      "Адаптивный интерфейс с поддержкой тёмной темы и офлайн-режима",
    ],

    modules: [
      {
        name: "Quiz Core",
        description: "Ядро платформы: создание тестов, прохождение, аналитика",
        stack: ["Vue 3", "Firebase Auth", "Firestore", "Firebase Hosting"],
      },
      {
        name: "PCR Editor (FullProf Integration)",
        description:
          "Веб-интерфейс для парсинга, валидации и редактирования PCR файлов рентгеноструктурного анализа",
        features: [
          "Парсинг/генерация специфичного текстового формата PCR (FullProf Suite)",
          "Интерактивный редактор фаз, атомных позиций и параметров профиля с валидацией",
          "Работа с файлами через File API / Blob API без отправки на сервер",
          "Шифрование чувствительных данных через Web Crypto API",
          "Сохранение проектов в Firebase Storage с метаданными в Firestore",
        ],
        stack: [
          "Vue 3",
          "TypeScript",
          "Pinia",
          "PrimeVue",
          "Firebase Functions",
          "Firebase Storage",
          "FullProf Suite (PCR format)",
          "Web Crypto API",
          "File API",
          "Blob API",
        ],
      },
    ],

    link: "https://education-service-f2f0e.web.app",
    repo: "https://github.com/14646n/quiz",
    stack: [
      "Vue 3",
      "TypeScript",
      "Vite",
      "Pinia",
      "Vue Router",
      "Firebase Auth",
      "Firestore",
      "Firebase Storage",
      "Firebase Functions",
      "Firebase Hosting",
      "Firebase CLI",
      "GitHub Actions",
      "PrimeVue",
      "ESLint",
      "Prettier",
      "Vitest",
      "FullProf Suite (PCR format)",
      "Web Crypto API",
      "File API",
      "Blob API",
    ],
    demo: true,
  },

  {
    title: "Калькулятор КРУ (Enterprise)",
    description:
      "Модуль для точного расчета стоимости подстанций с учетом технических ограничений.",
    type: "commercial",

    features: [
      "Динамическая форма с зависимыми полями и валидацией на основе опросного листа",
      "Рекурсивные компоненты для отображения иерархии оборудования (до 4 уровней вложенности)",
      "Система пресетов для автоматизации заполнения типовых конфигураций",
      "Интеграция с внутренними справочниками компании и бэкендом",
      "Автоматический расчет стоимости на основе актуальных прайс-листов",
      "Экспорт результатов в PDF и Excel форматы",
      "История расчетов с возможностью сравнения версий",
    ],

    stack: [
      "Vue 3",
      "TypeScript",
      "Pinia",
      "Vue Router",
      "Vite",
      "TailwindCSS",
      "Zod",
      "Vitest",
      "Playwright",
      "Django 5",
      "Django REST Framework",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Gunicorn",
      "drf-spectacular",
      "SimpleJWT",
      "Docker",
      "Nginx",
      "GitHub Actions",
      "Sentry",
      "Prometheus",
    ],
  },
];
