import React from "react";

function DisplayPrevisaoTempo({ previsaoDoTempo }) {
  if (!previsaoDoTempo) return null; //Não retorna valor caso a previsao do tempo seja falsa, ou seja, não foi pesquisada alguma cidade

  return (
    <div className="dados-previsao-tempo">
      <div className="previsao-info">
        <img src={`http://openweathermap.org/img/wn/${previsaoDoTempo.weather[0].icon}@2x.png`} alt="Ícone do tempo" />
        <h3>Previsão do tempo para {previsaoDoTempo.name}</h3>
        <div className="descricao-clima">
          <div>
            <p>Condição: {previsaoDoTempo.weather[0].description}</p>
            <p>Temperatura atual: {previsaoDoTempo.main.temp}°C</p>
            <p>Temperatura máxima: {previsaoDoTempo.main.temp_max}°C</p>
            <p>Temperatura mínima: {previsaoDoTempo.main.temp_min}°C</p>
          </div>
          <div>
            <p>Sensação térmica: {previsaoDoTempo.main.feels_like}°C</p>
            <p>Umidade: {previsaoDoTempo.main.humidity}%</p>
            <p>Pressão atmosférica: {previsaoDoTempo.main.pressure} hPa</p>
            <p>Visibilidade: {previsaoDoTempo.visibility} metros</p>
          </div>
        </div>
      </div>
    </div>
  );

}

export default DisplayPrevisaoTempo;