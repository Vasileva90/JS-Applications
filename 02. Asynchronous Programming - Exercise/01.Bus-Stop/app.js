function getInfo() {
    const inputElement = document.getElementById('stopId').value;
    const divElement = document.getElementById('stopName');
    const ulElement = document.getElementById('buses');

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${inputElement}`)
        .then((response) => response.json())
        .then((data) => {
            let name = data.name;
            let buses = data.buses;

            divElement.textContent = name;
            ulElement.innerHTML = '';

            Object.keys(buses).forEach((bus) => {
                let liElement = document.createElement('li');
                liElement.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`;
                ulElement.appendChild(liElement);
            });
        })
        .catch((error) => {
            divElement.textContent = "Error";
            ulElement.innerHTML = '';
        });
}