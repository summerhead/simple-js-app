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
        button.addEventListener('click', () => showDetails(pokemon)); //showDetails(pokemon));
    };

    function showDetails(pokemon) { //execute loadDetails() which logs a Pokemon's details when a user clicks its button; show a modal with the Pokémon’s name, height, and image
        pokemonRepository.loadDetails(pokemon).then(function () {
            console.log(pokemon);
            showModal(pokemon);
        });
    }

    function showModal(pokemon) { //execute loadDetails() which logs a Pokemon's details when a user clicks its button; show a modal with the Pokémon’s name, height, and image
        let modalContainer = document.querySelector('#modal-container');

        // Clear all existing modal content
        modalContainer.innerHTML = '';
        
        let modal = document.createElement('div');
        modal.classList.add('modal');
        
        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        
        let nameElement = document.createElement('h1');
        nameElement.innerText = pokemon.name;
        let heightElement = document.createElement('p');
        heightElement.innerText = "Height: " + pokemon.height;
        let imgElement = document.createElement('img');
        imgElement.classList.add('modal-img');
        imgElement.setAttribute('src', pokemon.imageUrl);

        modal.appendChild(closeButtonElement);
        modal.appendChild(nameElement);
        modal.appendChild(heightElement);
        modal.appendChild(imgElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
        
        function hideModal() {
            modalContainer.classList.remove('is-visible');
        };
        
        window.addEventListener('keydown', (e) => {
            let modalContainer = document.querySelector('#modal-container');
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
            }
        });

        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    };

    function loadList() { //fetch data from the API, then add each Pokémon in the fetched data to pokemonList with the add function
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    };
    
    function loadDetails(item) { //load the detailed data for a given Pokémon parameter
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


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
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

