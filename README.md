# OptiView - Portfolio Dashboard

A clean, minimal Next.js frontend application for displaying blockchain portfolio information across multiple networks.

## Features

- **Multi-Chain Support**: Ethereum, BSC, Polygon, Arbitrum, Optimism, Base
- **Wallet Integration**: Connect with Wagmi and Reown AppKit
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Portfolio Display**: View wallet assets and balances
- **Modern Stack**: Next.js 15, React 18, TypeScript

## Tech Stack

- **Framework**: Next.js 15.2.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Custom React components
- **Wallet**: Wagmi 2.18.1, Reown AppKit 1.8.10
- **State**: TanStack React Query
- **Charts**: Recharts 2.12.7

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Visit `http://localhost:3001`

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── portfolio/         # Portfolio pages
│   └── layout.tsx         # Root layout
├── components/            # UI components
├── hooks/                 # Custom hooks
├── lib/                   # Utilities
├── types/                 # TypeScript definitions
└── reown/                 # Wallet configuration
```

## Environment Variables

```env
NEXT_PUBLIC_PROJECT_ID=your_project_id
```

## Notes

- Frontend-only application
- Mock data for demonstration
- No third-party API dependencies
- No sensitive data stored

## License

MIT
