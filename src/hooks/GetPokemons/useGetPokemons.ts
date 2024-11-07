import { useMemo } from 'react';
import { QueryResult, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Pokemon } from '../GetPokemonDetails/useGetPokemonDetails';

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
};

export type GetPokemonsData = {
  pokemons: Pokemon[];
};

export type GetPokemonsVars = {
  first: number;
};

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemons = (): {
  pokemons: Pokemon[];
  pokemonOptions: PokemonOption[];
} & Partial<QueryResult<GetPokemonsData, GetPokemonsVars>> => {
  const { data, ...queryRes } = useQuery<GetPokemonsData, GetPokemonsVars>(
    GET_POKEMONS,
    {
      variables: {
        first: 151, // Keep hard coded
      },
    }
  );

  const pokemons: Pokemon[] = useMemo(() => data?.pokemons || [], [data]);

  const pokemonOptions: PokemonOption[] = useMemo(
    () => pokemons.map((p: Pokemon) => ({ value: p.id, label: p.name })),
    [pokemons]
  );

  return {
    pokemons,
    pokemonOptions,
    ...queryRes,
  };
};
