var map = L.map('map').setView([-23.55, -46.47], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	crossOrigin: true
}).addTo(map);


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

			// The content for the popup, now including the audio player
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
