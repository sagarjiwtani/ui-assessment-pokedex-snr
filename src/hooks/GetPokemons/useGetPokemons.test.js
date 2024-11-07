import { renderHook, act } from '@testing-library/react-hooks';
import { useGetPokemons, GET_POKEMONS } from './useGetPokemons'; // Adjust path if needed
import { MockedProvider } from '@apollo/react-testing';
import { InMemoryCache } from 'apollo-boost';

const mockData = {
  pokemons: [
    {
      id: '1',
      name: 'Bulbasaur',
      weight: { minimum: 6, maximum: 9 },
      height: { minimum: 7, maximum: 10 },
      classification: 'Seed Pokémon',
      types: ['grass', 'poison'],
      resistant: ['water'],
      weaknesses: ['fire'],
      fleeRate: 0.1,
      maxCP: 500,
      maxHP: 50,
      image: 'bulbasaur.png',
    },
    {
      id: '2',
      name: 'Ivysaur',
      weight: { minimum: 10, maximum: 15 },
      height: { minimum: 15, maximum: 20 },
      classification: 'Seed Pokémon',
      types: ['grass', 'poison'],
      resistant: ['water'],
      weaknesses: ['fire'],
      fleeRate: 0.2,
      maxCP: 600,
      maxHP: 60,
      image: 'ivysaur.png',
    },
  ],
};

const mocks = [
  {
    request: {
      query: GET_POKEMONS,
      variables: { first: 151 },
    },
    result: {
      data: mockData,
    },
  },
];

describe('useGetPokemons Hook', () => {
  it('should return pokemons and pokemonOptions after a successful query', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetPokemons(), {
      wrapper: ({ children }) => (
        <MockedProvider
          mocks={mocks}
          addTypename={false}
          cache={new InMemoryCache()}
        >
          {children}
        </MockedProvider>
      ),
    });

    // Wait for the query to resolve
    await waitForNextUpdate();

    // Check the returned pokemons data
    expect(result.current.pokemons).toEqual(mockData.pokemons);
    expect(result.current.pokemonOptions).toEqual([
      { value: '1', label: 'Bulbasaur' },
      { value: '2', label: 'Ivysaur' },
    ]);
  });

  it('should return empty array of pokemons and pokemonOptions if loading', () => {
    const { result } = renderHook(() => useGetPokemons(), {
      wrapper: ({ children }) => (
        <MockedProvider
          mocks={[]}
          addTypename={false}
          cache={new InMemoryCache()}
        >
          {children}
        </MockedProvider>
      ),
    });

    // Check loading state (empty array should be returned)
    expect(result.current.pokemons).toEqual([]);
    expect(result.current.pokemonOptions).toEqual([]);
  });

  it('should handle error state', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_POKEMONS,
          variables: { first: 151 },
        },
        error: new Error('Failed to fetch'),
      },
    ];

    const { result, waitForNextUpdate } = renderHook(() => useGetPokemons(), {
      wrapper: ({ children }) => (
        <MockedProvider
          mocks={errorMocks}
          addTypename={false}
          cache={new InMemoryCache()}
        >
          {children}
        </MockedProvider>
      ),
    });

    // Wait for the query to finish
    await waitForNextUpdate();

    // Test: Ensure no data is returned and error state is handled
    expect(result.current.pokemons).toEqual([]);
    expect(result.current.pokemonOptions).toEqual([]);
  });
});
