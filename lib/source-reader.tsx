// This utility reads source code from registry JSON files in public/r/
export async function getComponentSource(componentPath: string): Promise<string> {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      // Server-side: use a fallback or return placeholder
      return getFallbackSource(componentPath);
    }

    // Fetch the registry JSON file from public/r/
    const response = await fetch(`/r/${componentPath}.json`);

    if (!response.ok) {
      console.warn(`Registry file not found: /r/${componentPath}.json (${response.status})`);
      return getFallbackSource(componentPath);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn(`Registry file is not JSON: /r/${componentPath}.json`);
      return getFallbackSource(componentPath);
    }

    const registryData = await response.json();

    // Extract the source code from the first file in the registry
    if (registryData.files && registryData.files.length > 0) {
      const firstFile = registryData.files[0];
      if (firstFile.content) {
        console.log(`✅ Successfully read source from registry: ${componentPath}`);
        return firstFile.content;
      }
    }

    console.warn(`No content found in registry file for: ${componentPath}`);
    return getFallbackSource(componentPath);
  } catch (error) {
    console.error(`❌ Error reading registry source for ${componentPath}:`, error);
    return getFallbackSource(componentPath);
  }
}

function getFallbackSource(componentPath: string): string {
  // Return hardcoded source for known components as fallback
  const fallbackSources: Record<string, string> = {
    'example-card': `import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ExampleCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Example Component</CardTitle>
        <CardDescription>This is an example component being previewed in the registry.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Badge>React</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="outline">Tailwind</Badge>
        </div>
        <div className="flex gap-2">
          <Button>Primary</Button>
          <Button variant="outline">Secondary</Button>
        </div>
      </CardContent>
    </Card>
  )
}`,
    'pricing-card': `import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from 'lucide-react'

export function PricingCard() {
  const features = ["10 projects", "Up to 1,000 subscribers", "Basic analytics", "48-hour support response time"]

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <Badge className="mx-auto mb-2 w-fit" variant="secondary">
          Most Popular
        </Badge>
        <CardTitle className="text-2xl">Pro Plan</CardTitle>
        <CardDescription>Perfect for growing businesses</CardDescription>
        <div className="mt-4 font-bold text-3xl">
          $29<span className="font-normal text-muted-foreground text-sm">/month</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full">Get Started</Button>
      </CardContent>
    </Card>
  )
}`,
    'stats-card': `import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'

export function StatsCard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+180.1%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Conversion Rate",
      value: "12.5%",
      change: "+19%",
      icon: Activity,
      trend: "up",
    },
    {
      title: "Growth Rate",
      value: "573",
      change: "+201%",
      icon: TrendingUp,
      trend: "up",
    },
  ]

  return (
    <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center space-y-0 pb-2">
                <h3 className="font-medium text-sm">{stat.title}</h3>
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-2xl">{stat.value}</div>
                <p className="text-muted-foreground text-xs">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}`,
  };

  return (
    fallbackSources[componentPath] ||
    `// Fallback source for: ${componentPath}
export function ${componentPath
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')}() {
  return (
    <div className="p-4 border border-muted-foreground/50 border-dashed rounded-lg">
      <p className="text-muted-foreground text-sm">
        Component source not available (using fallback)
      </p>
    </div>
  )
}`
  );
}

