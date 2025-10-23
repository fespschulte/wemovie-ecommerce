# 🎬 WeMovie E-commerce

A modern movie e-commerce platform built with Next.js 16, featuring a clean feature-based architecture and responsive design.

## ✨ Features

- 🎬 **Movie Catalog** - Browse and discover movies
- 🛒 **Shopping Cart** - Add/remove items with quantity control
- 💰 **Price Management** - Real-time price calculations
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Modern UI** - Clean interface with custom theme
- ⚡ **Performance** - Optimized with Next.js 16
- 🧪 **Testing** - Comprehensive test coverage with Jest

## 🚀 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: Zustand
- **Form Validation**: Zod
- **Testing**: Jest + Testing Library
- **Notifications**: Sonner
- **Icons**: Lucide React

## 📁 Project Structure

```
wemovie-ecommerce/
├── app/                    # Next.js App Router pages
├── components/
│   ├── features/           # Feature-based components
│   │   ├── movies/        # Movie domain
│   │   │   ├── components/    # MovieCard, MovieGrid
│   │   │   ├── hooks/         # useMovies
│   │   │   └── services/      # movieService
│   │   └── cart/          # Cart domain
│   │       ├── components/    # CartItem, CartSummary, etc.
│   │       ├── hooks/         # useCart, useCartActions
│   │       └── stores/        # cartStore, purchaseStore
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── hooks/                 # Shared custom React hooks
├── lib/                   # Utilities and formatters
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd wemovie-ecommerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🏗️ Architecture

This project follows a **Feature-Based Architecture** optimized for:

- ✅ **Domain Separation** - Clear business logic boundaries
- ✅ **Scalability** - Easy to add new features
- ✅ **Team Collaboration** - Independent feature development
- ✅ **Maintainability** - Isolated and organized code
- ✅ **Testing** - Feature-specific test organization

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## 📦 Key Dependencies

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Zod** - Schema validation
- **Jest** - Testing framework

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of a technical assessment and is for demonstration purposes.
