function solve() {
    const infoElement = document.querySelector('.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let busStop = {
        next: 'depot'
    }

    function depart() {
        departBtn.disabled = true;
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`)
        .then((response) => response.json())
        .then((data) => {
            busStop = JSON.parse(JSON.stringify(data));
            infoElement.textContent = `Next stop ${busStop.name}`;
        })
        .catch((error) => console.log('error'));
        arriveBtn.disabled = false;
    }

    function arrive() {
        infoElement.textContent = `Arriving at ${busStop.name}`;
        arriveBtn.disabled = true;
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();