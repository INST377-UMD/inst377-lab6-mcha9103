function createMap() {
    var map = L.map('map').setView([30, -100], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

    let xCoor = [];
    let yCoor = [];

    for (let markerCount = 0; markerCount < 3; markerCount++) {
        xCoor.push(getRandomInRange(30, 35, 3));
        yCoor.push(getRandomInRange(-90, -100, 3));
    }

    let marker1 = L.marker([xCoor[0], yCoor[0]]).addTo(map);
    let marker2 = L.marker([xCoor[1], yCoor[1]]).addTo(map);
    let marker3 = L.marker([xCoor[2], yCoor[2]]).addTo(map);

    for (let markerCount = 0; markerCount < 3; markerCount++) {
        let coordinate = document.getElementById(`marker${markerCount+1}`);
        coordinate.textContent = `Marker ${(markerCount + 1)}:
            Latitude: ${xCoor[markerCount]}, Longitude: ${yCoor[markerCount]}`;

        let locality = document.getElementById(`locality${markerCount + 1}`)
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${xCoor[markerCount]}&longitude=${yCoor[markerCount]}&localityLanguage=en`)
            .then((res) => res.json()) 
            .then((data) => {
                console.log(data);
                locality.textContent = `Locality: ${data['locality']}`;
            })
    }
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

window.onload = createMap;