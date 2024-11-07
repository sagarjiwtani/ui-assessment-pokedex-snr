import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  name: string;
};

// export type PokemonOption = {
//   value: Pokemon['id'];
//   label: Pokemon['name'];
// };

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
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

export const useGetPokemonDetails = (pokemonId: string,
    pokemonName: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON, {
    variables: {
        "id": pokemonId,
        "name": pokemonName
      },
  });
console.log('data--',data)
//   const pokemons: Pokemon = useMemo(() => data?.pokemon || [], [data]);

//   const pokemonOptions: PokemonOption[] = useMemo(
//     () => pokemons.map((p: Pokemon) => ({ value: p.id, label: p.name })),
//     [pokemons]
//   );

  return {
    data,
    // pokemonOptions,
    ...queryRes,
  };
};
