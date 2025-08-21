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
			console.log(data[obj].img);
			L.marker([data[obj].latitude, data[obj].longitude]).addTo(map).bindPopup(`Texto de teste<br><img src='${data[obj].img}' width='200' height='300'/>`);
		}
	})
	.then(error => {
		console.error("Erro", error);
	});
