# EV Frontend

A clean and simple Next.js application built with TypeScript and modern best practices.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ESLint & Prettier** for code quality
- **Responsive Design** with mobile-first approach
- **Reusable Components** with proper TypeScript interfaces
- **Modern Project Structure** following Next.js best practices

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## 📁 Project Structure

```
ev-frontend/
├── src/
│   ├── app/                 # App Router pages and layouts
│   │   ├── about/          # About page
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable components
│   │   └── ui/            # UI components
│   └── lib/               # Utility functions
├── public/                # Static assets
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ev-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Custom color palette
- Responsive design utilities
- Component-based styling approach
- Dark mode support (ready to implement)

## 🔧 Configuration

### TypeScript

The project is configured with strict TypeScript settings and path aliases:

- `@/*` - Source directory
- `@/components/*` - Components directory
- `@/lib/*` - Utility functions
- `@/types/*` - Type definitions
- `@/utils/*` - Utility functions

### ESLint & Prettier

- ESLint configured with TypeScript rules
- Prettier for consistent code formatting
- Pre-commit hooks ready (can be added with husky)

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:

- Responsive navigation
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Node.js:

- Netlify
- AWS Amplify
- Railway
- Heroku

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [TypeScript](https://www.typescriptlang.org/) for type safety
