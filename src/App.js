import { useState, useEffect } from "react";
import './App.css';
import Pesquisar from "./Componentes/Pesquisar"; 
import DisplayPrevisaoTempo from "./Componentes/DisplayPrevisaoTempo"; 

function App() {
  const [cidade, setCidade] = useState(""); // Utilizado para o usuário escolher a cidade
  const [previsaoDoTempo, setPrevisaoDoTempo] = useState(null); // Previsão do tempo de acordo com a cidade escolhida

  useEffect(() => {
    const cidadeArmazenada = localStorage.getItem('cidade'); // Recupera a cidade do localStorage
    if (cidadeArmazenada) {
      setCidade(cidadeArmazenada); // Define a cidade se existir no localStorage
      fetchPrevisaoDoTempo(cidadeArmazenada); // Busca a previsão para a cidade armazenada
    } else {
      obterLocalizacao(); // Se não houver cidade armazenada, busca a localização
    }
  }, []);

  // Função para buscar a previsão do tempo
  const fetchPrevisaoDoTempo = (cidade) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=0b8bba1c3781ca35ffddd02f98854587&units=metric&lang=pt_br`) // Busca, através da API, a cidade que o usuário digita
      .then((resposta) => {
        if (resposta.status === 200) {
          return resposta.json();
        } else {
          throw new Error("Cidade inválida"); // Alerta acionado caso o usuário digite uma cidade inválida
        }
      })
      .then((dado) => {
        setPrevisaoDoTempo(dado); // Exibe os dados carregados pela API
        setCidade(dado.name); // Atualiza a cidade
        localStorage.setItem('cidade', dado.name); // Salva a nova cidade no localStorage
      })
      .catch((erro) => {
        alert(erro.message); // Exibe mensagem de erro caso seja digitada uma cidade inválida
        setPrevisaoDoTempo(null);
      });
  };

  // Função para obter a localização do usuário
  const obterLocalizacao = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((posicao) => {
        const lat = posicao.coords.latitude;
        const lon = posicao.coords.longitude;

        // Obtém o nome da cidade a partir das coordenadas
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0b8bba1c3781ca35ffddd02f98854587&units=metric&lang=pt_br`)
          .then((resposta) => resposta.json())
          .then((dado) => {
            setCidade(dado.name); // Define a cidade atual
            setPrevisaoDoTempo(dado); // Define a previsão do tempo
            localStorage.setItem('cidade', dado.name); // Salva a cidade obtida pela geolocalização
          })
          .catch(() => {
            alert("Não foi possível obter a localização.");
          });
      }, () => {
        alert("Geolocalização não permitida.");
      });
    } else {
      alert("Seu navegador não suporta geolocalização.");
    }
  };

  const handleChange = (evento) => {
    setCidade(evento.target.value); // Atualiza a cidade conforme o usuário digita
  };

  const handleSearch = () => {
    fetchPrevisaoDoTempo(cidade); // Busca a previsão do tempo para a cidade digitada
  };

  const handleKeyPress = (evento) => {
    if (evento.key === 'Enter') {
      handleSearch(); // Busca a previsão da cidade ao pressionar Enter
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <a className="titulo-site" href=".">
          Por dentro do clima
        </a>
      </nav>

      <div className="container-previsao-tempo">
        <main className="container">
          <Pesquisar
            cidade={cidade}
            handleChange={handleChange}
            handleSearch={handleSearch}
            handleKeyPress={handleKeyPress}
          />
          <DisplayPrevisaoTempo previsaoDoTempo={previsaoDoTempo} />
        </main>
      </div>
    </div>
  );
}

export default App;







