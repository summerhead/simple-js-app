let pokemonRepository = (function () {
    let pokemonList = [
    { name: 'Bulbasaur', height: 7, types: ['grass','poison'] },
    { name: 'Charmander', height: 6, types: ['fire'] },
    { name: 'Squirtle', height: 5, types: ['water'] } ];

    function add (item) {
        if ((typeof(item) === 'object') && (Object.keys(item).includes("name") && Object.keys(item).includes("height") && Object.keys(item).includes("types"))) {
            pokemonList.push(item);
        } else {document.write('Error!')}
    };
     
    function getAll () {
        return pokemonList;
    };

    return {add,
        getAll
    };
})();

function pokemonDetails(pokemon) {
    document.write('<p>' + pokemon.name + ' ' + '(height:' + ' ' + pokemon.height + ')' + '</p>');
    if (pokemon.height > 6) {
        document.write("- Wow, that's big!");
    }
};


pokemonRepository.getAll().forEach(pokemonDetails);


