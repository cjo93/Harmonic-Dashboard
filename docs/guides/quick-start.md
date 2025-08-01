# Quick Start Guide

Get up and running with Harmonic Dashboard in just a few minutes!

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 20+**: [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git**: [Download Git](https://git-scm.com/)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/cjo93/Harmonic-Dashboard.git
cd Harmonic-Dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the next available port).

## Using GitHub Codespaces (Recommended)

For the best experience, use GitHub Codespaces which provides a pre-configured development environment:

1. **Open in Codespace**:
   - Go to the [GitHub repository](https://github.com/cjo93/Harmonic-Dashboard)
   - Click the "Code" button
   - Select "Open with Codespaces"
   - Click "Create codespace on main"

2. **Automatic Setup**:
   - The environment sets up automatically
   - All dependencies are pre-installed
   - GitHub Copilot is pre-configured
   - Development server starts automatically

3. **Access the Application**:
   - Navigate to the forwarded port (usually port 3000)
   - The dashboard will be ready to use

## First Steps

### 1. Explore the Dashboard

Once the application is running:

- **Dashboard**: Overview of your development activity
- **Chat**: AI-powered development assistance
- **Documentation**: Create and manage documentation

### 2. Try the Chat Feature

1. Click on "Chat" in the sidebar
2. Type a development question:
   - "How do I create a React component?"
   - "Show me an API endpoint example"
   - "Help me write tests"
3. Receive AI-powered responses with code examples

### 3. Create Documentation

1. Navigate to "Documentation"
2. Click the "+" button to create new documentation
3. Choose document type:
   - **Markdown**: General documentation
   - **Code**: Code examples and guides
   - **API**: API reference documentation
4. Add tags for organization
5. Save your documentation

### 4. Customize Your Environment

- Monitor Codespace status in the sidebar
- Check GitHub Copilot connectivity
- Explore the responsive design on different screen sizes

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API endpoints
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── layout/        # Layout components
│   │   ├── chat/          # Chat functionality
│   │   └── documentation/ # Documentation features
│   ├── stores/            # Zustand state management
│   ├── types/             # TypeScript type definitions
│   └── lib/               # Utility functions
├── docs/                  # Comprehensive documentation
├── __tests__/             # Test files
└── public/                # Static assets
```

## Key Features

### 🤖 AI-Powered Chat
- Get instant development help
- Code generation and examples
- Context-aware responses

### 📚 Documentation Management
- Create and organize documentation
- Support for Markdown, code, and API docs
- Tag-based organization
- Full-text search

### 🚀 Codespace Integration
- Pre-configured development environment
- GitHub Copilot integration
- Automatic port forwarding
- VS Code extensions included

### 🎨 Modern UI
- Clean, responsive design
- Dark and light mode support
- Intuitive navigation
- Real-time status indicators

## Configuration

The application works out of the box with sensible defaults. For customization:

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Optional: Custom API URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Optional: GitHub Copilot configuration
GITHUB_COPILOT_API_KEY=your_api_key_here
```

### Tailwind Configuration

Customize the design system in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        harmonic: {
          // Customize the color palette
        },
      },
    },
  },
}
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# If port 3000 is occupied, Next.js will automatically use the next available port
# Check the terminal output for the actual URL
```

#### Dependencies Installation Issues
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
```bash
# Restart TypeScript server in your editor
# Or run type checking manually
npx tsc --noEmit
```

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Getting Help

If you encounter issues:

1. Check the [Troubleshooting Guide](./troubleshooting.md)
2. Search [GitHub Issues](https://github.com/cjo93/Harmonic-Dashboard/issues)
3. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details (OS, Node version, etc.)

## Next Steps

Now that you have Harmonic Dashboard running:

1. **Learn More**: Read the [Development Guide](./development.md)
2. **Explore Components**: Check the [Component Documentation](../components/README.md)
3. **Understand Architecture**: Review the [Architecture Overview](../architecture/README.md)
4. **Contribute**: See the [Contributing Guidelines](../contributing/README.md)

## Quick Tips

- **Keyboard Shortcuts**: Learn the keyboard shortcuts for faster navigation
- **GitHub Copilot**: Make sure Copilot is enabled for the best experience
- **Documentation**: Use the built-in documentation features to organize your work
- **Chat Features**: Experiment with different types of questions to get better responses

---

Welcome to Harmonic Dashboard! Happy coding! 🚀