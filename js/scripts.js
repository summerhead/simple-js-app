let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=30";
    
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
            let $card = $('<div class="card" style="width:400px"></div>');
            let $image = $(
                '<img class="card-img-top" alt="Card image" style="width:20%" />'
                );
                $image.attr("src", pokemon.imageUrlFront);
                let $cardBody = $('<div class="card-body"></div>');
                let $cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
                let $seeProfile = $(
                    '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
                    );
                    
                    $row.append($card);
                    //Append image to each card
                    $card.append($image);
                    $card.append($cardBody);
                    $cardBody.append($cardTitle);
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
          if (item.types.includes("Normal")) {
            $(".modal-header").css("color", "brown");
          } else if (item.types.includes("Fire")) {
            $(".modal-header").css("color", "red");
          } else if (item.types.includes("Water")) {
            $(".modal-header").css("color", "blue");
          } else if (item.types.includes("Electric")) {
            $(".modal-header").css("color", "yellow");
          } else if (item.types.includes("Grass")) {
            $(".modal-header").css("color", "green");
          } else if (item.types.includes("Ice")) {
            $(".modal-header").css("color", "#A2DDFB");
          } else if (item.types.includes("Fighting")) {
            $(".modal-header").css("color", "#8E240F");
          } else if (item.types.includes("Poison")) {
            $(".modal-header").css("color", "purple");
          } else if (item.types.includes("Ground")) {
            $(".modal-header").css("color", "#DBB326");
          } else if (item.types.includes("Flying")) {
            $(".modal-header").css("color", "#B0E6E5");
          } else if (item.types.includes("Psychic")) {
            $(".modal-header").css("color", "#A052AF");
          } else if (item.types.includes("Bug")) {
            $(".modal-header").css("color", "#8F996D");
          } else if (item.types.includes("Rock")) {
            $(".modal-header").css("color", "#C1C3BA");          
          } else if (item.types.includes("Ghost")) {
            $(".modal-header").css("color", "#B5AABA");
          } else if (item.types.includes("Dragon")) {
            $(".modal-header").css("color", "#D8532E");
          } else if (item.types.includes("Dark")) {
            $(".modal-header").css("color", "#431406");
          } else if (item.types.includes("Steel")) {
            $(".modal-header").css("color", "#676565");
          } else if (item.types.includes("Fairy")) {
            $(".modal-header").css("color", "pink");
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
      let nameElement = $("<h1>" + item.name + "</h1>");
      //Create image element modal content
      let imageElementFront = $('<img class="modal-img" style="width:50%">');
      imageElementFront.attr("src", item.imageUrlFront);
      let imageElementBack = $('<img class="modal-img" style="width:50%">');
      imageElementBack.attr("src", item.imageUrlBack);
      //Create height element in modal content
      let heightElement = $("<p>" + "Height : " + item.height + "</p>");
      //Create weight element in modal content
      let weightElement = $("<p>" + "Weight : " + item.weight + "</p>");
      //Create type element in modal content
      let typesElement = $("<p>" + "Types : " + item.types + "</p>");
      //Create abilities element in modal content
      let abilitiesElement = $("<p>" + "Abilities : " + item.abilities + "</p>");
  
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