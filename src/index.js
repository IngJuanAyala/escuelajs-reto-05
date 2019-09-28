const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
// const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';


const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      debugger;
      //Primer problema:
      if(response.info.next  !== "" || response.info.next !== null)
      localStorage.setItem('next_fetch', response.info.next);


      const characters = response.results;
      //const characters = undefined;
        
      //Cuarto problema
      if (characters === undefined || characters.length == 0) {
        
        var div = document.getElementById('Messaje');
        div.innerHTML = 'Ya no hay personajes...';

        observer.unobserve(document.getElementById("$observe"));
        
      }else{

        let output = characters.map(character => {
          return `
        <article class="Card">
          <img src="${character.image}" />
          <h2>${character.name}<span>${character.species}</span></h2>
        </article>
      `
        }).join('');
        let newItem = document.createElement('section');
        newItem.classList.add('Items');
        newItem.innerHTML = output;
        $app.appendChild(newItem);

      }

      

    })
    .catch(error => console.log(error));
}

const loadData = () => {

 //Segundo problema:
debugger;
 var next_fetch = localStorage.getItem('next_fetch'); 
 if (next_fetch !== null){
  getData(next_fetch);
 }

  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});


//Tercer problema
window.onbeforeunload = function() {
  localStorage.removeItem('next_fetch');
  return '';
};

intersectionObserver.observe($observe);