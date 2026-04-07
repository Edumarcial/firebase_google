import { useEffect } from "react";

function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      .container {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border-radius: 24px;
        padding: 40px;
        width: 100%;
        max-width: 420px;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
      }
      h1 {
        color: #e94560;
        font-size: 1.8rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 8px;
        letter-spacing: -0.5px;
      }
      .subtitle {
        color: rgba(255, 255, 255, 0.45);
        text-align: center;
        font-size: 0.85rem;
        margin-bottom: 32px;
      }
      .field {
        margin-bottom: 20px;
      }
      label {
        display: block;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.82rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        margin-bottom: 8px;
      }
      input {
        width: 100%;
        padding: 14px 16px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        color: #fff;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.2s, background 0.2s;
        -moz-appearance: textfield;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      input::placeholder { color: rgba(255, 255, 255, 0.25); }
      input:focus {
        border-color: #e94560;
        background: rgba(255, 255, 255, 0.12);
      }
      .unit {
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.78rem;
        font-weight: 500;
        margin-top: 5px;
        padding-left: 2px;
      }
      button {
        width: 100%;
        padding: 15px;
        background: linear-gradient(135deg, #e94560, #c62a47);
        color: #fff;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        letter-spacing: 0.5px;
        margin-top: 8px;
        transition: transform 0.15s, box-shadow 0.15s;
        box-shadow: 0 4px 20px rgba(233, 69, 96, 0.35);
      }
      button:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(233, 69, 96, 0.5); }
      button:active { transform: translateY(0); }
      .result-box {
        margin-top: 28px;
        padding: 24px;
        border-radius: 16px;
        text-align: center;
        display: none;
        animation: fadeIn 0.35s ease;
      }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      .result-box.show { display: block; }
      .imc-value {
        font-size: 3.2rem;
        font-weight: 800;
        line-height: 1;
        margin-bottom: 4px;
      }
      .imc-label {
        font-size: 1.05rem;
        font-weight: 600;
        margin-bottom: 16px;
        opacity: 0.9;
      }
      .imc-desc {
        font-size: 0.82rem;
        opacity: 0.7;
        line-height: 1.5;
      }
      .result-box.magro   { background: rgba(52, 152, 219, 0.18); border: 1px solid rgba(52, 152, 219, 0.4); color: #5dade2; }
      .result-box.normal  { background: rgba(46, 213, 115, 0.18); border: 1px solid rgba(46, 213, 115, 0.4); color: #2ed573; }
      .result-box.sobrepeso { background: rgba(255, 165, 2, 0.18); border: 1px solid rgba(255, 165, 2, 0.4); color: #ffa502; }
      .result-box.obesidade1 { background: rgba(255, 87, 51, 0.18); border: 1px solid rgba(255, 87, 51, 0.4); color: #ff6348; }
      .result-box.obesidade2 { background: rgba(199, 0, 57, 0.18); border: 1px solid rgba(199, 0, 57, 0.4); color: #ff4757; }
      .result-box.obesidade3 { background: rgba(199, 0, 57, 0.25); border: 1px solid rgba(199, 0, 57, 0.6); color: #ff2943; }
      .error-msg {
        color: #e94560;
        font-size: 0.82rem;
        margin-top: 10px;
        text-align: center;
        min-height: 18px;
      }
      .table-ref {
        margin-top: 28px;
        border-top: 1px solid rgba(255,255,255,0.08);
        padding-top: 20px;
      }
      .table-title {
        color: rgba(255,255,255,0.45);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
        font-weight: 600;
      }
      .table-row {
        display: flex;
        justify-content: space-between;
        font-size: 0.78rem;
        color: rgba(255,255,255,0.45);
        padding: 4px 0;
      }
      .table-row .range { color: rgba(255,255,255,0.6); }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  /**
   * Função responsável por realizar o cálculo do IMC, validar os campos de entrada
   * e atualizar a interface com o resultado e a classificação correspondente.
   */
  function calcular() {
    // Captura os valores dos inputs diretamente do DOM
    const pesoInput = (document.getElementById("peso") as HTMLInputElement).value;
    const alturaInput = (document.getElementById("altura") as HTMLInputElement).value;
    const errorEl = document.getElementById("error")!;
    const resultBox = document.getElementById("result-box")!;

    // Limpa mensagens de erro e oculta o box de resultado antes de uma nova validação
    errorEl.textContent = "";
    resultBox.className = "result-box";

    // Converte os valores para float, tratando a vírgula como ponto decimal
    const peso = parseFloat(pesoInput.replace(",", "."));
    const altura = parseFloat(alturaInput.replace(",", "."));

    // Validação: Verifica se os campos estão vazios
    if (!pesoInput || !alturaInput) {
      errorEl.textContent = "Preencha o peso e a altura antes de calcular.";
      return;
    }
    if (isNaN(peso) || peso <= 0 || peso > 500) {
      errorEl.textContent = "Informe um peso válido (ex: 70).";
      return;
    }
    if (isNaN(altura) || altura <= 0 || altura > 3) {
      errorEl.textContent = "Informe a altura em metros (ex: 1.75).";
      return;
    }

    // Cálculo do IMC: Peso / Altura²
    const imc = peso / (altura * altura);
    const imcFormatado = imc.toFixed(1);

    let categoria = "";
    let descricao = "";
    let classe = "";

    // Lógica de classificação baseada nos critérios da OMS
    if (imc < 18.5) {
      categoria = "Abaixo do peso";
      descricao = "Seu peso está abaixo do considerado saudável para sua altura.";
      classe = "magro";
    } else if (imc < 25) {
      categoria = "Peso normal";
      descricao = "Parabens! Seu IMC está dentro da faixa considerada saudável.";
      classe = "normal";
    } else if (imc < 30) {
      categoria = "Sobrepeso";
      descricao = "Seu peso está um pouco acima do ideal. Pequenos ajustes podem ajudar.";
      classe = "sobrepeso";
    } else if (imc < 35) {
      categoria = "Obesidade grau I";
      descricao = "Consulte um profissional de saude para orientacoes personalizadas.";
      classe = "obesidade1";
    } else if (imc < 40) {
      categoria = "Obesidade grau II";
      descricao = "E importante buscar acompanhamento medico e nutricional.";
      classe = "obesidade2";
    } else {
      categoria = "Obesidade grau III";
      descricao = "Procure atendimento medico especializado o quanto antes.";
      classe = "obesidade3";
    }

    // Atualiza o DOM com os resultados calculados
    document.getElementById("imc-value")!.textContent = imcFormatado;
    document.getElementById("imc-label")!.textContent = categoria;
    document.getElementById("imc-desc")!.textContent = descricao;
    
    // Exibe o box de resultado com a classe de cor correspondente
    resultBox.className = `result-box show ${classe}`;
  }

  /**
   * Atalho de teclado para facilitar a usabilidade.
   * Aciona o cálculo quando o usuário pressiona a tecla Enter.
   */
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") calcular();
  }

  return (
    <div className="container">
      <h1>Calculadora de IMC</h1>
      <p className="subtitle">Indice de Massa Corporal</p>

      <div className="field">
        <label htmlFor="peso">Peso</label>
        <input
          id="peso"
          type="number"
          placeholder="70"
          min="1"
          max="500"
          step="0.1"
          onKeyDown={handleKeyDown}
        />
        <div className="unit">quilogramas (kg)</div>
      </div>

      <div className="field">
        <label htmlFor="altura">Altura</label>
        <input
          id="altura"
          type="number"
          placeholder="1.75"
          min="0.5"
          max="3"
          step="0.01"
          onKeyDown={handleKeyDown}
        />
        <div className="unit">metros (ex: 1.75)</div>
      </div>

      <button onClick={calcular}>Calcular IMC</button>

      <div id="error" className="error-msg"></div>

      <div id="result-box" className="result-box">
        <div id="imc-value" className="imc-value"></div>
        <div id="imc-label" className="imc-label"></div>
        <div id="imc-desc" className="imc-desc"></div>
      </div>

      <div className="table-ref">
        <div className="table-title">Tabela de Referencia (OMS)</div>
        <div className="table-row"><span>Abaixo do peso</span><span className="range">{"< 18,5"}</span></div>
        <div className="table-row"><span>Peso normal</span><span className="range">18,5 – 24,9</span></div>
        <div className="table-row"><span>Sobrepeso</span><span className="range">25,0 – 29,9</span></div>
        <div className="table-row"><span>Obesidade I</span><span className="range">30,0 – 34,9</span></div>
        <div className="table-row"><span>Obesidade II</span><span className="range">35,0 – 39,9</span></div>
        <div className="table-row"><span>Obesidade III</span><span className="range">{">= 40,0"}</span></div>
      </div>
    </div>
  );
}

export default App;
