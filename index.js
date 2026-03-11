var map = L.map('map').setView([-23.55, -46.47], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    crossOrigin: true
}).addTo(map);

const city = "Guaianases";

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

            // por enquanto nada acontece com os pontos que não forem da categoria "local"
            // if (data[obj].categoria === "Local") {
            // popula conteúdo do popup
            const popupContent = `
                ${data[obj].texto}<br>
                <div style="width: 100%"; max-height: 60vh; overflow: hidden; display: flex; justify-content: center; margin: 5px 0;">
                    <img src='${data[obj].img}' 
                    style='width:100%; height: auto; object-fit: contain; max-height: 50vh;'
                    onload="this.style.opacity=1"
                    onerror="this.style.display='none'" />
                </div>
                <br>
                <audio controls src="${data[obj].audio}" style="width: 100%; margin-top: 5px;">
                    Seu navegador não suporta áudio.
                </audio>
            `;

            L.marker([data[obj].latitude, data[obj].longitude])
             .addTo(map)
             .bindPopup(popupContent, 
                 // configs extras
                 {
                     className: "responsive-popup",
                     autoPan: true,
                     autoPanPadding: L.point(10, 10), // espaço entre o popup e a borda
                     keepInView: true
                 });
            // }
        }
    })
    .catch(error => { 
        console.error("Erro:", error);
    });

