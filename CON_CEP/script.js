document.addEventListener('DOMContentLoaded', function() {
    // Consulta de CEP por CEP específico
    const cepForm = document.getElementById('cepForm');
    if (cepForm) {
        cepForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const cep = document.getElementById('cep').value.replace('-', '');

            const url = `https://viacep.com.br/ws/${cep}/json/`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const resultadoDiv = document.getElementById('resultado');
                    resultadoDiv.innerHTML = '';

                    if (data.erro) {
                        resultadoDiv.innerHTML = 'CEP não encontrado.';
                    } else {
                        const enderecoCep = document.createElement('p');
                        enderecoCep.innerHTML = `
                            <strong>CEP:</strong> ${data.cep}<br>
                            <strong>Logradouro:</strong> ${data.logradouro}<br>
                            <strong>Complemento:</strong> ${data.complemento}<br>
                            <strong>Bairro:</strong> ${data.bairro}<br>
                            <strong>Cidade:</strong> ${data.localidade}<br>
                            <strong>Estado:</strong> ${data.uf}<br>
                            <strong>DDD:</strong> ${data.ddd}
                        `;
                        resultadoDiv.appendChild(enderecoCep);
                    }
                })
                .catch(error => {
                    console.error('Erro ao consultar o CEP:', error);
                    const resultadoDiv = document.getElementById('resultado');
                    resultadoDiv.innerHTML = 'Erro ao consultar o CEP.';
                });
        });
    }
});
