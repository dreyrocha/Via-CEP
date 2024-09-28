document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault();
    cep = document.getElementById('cep').value.trim();

    if (cep.length !== 8) {
        alert('O CEP deve conter 8 dígitos.');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if ('erro' in data) { 
                alert('CEP não encontrado.')
                Limpar(); 
                return;
            }
            document.getElementById('rua').textContent = data.logradouro || '';
            document.getElementById('bairro').textContent = data.bairro || '';
            document.getElementById('localidade').textContent = data.localidade || '';
            document.getElementById('uf').textContent = data.uf || '';
        })
    
});

function Limpar() {
    document.getElementById('cep').value = '';
    document.getElementById('rua').textContent = '';
    document.getElementById('bairro').textContent = '';
    document.getElementById('localidade').textContent = '';
    document.getElementById('uf').textContent = '';
}
