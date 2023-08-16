let pokemonRepository = (function() {
    let pokemonList = [
    { name: 'Bulbasaur', height: 7, types: ['grass','poison'] },
    { name: 'Charmander', height: 6, types: ['fire'] },
    { name: 'Squirtle', height: 5, types: ['water'] } ];

    function add(item) {
        if ((typeof(item) === 'object') && (Object.keys(item).includes("name") && Object.keys(item).includes("height") && Object.keys(item).includes("types"))) {
            pokemonList.push(item);
        } else {document.write('Error!')}
    };
     
    function getAll() {
        return pokemonList;
    };

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listItem.appendChild(button); // Append the button to the list item as its child
        pokemonList.appendChild(listItem); // Append the list item to the unordered list as its child
        eventListen(button,pokemon);
    };

    function eventListen(button,pokemon)  { // Add the event listener to the newly created button
        button.addEventListener('click', function(pokemon) {
            showDetails(pokemon);
        });
    };

    function showDetails(pokemon) {
        console.log(pokemon);
    };

    return {add,
        getAll,
        addListItem
    };
})();

function pokemonDetails(pokemon) {
    document.write('<p>' + pokemon.name + ' ' + '(height:' + ' ' + pokemon.height + ')' + '</p>');
    if (pokemon.height > 6) {
        document.write("- Wow, that's big!");
    }
};


pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});


