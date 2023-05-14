import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const searchTemplate = (data) => html `
    <ul>
       ${data.map(town => html`
        <li id=${town}>${town}</li>`
         )}           
    </ul>`

const body = document.getElementById('towns');
update();

function update() {
   const result = searchTemplate(towns);
   render(result, body);
}

document.querySelector('button').addEventListener('click', search);

function search() {
   const text = document.getElementById('searchText').value;

   let result = towns.filter(town => {
      if (town.includes(text)) {
         document.getElementById(`${town}`).setAttribute('class', 'active');
         return town;
      }
   });
   document.getElementById('result').textContent = `${result.length} matches found`;
}