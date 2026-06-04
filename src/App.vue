<script setup lang="ts">
import { ref, onMounted } from "vue";
import ThemeToggle from "./composables/ThemeToggle.vue";
import ContactForm from "./components/ContactForm.vue";
import PCRDemoModal from "./components/PCRDemoModal.vue";
import { personalInfo, skills, experience, projects } from "./data/resume";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const showPCRDemo = ref(false);
const showGrid = ref(false); // 👈 Переключатель сетки

// 🎯 Текст для печатной машинки
const roles = [
  "Fullstack Developer",
  "Vue 3",
  "Django REST",
  "Enterprise Solutions",
];
const typewriterText = ref("");
const roleIndex = ref(0);
const charIndex = ref(0);
const isDeleting = ref(false);

const typeEffect = () => {
  const currentRole = roles[roleIndex.value];
  if (isDeleting.value) {
    typewriterText.value = currentRole.substring(0, charIndex.value - 1);
    charIndex.value--;
  } else {
    typewriterText.value = currentRole.substring(0, charIndex.value + 1);
    charIndex.value++;
  }

  let typeSpeed = isDeleting.value ? 40 : 80;

  if (!isDeleting.value && charIndex.value === currentRole.length) {
    typeSpeed = 1500;
    isDeleting.value = true;
  } else if (isDeleting.value && charIndex.value === 0) {
    isDeleting.value = false;
    roleIndex.value = (roleIndex.value + 1) % roles.length;
    typeSpeed = 400;
  }
  setTimeout(typeEffect, typeSpeed);
};

onMounted(() => {
  typeEffect();
  setTimeout(() => {
    document.getElementById("hero-description")?.classList.add("opacity-100");
    document.getElementById("hero-actions")?.classList.add("opacity-100");
  }, 1500);
});
</script>

