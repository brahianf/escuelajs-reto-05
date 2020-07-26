const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

const getData = async (api) => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    if(data){
      localStorage.setItem('next_fetch', JSON.stringify(data.info.next))
      return data;
    }
  }catch (error){
    console.log(error);
  }
}

const loadData = async () => {
  var next_fetch=localStorage.getItem('next_fetch')
  if(next_fetch===null){
    const data= await getData(API);
    localStorage.setItem('characters',JSON.stringify(data.results));
  }
  const characters = (JSON.parse(localStorage.getItem('characters')))
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
  localStorage.clear();
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);