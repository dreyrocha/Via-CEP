


document.getElementById("cepForm").addEventListener("submit", function (event) {
  event.preventDefault();
  // cep = document.getElementById('cep').value.trim();
  let cep = document.getElementById("cep").value.replace(/\D/g, "").trim();

  if (cep.length !== 8) {
    alert("O CEP deve conter 8 dígitos.");
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json())
    .then((data) => {
      if ("erro" in data) {
        alert("CEP não encontrado.");
        Limpar();
        return;
      }
      document.getElementById("rua").textContent = data.logradouro || "";
      document.getElementById("bairro").textContent = data.bairro || "";
      document.getElementById("localidade").textContent = data.localidade || "";
      document.getElementById("uf").textContent = data.uf || "";
    });
});

function Limpar() {
  document.getElementById("cep").value = "";
  document.getElementById("rua").textContent = "";
  document.getElementById("bairro").textContent = "";
  document.getElementById("localidade").textContent = "";
  document.getElementById("uf").textContent = "";
}

document.getElementById("cep").addEventListener("keypress", function (event) {
  if (!/^\d$/.test(event.key)) {
    event.preventDefault();
  }
});

document.getElementById("cep").addEventListener("paste", function (event) {
  let paste = (event.clipboardData || window.clipboardData).getData("text");
  let cleanPaste = paste.replace(/\D/g, "");
  document.getElementById("cep").value = cleanPaste;
  event.preventDefault();
});
