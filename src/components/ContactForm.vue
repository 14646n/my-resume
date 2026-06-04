<script setup lang="ts">
import { reactive, ref } from "vue";

type ContactMethod = "telegram" | "email" | "both";

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const contactMethod = ref<ContactMethod>("telegram");

const status = reactive({
  loading: false,
  success: false,
  error: null as string | null,
});

// Замени на свой URL Worker
const WORKER_URL = "https://portfolio-contact.nikota555mak.workers.dev";

const sendMessage = async () => {
  status.loading = true;
  status.error = null;
  status.success = false;

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
        contactMethod: contactMethod.value,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Ошибка отправки");
    }

    status.success = true;
    form.name = "";
    form.email = "";
    form.message = "";

    setTimeout(() => {
      status.success = false;
    }, 5000);
  } catch (error: any) {
    console.error("Send Error:", error);
    status.error = error.message || "Ошибка отправки. Напишите мне напрямую.";
  } finally {
    status.loading = false;
  }
};
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300"
  >
    <h3 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
      Написать мне
    </h3>

    <!-- Переключатель способа связи -->
    <div class="mb-6">
      <label
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
      >
        Куда отправить сообщение?
      </label>
      <div class="grid grid-cols-3 gap-3">
        <label
          class="flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200"
          :class="[
            contactMethod === 'telegram'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500',
          ]"
        >
          <input
            type="radio"
            v-model="contactMethod"
            value="telegram"
            class="sr-only"
          />
          <div class="text-center">
            <div class="text-2xl mb-1">✈️</div>
            <div class="text-xs font-medium text-gray-700 dark:text-gray-300">
              Telegram
            </div>
          </div>
        </label>

        <label
          class="flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200"
          :class="[
            contactMethod === 'email'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500',
          ]"
        >
          <input
            type="radio"
            v-model="contactMethod"
            value="email"
            class="sr-only"
          />
          <div class="text-center">
            <div class="text-2xl mb-1">📧</div>
            <div class="text-xs font-medium text-gray-700 dark:text-gray-300">
              Email
            </div>
          </div>
        </label>

        <label
          class="flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200"
          :class="[
            contactMethod === 'both'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500',
          ]"
        >
          <input
            type="radio"
            v-model="contactMethod"
            value="both"
            class="sr-only"
          />
          <div class="text-center">
            <div class="text-2xl mb-1">✈️📧</div>
            <div class="text-xs font-medium text-gray-700 dark:text-gray-300">
              Оба
            </div>
          </div>
        </label>
      </div>
    </div>

    <form @submit.prevent="sendMessage" class="space-y-4">
      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Ваше имя</label
        >
        <input
          type="text"
          v-model="form.name"
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Иван Иванов"
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
          placeholder="ivan@example.com"
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
          placeholder="Привет! Хотел бы обсудить вакансию..."
        ></textarea>
      </div>

      <!-- Статусы -->
      <div
        v-if="status.success"
        class="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm"
      >
        ✅ Сообщение успешно отправлено!
        <span v-if="contactMethod === 'telegram'"
          >Я получил его в Telegram.</span
        >
        <span v-else-if="contactMethod === 'email'"
          >Я получил его на Email.</span
        >
        <span v-else>Я получил его в Telegram и на Email.</span>
      </div>

      <div
        v-if="status.error"
        class="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm"
      >
        ❌ {{ status.error }}
      </div>

      <!-- Кнопка -->
      <button
        type="submit"
        :disabled="status.loading"
        class="w-full bg-blue-600 dark:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
      >
        <span v-if="status.loading" class="flex items-center gap-2">
          <svg
            class="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Отправка...
        </span>
        <span v-else>Отправить сообщение</span>
      </button>
    </form>
  </div>
</template>
