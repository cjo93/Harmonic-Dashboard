# Harmonic Dashboard

A modern, integrated development dashboard that combines GitHub Copilot-powered documentation and chat functionality within a Codespace-optimized environment.

![Dashboard Overview](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=Harmonic+Dashboard)

## 🚀 Features

### 🤖 **GitHub Copilot Chat Integration**
- Interactive chat interface with AI-powered responses
- Code generation assistance with syntax highlighting
- Context-aware responses for development questions
- Support for different message types (code, documentation, general)

### 📚 **Documentation Management System**
- Full markdown support with GitHub Flavored Markdown rendering
- Tag-based organization and search functionality
- Create, edit, and manage documentation in real-time
- Support for multiple content types (markdown, code, API docs)
- Pre-loaded sample documentation

### 🚀 **Codespace Optimization**
- Pre-configured `.devcontainer.json` with GitHub Copilot extensions
- Automatic port forwarding for development servers
- Post-creation setup scripts for seamless onboarding
- Development environment ready out-of-the-box

### 🎨 **Modern UI/UX**
- Clean, responsive interface built with Next.js and Tailwind CSS
- Intuitive sidebar navigation between Dashboard, Chat, and Documentation
- Real-time status indicators for Codespace and Copilot connectivity
- Professional design with custom "Harmonic" color theme

## 🛠 Tech Stack

- **Frontend**: Next.js 15 with React 19 and TypeScript
- **State Management**: Zustand for efficient global state
- **Styling**: Tailwind CSS with custom design system
- **API**: RESTful endpoints for chat and documentation
- **Testing**: Jest with React Testing Library
- **Development**: Codespace-optimized environment

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cjo93/Harmonic-Dashboard.git
   cd Harmonic-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Using Codespaces

1. **Open in Codespace**: Click the "Code" button on GitHub and select "Open with Codespaces"
2. **Automatic Setup**: The environment sets up automatically with all dependencies
3. **Start Developing**: The development server starts automatically
4. **Access Dashboard**: Navigate to the forwarded port 3000

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── chat/          # Chat endpoint
│   │   └── documentation/ # Documentation CRUD
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── chat/             # Chat functionality
│   ├── documentation/    # Documentation management
│   └── ui/               # Reusable UI components
├── stores/               # Zustand stores
├── types/                # TypeScript definitions
├── lib/                  # Utility functions
└── __tests__/            # Test files
```

## 🔌 API Endpoints

### Chat API
```typescript
POST /api/chat
{
  "message": "How do I create a React component?",
  "type": "code" | "documentation" | "general"
```

### Documentation API
<<<<<<< HEAD
```typescript
GET    /api/documentation          # List all documents
POST   /api/documentation          # Create new document
PUT    /api/documentation          # Update document
DELETE /api/documentation?id=123   # Delete document
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🏗 Building for Production

```bash
npm run build
npm start
```

## 🎯 Usage Examples

### Starting a Chat Session
1. Click on "Chat" in the sidebar
2. Type your development question
3. Get AI-powered assistance with code examples

### Creating Documentation
1. Navigate to "Documentation"
2. Click the "+" button
3. Add title, content, tags, and type
4. Save your documentation

### Managing Your Environment
- Monitor Codespace status in the sidebar
- Check Copilot connectivity
- View recent activity on the dashboard

## 🤝 Contributing
=======
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

### Documentation API
```typescript
GET    /api/documentation          # List all documents
POST   /api/documentation          # Create new document
PUT    /api/documentation          # Update document
DELETE /api/documentation?id=123   # Delete document
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🏗 Building for Production

```bash
npm run build
npm start
```

## 🎯 Usage Examples

### Starting a Chat Session
1. Click on "Chat" in the sidebar
2. Type your development question
3. Get AI-powered assistance with code examples

### Creating Documentation
1. Navigate to "Documentation"
2. Click the "+" button
3. Add title, content, tags, and type
4. Save your documentation

### Managing Your Environment
- Monitor Codespace status in the sidebar
- Check Copilot connectivity
- View recent activity on the dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- GitHub Copilot for AI-powered assistance
- Next.js team for the amazing framework
- Tailwind CSS for beautiful styling
- The open-source community for inspiration

---

**Built with ❤️ for developers, by developers**
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
>>>>>>> main

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<<<<<<< HEAD
## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- GitHub Copilot for AI-powered assistance
- Next.js team for the amazing framework
- Tailwind CSS for beautiful styling
- The open-source community for inspiration

---

**Built with ❤️ for developers, by developers**
=======
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Create an issue for bug reports or feature requests
- 💬 Use the integrated chat for development questions
- 📖 Check the documentation section for guides and examples

---

Built with ❤️ for the GitHub Codespace community
>>>>>>> main
