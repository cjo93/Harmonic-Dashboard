# Troubleshooting Guide

This guide helps you resolve common issues when working with Harmonic Dashboard.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Development Server Issues](#development-server-issues)
- [Build Issues](#build-issues)
- [Runtime Errors](#runtime-errors)
- [API Issues](#api-issues)
- [Performance Issues](#performance-issues)
- [Browser Compatibility](#browser-compatibility)
- [Getting Help](#getting-help)

## Installation Issues

### Node.js Version Compatibility

**Problem**: Getting errors about Node.js version compatibility.

**Solution**:
```bash
# Check your Node.js version
node --version

# Update to Node.js 20 or higher
# Using nvm (recommended)
nvm install 20
nvm use 20

# Or download from https://nodejs.org/
```

### npm Installation Failures

**Problem**: `npm install` fails with permission errors or network issues.

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
npm install

# If permission issues (don't use sudo with npm)
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH

# For network issues
npm install --registry https://registry.npmjs.org/
```

### Missing Dependencies

**Problem**: Build fails due to missing dependencies.

**Solution**:
```bash
# Install missing peer dependencies
npm install @tailwindcss/typography remark-gfm

# Check for outdated packages
npm audit
npm audit fix

# Update dependencies (be careful with major versions)
npm update
```

## Development Server Issues

### Port Already in Use

**Problem**: Port 3000 is already occupied.

**Solutions**:
```bash
# Next.js will automatically use next available port
# Check terminal output for actual port

# Or specify a different port
npm run dev -- -p 3001

# Kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Hot Reload Not Working

**Problem**: Changes not reflecting in browser.

**Solutions**:
```bash
# Restart development server
npm run dev

# Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)

# Check for file watching limits (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Environment Variables Not Loading

**Problem**: Environment variables not available in the application.

**Solution**:
```bash
# Ensure .env.local exists and has correct format
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Restart development server after adding env vars
npm run dev

# Check environment variables are loaded
console.log(process.env.NEXT_PUBLIC_API_URL)
```

## Build Issues

### TypeScript Compilation Errors

**Problem**: TypeScript errors preventing build.

**Solutions**:
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Common fixes:
# 1. Update type definitions
npm install --save-dev @types/node @types/react @types/react-dom

# 2. Check for missing type imports
import type { NextPage } from 'next'

# 3. Use type assertions carefully
const element = document.getElementById('id') as HTMLElement
```

### Import/Export Errors

**Problem**: Module import/export issues.

**Solutions**:
```typescript
// Use consistent import styles
// Good:
import { Component } from '@/components/Component'
import Component from '@/components/Component'

// Check tsconfig.json paths configuration
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

### Memory Issues During Build

**Problem**: Build fails with out of memory errors.

**Solutions**:
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Or add to package.json scripts:
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"

# Clear Next.js cache
rm -rf .next
npm run build
```

## Runtime Errors

### Hydration Mismatches

**Problem**: React hydration errors in browser console.

**Solutions**:
```typescript
// Ensure server and client render the same content
// Use dynamic imports for client-only components
import dynamic from 'next/dynamic'

const ClientOnlyComponent = dynamic(
  () => import('@/components/ClientOnlyComponent'),
  { ssr: false }
)

// Use useEffect for client-only code
useEffect(() => {
  // Client-only logic here
}, [])
```

### State Management Issues

**Problem**: Zustand store not updating or persisting.

**Solutions**:
```typescript
// Check store subscriptions
const { messages, addMessage } = useStore()

// Ensure proper state updates (immutable)
// Good:
set(state => ({ messages: [...state.messages, newMessage] }))

// Bad:
set(state => {
  state.messages.push(newMessage) // Mutating state
  return state
})

// Check for multiple store instances
// Ensure store is properly exported/imported
```

### Component Not Rendering

**Problem**: Components not displaying correctly.

**Solutions**:
```typescript
// Check component exports/imports
// Good:
export default function Component() { }
import Component from './Component'

// Check for missing keys in lists
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}

// Verify conditional rendering
{isLoading ? <Spinner /> : <Content />}
```

## API Issues

### API Route Not Found

**Problem**: 404 errors for API endpoints.

**Solutions**:
```bash
# Check file structure
src/app/api/
├── chat/
│   └── route.ts
└── documentation/
    └── route.ts

# Ensure proper export names
export async function GET(request: NextRequest) { }
export async function POST(request: NextRequest) { }

# Restart development server
npm run dev
```

### CORS Issues

**Problem**: Cross-origin request errors.

**Solutions**:
```typescript
// Add CORS headers in API routes
export async function POST(request: NextRequest) {
  const response = NextResponse.json(data)
  
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  
  return response
}

// Or use Next.js middleware
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  response.headers.set('Access-Control-Allow-Origin', '*')
  return response
}
```

### Request/Response Issues

**Problem**: API requests failing or returning unexpected data.

**Solutions**:
```typescript
// Add proper error handling
try {
  const response = await fetch('/api/endpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }
  
  const result = await response.json()
  return result
} catch (error) {
  console.error('API Error:', error)
  throw error
}

// Validate request data
if (!request.body) {
  return NextResponse.json(
    { error: 'Request body is required' },
    { status: 400 }
  )
}
```

## Performance Issues

### Slow Page Loads

**Problem**: Application loading slowly.

**Solutions**:
```typescript
// Use dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
})

// Optimize images
import Image from 'next/image'
<Image src="/image.jpg" alt="Description" width={800} height={600} />

// Check bundle size
npm run build
npm install --save-dev @next/bundle-analyzer
ANALYZE=true npm run build
```

### Memory Leaks

**Problem**: Application consuming too much memory.

**Solutions**:
```typescript
// Clean up event listeners and subscriptions
useEffect(() => {
  const handleResize = () => { /* handler */ }
  window.addEventListener('resize', handleResize)
  
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])

// Avoid creating objects in render
// Bad:
<Component style={{ marginTop: 10 }} />

// Good:
const styles = { marginTop: 10 }
<Component style={styles} />
```

## Browser Compatibility

### Modern Browser Features

**Problem**: Features not working in older browsers.

**Solutions**:
```bash
# Check browserslist configuration
# package.json
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not IE <= 11"
]

# Add polyfills if needed
npm install core-js
```

### CSS Issues

**Problem**: Styles not displaying correctly.

**Solutions**:
```bash
# Ensure Tailwind CSS is properly configured
npm run build

# Check for CSS conflicts
# Use browser dev tools to inspect styles

# Verify PostCSS configuration
# postcss.config.js should include tailwindcss
```

## Getting Help

### Debug Information to Provide

When asking for help, include:

1. **Environment Details**:
   ```bash
   node --version
   npm --version
   npx next --version
   ```

2. **Error Messages**: Complete error text and stack traces

3. **Steps to Reproduce**: Detailed steps to reproduce the issue

4. **Expected vs Actual Behavior**: What you expected vs what happened

5. **Code Samples**: Relevant code snippets (use code blocks)

6. **Browser/OS Information**: Browser version and operating system

### Where to Get Help

1. **GitHub Issues**: [Create an issue](https://github.com/cjo93/Harmonic-Dashboard/issues)
2. **Documentation**: Check our [comprehensive docs](../README.md)
3. **Stack Overflow**: Tag questions with `harmonic-dashboard` and `nextjs`
4. **Community**: Join our discussions

### Before Asking for Help

1. **Search existing issues** on GitHub
2. **Check the documentation** thoroughly
3. **Try basic troubleshooting** steps above
4. **Prepare a minimal reproduction** of the issue
5. **Include all relevant information** in your request

---

If you can't find a solution here, don't hesitate to [create an issue](https://github.com/cjo93/Harmonic-Dashboard/issues) with detailed information about your problem.