<template>
  <div class="min-h-screen transition-colors duration-300 relative">
    <!--  Сетка для отладки (если включена) -->
    <div
      v-if="showGrid"
      class="fixed inset-0 pointer-events-none z-[100] mix-blend-difference opacity-30"
      style="
        background-image:
          linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px);
        background-size: 50px 50px;
      "
    ></div>

    <!-- Header -->
    <header
      class="fixed w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm z-50 transition-colors"
    >
      <div class="container mx-auto px-6 py-4 relative">
        <!-- Центрированная навигация -->
        <nav class="hidden md:flex justify-center space-x-6">
          <button
            v-for="item in [
              { id: 'about', label: 'Обо мне' },
              { id: 'skills', label: 'Навыки' },
              { id: 'experience', label: 'Опыт' },
              { id: 'projects', label: 'Проекты' },
              { id: 'contact', label: 'Контакты' },
            ]"
            :key="item.id"
            @click="scrollTo(item.id)"
            class="hover:text-blue-600 dark:hover:text-blue-400 transition-transform hover:scale-110 duration-200"
          >
            {{ item.label }}
          </button>
        </nav>

        <!-- Логотип (слева) -->
        <div
          class="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          {{ personalInfo.name }}
        </div>

        <!-- Кнопки справа -->
        <div
          class="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3"
        >
          <button
            @click="showGrid = !showGrid"
            class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-500"
            title="Вкл/Выкл сетку"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              :class="{ 'text-blue-500': showGrid }"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section
      id="home"
      class="pt-32 pb-20 px-6 relative overflow-hidden min-h-[80vh] flex flex-col justify-center"
    >
      <!-- Фоновые пятна -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent dark:from-blue-900/20 dark:via-purple-900/10 pointer-events-none"
      ></div>
      <div
        class="absolute top-20 right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none"
      ></div>
      <div
        class="absolute bottom-20 left-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow delay-1000 pointer-events-none"
      ></div>

      <div class="container mx-auto text-center relative z-10">
        <!-- Бейдж -->
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/40 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 animate-fade-in-down"
        >
          <span class="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          Открыт к предложениям
        </div>

        <!-- Имя -->
        <h1
          class="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up"
        >
          <span
            class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x"
          >
            {{ personalInfo.name }}
          </span>
        </h1>

        <!-- Печатная машинка -->
        <div
          class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 min-h-[2.5rem] flex justify-center"
        >
          <span class="typewriter-text">{{ typewriterText }}</span>
        </div>

        <!-- Описание -->
        <p
          id="hero-description"
          class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 opacity-0 transition-opacity duration-700"
        >
          Разрабатываю сложные SPA на Vue 3, интегрирую облачные сервисы и
          создаю инструменты для бизнеса и науки.
        </p>

        <!-- 🎯 КНОПКИ И ТОЧКИ (ИСПРАВЛЕННАЯ СТРУКТУРА) -->
        <div
          id="hero-actions"
          class="flex flex-col items-center gap-5 mt-8 opacity-0 transition-opacity duration-700"
        >
          <!-- Кнопки по центру -->
          <div class="flex flex-row gap-4">
            <button
              @click="scrollTo('projects')"
              class="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
            >
              <span class="flex items-center gap-2"
                >Смотреть проекты
                <svg
                  class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>
            <a
              href="#contact"
              @click.prevent="scrollTo('contact')"
              class="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105"
            >
              Связаться со мной
            </a>
          </div>

          <!-- Точки: Больше, ниже, прижаты к правому краю блока кнопок -->
          <div class="flex justify-end w-full max-w-[79px] gap-3 mt-1">
            <div
              class="w-3 h-3 bg-blue-500 rounded-full animate-bounce-dot"
              style="animation-delay: 0s"
            ></div>
            <div
              class="w-3 h-3 bg-purple-500 rounded-full animate-bounce-dot"
              style="animation-delay: 0.15s"
            ></div>
            <div
              class="w-3 h-3 bg-pink-500 rounded-full animate-bounce-dot"
              style="animation-delay: 0.3s"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ... остальные секции (About, Skills и т.д.) без изменений ... -->
    <!-- Я пропустил их для краткости, оставь их как они у тебя есть -->

    <section
      id="about"
      class="py-20 bg-white dark:bg-gray-800 transition-colors"
    >
      <div class="container mx-auto px-6 max-w-3xl animate-fade-in-up">
        <h2
          class="text-3xl font-bold mb-6 border-l-4 border-blue-600 dark:border-blue-400 pl-4"
        >
          Обо мне
        </h2>
        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {{ personalInfo.about }}
        </p>
      </div>
    </section>

    <!-- Skills -->
    <section id="skills" class="py-20 px-6">
      <div class="container mx-auto max-w-4xl">
        <h2
          class="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white animate-fade-in-up"
        >
          Технический стек
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(items, category, idx) in skills"
            :key="category"
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors hover-lift animate-fade-in-up"
            :style="{ animationDelay: `${idx * 0.1}s` }"
          >
            <h3
              class="text-xl font-semibold mb-4 capitalize text-blue-600 dark:text-blue-400"
            >
              {{ category }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in items"
                :key="skill"
                class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm font-medium transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/40 cursor-default"
                >{{ skill }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience -->
    <section
      id="experience"
      class="py-20 bg-white dark:bg-gray-800 transition-colors"
    >
      <div class="container mx-auto px-6 max-w-4xl">
        <h2
          class="text-3xl font-bold mb-10 border-l-4 border-blue-600 dark:border-blue-400 pl-4 text-gray-900 dark:text-white animate-fade-in-up"
        >
          Опыт работы
        </h2>
        <div
          v-for="(job, i) in experience"
          :key="i"
          class="mb-10 last:mb-0 animate-fade-in-up"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <div
            class="flex flex-col md:flex-row md:items-center justify-between mb-2"
          >
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ job.company }}
            </h3>
            <span class="text-blue-600 dark:text-blue-400 font-medium">{{
              job.period
            }}</span>
          </div>
          <div
            class="text-lg text-gray-700 dark:text-gray-300 font-medium mb-4"
          >
            {{ job.role }}
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            {{ job.description }}
          </p>
          <ul
            class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4"
          >
            <li
              v-for="(a, idx) in job.achievements"
              :key="idx"
              class="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-default"
            >
              {{ a }}
            </li>
          </ul>
          <div class="flex flex-wrap gap-2 mt-4">
            <span
              v-for="tech in job.stack"
              :key="tech"
              class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide hover:text-blue-600 dark:hover:text-blue-400 transition cursor-default"
              >{{ tech }}</span
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="py-20 px-6">
      <div class="container mx-auto max-w-5xl">
        <h2
          class="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white animate-fade-in-up"
        >
          Проекты
        </h2>

        <div class="grid md:grid-cols-2 gap-8 items-stretch">
          <div
            v-for="(p, i) in projects"
            :key="i"
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full hover-lift group animate-fade-in-up"
            :style="{ animationDelay: `${i * 0.15}s` }"
          >
            <!-- 👇 Обёртка для всего переменного контента -->
            <div class="flex-grow space-y-4">
              <!-- Заголовок -->
              <div class="flex items-start justify-between">
                <h3
                  class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                >
                  {{ p.title }}
                </h3>
                <div class="flex gap-2">
                  <span
                    v-if="p.type === 'commercial'"
                    class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold rounded-full"
                    >💼</span
                  >
                  <span
                    v-if="p.demo"
                    class="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full animate-gradient-border cursor-pointer hover-pulse"
                    @click.stop="showPCRDemo = true"
                    >🎬</span
                  >
                </div>
              </div>

              <!-- Описание -->
              <p class="text-gray-600 dark:text-gray-400">
                {{ p.description }}
              </p>

              <!-- Фичи -->
              <ul
                class="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1"
              >
                <li
                  v-for="(f, idx) in p.features"
                  :key="idx"
                  class="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-default"
                  :style="{ animationDelay: `${0.2 + idx * 0.1}s` }"
                >
                  {{ f }}
                </li>
              </ul>

              <!-- Модули (если есть) -->
              <div
                v-if="p.modules"
                class="space-y-3 border-t border-gray-100 dark:border-gray-700 pt-4"
              >
                <h4
                  class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Модули платформы
                </h4>
                <div
                  v-for="(module, idx) in p.modules"
                  :key="idx"
                  class="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors animate-fade-in-up"
                  :style="{ animationDelay: `${0.4 + idx * 0.1}s` }"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span
                      class="font-semibold text-gray-800 dark:text-gray-200 text-sm"
                      >{{ module.name }}</span
                    >
                    <span
                      v-if="module.name.includes('PCR') && p.demo"
                      class="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] rounded-full font-bold cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-900/50 transition hover-pulse"
                      @click.stop="showPCRDemo = true"
                      >🎬 Демо</span
                    >
                  </div>
                  <p
                    class="text-xs text-gray-600 dark:text-gray-400 mb-2 leading-relaxed"
                  >
                    {{ module.description }}
                  </p>
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="tech in module.stack.slice(0, 5)"
                      :key="tech"
                      class="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] rounded font-medium border border-blue-100 dark:border-blue-800"
                      >{{ tech }}</span
                    >
                    <span
                      v-if="module.stack.length > 5"
                      class="text-[10px] text-gray-400 self-center"
                      >+{{ module.stack.length - 5 }}</span
                    >
                  </div>
                </div>
              </div>

              <!-- Теги стека -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in p.stack.slice(0, 6)"
                  :key="tech"
                  class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-default"
                  >{{ tech }}</span
                >
              </div>
            </div>
            <!-- 👆 Конец flex-grow обёртки -->

            <!-- 👇 Кнопки/ссылки — всегда внизу благодаря mt-auto -->
            <div
              class="flex gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700"
            >
              <a
                v-if="p.link"
                :href="p.link"
                target="_blank"
                class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline transition hover-lift"
                >Live →</a
              >
              <a
                v-if="p.repo"
                :href="p.repo"
                target="_blank"
                class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium hover:underline transition hover-lift"
                >Code →</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section
      id="contact"
      class="py-20 bg-gray-50 dark:bg-gray-900 transition-colors"
    >
      <div class="container mx-auto px-6 max-w-4xl">
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <div class="animate-fade-in-up">
            <h2
              class="text-3xl font-bold mb-6 border-l-4 border-blue-600 dark:border-blue-400 pl-4 text-gray-900 dark:text-white"
            >
              Контакты
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Открыт для новых предложений. Если у вас есть вакансия или вопрос,
              напишите мне.
            </p>
            <div class="space-y-4">
              <div
                v-for="(contact, idx) in [
                  {
                    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                    label: 'Email',
                    value: personalInfo.email,
                    href: `mailto:${personalInfo.email}`,
                  },
                  {
                    icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
                    label: 'Telegram',
                    value: personalInfo.telegram,
                    href: personalInfo.telegram,
                    target: '_blank',
                  },
                  {
                    icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22',
                    label: 'GitHub',
                    value: 'github.com/14646n',
                    href: personalInfo.github,
                    target: '_blank',
                  },
                  {
                    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
                    label: 'Локация',
                    value: personalInfo.location,
                  },
                ]"
                :key="idx"
                class="flex items-center space-x-4 animate-fade-in-up hover-lift"
                :style="{ animationDelay: `${idx * 0.1}s` }"
              >
                <div
                  class="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      :d="contact.icon"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ contact.label }}
                  </p>
                  <a
                    v-if="'href' in contact && contact.href"
                    :href="contact.href"
                    :target="'target' in contact ? contact.target : undefined"
                    class="text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >{{ contact.value }}</a
                  >
                  <p v-else class="text-gray-900 dark:text-white font-medium">
                    {{ contact.value }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="animate-fade-in-up animate-stagger-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="bg-gray-900 dark:bg-black text-white py-10 text-center transition-colors"
    >
      <div class="container mx-auto px-6">
        <p class="mb-4 animate-fade-in-up">
          © {{ new Date().getFullYear() }} {{ personalInfo.name }}
        </p>
        <div
          class="flex justify-center gap-6 animate-fade-in-up animate-stagger-1"
        >
          <a
            :href="`mailto:${personalInfo.email}`"
            class="hover:text-blue-400 transition hover-lift inline-block"
            >Email</a
          >
          <a
            :href="personalInfo.github"
            class="hover:text-blue-400 transition hover-lift inline-block"
            >GitHub</a
          >
          <a
            :href="personalInfo.telegram"
            class="hover:text-blue-400 transition hover-lift inline-block"
            >Telegram</a
          >
        </div>
      </div>
    </footer>

    <!-- Модальное окно -->
    <PCRDemoModal v-model="showPCRDemo" />
  </div>
</template>
