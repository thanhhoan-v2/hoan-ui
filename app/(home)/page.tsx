import Link from 'next/link';

import { OpenInV0Button } from '@/components/open-in-v0-button';

import PokemonPage from '@/registry/new-york/blocks/complex-component/components/pokemon-page';
import { ExampleForm } from '@/registry/new-york/blocks/example-form/example-form';
import { ExampleCard } from '@/registry/new-york/blocks/example-with-css/example-card';
import { HelloWorld } from '@/registry/new-york/blocks/hello-world/hello-world';

export default function HomePage() {
  return (
    <main className='flex flex-1 flex-col justify-center text-center'>
      <div className='flex h-screen flex-col justify-center'>
        <h1 className='mb-4 text-2xl font-bold'>Hello World</h1>
        <p className='text-fd-muted-foreground'>
          You can open{' '}
          <Link className='text-fd-foreground font-semibold underline' href='/docs'>
            /docs
          </Link>{' '}
          and see the documentation.
        </p>
        <p className='mt-4'>Scroll down to see the custom registry</p>
      </div>

      <div className='mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8'>
        <header className='flex flex-col gap-1'>
          <h1 className='text-3xl font-bold tracking-tight'>Custom Registry</h1>
        </header>
        <main className='flex flex-1 flex-col gap-8'>
          <div className='relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-muted-foreground text-sm sm:pl-3'>
                A simple hello world component
              </h2>
              <OpenInV0Button className='w-fit' name='hello-world' />
            </div>
            <div className='relative flex min-h-[400px] items-center justify-center'>
              <HelloWorld />
            </div>
          </div>

          <div className='relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-muted-foreground text-sm sm:pl-3'>
                A contact form with Zod validation.
              </h2>
              <OpenInV0Button className='w-fit' name='example-form' />
            </div>
            <div className='relative flex min-h-[500px] items-center justify-center'>
              <ExampleForm />
            </div>
          </div>

          <div className='relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-muted-foreground text-sm sm:pl-3'>
                A complex component showing hooks, libs and components.
              </h2>
              <OpenInV0Button className='w-fit' name='complex-component' />
            </div>
            <div className='relative flex min-h-[400px] items-center justify-center'>
              <PokemonPage />
            </div>
          </div>

          <div className='relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-muted-foreground text-sm sm:pl-3'>
                A login form with a CSS file.
              </h2>
              <OpenInV0Button className='w-fit' name='example-with-css' />
            </div>
            <div className='relative flex min-h-[400px] items-center justify-center'>
              <ExampleCard />
            </div>
          </div>
        </main>
      </div>
    </main>
  );
}
