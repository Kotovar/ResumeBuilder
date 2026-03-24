# Конструктор резюме / CV Builder

Двухязычный конструктор резюме с поддержкой русского и английского языков. Позволяет создавать профессиональные резюме в форматах Classic и Modern, экспортировать в PDF и JSON.

Bilingual resume builder with Russian and English support. Create professional resumes in Classic and Modern formats, export to PDF and JSON.

---

## Особенности / Features

- 🌐 **Двухязычный интерфейс** — переключение между русским и английским
- 📄 **Два шаблона** — Classic (традиционный) и Modern (с боковой панелью)
- 🎨 **Настройка стиля** — выбор цвета, шрифта (PT Sans/PT Serif/PT Mono)
- 📤 **Экспорт** — PDF для печати и JSON для резервного копирования
- 📥 **Импорт** — загрузка ранее сохранённых резюме
- ✏️ **Редактирование** — drag-and-drop для изменения порядка секций
- 📱 **Адаптивный дизайн** — работает на десктопе и мобильных

- 🌐 **Bilingual interface** — switch between Russian and English
- 📄 **Two templates** — Classic (traditional) and Modern (with sidebar)
- 🎨 **Style customization** — accent color, font family (PT Sans/PT Serif/PT Mono)
- 📤 **Export** — PDF for printing and JSON for backup
- 📥 **Import** — load previously saved resumes
- ✏️ **Drag-and-drop editing** — reorder sections easily
- 📱 **Responsive design** — works on desktop and mobile

---

## Технологии / Tech Stack

- **React 19** + **TypeScript**
- **Zustand** — управление состоянием
- **@react-pdf/renderer** — генерация PDF
- **Vite** + **Bun** — сборка и запуск
- **Tailwind CSS v4** — стилизация

---

## Быстрый старт / Quick Start

```bash
# Установка зависимостей / Install dependencies
bun install

# Запуск dev-сервера / Start dev server
bun run dev

# Сборка / Build for production
bun run build
```

---

## Структура / Structure

```
src/
├── components/
│   ├── Editor/        # Редактор секций резюме
│   ├── Layout/        # Toolbar, навигация
│   ├── Preview/       # Предпросмотр (Classic/Modern)
│   └── ...
├── pdf/               # Генерация PDF (ClassicPDF, ModernPDF)
├── store/             # Zustand store
├── type/              # TypeScript типы
├── i18n/              # Переводы (ru/en)
└── ...
```

---

## Экспорт и импорт / Export & Import

- **PDF** — готовый к печати документ с правильной разметкой A4
- **JSON** — полное резюме для повторного редактирования

---

## Лицензия / License

MIT
