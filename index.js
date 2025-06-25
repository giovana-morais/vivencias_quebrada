var map = L.map('map').setView([-23.55, -46.47], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	crossOrigin: true
}).addTo(map);


// TODO: ler de um arquivo em vez de adicionar os tooltips manualmente.
// idealmente, um .yml ou algo que a Ana possa popular.
// vou pensar na estrutura
L.marker([-23.5420, -46.4710]).addTo(map).bindPopup("Texto de teste<br><img src='dados/corinthians_itaquera.jpeg' width='200' height='300'/>");
L.marker([-23.5757, -46.4104]).addTo(map).bindPopup("Texto de teste<br><img src='dados/quadra.jpeg' width='200' height='300'/>");
L.marker([-23.5679, -46.4189]).addTo(map).bindPopup("Texto de teste<br><img src='dados/riacho.jpeg' width='200' height='300'/>");
