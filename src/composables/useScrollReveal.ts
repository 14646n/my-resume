// src/composables/useScrollReveal.ts
import { onMounted, onBeforeUnmount } from "vue";

export function useScrollReveal(selector = ".reveal-on-scroll") {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // Анимируем только один раз
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  onMounted(() => {
    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el);
    });
  });

  onBeforeUnmount(() => observer.disconnect());
}
