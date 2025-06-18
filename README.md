# Hoan UI - Glassmorphism Component Library

A modern, AI-powered UI component library featuring beautiful glassmorphism effects and intelligent component recommendations. Build stunning interfaces with components that adapt to your needs through natural language descriptions.

## ✨ Features

### **Smart Component Mapping**

When users type "Create a user dashboard", the AI analyzes the request and suggests a curated set of components:

- Header/Navigation components
- User profile cards
- Data visualization components (charts, metrics)
- Activity feeds or recent items
- Quick action buttons
- Settings panels

### Interactive Experience

**Visual Preview**: Show a wireframe or mockup of how these components could work together, not just a list
**Component Relationships**: Highlight how components connect ("This data table pairs well with these filter components")
**Customization Options**: Let users refine the suggestion ("Make it more minimal" or "Add analytics focus")

### Smart Suggestions Engine

```
User Input: "E-commerce product page"
AI Output:
├── Product image gallery
├── Product details card
├── Price & availability
├── Add to cart button
├── Reviews section
├── Related products grid
└── Breadcrumb navigation
```

### Advanced Features

- **Industry-specific suggestions**: Different component sets for SaaS, e-commerce, portfolios, etc.
- **Complexity levels**: Beginner gets basic components, advanced users get more sophisticated options
- **Integration hints**: "These components work great with React Hook Form" or "Pairs well with Framer Motion"

### Interactive Demo Flow

1. **Prompt input**: Natural language description
2. **Component suggestion**: Visual grid of recommended components
3. **Live preview**: See components assembled in a rough layout
4. **Export options**: Copy code, download components, or save to favorites
5. **Refinement**: "Add authentication" or "Make it mobile-first"

### Content Strategy

- **Example prompts**: Show inspiring examples like "social media app", "project management tool", "restaurant website"
- **Use case library**: Let users browse by common scenarios
- **Community suggestions**: Users can share and vote on effective prompts

## 🚀 Getting Started

### Installation

```bash
npm install hoan-ui
# or
yarn add hoan-ui
# or
pnpm add hoan-ui
```

### Basic Usage

```tsx
import { GlassCard, GlassButton } from 'hoan-ui'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-400">
      <GlassCard className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to Hoan UI</h1>
        <GlassButton>Get Started</GlassButton>
      </GlassCard>
    </div>
  )
}
```

### AI-Powered Component Discovery

```tsx
import { useAIComponents } from 'hoan-ui'

function ComponentExplorer() {
  const { suggestComponents, components } = useAIComponents()
  
  const handlePrompt = async (prompt) => {
    const suggestions = await suggestComponents(prompt)
    // Returns curated component suggestions based on your description
  }
  
  return (
    <div>
      <input 
        placeholder="Describe what you want to build..."
        onChange={(e) => handlePrompt(e.target.value)}
      />
      {/* Display suggested components */}
    </div>
  )
}
```

## 🎨 Glassmorphism Components

Our components feature beautiful glassmorphism effects with:

- **Frosted glass backgrounds** with backdrop blur
- **Subtle borders** and shadows for depth
- **Smooth animations** and transitions
- **Responsive design** that works on all devices
- **Customizable themes** and color schemes

### Available Components

- `GlassCard` - Versatile container with glassmorphism effects
- `GlassButton` - Interactive buttons with glass styling
- `GlassInput` - Form inputs with translucent backgrounds
- `GlassModal` - Modal dialogs with backdrop blur
- `GlassNavbar` - Navigation bars with glass effects
- `GlassSidebar` - Sidebar navigation components
- `GlassTable` - Data tables with glass styling
- `GlassChart` - Data visualization components

## 🤖 AI Integration

### Natural Language Component Discovery

Simply describe what you want to build, and our AI will suggest the perfect components:

```tsx
// "Create a dashboard for a fitness app"
const suggestions = await suggestComponents("fitness dashboard")
// Returns: [GlassCard, GlassChart, GlassButton, GlassNavbar, ...]
```

### Smart Component Relationships

Our AI understands how components work together:

```tsx
// "Add a data table with filters"
const enhancedSuggestions = await suggestComponents("data table with filters")
// Returns: [GlassTable, GlassInput, GlassButton, GlassCard, ...]
// Plus integration hints: "Works great with React Hook Form"
```

## 📚 Examples

### Example Prompts

Try these inspiring examples:

- **"Social media app"** - Profile cards, post feeds, navigation
- **"Project management tool"** - Kanban boards, task lists, progress charts
- **"Restaurant website"** - Menu cards, reservation forms, gallery
- **"E-commerce store"** - Product grids, shopping carts, checkout flows
- **"Portfolio site"** - Project showcases, contact forms, about sections

### Use Case Library

Browse common scenarios and see how components work together:

- **SaaS Dashboards** - Analytics, user management, settings
- **E-commerce** - Product catalogs, shopping experiences
- **Portfolios** - Creative showcases, contact forms
- **Blogs** - Article layouts, comment systems
- **Admin Panels** - Data management, user controls

## 🔧 Customization

### Theme Configuration

```tsx
import { HoanUIProvider } from 'hoan-ui'

function App() {
  return (
    <HoanUIProvider
      theme={{
        glassOpacity: 0.1,
        blurAmount: '10px',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: 'rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Your app */}
    </HoanUIProvider>
  )
}
```

### Component Variants

```tsx
<GlassCard variant="elevated" size="large">
  <GlassButton variant="primary" size="medium">
    Action
  </GlassButton>
</GlassCard>
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- React 18+
- TypeScript 5+

### Setup

```bash
git clone https://github.com/your-username/hoan-ui.git
cd hoan-ui
pnpm install
pnpm dev
```

### Building

```bash
pnpm build
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Community Suggestions

Share your favorite component combinations and prompts with the community:

1. Create a new issue with the "suggestion" label
2. Describe your use case and component needs
3. Include screenshots or mockups if possible
4. Vote on existing suggestions

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Glassmorphism effects inspired by modern design trends
- AI recommendations powered by advanced language models

---

**Ready to build something beautiful?** Start with a simple prompt and let our AI guide you to the perfect components! 🚀
