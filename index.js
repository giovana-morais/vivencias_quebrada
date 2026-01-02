var map = L.map('map').setView([-23.55, -46.47], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    crossOrigin: true
}).addTo(map);

const city = "Guaianases";
// adiciona contorno da cidade (comentando pq parece errado por eqnuanto)
// fetch("dados/guaianases.geojson")
//     .then(r => r.json())
//     .then(g => {
//         const layer = L.geoJSON(g, {
//             style: { color: 'red', weight: 1.5, fillOpacity: 0.1 }
//         }).addTo(map);
//         map.fitBounds(layer.getBounds());
//     });
//

// le dados do arquivo dados.jso
fetch("dados_teste.json")
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
				<img src='${data[obj].img}' style='width:100%; max-height:400px; object-fit: cover; margin-top:5px; margin-bottom:5px;'/>
				<br>
				<audio controls src="${data[obj].audio}" style="width: 100%;">
					Seu navegador não suporta áudio.
				</audio>
			`;

			L.marker([data[obj].latitude, data[obj].longitude])
			 .addTo(map)
			 .bindPopup(popupContent, 
                 // configs extras
                 {
                     className: "responsive-popup",
                     // autoPan: true,
                     // autoPanPadding: L.point(10, 10), // espaço entre o popup e a borda
                     // keepInView: true
                 });
        }
    })
    .catch(error => { 
        console.error("Erro:", error);
    });

map.on('popupopen', function(e) {
    console.log("popup abrindo");
    // 1. Get the geographical coordinates of the marker
    const targetLatLng = e.popup.getLatLng();

    // 2. Get the height of the actual popup element in pixels
    const popupHeight = e.popup._container.clientHeight;

    // 3. Convert the latlng to a point (pixels) to do math
    const targetPoint = map.project(targetLatLng);

    // 4. Subtract half the popup height from the y-coordinate
    // This shifts the "center" point upward so the content lands in the middle
    targetPoint.y -= popupHeight / 2;

    // 5. Convert the pixel point back to LatLng and pan to it
    const targetCenter = map.unproject(targetPoint);

    map.panTo(targetCenter, { animate: true });
});
