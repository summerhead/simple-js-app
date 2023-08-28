let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(item) {
        if (
            typeof(item) === 'object' && 
            Object.keys(item).includes("name")
            ){
            pokemonList.push(item);
        } else {
            document.write('Error!');
        }
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
        button.addEventListener('click', () => showDetails(pokemon));
    };

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    };
    
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    };

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    };


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

function pokemonDetails(pokemon) {
    document.write('<p>' + pokemon.name + ' ' + '(height:' + ' ' + pokemon.height + ')' + '</p>');
    if (pokemon.height > 6) {
        document.write("- Wow, that's big!");
    }
};

/*
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});
*/

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });

