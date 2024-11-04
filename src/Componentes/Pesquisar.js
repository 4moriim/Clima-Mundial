import React from "react";

function Pesquisar({ cidade, handleChange, handleSearch, handleKeyPress }) {
    return (
        <div className="pesquisa-previsao-tempo">
            <h1>Verifique a previsão do tempo de sua cidade!</h1>
            <input
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="form-control"
                placeholder="Digite o nome de sua cidade"
                value={cidade}
            />
            <button onClick={handleSearch} className="btn">
                Pesquisar
            </button>
        </div>
    );
}

export default Pesquisar;