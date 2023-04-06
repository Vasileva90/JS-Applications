function attachEvents() {
    let inputElement = document.getElementById("location");
    let getButton = document.getElementById("submit");
    let divDisplay = document.getElementById("forecast");
    let currentDayDiv = document.getElementById("current");
    let upcomingDaysDiv = document.getElementById("upcoming");
    let baseUrl = "http://localhost:3030/jsonstore/forecaster";

    let sunny = "&#x2600";
    let partlySunny = "&#x26C5";
    let overcast = "&#x2601";
    let rain = "&#x2614";
    let degrees = "&#176";
    let code = "";

    let divElementCurrent = document.createElement("div");
    let divElementUpcoming = document.createElement("div");

    getButton.addEventListener('click', e => {
        divElementCurrent.inert = "";
        divElementUpcoming.innerHTML = "";

        divElementCurrent.setAttribute("class", "forecasts");
        divElementUpcoming.setAttribute("class", "forecast-info");

        divDisplay.style.display = "inline";

        fetch(`${baseUrl}/locations`)
            .then((responce) => responce.json())
            .then((data) => {
                data.forEach((locationInfoObject) => {
                    if (locationInfoObject.name === inputElement.value) {
                        code = locationInfoObject.code;
                    }
                });

                fetch(`${baseUrl}/today/${code}`)
                    .then((response) => response.json())
                    .then((data) => {
                        let spanGroup = document.createElement("span");
                        let conditionSpan = document.createElement("span");
                        let temperatureSpan = document.createElement("span");
                        let locationSpan = document.createElement("span");
                        let iconSpan = document.createElement("span");

                        spanGroup.setAttribute("class", "condition");
                        conditionSpan.setAttribute("class", "forecast-data");
                        temperatureSpan.setAttribute("class", "forecast-data");
                        locationSpan.setAttribute("class", "forecast-data");
                        iconSpan.setAttribute("class", "condition symbol");

                        locationSpan.textContent = data.name;
                        temperatureSpan.innerHTML = `${data.forecast.low}${degrees}/${data.forecast.high}${degrees}`;
                        conditionSpan.textContent = data.forecast.condition;

                        let condition = data.forecast.condition;
                        if (condition === "Sunny") {
                            iconSpan.innerHTML = sunny;
                        } else if (condition === "Partly sunny") {
                            iconSpan.innerHTML = partlySunny;
                        } else if (condition === "Overcast") {
                            iconSpan.innerHTML = overcast;
                        } else if (condition === "Rain") {
                            iconSpan.innerHTML = rain;
                        }

                        spanGroup.appendChild(locationSpan);
                        spanGroup.appendChild(temperatureSpan);
                        spanGroup.appendChild(conditionSpan);
                        divElementCurrent.appendChild(iconSpan);
                        divElementCurrent.appendChild(spanGroup);
                        currentDayDiv.appendChild(divElementCurrent);
                    })
                    .catch((error) => console.log(error));

                fetch(`${baseUrl}/upcoming/${code}`)
                    .then((response) => response.json())
                    .then((data) => {
                        let nextDays = data.forecast;
                        nextDays.forEach((day) => {

                            let spanGroup = document.createElement("span");
                            let conditionSpan = document.createElement("span");
                            let temperatureSpan = document.createElement("span");
                            let iconSpan = document.createElement("span");

                            spanGroup.setAttribute("class", "upcoming");
                            conditionSpan.setAttribute("class", "forecast-data");
                            temperatureSpan.setAttribute("class", "forecast-data");
                            iconSpan.setAttribute("class", "symbol");

                            temperatureSpan.innerHTML = `${day.low}${degrees}/${day.high}${degrees}`;
                            conditionSpan.textContent = day.condition;

                            let condition = day.condition;
                            if (condition === "Sunny") {
                                iconSpan.innerHTML = sunny;
                            } else if (condition === "Partly sunny") {
                                iconSpan.innerHTML = partlySunny;
                            } else if (condition === "Overcast") {
                                iconSpan.innerHTML = overcast;
                            } else if (condition === "Rain") {
                                iconSpan.innerHTML = rain;
                            }

                            spanGroup.appendChild(iconSpan);
                            spanGroup.appendChild(temperatureSpan);
                            spanGroup.appendChild(conditionSpan);
                            divElementUpcoming.appendChild(spanGroup);
                            upcomingDaysDiv.appendChild(divElementUpcoming);
                        });
                    });
            });
    });
}

attachEvents();