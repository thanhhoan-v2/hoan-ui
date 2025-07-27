import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    title: 'TypeScript First',
    description: 'Full type safety with comprehensive TypeScript definitions',
  },
  {
    title: 'Tailwind Powered',
    description: 'Utility-first CSS with consistent design tokens',
  },
  {
    title: 'Copy & Paste',
    description: 'No package installation required. Just copy the code you need',
  },
];

const components = [
  {
    title: 'Hello World',
    description: 'A simple getting started component',
    href: '/docs',
    tags: ['Basic', 'Getting Started'],
  },
  {
    title: 'Contact Form',
    description: 'Form with Zod validation and error handling',
    href: '/docs/components/contact-form',
    tags: ['Forms', 'Validation'],
  },
  {
    title: 'Pokemon Browser',
    description: 'Complex component with hooks and API integration',
    href: '/docs/components/pokemon-browser',
    tags: ['Complex', 'Hooks', 'API'],
  },
  {
    title: 'Login Card',
    description: 'Custom CSS styling with modern design',
    href: '/docs/components/login-card',
    tags: ['CSS', 'Design'],
  },
];

export default function HomePage() {
  return (
    <main className='flex flex-1 flex-col'>
      {/* Hero Section */}
      <section className='flex min-h-screen flex-col items-center justify-center px-4 text-center'>
        <div className='mx-auto max-w-4xl space-y-6'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
            Hoan UI
          </h1>
          <p className='text-xl text-muted-foreground max-w-2xl'>
            A collection of reusable React components built with TypeScript, Tailwind CSS, and modern best practices.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button asChild size="lg">
              <Link href='/docs'>
                View Documentation
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href='#components'>
                Browse Components
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 px-4 bg-muted/50'>
        <div className='mx-auto max-w-6xl'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold tracking-tight mb-4'>Why Hoan UI?</h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Built for developers who want high-quality, customizable components
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section id='components' className='py-20 px-4'>
        <div className='mx-auto max-w-6xl'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold tracking-tight mb-4'>Component Library</h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Explore our collection of production-ready components with live previews and documentation
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {components.map((component) => (
              <Card key={component.title} className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <CardTitle className='text-xl'>{component.title}</CardTitle>
                  <CardDescription className='mt-2'>
                    {component.description}
                  </CardDescription>
                  <div className='flex gap-2 mt-3'>
                    {component.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className='pt-0'>
                  <Button asChild variant="outline" className='w-full'>
                    <Link href={component.href}>
                      View Component
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 bg-muted/50'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight mb-4'>
            Ready to get started?
          </h2>
          <p className='text-lg text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Browse the documentation to learn how to install and customize these components for your project.
          </p>
          <Button asChild size="lg">
            <Link href='/docs'>
              Get Started
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
