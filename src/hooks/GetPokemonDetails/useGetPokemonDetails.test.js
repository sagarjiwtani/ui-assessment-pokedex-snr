import { renderHook, act } from '@testing-library/react-hooks';
import { useGetPokemonDetails, GET_POKEMON } from './useGetPokemonDetails'; // Adjust path if needed
import { MockedProvider } from '@apollo/react-testing';
import { InMemoryCache } from 'apollo-boost';

// Mocked data for the test
const mockData = {
  pokemon: {
    id: '1',
    number: '001',
    name: 'Bulbasaur',
    weight: { minimum: '6', maximum: '9' },
    height: { minimum: '7', maximum: '10' },
    classification: 'Seed Pokémon',
    types: ['grass', 'poison'],
    resistant: ['water'],
    weaknesses: ['fire'],
    fleeRate: 0.1,
    maxCP: 500,
    maxHP: 50,
    image: 'bulbasaur.png',
  },
};

const mocks = [
  {
    request: {
      query: GET_POKEMON,
      variables: { id: '1', name: 'Bulbasaur' },
    },
    result: {
      data: mockData,
    },
  },
];

describe('useGetPokemonDetails Hook', () => {
  it('should return pokemon data after a successful query', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useGetPokemonDetails('1', 'Bulbasaur'),
      {
        wrapper: ({ children }) => (
          <MockedProvider
            mocks={mocks}
            addTypename={false}
            cache={new InMemoryCache()}
          >
            {children}
          </MockedProvider>
        ),
      }
    );

    // Wait for the query to resolve
    await waitForNextUpdate();

    // Check the returned pokemon data
    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should return loading state initially', () => {
    const { result } = renderHook(
      () => useGetPokemonDetails('1', 'Bulbasaur'),
      {
        wrapper: ({ children }) => (
          <MockedProvider
            mocks={[]}
            addTypename={false}
            cache={new InMemoryCache()}
          >
            {children}
          </MockedProvider>
        ),
      }
    );

    // Check loading state (before data is fetched)
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('should handle error state', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_POKEMON,
          variables: { id: '1', name: 'Bulbasaur' },
        },
        error: new Error('Failed to fetch'),
      },
    ];

    const { result, waitForNextUpdate } = renderHook(
      () => useGetPokemonDetails('1', 'Bulbasaur'),
      {
        wrapper: ({ children }) => (
          <MockedProvider
            mocks={errorMocks}
            addTypename={false}
            cache={new InMemoryCache()}
          >
            {children}
          </MockedProvider>
        ),
      }
    );

    // Wait for the query to finish
    await waitForNextUpdate();

    // Test: Ensure error is handled and no data is returned
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
  });
});
