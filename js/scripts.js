let pokemonRepository = (function () {
    
    let pokedex = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
         typeof pokemon === "object" &&
        "name" in pokemon 
        // "detailsUrl" in pokemon
        ) {
            pokemonRepository.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
        
    }
    function getAll() {
        return pokedex;
    }

    function add(pokemon) {
        pokedex.push(pokemon);
    }

    function addListItem(pokemon) {
        let pokemonLists = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');


        button.innerText = pokemon.name;
        button.classList.add('button-class');
        button.addEventListener('click', function() {
            showDetails(pokemon);
        })

        listItem.appendChild(button);
        pokemonLists.appendChild(listItem); 
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function (){
            console.log(pokemon);
        });
    }

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
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response){
            return response.json();
        }).then(function (details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e){
            console.error (e);
        });
    }
    
    return{
        getAll: getAll,
        add: add,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem
    }; 
}) ();

pokemonRepository.loadList().then(function() {
 pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    });   
});





    