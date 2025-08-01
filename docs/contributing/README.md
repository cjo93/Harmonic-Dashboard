# Contributing to Harmonic Dashboard

Thank you for your interest in contributing to Harmonic Dashboard! This guide will help you get started with contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Issue Guidelines](#issue-guidelines)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md). Please read it before contributing.

### Our Pledge

We are committed to making participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

## Getting Started

### Prerequisites

- **Node.js 20+**: [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)
- **GitHub Account**: [Sign up for GitHub](https://github.com/)

### Initial Setup

1. **Fork the Repository**:
   - Visit the [Harmonic Dashboard repository](https://github.com/cjo93/Harmonic-Dashboard)
   - Click the "Fork" button in the top-right corner
   - This creates a copy of the repository in your GitHub account

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Harmonic-Dashboard.git
   cd Harmonic-Dashboard
   ```

3. **Add Upstream Remote**:
   ```bash
   git remote add upstream https://github.com/cjo93/Harmonic-Dashboard.git
   git remote -v  # Verify remotes
   ```

4. **Install Dependencies**:
   ```bash
   npm install
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```

## Development Workflow

### 1. Sync with Upstream

Before starting work, always sync with the upstream repository:

```bash
# Fetch latest changes from upstream
git fetch upstream

# Switch to main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push updates to your fork
git push origin main
```

### 2. Create Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b bugfix/issue-description

# Or for documentation
git checkout -b docs/documentation-update
```

### 3. Make Changes

Follow our [coding standards](#coding-standards) while making your changes:

- Write clean, readable code
- Add appropriate tests
- Update documentation as needed
- Follow TypeScript best practices

### 4. Test Your Changes

```bash
# Run all tests
npm test

# Run linting
npm run lint

# Run type checking
npx tsc --noEmit

# Build the project
npm run build
```

### 5. Commit Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add new chat interface component"

# Examples of good commit messages:
git commit -m "fix: resolve sidebar navigation issue"
git commit -m "docs: update API documentation"
git commit -m "test: add tests for Dashboard component"
git commit -m "refactor: improve state management structure"
```

#### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect code meaning (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process or auxiliary tools

**Scopes (optional):**
- `api`: API-related changes
- `ui`: UI component changes
- `docs`: Documentation changes
- `config`: Configuration changes

## Coding Standards

### TypeScript Guidelines

1. **Strict Type Safety**:
   ```typescript
   // Good: Well-typed interface
   interface UserPreferences {
     theme: 'light' | 'dark';
     language: string;
     notifications: {
       email: boolean;
       push: boolean;
     };
   }
   
   // Good: Type-safe function
   const updateUserPreferences = (
     userId: string, 
     preferences: Partial<UserPreferences>
   ): Promise<UserPreferences> => {
     // Implementation
   }
   ```

2. **Component Props**:
   ```typescript
   // Good: Well-defined props interface
   interface ButtonProps {
     children: React.ReactNode;
     variant?: 'primary' | 'secondary' | 'danger';
     size?: 'sm' | 'md' | 'lg';
     disabled?: boolean;
     onClick?: () => void;
   }
   
   export const Button: React.FC<ButtonProps> = ({
     children,
     variant = 'primary',
     size = 'md',
     disabled = false,
     onClick
   }) => {
     // Implementation
   }
   ```

### React Best Practices

1. **Functional Components**:
   ```typescript
   // Good: Use function components with hooks
   const ChatInterface: React.FC = () => {
     const [messages, setMessages] = useState<ChatMessage[]>([]);
     const [isLoading, setIsLoading] = useState(false);
     
     // Implementation
   }
   ```

2. **Custom Hooks**:
   ```typescript
   // Good: Extract reusable logic
   const useChat = () => {
     const [messages, setMessages] = useState<ChatMessage[]>([]);
     
     const sendMessage = useCallback(async (content: string) => {
       // Implementation
     }, []);
     
     return { messages, sendMessage };
   }
   ```

3. **Error Boundaries**:
   ```typescript
   // Good: Handle errors gracefully
   class ErrorBoundary extends React.Component {
     constructor(props: any) {
       super(props);
       this.state = { hasError: false };
     }
     
     static getDerivedStateFromError(error: Error) {
       return { hasError: true };
     }
     
     componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
       console.error('Error caught by boundary:', error, errorInfo);
     }
     
     render() {
       if ((this.state as any).hasError) {
         return <div>Something went wrong.</div>;
       }
       
       return this.props.children;
     }
   }
   ```

### Styling Guidelines

1. **Tailwind CSS Usage**:
   ```typescript
   // Good: Semantic class combinations
   const buttonStyles = cn(
     "inline-flex items-center px-4 py-2 border border-transparent",
     "text-sm font-medium rounded-md shadow-sm focus:outline-none",
     "focus:ring-2 focus:ring-offset-2 transition-colors",
     {
       "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500": variant === 'primary',
       "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500": variant === 'secondary',
     }
   );
   ```

2. **Responsive Design**:
   ```typescript
   // Good: Mobile-first responsive design
   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
     {items.map(item => (
       <div key={item.id} className="p-4 bg-white rounded-lg shadow">
         {/* Content */}
       </div>
     ))}
   </div>
   ```

### Testing Standards

1. **Unit Tests**:
   ```typescript
   // Good: Comprehensive component testing
   describe('ChatInterface', () => {
     it('renders message list correctly', () => {
       const messages = [
         { id: '1', role: 'user', content: 'Hello', timestamp: new Date() },
         { id: '2', role: 'assistant', content: 'Hi there!', timestamp: new Date() }
       ];
       
       render(<ChatInterface messages={messages} />);
       
       expect(screen.getByText('Hello')).toBeInTheDocument();
       expect(screen.getByText('Hi there!')).toBeInTheDocument();
     });
     
     it('handles message sending', async () => {
       const onSendMessage = jest.fn();
       
       render(<ChatInterface onSendMessage={onSendMessage} />);
       
       const input = screen.getByPlaceholderText('Type your message...');
       const button = screen.getByText('Send');
       
       fireEvent.change(input, { target: { value: 'Test message' } });
       fireEvent.click(button);
       
       await waitFor(() => {
         expect(onSendMessage).toHaveBeenCalledWith('Test message');
       });
     });
   });
   ```

2. **API Testing**:
   ```typescript
   // Good: API endpoint testing
   describe('/api/chat', () => {
     it('handles valid chat requests', async () => {
       const response = await POST(new Request('http://localhost/api/chat', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ message: 'Hello' })
       }));
       
       const data = await response.json();
       
       expect(response.status).toBe(200);
       expect(data.response).toBeDefined();
       expect(data.timestamp).toBeDefined();
     });
   });
   ```

## Submitting Changes

### 1. Push Changes

```bash
# Push your feature branch to your fork
git push origin feature/your-feature-name
```

### 2. Create Pull Request

1. **Navigate to Your Fork** on GitHub
2. **Click "Compare & pull request"** button
3. **Fill out the PR template** with:
   - Clear description of changes
   - Issue references (if applicable)
   - Testing instructions
   - Screenshots (for UI changes)

### 3. Pull Request Template

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

## Checklist:
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Screenshots (if applicable):
Add screenshots here for UI changes.

## Related Issues:
Fixes #(issue number)
```

