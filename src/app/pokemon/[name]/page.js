import axios from 'axios';
import Link from 'next/link';

const PokemonDetails = async ({ params }) => {
  const { name } = params;
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = response.data;

  return (
    <div className='ml-4'>
    <nav className="mb-4">
          <div className="font-bold flex items-center">
            <span className="text-green-500 mr-2">{'<'}</span>
            <Link href="/" className="text-green-500">Back</Link>
          </div>
        </nav>
    <div className="container mx-auto p-4 flex justify-center">
     
      <div className="w-full max-w-xl">
       
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto mb-4" />
          <div className="bg-orange-200 p-4 rounded-lg">
            <h1 className="text-xs font-bold mb-2">Name: {pokemon.name}</h1>
            <p className="text-xs mb-2">Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
            <div className="mb-2">
              <h2 className=" text-sm		 font-semibold">Stats:</h2>
              <ul>
                {pokemon.stats.map((stat) => (
                  <li  className='text-xs' key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <h2 className="text-sm	 font-semibold">Abilities:</h2>
              <ul>
                {pokemon.abilities.map((ability) => (
                  <li  className="text-xs " key={ability.ability.name}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <h2 className=" text-sm	 font-semibold">Some Moves:</h2>
              <ul>
                {pokemon.moves.slice(0, 10).map((move) => (
                  <li className="text-xs " key={move.move.name}>{move.move.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PokemonDetails;
