import { QueryResult, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  number: string;
  name: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  types: [string];
  resistant: [string];
  weaknesses: [string];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
};

interface PokemonQueryData {
  pokemon: Pokemon | null;
}

interface PokemonQueryVariables {
  id?: string;
  name?: string;
}

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
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

export const useGetPokemonDetails = (
  pokemonId: string,
  pokemonName: string
): QueryResult<PokemonQueryData, PokemonQueryVariables> => {
  const { data, ...queryRes } = useQuery<
    PokemonQueryData,
    PokemonQueryVariables
  >(GET_POKEMON, {
    variables: {
      id: pokemonId,
      name: pokemonName,
    },
  });

  return {
    data,
    ...queryRes,
  };
};
