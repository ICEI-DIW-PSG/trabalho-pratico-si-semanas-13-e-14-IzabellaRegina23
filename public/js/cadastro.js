const API = "http://localhost:3001/destinos";
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"), 10);

const form = document.getElementById("formDestino");
const tituloInput = document.getElementById("titulo");
const conteudoInput = document.getElementById("conteudo");
const categoriaInput = document.getElementById("categoria");
const atracoesInput = document.getElementById("atracoes");
const dicasInput = document.getElementById("dicas");
const imagemInput = document.getElementById("imagem");
const tituloPagina = document.getElementById("titulo-pagina");

if (!isNaN(id)) {
  tituloPagina.textContent = "Editar Destino";
  fetch(`${API}/${id}`).then(r => r.json()).then(destino => {
    tituloInput.value = destino.titulo || "";
    conteudoInput.value = destino.conteudo || "";
    categoriaInput.value = destino.categoria || "";
    atracoesInput.value = (destino.atracoes || []).join(";");
    dicasInput.value = (destino.dicas || []).join(";");
    imagemInput.value = destino.imagem || "";
  }).catch(console.error);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!tituloInput.value.trim() || !conteudoInput.value.trim() || !imagemInput.value.trim()) {
    alert("Preencha título, conteúdo e imagem.");
    return;
  }

  const payload = {
    titulo: tituloInput.value.trim(),
    conteudo: conteudoInput.value.trim(),
    categoria: categoriaInput.value.trim() || "Indefinido",
    atracoes: atracoesInput.value ? atracoesInput.value.split(";").map(s => s.trim()).filter(Boolean) : [],
    dicas: dicasInput.value ? dicasInput.value.split(";").map(s => s.trim()).filter(Boolean) : [],
    imagem: imagemInput.value.trim()
  };

  try {
    let res;
    if (!isNaN(id)) {
      res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    if (res.ok) {
      alert("Salvo com sucesso!");
      window.location.href = "index.html";
    } else {
      alert("Erro ao salvar. Veja console.");
      console.error(await res.text());
    }
  } catch (err) {
    console.error(err);
    alert("Erro de rede.");
  }
});
