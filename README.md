# Todo Application

A modern, feature-rich Todo Application built with React, TypeScript, and Tailwind CSS. This application provides a clean interface for managing your daily tasks with persistent localStorage storage.

## Features

### Core Functionality
- **Add Todos** - Create new tasks with title, description, and date
- **Edit Todos** - Modify existing tasks inline
- **Delete Todos** - Remove individual tasks or all tasks for a specific date
- **Complete Todos** - Mark tasks as completed with visual feedback
- **Persistent Storage** - All data saved locally in browser localStorage

### UI/UX Features
- **Dark/Light Theme Toggle** - Seamless theme switching with system preference detection
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Date Grouping** - Tasks organized by date with collapsible sections
- **Status Indicators** - Visual cues for overdue, today, and completed tasks
- **Smooth Animations** - Polished transitions and micro-interactions

### Advanced Features
- **Smart Date Display** - Shows "Today", "Tomorrow", "Yesterday", etc.
- **Progress Tracking** - Visual progress bars and completion statistics
- **Overdue Detection** - Highlights overdue tasks with red indicators
- **Bulk Operations** - Delete all todos for a specific date
- **Auto-sync** - Syncs data across multiple browser tabs

## Tech Stack

- **React 18** - Modern React with functional components and hooks
- **TypeScript** - Full type safety and improved developer experience
- **Tailwind CSS** - Utility-first styling with custom design system
- **Vite** - Fast build tool and development server
- **UUID** - Unique identifiers for todos
- **LocalStorage** - Browser-based data persistence

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todolist
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
pnpm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── TodoForm.tsx    # Add/Edit todo form
│   ├── TodoList.tsx    # Main todo list container
│   ├── TodoItem.tsx    # Individual todo item
│   ├── DateGroup.tsx   # Collapsible date sections
│   ├── ThemeToggle.tsx # Dark/light theme toggle
│   └── Layout.tsx      # Main layout wrapper
├── hooks/              # Custom React hooks
│   ├── useTodos.ts     # Todo CRUD operations
│   ├── useTheme.ts     # Theme management
│   └── useLocalStorage.ts # Generic localStorage hook
├── types/              # TypeScript type definitions
│   └── todo.ts         # Todo and related interfaces
├── utils/              # Utility functions
│   ├── localStorage.ts # localStorage helpers
│   └── dateHelpers.ts  # Date manipulation utilities
├── styles/             # Global styles
│   └── globals.css     # Tailwind imports and custom CSS
└── App.tsx             # Root component
```

## Usage

### Adding a Todo
1. Fill in the title (required)
2. Add an optional description
3. Select a date (defaults to today)
4. Click "Add Todo"

### Managing Todos
- **Complete**: Click the checkbox to mark as done
- **Edit**: Click the edit icon to modify the todo
- **Delete**: Click the delete icon to remove the todo
- **Expand/Collapse**: Click the date header to show/hide todos for that date

### Theme Switching
- Click the theme toggle button in the header
- Automatically detects system preference on first visit
- Theme preference is saved locally

## Design System

### Color Palette
- **Light Theme**: Clean whites and soft grays with blue accents
- **Dark Theme**: Dark grays and blacks with blue accents
- **Status Colors**: 
  - Green for completed tasks
  - Red for overdue tasks
  - Blue for today's tasks
  - Yellow for warnings

### Typography
- **Headers**: Semibold to bold weights
- **Body Text**: Regular weight with good contrast
- **Supporting Text**: Lighter weight for secondary information

## Key Features Implementation

### LocalStorage Integration
- Automatic data validation and migration
- Error handling with graceful degradation
- Multi-tab synchronization
- Storage quota management

### Date Management
- Smart date parsing and formatting
- Timezone-aware date calculations
- Relative date display (Today, Tomorrow, etc.)
- Overdue detection

### Theme System
- CSS custom properties for consistent theming
- Smooth transitions between themes
- System preference detection
- Persistent theme storage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

If you encounter any issues or have questions, please open an issue on the repository.
