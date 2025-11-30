const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"), 10);
const API = "http://localhost:3001/destinos";

if (isNaN(id)) {
  document.getElementById("cidade").textContent = "Destino não encontrado";
} else {
  fetch(`${API}/${id}`)
    .then(r => {
      if (!r.ok) throw new Error("Destino não encontrado");
      return r.json();
    })
    .then(destino => {
      document.getElementById("cidade").textContent = destino.titulo;
      document.getElementById("fotocidade").src = destino.imagem;
      document.getElementById("descricao").textContent = destino.conteudo;
      document.getElementById("atracoes").innerHTML = (destino.atracoes || []).map(a => `<li>${a}</li>`).join("");
      document.getElementById("dicas").innerHTML = (destino.dicas || []).map(d => `<li>${d}</li>`).join("");

      const acoes = document.createElement("div");
      acoes.className = "mt-3";

      const btnExcluir = document.createElement("button");
      btnExcluir.className = "btn btn-danger me-2";
      btnExcluir.textContent = "Excluir";
      btnExcluir.addEventListener("click", async () => {
        if (!confirm("Deseja realmente excluir esse destino?")) return;
        const res = await fetch(`${API}/${id}`, { method: "DELETE" });
        if (res.ok) {
          alert("Destino excluído!");
          window.location.href = "index.html";
        } else alert("Erro ao excluir.");
      });

      const btnEditar = document.createElement("a");
      btnEditar.className = "btn btn-primary";
      btnEditar.href = `cadastro_destinos.html?id=${id}`;
      btnEditar.textContent = "Editar";

      acoes.appendChild(btnExcluir);
      acoes.appendChild(btnEditar);
      document.querySelector(".destino-info")?.appendChild(acoes);
    })
    .catch(err => {
      console.error(err);
      document.getElementById("cidade").textContent = "Destino não encontrado";
    });
}
