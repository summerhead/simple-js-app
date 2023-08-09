let pokemonList = [
    { name: 'Bulbasaur', height: 7, types: ['grass','poison'] },
    { name: 'Charmander', height: 6, types: ['fire'] },
    { name: 'Squirtle', height: 5, types: ['water'] }
];

function pokemonDetails(pokemon) {
    document.write('<p>' + pokemon.name + ' ' + '(height:' + ' ' + pokemon.height + ')' + '</p>');
    if (pokemon.height > 6) {
        document.write("- Wow, that's big!");
    }
}

pokemonList.forEach(pokemonDetails);