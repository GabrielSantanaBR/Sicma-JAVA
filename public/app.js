"use strict";

(() => {
  const $ = (selector) => document.querySelector(selector);
  const questions = [
    {id:1,topic:"logica",level:"iniciante",q:"Qual número completa a sequência: 2, 4, 8, 16, ...?",a:["20","24","32","36"],correct:2,why:"Cada termo é o dobro do anterior: 16 × 2 = 32."},
    {id:2,topic:"logica",level:"iniciante",q:"Se hoje é terça-feira, que dia da semana será daqui a 10 dias?",a:["Quinta-feira","Sexta-feira","Sábado","Domingo"],correct:1,why:"Dez dias equivalem a uma semana e mais três dias: terça → sexta."},
    {id:3,topic:"logica",level:"intermediario",q:"Pedro está em 5º lugar do início da fila e em 7º do final. Quantas pessoas estão na fila?",a:["10","11","12","13"],correct:1,why:"Somamos as duas posições e subtraímos Pedro, que foi contado duas vezes: 5 + 7 − 1 = 11."},
    {id:4,topic:"logica",level:"intermediario",q:"Se estudar é condição suficiente para passar, e João passou, podemos concluir que ele estudou?",a:["Sim, necessariamente","Não, pode haver outro motivo","Só se tirou nota máxima","A frase é contraditória"],correct:1,why:"A condição 'se estudou, então passou' não diz que estudar é a única maneira de passar. Concluir o antecedente é um erro lógico."},
    {id:5,topic:"logica",level:"avancado",q:"Sabemos que A implica B e B implica C. Se A é verdadeiro, o que podemos afirmar?",a:["C é verdadeiro","C é falso","B é falso","Nada sobre B ou C"],correct:0,why:"Pela transitividade da implicação, A ⇒ B ⇒ C. Se A ocorre, B e C também ocorrem."},
    {id:6,topic:"numeros",level:"iniciante",q:"Qual é o máximo divisor comum (MDC) de 18 e 24?",a:["3","6","9","12"],correct:1,why:"Os divisores comuns de 18 e 24 são 1, 2, 3 e 6. O maior é 6."},
    {id:7,topic:"numeros",level:"iniciante",q:"Qual destes números é primo?",a:["21","27","29","33"],correct:2,why:"29 só é divisível pelos inteiros positivos 1 e 29."},
    {id:8,topic:"numeros",level:"intermediario",q:"Qual é o resto de 3⁴ na divisão por 7?",a:["2","3","4","6"],correct:2,why:"3⁴ = 81, e 81 = 7 × 11 + 4. Logo, o resto é 4."},
    {id:9,topic:"numeros",level:"intermediario",q:"O produto de dois números inteiros ímpares é sempre...",a:["Par","Ímpar","Múltiplo de 4","Primo"],correct:1,why:"Se os números são 2a + 1 e 2b + 1, o produto é 2(2ab + a + b) + 1, portanto é ímpar."},
    {id:10,topic:"numeros",level:"avancado",q:"Qual é o menor inteiro positivo divisível por 6 e por 8, mas não por 5?",a:["12","18","24","40"],correct:2,why:"O mínimo múltiplo comum de 6 e 8 é 24, que não é divisível por 5."},
    {id:11,topic:"geometria",level:"iniciante",q:"Qual é a soma dos ângulos internos de um triângulo plano?",a:["90°","180°","270°","360°"],correct:1,why:"Em geometria euclidiana, a soma dos ângulos internos de qualquer triângulo é 180°."},
    {id:12,topic:"geometria",level:"iniciante",q:"Um retângulo mede 8 cm por 5 cm. Qual é sua área?",a:["13 cm²","26 cm²","40 cm²","80 cm²"],correct:2,why:"Área do retângulo = base × altura = 8 × 5 = 40 cm²."},
    {id:13,topic:"geometria",level:"intermediario",q:"Qual é o comprimento de uma circunferência de raio 3?",a:["3π","6π","9π","12π"],correct:1,why:"O comprimento é C = 2πr. Para r = 3, C = 6π."},
    {id:14,topic:"geometria",level:"intermediario",q:"Um triângulo com lados 3, 4 e 5 é ampliado por um fator 2. Qual o novo perímetro?",a:["12","18","24","30"],correct:2,why:"O perímetro original é 12. Em uma ampliação de fator 2, cada comprimento dobra, incluindo o perímetro: 24."},
    {id:15,topic:"geometria",level:"avancado",q:"Um triângulo retângulo tem catetos de 5 e 12. Qual é sua hipotenusa?",a:["11","13","15","17"],correct:1,why:"Pelo Teorema de Pitágoras: c² = 5² + 12² = 25 + 144 = 169. Portanto c = 13."},
    {id:16,topic:"combinatoria",level:"iniciante",q:"Ao lançar uma moeda duas vezes, quantos resultados ordenados distintos são possíveis?",a:["2","3","4","6"],correct:2,why:"Os pares possíveis são CC, CK, KC e KK (cara e coroa), totalizando 4 resultados."},
    {id:17,topic:"combinatoria",level:"iniciante",q:"De quantas maneiras três livros diferentes podem ser organizados em uma prateleira?",a:["3","5","6","9"],correct:2,why:"São 3 opções para a primeira posição, 2 para a segunda e 1 para a terceira: 3! = 6."},
    {id:18,topic:"combinatoria",level:"intermediario",q:"Quantos grupos distintos de 2 pessoas podem ser formados a partir de 5 pessoas?",a:["5","10","15","20"],correct:1,why:"A ordem não importa, portanto usamos combinações: C(5,2) = 5 × 4 ÷ 2 = 10."},
    {id:19,topic:"combinatoria",level:"intermediario",q:"Quantos números de dois algarismos distintos podemos formar usando apenas 1, 2, 3 e 4?",a:["8","10","12","16"],correct:2,why:"Há 4 escolhas para a dezena e 3 escolhas restantes para a unidade: 4 × 3 = 12."},
    {id:20,topic:"combinatoria",level:"avancado",q:"De quantas formas diferentes 6 pessoas podem sentar-se ao redor de uma mesa circular, considerando rotações iguais?",a:["120","360","600","720"],correct:0,why:"Fixamos uma pessoa para eliminar as rotações equivalentes e permutamos as outras cinco: 5! = 120."},
    {id:21,topic:"algebra",level:"iniciante",q:"Se x + 7 = 19, qual é o valor de x?",a:["10","11","12","13"],correct:2,why:"Subtraindo 7 dos dois lados da igualdade: x = 19 − 7 = 12."},
    {id:22,topic:"algebra",level:"iniciante",q:"Se 3x = 27, quanto vale x?",a:["6","8","9","12"],correct:2,why:"Dividindo ambos os lados por 3, obtemos x = 9."},
    {id:23,topic:"algebra",level:"intermediario",q:"Resolva 2(x − 3) = 10. Qual é o valor de x?",a:["5","7","8","10"],correct:2,why:"Dividimos por 2: x − 3 = 5. Somando 3, x = 8."},
    {id:24,topic:"algebra",level:"intermediario",q:"Se f(x) = 2x² − 3, quanto vale f(3)?",a:["9","12","15","18"],correct:2,why:"Substituindo x = 3, f(3) = 2 × 3² − 3 = 18 − 3 = 15."},
    {id:25,topic:"algebra",level:"avancado",q:"Quais são as raízes de x² − 5x + 6 = 0?",a:["1 e 6","−2 e −3","2 e 3","−1 e 6"],correct:2,why:"Fatorando o polinômio: (x − 2)(x − 3) = 0. As raízes são 2 e 3."}
  ];
  const topics = {
    logica:"RACIOCÍNIO LÓGICO",numeros:"TEORIA DOS NÚMEROS",geometria:"GEOMETRIA",combinatoria:"COMBINATÓRIA",algebra:"ÁLGEBRA"
  };
  const levels = {iniciante:"EXPLORADOR",intermediario:"INVESTIGADOR",avancado:"DESAFIADOR"};
  const storageKey = "sicma-mathema-progress-v1";
  let stats = {answered:0,correct:0,streak:0,bestStreak:0};
  let current = null;
  let answered = false;
  let previousId = null;
  let cycle = [];

  function readProgress() {
    try {
      const obj = JSON.parse(localStorage.getItem(storageKey));
      if (obj && ["answered","correct","streak","bestStreak"].every((key) => Number.isSafeInteger(obj[key]) && obj[key] >= 0) && obj.correct <= obj.answered && obj.streak <= obj.correct && obj.bestStreak <= obj.correct) {
        stats = obj;
      }
    } catch { /* The site remains usable when browser storage is unavailable. */ }
    showProgress();
  }
  function saveProgress() {
    try { localStorage.setItem(storageKey, JSON.stringify(stats)); } catch { /* Optional local-only feature. */ }
    showProgress();
  }
  function showProgress() {
    $("#solved-count").textContent = String(stats.answered);
    $("#accuracy").textContent = stats.answered ? Math.round(100 * stats.correct / stats.answered) + "%" : "0%";
    $("#best-streak").textContent = String(stats.bestStreak);
  }
  function chooseQuestion() {
    const topic = $("#topic").value;
    const level = $("#level").value;
    const matching = questions.filter((q) => (topic === "todos" || q.topic === topic) && (level === "todos" || q.level === level));
    if (matching.length === 0) {
      current = null;
      $("#question-text").textContent = "Ainda não há desafios nessa combinação.";
      $("#question-hint").textContent = "Escolha outro tema ou outra dificuldade para continuar.";
      $("#answers").replaceChildren();
      $("#feedback").hidden = true;
      $("#next-question").disabled = true;
      return;
    }
    const keys = matching.map((q) => q.id).join(",");
    if (cycle.key !== keys || !cycle.remaining?.length) {
      cycle = {key:keys,remaining:matching.map((q) => q.id)};
    }
    let choices = cycle.remaining;
    if (choices.length > 1 && previousId !== null) {
      const withoutRepeat = choices.filter((id) => id !== previousId);
      if (withoutRepeat.length) choices = withoutRepeat;
    }
    const selected = choices[Math.floor(Math.random() * choices.length)];
    cycle.remaining = cycle.remaining.filter((id) => id !== selected);
    previousId = selected;
    current = questions.find((q) => q.id === selected);
    answered = false;
    $("#question-number").textContent = "DESAFIO " + String(current.id).padStart(3,"0");
    $("#difficulty-pill").textContent = levels[current.level];
    $("#question-category").textContent = topics[current.topic];
    $("#question-text").textContent = current.q;
    $("#question-hint").textContent = "Escolha uma alternativa para conferir a explicação.";
    $("#question-state").textContent = "PENSE COM CALMA. NÃO HÁ CRONÔMETRO.";
    $("#next-question").disabled = true;
    const feedback = $("#feedback");
    feedback.hidden = true;
    feedback.classList.remove("error");
    feedback.replaceChildren();
    const answers = $("#answers");
    answers.replaceChildren();
    current.a.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "answer";
      button.type = "button";
      const letter = document.createElement("span");
      letter.className = "answer-letter";
      letter.textContent = String.fromCharCode(65 + index);
      const value = document.createElement("span");
      value.textContent = option;
      button.append(letter, value);
      button.addEventListener("click", () => submitAnswer(index));
      answers.append(button);
    });
  }
  function submitAnswer(index) {
    if (!current || answered) return;
    answered = true;
    const correct = index === current.correct;
    stats.answered++;
    if (correct) {
      stats.correct++;
      stats.streak++;
      stats.bestStreak = Math.max(stats.bestStreak,stats.streak);
    } else {
      stats.streak = 0;
    }
    saveProgress();
    const buttons = [...$("#answers").querySelectorAll("button")];
    buttons.forEach((button, i) => {
      button.disabled = true;
      if (i === current.correct) button.classList.add("correct");
      else if (i === index) button.classList.add("incorrect");
    });
    const feedback = $("#feedback");
    const title = document.createElement("strong");
    title.textContent = correct ? "Boa! Você acertou." : "Quase! Vamos entender a solução.";
    const explanation = document.createElement("span");
    explanation.textContent = current.why;
    feedback.replaceChildren(title,explanation);
    feedback.classList.toggle("error",!correct);
    feedback.hidden = false;
    $("#question-state").textContent = correct ? "ÓTIMO RACIOCÍNIO. SIGA EM FRENTE." : "CADA TENTATIVA É PARTE DA DESCOBERTA.";
    $("#next-question").disabled = false;
  }
  function resetProgress() {
    if (!window.confirm("Apagar suas estatísticas de treino neste navegador? Essa ação não pode ser desfeita.")) return;
    stats = {answered:0,correct:0,streak:0,bestStreak:0};
    try { localStorage.removeItem(storageKey); } catch { /* Ignore blocked storage. */ }
    showProgress();
    chooseQuestion();
  }
  const toggle = $("#menu-toggle");
  const menu = $("#menu");
  toggle.addEventListener("click", () => {
    const open = !menu.classList.contains("open");
    menu.classList.toggle("open",open);
    toggle.setAttribute("aria-expanded",String(open));
    toggle.setAttribute("aria-label",open ? "Fechar menu" : "Abrir menu");
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded","false");
    toggle.setAttribute("aria-label","Abrir menu");
  }));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded","false");
      toggle.setAttribute("aria-label","Abrir menu");
    }
  });
  $("#topic").addEventListener("change",chooseQuestion);
  $("#level").addEventListener("change",chooseQuestion);
  $("#new-question").addEventListener("click",chooseQuestion);
  $("#next-question").addEventListener("click",chooseQuestion);
  $("#reset-progress").addEventListener("click",resetProgress);
  $("#year").textContent = String(new Date().getFullYear());
  readProgress();
  chooseQuestion();
})();