export async function getComponentInfo(componentName: string) {
  try {
    let registryData = null;
    let source = '';

    // Try to fetch registry data if in browser
    if (typeof window !== 'undefined') {
      try {
        const response = await fetch(`/r/${componentName}.json`);
        if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
          registryData = await response.json();
          source = registryData.files?.[0]?.content || '';
        }
      } catch (error) {
        console.warn(`Could not fetch registry data for ${componentName}:`, error);
      }
    }

    // Use fallback if no registry data
    if (!source) {
      source = getFallbackSource(componentName);
      registryData = getFallbackRegistryData(componentName);
    }

    // Extract basic info from source code
    const lines = source.split('\n');
    const imports = lines.filter(line => line.trim().startsWith('import'));

    // Extract function/component name
    const exportMatches = [
      source.match(/export\s+function\s+(\w+)/),
      source.match(/export\s+const\s+(\w+)\s*=/),
      source.match(/export\s+default\s+function\s+(\w+)/),
      source.match(/function\s+(\w+)\s*\(/),
      source.match(/const\s+(\w+)\s*=\s*\(/),
      source.match(/export\s*{\s*(\w+)\s*}/),
    ];

    const functionName =
      exportMatches.find(match => match)?.[1] || registryData?.title || componentName;

    const dependencies = extractDependencies(imports);

    return {
      source,
      imports,
      functionName,
      lineCount: lines.length,
      hasTypeScript:
        source.includes(': ') ||
        source.includes('interface ') ||
        source.includes('type ') ||
        registryData?.files?.[0]?.path?.endsWith('.tsx'),
      dependencies,
      fileSize: Buffer.byteLength(source, 'utf8'),
      registryData,
      title: registryData?.title || componentName,
      description: registryData?.description || `A ${componentName} component`,
      registryDependencies: registryData?.registryDependencies || [],
      type: registryData?.type || 'registry:component',
      filePath: registryData?.files?.[0]?.path || `components/${componentName}.tsx`,
    };
  } catch (error) {
    console.error(`Error loading registry info for ${componentName}:`, error);
    const fallbackSource = getFallbackSource(componentName);
    return {
      source: fallbackSource,
      imports: [],
      functionName: componentName,
      lineCount: fallbackSource.split('\n').length,
      hasTypeScript: true,
      dependencies: [],
      fileSize: Buffer.byteLength(fallbackSource, 'utf8'),
      registryData: getFallbackRegistryData(componentName),
      title: componentName,
      description: `A ${componentName} component`,
      registryDependencies: [],
      type: 'registry:component',
      filePath: `components/${componentName}.tsx`,
    };
  }
}

function getFallbackRegistryData(componentName: string) {
  const fallbackData: Record<string, any> = {
    'example-card': {
      name: 'example-card',
      type: 'registry:component',
      title: 'Example Card',
      description: 'A versatile card component with header, content, and action areas.',
      registryDependencies: ['button', 'card', 'badge'],
      files: [{ path: 'components/example-card.tsx', type: 'registry:component' }],
    },
    'pricing-card': {
      name: 'pricing-card',
      type: 'registry:component',
      title: 'Pricing Card',
      description: 'A pricing card component with features list and call-to-action button.',
      registryDependencies: ['button', 'card', 'badge'],
      files: [{ path: 'components/pricing-card.tsx', type: 'registry:component' }],
    },
    'stats-card': {
      name: 'stats-card',
      type: 'registry:component',
      title: 'Stats Card',
      description: 'A statistics card component displaying key metrics with icons.',
      registryDependencies: ['card'],
      files: [{ path: 'components/stats-card.tsx', type: 'registry:component' }],
    },
  };

  return (
    fallbackData[componentName] || {
      name: componentName,
      type: 'registry:component',
      title: componentName,
      description: `A ${componentName} component`,
      registryDependencies: [],
      files: [{ path: `components/${componentName}.tsx`, type: 'registry:component' }],
    }
  );
}

// Helper function to check if a registry file exists
export async function componentExists(componentName: string): Promise<boolean> {
  if (typeof window === 'undefined') {
    // Server-side: assume component exists if we have fallback data
    return ['example-card', 'pricing-card', 'stats-card'].includes(componentName);
  }

  try {
    const response = await fetch(`/r/${componentName}.json`);
    return (
      (response.ok && response.headers.get('content-type')?.includes('application/json')) || false
    );
  } catch {
    return false;
  }
}

// Helper function to get all available components
export async function getAvailableComponents(): Promise<string[]> {
  // Always return the known components as fallback
  const knownComponents = ['example-card', 'pricing-card', 'stats-card'];

  if (typeof window === 'undefined') {
    return knownComponents;
  }

  try {
    // Try to fetch an index file first
    const indexResponse = await fetch('/r/index.json');
    if (
      indexResponse.ok &&
      indexResponse.headers.get('content-type')?.includes('application/json')
    ) {
      const indexData = await indexResponse.json();
      if (Array.isArray(indexData.components)) {
        return indexData.components;
      }
    }
  } catch (error) {
    console.log('No registry index found, using fallback list');
  }

  return knownComponents;
}

// Helper function to get registry file URL
export function getRegistryFileUrl(componentName: string): string {
  return `/r/${componentName}.json`;
}

// Helper function to read component metadata from registry
export async function getComponentMetadata(componentName: string): Promise<{
  title?: string;
  description?: string;
  author?: string;
  version?: string;
  tags?: string[];
  registryDependencies?: string[];
  type?: string;
  schema?: string;
}> {
  try {
    const response = await fetch(`/r/${componentName}.json`);

    if (!response.ok) {
      throw new Error(`Registry file not found: /r/${componentName}.json`);
    }

    const registryData = await response.json();

    return {
      title: registryData.title,
      description: registryData.description,
      author: registryData.author,
      version: registryData.version,
      tags: registryData.tags,
      registryDependencies: registryData.registryDependencies || [],
      type: registryData.type,
      schema: registryData.$schema,
    };
  } catch (error) {
    console.error(`Error reading registry metadata for ${componentName}:`, error);
    return {};
  }
}

// Helper function to get all files from a registry component
export async function getComponentFiles(componentName: string): Promise<
  Array<{
    path: string;
    content: string;
    type: string;
  }>
> {
  try {
    const response = await fetch(`/r/${componentName}.json`);

    if (!response.ok) {
      throw new Error(`Registry file not found: /r/${componentName}.json`);
    }

    const registryData = await response.json();
    return registryData.files || [];
  } catch (error) {
    console.error(`Error reading registry files for ${componentName}:`, error);
    return [];
  }
}

// Helper function to parse registry dependencies
export async function getRegistryDependencies(componentName: string): Promise<string[]> {
  try {
    const metadata = await getComponentMetadata(componentName);
    return metadata.registryDependencies || [];
  } catch (error) {
    console.error(`Error reading registry dependencies for ${componentName}:`, error);
    return [];
  }
}

// Helper function to extract dependencies from imports
function extractDependencies(imports: string[]): string[] {
  const dependencies: string[] = [];
  imports.forEach(importLine => {
    const match = importLine.match(/from\s+"([^"]+)"/);
    if (match) {
      dependencies.push(match[1]);
    }
  });
  return dependencies;
}
