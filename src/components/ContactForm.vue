<script setup lang="ts">
import { reactive } from "vue";
import emailjs from "@emailjs/browser";

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const status = reactive({
  loading: false,
  success: false,
  error: null as string | null,
});

const sendEmail = async () => {
  status.loading = true;
  status.error = null;
  status.success = false;

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID!,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_name: "Макеев Никита Павлович",
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY!,
    );

    status.success = true;
    form.name = "";
    form.email = "";
    form.message = "";
  } catch (err: any) {
    console.error("EmailJS Error:", err);
    status.error = "Ошибка отправки. Попробуйте позже или напишите в Telegram.";
  } finally {
    status.loading = false;
  }
};
</script>

<template>
  <!-- Добавлены классы dark:bg-gray-800 и dark:border-gray-700 -->
  <div
    class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300"
  >
    <!-- Добавлен dark:text-white -->
    <h3 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
      Написать мне
    </h3>

    <form @submit.prevent="sendEmail" class="space-y-4">
      <div>
        <!-- Добавлен dark:text-gray-300 -->
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Ваше имя</label
        >
        <!-- Добавлены классы dark:bg-gray-700, dark:border-gray-600, dark:text-white -->
        <input
          type="text"
          v-model="form.name"
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Email</label
        >
        <input
          type="email"
          v-model="form.email"
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Сообщение</label
        >
        <textarea
          v-model="form.message"
          required
          rows="4"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        ></textarea>
      </div>

      <!-- Статусы отправки адаптированы под темную тему -->
      <div
        v-if="status.success"
        class="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm"
      >
        ✅ Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.
      </div>
      <div
        v-if="status.error"
        class="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm"
      >
        ❌ {{ status.error }}
      </div>

      <button
        type="submit"
        :disabled="status.loading"
        class="w-full bg-blue-600 dark:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
      >
        <span v-if="status.loading">Отправка...</span>
        <span v-else>Отправить сообщение</span>
      </button>
    </form>
  </div>
</template>
