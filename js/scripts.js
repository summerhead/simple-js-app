let pokemonList = [
    { name: 'Bulbasaur', height: 7, types: ['grass','poison'] },
    { name: 'Charmander', height: 6, types: ['fire'] },
    { name: 'Squirtle', height: 5, types: ['water'] }
];

for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' ' + '(height:' + ' ' + pokemonList[i].height + ')' + ' ');
    
    if (pokemonList[i].height > 6) {
        document.write("- Wow, that's big!");
    }
}