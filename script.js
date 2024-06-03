document.addEventListener('DOMContentLoaded', function() {
    const estadosECidades = {
        "AC": ["Rio Branco"],
        "AL": ["Maceió"],
        "AP": ["Macapá"],
        "AM": ["Manaus"],
        "BA": ["Salvador"],
        "CE": ["Fortaleza"],
        "DF": ["Brasília"],
        "ES": ["Vitória"],
        "GO": ["Goiânia"],
        "MA": ["São Luís"],
        "MT": ["Cuiabá"],
        "MS": ["Campo Grande"],
        "MG": ["Belo Horizonte"],
        "PA": ["Belém"],
        "PB": ["João Pessoa"],
        "PR": ["Curitiba"],
        "PE": ["Recife"],
        "PI": ["Teresina"],
        "RJ": ["Rio de Janeiro"],
        "RN": ["Natal"],
        "RS": ["Porto Alegre"],
        "RO": ["Porto Velho"],
        "RR": ["Boa Vista"],
        "SC": ["Florianópolis"],
        "SP": ["São Paulo"],
        "SE": ["Aracaju"],
        "TO": ["Palmas"]
    };

    const estadoSelect = document.getElementById('estado');
    const cidadeSelect = document.getElementById('cidade');

    // Preenche o select de estados
    for (const estado in estadosECidades) {
        const option = document.createElement('option');
        option.value = estado;
        option.textContent = estado;
        estadoSelect.appendChild(option);
    }

    // Atualiza o select de cidades quando um estado é selecionado
    estadoSelect.addEventListener('change', function() {
        cidadeSelect.innerHTML = '<option value="">Selecione a cidade</option>';
        const cidades = estadosECidades[estadoSelect.value];
        if (cidades) {
            cidades.forEach(function(cidade) {
                const option = document.createElement('option');
                option.value = cidade;
                option.textContent = cidade;
                cidadeSelect.appendChild(option);
            });
        }
    });

    // Consulta de CEP
    document.getElementById('cepForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const estado = estadoSelect.value;
        const cidade = cidadeSelect.value;
        const logradouro = document.getElementById('logradouro').value;

        const url = `https://viacep.com.br/ws/${estado}/${cidade}/${logradouro}/json/`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const resultadoDiv = document.getElementById('resultado');
                resultadoDiv.innerHTML = '';

                if (data.length === 0) {
                    resultadoDiv.innerHTML = 'Nenhum CEP encontrado.';
                } else {
                    data.forEach(endereco => {
                        const enderecoElem = document.createElement('p');
                        const complemento = endereco.complemento ? ` (${endereco.complemento})` : '';
                        const complemento2 = endereco.complemento2 ? ` - Numeração: ${endereco.complemento2}` : '';
                        enderecoElem.textContent = `CEP: ${endereco.cep} - Logradouro: ${endereco.logradouro}${complemento}${complemento2}`;
                        resultadoDiv.appendChild(enderecoElem);
                    });
                }
            })
            .catch(error => {
                console.error('Erro ao consultar o CEP:', error);
                const resultadoDiv = document.getElementById('resultado');
                resultadoDiv.innerHTML = 'Erro ao consultar o CEP.';
            });
    });
});
