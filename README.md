# SplitSetGo - Premium Expense Splitting

A luxurious expense splitting application that makes managing group expenses elegant and effortless.

## Features

- **Smart Expense Splitting**: Automatically split bills among group members
- **Real-time Updates**: See changes instantly across all devices
- **Premium Design**: Beautiful, modern interface with smooth animations
- **Group Management**: Create and manage multiple expense groups
- **Secure Authentication**: Protected user accounts and data
- **Mobile Responsive**: Works perfectly on all devices

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd splitsetgo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Fill in your environment variables in the `.env` file.

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives
- **Authentication**: Clerk
- **Database**: Prisma ORM
- **Build Tool**: Vite
- **Animations**: Framer Motion

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Application pages
├── lib/           # Utility functions and configurations
├── hooks/         # Custom React hooks
└── types/         # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.
