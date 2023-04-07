async function solution() {
    try {
        let url = `http://localhost:3030/jsonstore/advanced/articles/list`;
        let response = await fetch(url);
        if (response.ok === false) {
            throw new Error("Error obtaining article list");
        }
        let data = await response.json();

        data.forEach(article => {
            let articleElement = document.createElement('div');
            articleElement.classList.add('accordion');
            articleElement.innerHTML = `
            <div class="head">
                <span>${article.title}</span>
                <button class="button" id="${article._id}" onclick="moreOnclick(event)">More</button>
            </div >
                <div class="extra"></div>
            `;

            let main = document.getElementById('main');
            main.appendChild(articleElement);
        });
    } catch (error) {
        console.log(error);
    }
}

async function moreOnclick(event) {
    try {
        let currentTarget = event.currentTarget;
        let url = `http://localhost:3030/jsonstore/advanced/articles/details/${currentTarget.id}`;
        let parent = currentTarget.parentNode.parentNode;
        let extraDiv = parent.querySelector('div.extra');

        let responce = await fetch(url);
        if(responce.ok === false) {
            throw new Error('Error obtaining article details');
        }
        let data = await responce.json();

        extraDiv.innerHTML = `<p>${data.content}</p>`;
        if(currentTarget.textContent === 'More') {
           currentTarget.textContent = 'Less';
           extraDiv.style.display = 'block';
        } else {
            currentTarget.textContent = 'More';
            extraDiv.style.display = 'none';
        }
    } catch (error) {
        console.log(error);
    }
}

solution();