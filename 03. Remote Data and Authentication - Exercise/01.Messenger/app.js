const url = `http://localhost:3030/jsonstore/messenger`;
const messages = document.getElementById('messages');

function attachEvents() {
    document.getElementById('submit').addEventListener('click', postMessage);
    document.getElementById('refresh').addEventListener('click', loadAllMessages);
}

async function postMessage() {
    const author = document.querySelector('[name="author"]');
    const content = document.querySelector('[name="content"]');
    if (author.value !== "" || content.value !== '') {
        await requst(url, { author: author.value, content: content.value });
        author.value = '';
        content.value = '';
    }
}

async function loadAllMessages() {
    const response = await fetch(url);
    const data = await response.json();

    messages.value = Object.values(data).map(({ author, content }) => `${author}: ${content}`).join('\n');
}

async function requst(url, option) {
    if (option) {
        option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(option)
        };
    }
    const response = await fetch(url, option);
    return response.json();
}

attachEvents();