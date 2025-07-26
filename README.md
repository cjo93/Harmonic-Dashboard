# Harmonic Dashboard

A modern, integrated development dashboard with GitHub Copilot-powered documentation and chat features, designed specifically for Codespace environments.

![Dashboard Screenshot](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=Harmonic+Dashboard)

## Features

### 🤖 Copilot Integration
- **Interactive Chat**: Direct integration with GitHub Copilot for code assistance and development help
- **Code Generation**: Get code examples, functions, and snippets on-demand
- **Documentation Assistance**: AI-powered help for creating and maintaining documentation

### 📚 Documentation Management
- **Markdown Support**: Full markdown rendering with syntax highlighting
- **Organized Content**: Tag-based organization and search functionality
- **Real-time Editing**: Create and edit documentation with live preview
- **Multiple Types**: Support for code, API, and general documentation

### 🚀 Codespace Optimized
- **Pre-configured Environment**: Ready-to-use development container
- **Port Forwarding**: Automatic port management for development servers
- **GitHub Integration**: Seamless integration with GitHub workflows
- **Extensions**: Pre-installed VS Code extensions for optimal development

## Quick Start

### Prerequisites
- GitHub Codespace or compatible development environment
- Node.js 18+ and npm

### Installation

1. **Clone and Install**
   ```bash
   git clone https://github.com/cjo93/Harmonic-Dashboard.git
   cd Harmonic-Dashboard
   npm install
   ```

2. **Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

### Codespace Setup

1. **Open in Codespace**: Click the "Code" button on GitHub and select "Open with Codespaces"
2. **Automatic Setup**: The environment will automatically configure with all dependencies
3. **Start Development**: The dev server will start automatically on port 3000

## Usage

### Chat Interface
- Navigate to the "Copilot Chat" section
- Ask questions about code, documentation, or development practices
- Get code examples and explanations
- Receive context-aware suggestions

### Documentation Management
- Create new documentation using the "+" button
- Support for Markdown, Code snippets, and API documentation
- Use tags to organize and find content easily
- Search across all documentation

### Dashboard Overview
- View activity statistics and recent actions
- Quick access to common development tasks
- Monitor Copilot integration status

## API Endpoints

### Chat API
```
POST /api/chat
Content-Type: application/json

{
  "message": "Your question or request"
}
```

### Documentation API
```
POST /api/documentation
Content-Type: application/json

{
  "title": "Document Title",
  "content": "Markdown content",
  "type": "markdown|code|api",
  "tags": ["tag1", "tag2"]
}
```

## Project Structure

```
src/
├── components/           # React components
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── ChatInterface.tsx # Copilot chat interface
│   ├── DocumentationViewer.tsx # Documentation management
│   └── DashboardOverview.tsx # Main dashboard
├── pages/               # Next.js pages
│   ├── api/            # API routes
│   ├── _app.tsx        # App wrapper
│   └── index.tsx       # Home page
├── lib/                # Utilities and stores
│   └── store.ts        # Zustand state management
├── types/              # TypeScript type definitions
└── styles/             # Global styles and Tailwind CSS
```

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom theme
- **State Management**: Zustand
- **Icons**: Lucide React
- **Markdown**: react-markdown with GitHub Flavored Markdown
- **Development**: ESLint, Prettier, Hot Reload

## Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

### Environment Variables
```bash
# Optional: Configure API endpoints
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Create an issue for bug reports or feature requests
- 💬 Use the integrated chat for development questions
- 📖 Check the documentation section for guides and examples

---

Built with ❤️ for the GitHub Codespace community