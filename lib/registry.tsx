import type { ComponentType } from 'react';

import { getComponentInfo } from './source-reader';

export interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: {
    path: string;
    content: string;
    type: string;
  }[];
}

export interface ParsedRegistryItem extends RegistryItem {
  component: ComponentType;
  code: string;
}

// Dynamic component imports - these should match your actual component files
const componentModules = {
  'hello-world': () =>
    import('@/registry/new-york/blocks/hello-world/hello-world').then(m => m.HelloWorld),
};

export async function getRegistryItem(name: string): Promise<ParsedRegistryItem | null> {
  try {
    let registryData = null;
    let componentInfo = null;

    // Try to get component info (which includes fallback handling)
    componentInfo = await getComponentInfo(name);

    // If we have registry data from componentInfo, use it
    if (componentInfo.registryData) {
      registryData = componentInfo.registryData;
    } else {
      // Create minimal registry data from component info
      registryData = {
        name: name,
        type: componentInfo.type,
        title: componentInfo.title,
        description: componentInfo.description,
        registryDependencies: componentInfo.registryDependencies,
        files: [{ path: componentInfo.filePath, type: 'registry:component' }],
      };
    }

    // Try to import the component
    const componentModule = componentModules[name as keyof typeof componentModules];
    let component: ComponentType;

    if (componentModule) {
      try {
        component = await componentModule();
      } catch (importError) {
        console.warn(`Failed to import component "${name}":`, importError);
        component = createFallbackComponent(name);
      }
    } else {
      component = createFallbackComponent(name);
    }

    return {
      name: registryData.name,
      type: registryData.type,
      title: registryData.title,
      description: registryData.description,
      dependencies: componentInfo.dependencies,
      registryDependencies: registryData.registryDependencies || [],
      files: registryData.files || [],
      component,
      code: componentInfo.source,
    };
  } catch (error) {
    console.error(`Error loading registry item "${name}":`, error);
    return null;
  }
}

function createFallbackComponent(name: string): ComponentType {
  return () => {
    const formattedName = name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return (
      <div className='bg-muted/20 p-6 border border-muted-foreground/50 border-dashed rounded-lg'>
        <div className='space-y-2 text-center'>
          <h3 className='font-semibold text-lg'>{formattedName}</h3>
          <p className='text-muted-foreground text-sm'>Component preview not available</p>
          <p className='text-muted-foreground text-xs'>Using fallback display for "{name}"</p>
        </div>
      </div>
    );
  };
}

export async function getAllRegistryItems(): Promise<string[]> {
  try {
    return await getAvailableComponents();
  } catch (error) {
    console.error('Error getting registry items:', error);
    // Return hardcoded list as ultimate fallback
    return ['hello-world'];
  }
}

export function createComponentFromCode(code: string): ComponentType {
  // This is a simplified version - in a real implementation,
  // you might want to use a more sophisticated code execution method
  try {
    return () => {
      return (
        <div className='p-4 border border-muted-foreground/50 border-dashed rounded-lg'>
          <p className='text-muted-foreground text-sm'>Component code:</p>
          <pre className='mt-2 overflow-auto text-xs'>{code.slice(0, 200)}...</pre>
        </div>
      );
    };
  } catch (error) {
    console.error('Error creating component from code:', error);
    return () => <div>Error loading component</div>;
  }
}

async function getAvailableComponents(): Promise<string[]> {
  try {
    // Try to get components from index file
    const response = await fetch('/r/index.json');
    if (response.ok) {
      const indexData = await response.json();
      if (Array.isArray(indexData.components)) {
        return indexData.components;
      }
    }
  } catch (error) {
    console.log('Registry index not found, using fallback');
  }

  // Fallback to known components
  return Object.keys(componentModules);
}
