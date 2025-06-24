var map = L.map('map').setView([-23.5, -46.6], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	crossOrigin: true  // Add this line
}).addTo(map);


L.marker([-23.5292, -46.6378]).addTo(map).bindPopup("que saudade do café colombiano").openPopup();
