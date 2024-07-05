import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Home = () => {
  const [types, setTypes] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      setTypes(response.data.results);
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
      const pokemonDetails = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: pokemonResponse.data.sprites.front_default,
            types: pokemonResponse.data.types.map(typeInfo => typeInfo.type.name),
          };
        })
      );
      setPokemons(pokemonDetails);
    };
    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()) &&
    (selectedType ? pokemon.types.includes(selectedType) : true)
  );

  const handlePokemonClick = (name) => {
    router.push(`/pokemon/${name}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon Search App</h1>
      <div className="mb-4">
        <select
          className="border p-2 mr-2"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type.name} value={type.name}>{type.name}</option>
          ))}
        </select>
        <input
          className="border p-2"
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredPokemons.map(pokemon => (
          <div
            key={pokemon.name}
            className="border p-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
            onClick={() => handlePokemonClick(pokemon.name)}
          >
            <span>{pokemon.name}</span>
            <img src={pokemon.image} alt={pokemon.name} className="w-16 h-16" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
