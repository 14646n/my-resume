import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import TelegramBot from "node-telegram-bot-api";
import corsMiddleware from "cors";
import express from "express";
import type { Request, Response } from "express";

// Инициализация Firebase Admin
admin.initializeApp();

const app = express();

// Middleware
app.use(corsMiddleware({ origin: true }));
app.use(express.json());

// Telegram конфигурация из .env
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

// Создаем бота
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

// Тип для тела запроса
interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

// Endpoint для отправки сообщений
app.post("/api/contact", async (req: Request, res: Response): Promise<void> => {
  const { name, email, message } = req.body as ContactMessage;

  // Валидация
  if (!name || !email || !message) {
    res.status(400).json({ error: "Все поля обязательны" });
    return;
  }

  // Проверка конфигурации
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Telegram config is missing! Check .env file.");
    res.status(500).json({ error: "Сервер не настроен" });
    return;
  }

  try {
    // Форматируем сообщение
    const text = `📩 <b>Новое сообщение с портфолио!</b>\n\n👤 <b>Имя:</b> ${name}\n📧 <b>Email:</b> ${email}\n\n💬 <b>Сообщение:</b>\n${message}\n\n⏰ <i>${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Yekaterinburg" })}</i>`;

    // Отправляем в Telegram
    await bot.sendMessage(TELEGRAM_CHAT_ID, text, { parse_mode: "HTML" });

    // Сохраняем в Firestore
    await admin.firestore().collection("contact_messages").add({
      name,
      email,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ success: true, message: "Сообщение отправлено" });
  } catch (error) {
    console.error("Telegram Error:", error);
    res.status(500).json({
      error:
        "Ошибка отправки. Попробуйте позже или напишите в Telegram напрямую.",
    });
  }
});

// Health check
app.get("/api/health", (_req: Request, res: Response): void => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    telegramConfigured: !!(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID),
  });
});

// Экспортируем функцию через v2 API
export const contactForm = onRequest(app);
