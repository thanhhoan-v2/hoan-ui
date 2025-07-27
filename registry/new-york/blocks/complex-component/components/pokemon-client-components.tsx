'use client';

/* eslint-disable @next/next/no-img-element */
import { usePokemonImage } from '@/registry/new-york/blocks/complex-component/hooks/use-pokemon';
import { Card, CardContent } from '@/registry/new-york/ui/card';

export function PokemonImage({ name, number }: { name: string; number: number }) {
  const imageUrl = usePokemonImage(number);

  if (!imageUrl) {
    return null;
  }

  return <img alt={name} src={imageUrl} />;
}

export function PokemonCard({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className='flex flex-col items-center p-2'>
        <div>{children}</div>
        <div className='text-center font-medium'>{name}</div>
      </CardContent>
    </Card>
  );
}
