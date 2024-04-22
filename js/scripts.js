let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";
    
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
            ){
                pokemonList.push(pokemon);
            } else {
                console.log("add an object");
            }
        }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            let $row = $(".row");
            let $card = $('<div class="card" style="width:100%"></div>');
            let $image = $(
                '<img class="card-img-top" alt="Card image" style="width:20%" />'
                );
                $image.attr("src", pokemon.imageUrlFront);
                let $cardBody = $('<div class="card-body"></div>');
                let $cardTitle = $("<h4 class='card-title' style='text-transform: uppercase'>" + pokemon.name + "</h4>");
                let $seeProfile = $(
                    "<button type='button' class='btn btn-link btn-block text-left text-decoration-none' data-toggle='modal' data-target='#exampleModal' style='text-transform: uppercase'>" 
                    + "<img src='" + pokemon.imageUrlFront + "'/>" + pokemon.name + "</button>"
                    );
                    
                    $row.append($card);
                    //Append image to each card
                    //$card.append($image);
                    $card.append($cardBody);
                    //$cardBody.append($cardTitle);
                    $cardBody.append($seeProfile);
                    
                    $seeProfile.on("click", function (event) {
                        showDetails(pokemon);
                    });
                });
            }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
            showModal(item);
        });
    }

    function loadList() {
        return $.ajax(apiUrl)
        .then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
                };
                add(pokemon);
                console.log(pokemon);
            });
        })
        .catch(function (e) {
            console.error(e);
        });
    }
  
    function loadDetails(item) {
        let url = item.detailsUrl;
        return $.ajax(url)
        .then(function (details) {
          // Add details
          item.imageUrlFront = details.sprites.front_default;
          item.imageUrlBack = details.sprites.back_default;
          item.height = details.height;
          //Loop through each pokemon type
          item.types = [];
          for (let i = 0; i < details.types.length; i++) {
            item.types.push(details.types[i].type.name);
          };
          if (item.types.includes("normal")) {
            $(".modal-content").css("background-color", "#CCC3B5");
          } else if (item.types.includes("fire")) {
            $(".modal-content").css("background-color", "#E79d94");
          } else if (item.types.includes("water")) {
            $(".modal-content").css("background-color", "#B7D2F0");
          } else if (item.types.includes("electric")) {
            $(".modal-content").css("background-color", "#F3F4AB");
          } else if (item.types.includes("grass")) {
            $(".modal-content").css("background-color", "#8FBAA2");
          } else if (item.types.includes("ice")) {
            $(".modal-content").css("background-color", "#D7E6EC");
          } else if (item.types.includes("fighting")) {
            $(".modal-content").css("background-color", "#E2BDC4");
          } else if (item.types.includes("poison")) {
            $(".modal-content").css("background-color", "#D298F0");
          } else if (item.types.includes("ground")) {
            $(".modal-content").css("background-color", "#EBE1BA");
          } else if (item.types.includes("flying")) {
            $(".modal-content").css("background-color", "#D4E7E7");
          } else if (item.types.includes("psychic")) {
            $(".modal-content").css("background-color", "#C1A2C1");
          } else if (item.types.includes("bug")) {
            $(".modal-content").css("background-color", "#C5D9C2");
          } else if (item.types.includes("rock")) {
            $(".modal-content").css("background-color", "#EFEFEF");        
          } else if (item.types.includes("ghost")) {
            $(".modal-content").css("background-color", "#E0DCD9");
          } else if (item.types.includes("dragon")) {
            $(".modal-content").css("background-color", "#F6C19C");
          } else if (item.types.includes("dark")) {
            $(".modal-content").css("background-color", "#85837B");
          } else if (item.types.includes("steel")) {
            $(".modal-content").css("background-color", "#676565");
          } else if (item.types.includes("fairy")) {
            $(".modal-content").css("background-color", "#F5D6DE");
          }
          //Loop for the abilities of pokemon
          item.abilities = [];
          for (let i = 0; i < details.abilities.length; i++) {
            item.abilities.push(details.abilities[i].ability.name);
        };
        item.weight = details.weight;
    })
    .catch(function (e) {
          console.error(e);
        });
    }

    // Display modal content
    function showModal(item) {
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");
      let modalHeader = $(".modal-header");

      modalTitle.empty();
      modalBody.empty();
  
      //Create name element in modal content
      let nameElement = $("<h1 style='text-transform: uppercase'>" + item.name + "</h1>");
      //Create image element modal content
      let imageElementFront = $('<img class="modal-img" style="width:50%">');
      imageElementFront.attr("src", item.imageUrlFront);
      let imageElementBack = $('<img class="modal-img" style="width:50%">');
      imageElementBack.attr("src", item.imageUrlBack);
      //Create height element in modal content
      let heightElement = $("<p style='text-transform: uppercase'>" + "Height : " + item.height + "</p>");
      //Create weight element in modal content
      let weightElement = $("<p style='text-transform: uppercase'>" + "Weight : " + item.weight + "</p>");
      //Create type element in modal content
      let typesElement = $("<p style='text-transform: uppercase'>" + "Types : " + item.types + "</p>");
      //Create abilities element in modal content
      let abilitiesElement = $("<p style='text-transform: uppercase'>" + "Abilities : " + item.abilities + "</p>");
  
      modalTitle.append(nameElement);
      modalBody.append(imageElementFront);
      modalBody.append(imageElementBack);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typesElement);
      modalBody.append(abilitiesElement);
    }
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal,
    };
  })();

  pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });

