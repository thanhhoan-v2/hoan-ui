import { cache } from 'react';

import {
  PokemonCard,
  PokemonImage,
} from '@/registry/new-york/blocks/complex-component/components/pokemon-client-components';
import { getPokemonList } from '@/registry/new-york/blocks/complex-component/lib/pokemon';
import { getPokemon } from '@/registry/new-york/blocks/complex-component/lib/pokemon';

const getCachedPokemonList = cache(getPokemonList);
const cachedGetPokemon = cache(getPokemon);

async function PokemonCardLoader({ name }: { name: string }) {
  const pokemon = await cachedGetPokemon(name);

  if (!pokemon) {
    return null;
  }

  return (
    <PokemonCard name={pokemon.name}>
      <PokemonImage name={pokemon.name} number={pokemon.id} />
    </PokemonCard>
  );
}


export default async function PokemonPage() {
  const pokemons = await getCachedPokemonList({ limit: 12 });

  if (!pokemons) {
    return null;
  }

  return (
    <div className='mx-auto w-full max-w-2xl px-4'>
      <div className='grid grid-cols-2 gap-4 py-10 sm:grid-cols-3 md:grid-cols-4'>
        {pokemons.results.map(p => (
          <PokemonCardLoader key={p.name} name={p.name} />
        ))}
      </div>
    </div>
  );
}
