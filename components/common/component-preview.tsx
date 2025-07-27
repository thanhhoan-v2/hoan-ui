'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import {
  AlertCircle,
  Check,
  Code2,
  Copy,
  Eye,
  GripVertical,
  Maximize2,
  Monitor,
  Smartphone,
  Tablet,
} from 'lucide-react';

import { getRegistryItem } from '@/lib/registry';
import { getComponentInfo } from '@/lib/source-reader';
import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ComponentPreviewProps {
  component: string;
  className?: string;
}

type ViewportSize = 'mobile' | 'tablet' | 'desktop' | 'full';

const viewportSizes = {
  mobile: { width: 375, height: 667, icon: Smartphone },
  tablet: { width: 768, height: 1024, icon: Tablet },
  desktop: { width: 1024, height: 768, icon: Monitor },
  full: { width: '100%', height: '100%', icon: Maximize2 },
};

export function ComponentPreview({ component: componentName, className }: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState('preview');
  const [viewportSize, setViewportSize] = useState<ViewportSize>('full');
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [componentData, setComponentData] = useState<any>(null);
  const [componentInfo, setComponentInfo] = useState<any>(null);

  const dragRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadComponentData() {
      try {
        setLoading(true);
        setError(null);

        // Load both registry data and component info
        const [registryData, info] = await Promise.all([
          getRegistryItem(componentName),
          getComponentInfo(componentName),
        ]);

        if (!registryData) {
          throw new Error(`Component "${componentName}" not found in registry`);
        }

        setComponentData(registryData);
        setComponentInfo(info);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : `Failed to load component "${componentName}"`
        );
      } finally {
        setLoading(false);
      }
    }

    loadComponentData();
  }, [componentName]);

  const copyToClipboard = async () => {
    if (!componentInfo?.source) return;

    try {
      await navigator.clipboard.writeText(componentInfo.source);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewportSize === 'full') return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || viewportSize === 'full') return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    if (previewRef.current) {
      const parentRect = previewRef.current.getBoundingClientRect();
      const maxX =
        parentRect.width -
        (typeof viewportSizes[viewportSize].width === 'number'
          ? (viewportSizes[viewportSize].width as number)
          : 0);
      const maxY =
        parentRect.height -
        (typeof viewportSizes[viewportSize].height === 'number'
          ? (viewportSizes[viewportSize].height as number)
          : 0);

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, viewportSize]);

  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, [viewportSize]);

  const getPreviewStyle = () => {
    const size = viewportSizes[viewportSize];
    if (viewportSize === 'full') {
      return { width: '100%', height: '100%' };
    }

    return {
      width: size.width,
      height: size.height,
      transform: `translate(${position.x}px, ${position.y}px)`,
      cursor: isDragging ? 'grabbing' : 'grab',
    };
  };

  if (error) {
    return (
      <Card className={cn('border-destructive w-full', className)}>
        <CardContent className='p-6'>
          <div className='flex items-center gap-2 mb-2 text-destructive'>
            <AlertCircle className='w-5 h-5' />
            <span className='font-medium'>Error Loading Component</span>
          </div>
          <p className='text-muted-foreground text-sm'>{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!componentData || !componentInfo) {
    return null;
  }

  const formattedTitle = componentName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className='pb-4'>
        <div className='flex justify-between items-start'>
          <div className='space-y-2'>
            <CardTitle className='font-semibold text-xl'>{formattedTitle}</CardTitle>
            <p className='text-muted-foreground text-sm'>{componentData.description}</p>
            <div className='flex flex-wrap gap-2'>
              <Badge variant='secondary' className='text-xs'>
                {componentName}
              </Badge>
              {/* <Badge variant='outline' className='text-xs'>
                {componentData.type}
              </Badge> */}
              {componentData.dependencies.length > 0 && (
                <Badge variant='outline' className='text-xs'>
                  {componentData.dependencies.length} dependencies
                </Badge>
              )}
              {componentData.registryDependencies.length > 0 && (
                <div className='flex flex-wrap gap-1'>
                  {componentData.registryDependencies.map((dep: string) => (
                    <Badge key={dep} variant='outline' className='text-xs'>
                      {dep}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-0'>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <div className='flex justify-between items-center px-6 pb-4'>
            <TabsList className='grid grid-cols-2 w-fit'>
              <TabsTrigger value='preview' className='flex items-center gap-2'>
                <Eye className='w-4 h-4' />
                Preview
              </TabsTrigger>
              <TabsTrigger value='code' className='flex items-center gap-2'>
                <Code2 className='w-4 h-4' />
                Source Code
              </TabsTrigger>
            </TabsList>

            {activeTab === 'preview' && (
              <div className='flex items-center gap-2'>
                {Object.entries(viewportSizes).map(([size, config]) => {
                  const Icon = config.icon;
                  return (
                    <Button
                      key={size}
                      variant={viewportSize === size ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => setViewportSize(size as ViewportSize)}
                      className='p-0 w-8 h-8'
                    >
                      <Icon className='w-4 h-4' />
                    </Button>
                  );
                })}
              </div>
            )}

            {activeTab === 'code' && (
              <Button
                variant='outline'
                size='sm'
                onClick={copyToClipboard}
                className='flex items-center gap-2 bg-transparent'
              >
                {copied ? <Check className='w-4 h-4' /> : <Copy className='w-4 h-4' />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            )}
          </div>

          <Separator />

          <TabsContent value='preview' className='mt-0'>
            <div
              ref={previewRef}
              className='relative bg-background p-6 min-h-[400px] overflow-hidden'
            >
              {viewportSize !== 'full' && (
                <div className='absolute inset-0 bg-muted/20 pointer-events-none' />
              )}

              <div
                ref={dragRef}
                className={cn(
                  'bg-background relative overflow-hidden rounded-lg border',
                  viewportSize !== 'full' && 'shadow-lg',
                  isDragging && 'select-none'
                )}
                style={getPreviewStyle()}
                onMouseDown={handleMouseDown}
              >
                {viewportSize !== 'full' && (
                  <div className='top-2 left-2 z-10 absolute flex items-center gap-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-muted-foreground text-xs'>
                    <GripVertical className='w-3 h-3' />
                    {viewportSizes[viewportSize].width} × {viewportSizes[viewportSize].height}
                  </div>
                )}

                <div className={cn('p-6', viewportSize !== 'full' && 'h-full overflow-auto')}>
                  {componentData.component && <componentData.component />}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='code' className='p-0'>
            <DynamicCodeBlock
              code={componentInfo.source}
              lang='tsx'
              options={{
                themes: {
                  light: 'github-light',
                  dark: 'github-dark',
                },
              }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