## Issue Guidelines

### Creating Issues

1. **Search Existing Issues** first to avoid duplicates
2. **Use Issue Templates** provided
3. **Provide Clear Information**:
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Environment details
   - Screenshots/videos if helpful

### Issue Types

#### Bug Reports
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

#### Feature Requests
```markdown
**Is your feature request related to a problem? Please describe.**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## Pull Request Process

### 1. Review Process

1. **Automated Checks**: All CI checks must pass
2. **Code Review**: At least one maintainer review required
3. **Testing**: Ensure all tests pass
4. **Documentation**: Update docs if needed

### 2. Review Checklist

Reviewers will check for:

- [ ] Code quality and style adherence
- [ ] Test coverage for new features
- [ ] Documentation updates
- [ ] Performance implications
- [ ] Security considerations
- [ ] Backward compatibility

### 3. Addressing Feedback

```bash
# Make requested changes
git add .
git commit -m "address review feedback: improve error handling"
git push origin feature/your-feature-name
```

### 4. Merging

- **Squash and merge** is preferred for feature branches
- **Rebase and merge** for simple fixes
- **Merge commit** for complex features with multiple logical commits

## Community

### Getting Help

- **GitHub Discussions**: For general questions and discussions
- **GitHub Issues**: For bug reports and feature requests
- **Discord/Slack**: Join our community chat (if available)

### Recognition

Contributors are recognized in:
- CONTRIBUTORS.md file
- Release notes for significant contributions
- GitHub contributor graphs

### Maintainer Guidelines

For project maintainers:

1. **Be Welcoming**: Help new contributors feel welcome
2. **Be Responsive**: Respond to issues and PRs promptly
3. **Be Constructive**: Provide helpful feedback
4. **Be Consistent**: Apply standards fairly

## Additional Resources

- [Development Guide](../guides/development.md)
- [Architecture Overview](../architecture/README.md)
- [API Documentation](../api/README.md)
- [Deployment Guide](../deployment/README.md)

---

Thank you for contributing to Harmonic Dashboard! Your contributions help make this project better for everyone. 🚀