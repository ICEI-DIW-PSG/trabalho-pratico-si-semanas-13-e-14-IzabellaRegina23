async function carregarDados() {
    const resposta = await fetch("http://localhost:3000/destinos");
    const destinos = await resposta.json();

    const labels = destinos.map(d => d.titulo);
    const qtdAtracoes = destinos.map(d => d.atracoes.length);

    const ctx = document.getElementById('graficoAtracoes');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantidade de atrações',
                data: qtdAtracoes,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

carregarDados();
