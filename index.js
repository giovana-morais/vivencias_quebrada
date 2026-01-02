var map = L.map('map').setView([-23.55, -46.47], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    crossOrigin: true
}).addTo(map);

const city = "Guaianases";

fetch("dados/guaianases.geojson")
    .then(r => r.json())
    .then(g => {
        const layer = L.geoJSON(g, {
            style: { color: 'red', weight: 1.5, fillOpacity: 0.1 }
        }).addTo(map);
        map.fitBounds(layer.getBounds());
    });

// fetch(`https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&q=${encodeURIComponent(city)}`)
//     .then(r => r.json())
//     .then(data => {
//         const geojson = data[0].geojson;
//         const layer = L.geoJSON(geojson, {
//         }).addTo(map);
//         map.fitBounds(layer.getBounds());
//     });
//

// le dados do arquivo dados.json
fetch("dados.json")
	.then(response => {
		if (!response.ok) {
			throw new Error("Erro carregando arquivo de dados");
		}
		return response.json();
	})
	.then(data => {
		console.log(data);
		for (const obj in data) {
			console.log(data[obj]);

			// popula conteúdo do popup
			const popupContent = `
				${data[obj].texto}<br>
				<img src='${data[obj].img}' width='200' style='max-width:100%; height:auto; margin-top:5px; margin-bottom:5px;'/>
				<br>
				<audio controls src="${data[obj].audio}" style="width: 100%;">
					Your browser does not support the audio element.
				</audio>
			`;

			L.marker([data[obj].latitude, data[obj].longitude])
			 .addTo(map)
			 .bindPopup(popupContent);
		}
	})
	.catch(error => { // Corrected error handling
		console.error("Erro:", error);
	});
