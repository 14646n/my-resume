import { ref } from 'vue';

export function useTheme() {
  // Читаем текущее состояние из DOM (оно уже установлено скриптом в index.html)
  const isDark = ref(document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  return { isDark, toggleTheme };
}