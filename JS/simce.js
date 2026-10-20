/**
 * simce.js - Módulo de Ensayo Matemático tipo SIMCE para 4° Básico
 * Presenta 10 preguntas contextualizadas con navegación lateral, registro de respuestas y retroalimentación pedagógica.
 */

const SIMCE_QUESTIONS = [
  {
    id: 1,
    title: "Pregunta 1: Compras en el kiosco",
    context: "Camila compró 7 paquetes de galletas para compartir en el recreo con sus amigas. Si cada paquete cuesta $500, ¿cuánto dinero gastó Camila en total?",
    options: [
      { text: "$3.500", isCorrect: true, letter: "A" },
      { text: "$3.000", isCorrect: false, letter: "B" },
      { text: "$2.500", isCorrect: false, letter: "C" },
      { text: "$4.000", isCorrect: false, letter: "D" }
    ],
    explanation: "Para calcular el total multiplicamos los 7 paquetes por el precio de $500: 7 × 5 = 35, por lo tanto 7 × 500 = $3.500.",
    topic: "Compras y precios (Tabla del 7)"
  },
  {
    id: 2,
    title: "Pregunta 2: El acto del colegio",
    context: "Para la ceremonia de premiación del colegio, el profesor organizó las sillas en 8 filas iguales. Si en cada fila colocó exactamente 6 sillas, ¿cuántas sillas hay en total preparadas para el público?",
    options: [
      { text: "14 sillas", isCorrect: false, letter: "A" },
      { text: "42 sillas", isCorrect: false, letter: "B" },
      { text: "48 sillas", isCorrect: true, letter: "C" },
      { text: "54 sillas", isCorrect: false, letter: "D" }
    ],
    explanation: "Al haber 8 filas de 6 sillas, calculamos 8 × 6 = 48 sillas en total.",
    topic: "Organización de grupos (Tabla del 8 y del 6)"
  },
  {
    id: 3,
    title: "Pregunta 3: Sala de Artes",
    context: "La profesora de Artes reparte témperas y pinceles a 9 mesas de trabajo en la sala. Si a cada mesa le entrega 5 pinceles nuevos, ¿cuántos pinceles repartió en total la profesora?",
    options: [
      { text: "40 pinceles", isCorrect: false, letter: "A" },
      { text: "45 pinceles", isCorrect: true, letter: "B" },
      { text: "50 pinceles", isCorrect: false, letter: "C" },
      { text: "35 pinceles", isCorrect: false, letter: "D" }
    ],
    explanation: "Son 9 grupos de 5 pinceles: 9 × 5 = 45 pinceles.",
    topic: "Distribución de materiales (Tabla del 9 y del 5)"
  },
  {
    id: 4,
    title: "Pregunta 4: El bicicletero escolar",
    context: "En el bicicletero de la escuela hay 9 bicicletas estacionadas. Si sabemos que cada bicicleta tiene 2 ruedas, ¿cuántas ruedas hay en total en el bicicletero?",
    options: [
      { text: "11 ruedas", isCorrect: false, letter: "A" },
      { text: "16 ruedas", isCorrect: false, letter: "B" },
      { text: "18 ruedas", isCorrect: true, letter: "C" },
      { text: "20 ruedas", isCorrect: false, letter: "D" }
    ],
    explanation: "Multiplicamos 9 bicicletas por 2 ruedas cada una: 9 × 2 = 18 ruedas.",
    topic: "Conteo de elementos (Tabla del 2)"
  },
  {
    id: 5,
    title: "Pregunta 5: Alcancía y ahorro",
    context: "Matías ahorra $100 todos los días de lunes a viernes (5 días a la semana). Si ahorró durante 4 semanas seguidas, ¿cuántas monedas de $100 logró juntar en total?",
    options: [
      { text: "9 monedas", isCorrect: false, letter: "A" },
      { text: "20 monedas", isCorrect: true, letter: "B" },
      { text: "25 monedas", isCorrect: false, letter: "C" },
      { text: "16 monedas", isCorrect: false, letter: "D" }
    ],
    explanation: "En 1 semana junta 5 monedas. En 4 semanas junta 4 × 5 = 20 monedas de $100.",
    topic: "Ahorro y semanas (Tabla del 4 y del 5)"
  },
  {
    id: 6,
    title: "Pregunta 6: Biblioteca del colegio",
    context: "En la biblioteca de la escuela hay una repisa especial con 6 estantes. Si en cada estante colocaron 9 libros de aventuras, ¿cuántos libros de aventuras hay en toda la repisa?",
    options: [
      { text: "54 libros", isCorrect: true, letter: "A" },
      { text: "63 libros", isCorrect: false, letter: "B" },
      { text: "45 libros", isCorrect: false, letter: "C" },
      { text: "15 libros", isCorrect: false, letter: "D" }
    ],
    explanation: "Multiplicamos 6 estantes por 9 libros: 6 × 9 = 54 libros.",
    topic: "Organización en repisas (Tabla del 6 y del 9)"
  },
  {
    id: 7,
    title: "Pregunta 7: Torneo matemático",
    context: "En un videojuego educativo, Sofía superó 7 misiones espaciales. Por cada misión que superó con éxito, el juego le otorgó 8 puntos de bonificación. ¿Cuántos puntos de bonificación ganó en total?",
    options: [
      { text: "49 puntos", isCorrect: false, letter: "A" },
      { text: "56 puntos", isCorrect: true, letter: "B" },
      { text: "64 puntos", isCorrect: false, letter: "C" },
      { text: "54 puntos", isCorrect: false, letter: "D" }
    ],
    explanation: "7 misiones por 8 puntos cada una: 7 × 8 = 56 puntos de bonificación.",
    topic: "Puntajes y desafíos (Tabla del 7 y del 8)"
  },
  {
    id: 8,
    title: "Pregunta 8: Huerto escolar",
    context: "Los estudiantes de 4° básico sembraron lechugas en el huerto. Hicieron 4 hileras y en cada hilera plantaron 7 lechugas. ¿Cuántas lechugas plantaron en total en el huerto?",
    options: [
      { text: "21 lechugas", isCorrect: false, letter: "A" },
      { text: "24 lechugas", isCorrect: false, letter: "B" },
      { text: "28 lechugas", isCorrect: true, letter: "C" },
      { text: "32 lechugas", isCorrect: false, letter: "D" }
    ],
    explanation: "4 hileras con 7 lechugas en cada una: 4 × 7 = 28 lechugas en total.",
    topic: "Filas y columnas en el huerto (Tabla del 4)"
  },
  {
    id: 9,
    title: "Pregunta 9: Sorpresas de cumpleaños",
    context: "Para la fiesta de Diego, su mamá preparó 8 bolsitas de sorpresas. Si en cada bolsita guardó 3 autitos de colección, ¿cuántos autitos de juguete ocupó en total?",
    options: [
      { text: "24 autitos", isCorrect: true, letter: "A" },
      { text: "18 autitos", isCorrect: false, letter: "B" },
      { text: "21 autitos", isCorrect: false, letter: "C" },
      { text: "28 autitos", isCorrect: false, letter: "D" }
    ],
    explanation: "8 bolsitas con 3 autitos cada una: 8 × 3 = 24 autitos.",
    topic: "Reparto de regalos (Tabla del 8 y del 3)"
  },
  {
    id: 10,
    title: "Pregunta 10: Repostería y bandejas",
    context: "Don Pedro es el pastelero del barrio y hornea deliciosos queques. Si compró 6 cajas de huevos y cada caja trae exactamente 10 huevos, ¿cuántos huevos tiene en total para cocinar?",
    options: [
      { text: "50 huevos", isCorrect: false, letter: "A" },
      { text: "60 huevos", isCorrect: true, letter: "B" },
      { text: "70 huevos", isCorrect: false, letter: "C" },
      { text: "16 huevos", isCorrect: false, letter: "D" }
    ],
    explanation: "6 cajas con 10 huevos cada una: 6 × 10 = 60 huevos.",
    topic: "Cajas y decenas (Tabla del 10)"
  }
];

class SimceManager {
  constructor() {
    this.answers = {}; // { questionId: selectedIndex }
    this.currentQuestionIndex = 0;
  }

  startExam(container) {
    this.answers = {};
    this.currentQuestionIndex = 0;

    container.innerHTML = `
      <div class="simce-wrapper">
        <div class="simce-top-bar">
          <div>
            <h3>📝 Ensayo Matemático tipo SIMCE</h3>
            <span class="simce-sub">Evaluación Formativa de Multiplicación - 4° Básico</span>
          </div>
          <div class="simce-progress-badge">
            Respondidas: <strong id="simce-answered-count">0</strong> de 10
          </div>
        </div>

        <div class="simce-layout">
          <!-- Sector lateral de navegación (1 al 10) -->
          <div class="simce-sidebar">
            <h4 class="sidebar-title">Preguntas</h4>
            <div class="simce-nav-grid" id="simce-nav-grid">
              ${SIMCE_QUESTIONS.map((q, i) => `
                <button class="simce-nav-btn ${i === 0 ? 'active' : ''}" 
                        id="nav-btn-${i}" 
                        onclick="simce.goToQuestion(${i})">
                  ${i + 1}
                </button>
              `).join('')}
            </div>
            <div class="simce-legend">
              <div><span class="legend-box current"></span> Actual</div>
              <div><span class="legend-box answered"></span> Respondida</div>
              <div><span class="legend-box pending"></span> Pendiente</div>
            </div>
            <button class="btn btn-success btn-block" style="margin-top: 1.5rem;" onclick="simce.finishExam()">
              🏁 Finalizar Ensayo
            </button>
          </div>

          <!-- Área principal de la pregunta -->
          <div class="simce-main-area" id="simce-question-container">
            <!-- Cargado dinámicamente -->
          </div>
        </div>
      </div>
    `;

    this.renderQuestion(0);
  }

  goToQuestion(index) {
    sounds.playClick();
    this.currentQuestionIndex = index;
    this.updateNavButtons();
    this.renderQuestion(index);
  }

  updateNavButtons() {
    SIMCE_QUESTIONS.forEach((q, i) => {
      const btn = document.getElementById(`nav-btn-${i}`);
      if (!btn) return;
      btn.className = 'simce-nav-btn';
      if (i === this.currentQuestionIndex) {
        btn.classList.add('active');
      }
      if (this.answers[q.id] !== undefined) {
        btn.classList.add('answered');
      }
    });
    const count = Object.keys(this.answers).length;
    const answeredEl = document.getElementById('simce-answered-count');
    if (answeredEl) answeredEl.textContent = count;
  }

  renderQuestion(index) {
    const q = SIMCE_QUESTIONS[index];
    const container = document.getElementById('simce-question-container');
    if (!container) return;

    const selectedOption = this.answers[q.id];

    container.innerHTML = `
      <div class="question-card">
        <div class="question-header">
          <span class="question-pill">${q.title}</span>
          <span class="question-topic">${q.topic}</span>
        </div>

        <div class="question-context-box">
          <p class="question-text">${q.context}</p>
        </div>

        <div class="question-prompt">Selecciona la alternativa correcta:</div>

        <div class="options-list">
          ${q.options.map((opt, optIdx) => `
            <div class="option-card ${selectedOption === optIdx ? 'selected' : ''}" 
                 onclick="simce.selectOption(${q.id}, ${optIdx})">
              <span class="option-letter">${opt.letter}</span>
              <span class="option-text">${opt.text}</span>
            </div>
          `).join('')}
        </div>

        <div class="question-footer-nav">
          <button class="btn btn-secondary" onclick="simce.goToQuestion(${Math.max(0, index - 1)})" ${index === 0 ? 'disabled' : ''}>
            ⬅ Anterior
          </button>
          <span class="question-counter-label">${index + 1} de ${SIMCE_QUESTIONS.length}</span>
          ${index < SIMCE_QUESTIONS.length - 1 ? `
            <button class="btn btn-primary" onclick="simce.goToQuestion(${index + 1})">
              Siguiente ➡
            </button>
          ` : `
            <button class="btn btn-success" onclick="simce.finishExam()">
              🏁 Entregar Ensayo
            </button>
          `}
        </div>
      </div>
    `;
  }

  selectOption(questionId, optionIndex) {
    sounds.playPop();
    this.answers[questionId] = optionIndex;
    this.updateNavButtons();
    this.renderQuestion(this.currentQuestionIndex);
  }

  finishExam() {
    const total = SIMCE_QUESTIONS.length;
    const answeredCount = Object.keys(this.answers).length;

    if (answeredCount < total) {
      const remaining = total - answeredCount;
      const confirmFinish = confirm(`Aún tienes ${remaining} pregunta(s) sin responder. ¿Deseas entregar el ensayo de todas formas?`);
      if (!confirmFinish) return;
    }

    // Calcular resultado
    let score = 0;
    const details = [];

    SIMCE_QUESTIONS.forEach(q => {
      const selectedIndex = this.answers[q.id];
      const selectedOpt = selectedIndex !== undefined ? q.options[selectedIndex] : null;
      const isCorrect = selectedOpt ? selectedOpt.isCorrect : false;
      const correctOpt = q.options.find(o => o.isCorrect);

      if (isCorrect) score++;

      details.push({
        question: q,
        selectedIndex,
        selectedOpt,
        correctOpt,
        isCorrect
      });
    });

    // Guardar en almacenamiento
    const result = storage.saveSimceResult(score, total, details);
    sounds.playFanfare();
    confetti.launch(100);

    // Mostrar pantalla de resultados y retroalimentación
    this.renderResults(result, details);
  }

  renderResults(result, details) {
    const container = document.getElementById('main-content-area');
    const percent = result.percent;

    let badgeColor = '#2ED573';
    let feedbackMsg = '';
    if (percent >= 80) {
      feedbackMsg = '¡Espectacular desempeño! Tienes un dominio muy sólido de las tablas de multiplicar y sabes aplicarlas en situaciones de la vida diaria.';
      badgeColor = '#2ED573';
    } else if (percent >= 60) {
      feedbackMsg = '¡Muy buen trabajo! Tienes las habilidades básicas consolidadas. Con un poco más de práctica en los minijuegos alcanzarás la excelencia.';
      badgeColor = '#FFA502';
    } else {
      feedbackMsg = '¡Buen intento! Cada error es una oportunidad de aprender. Te recomendamos repasar los módulos de aprendizaje de las tablas y volver a intentar.';
      badgeColor = '#FF6B6B';
    }

    container.innerHTML = `
      <div class="simce-results-view">
        <div class="results-hero-card">
          <div class="results-trophy">🏆</div>
          <h2>¡Resultado del Ensayo SIMCE!</h2>
          <div class="results-score-pill" style="background-color: ${badgeColor};">
            Puntaje: ${result.score} de ${result.total} (${result.percent}%)
          </div>
          <div class="results-level-tag">Nivel de Logro: <strong>${result.level}</strong></div>
          <p class="results-message">${feedbackMsg}</p>
          <div class="results-bonus-stars">⭐ ¡Has ganado estrellas de recompensa!</div>
          <div style="margin-top: 1.5rem;">
            <button class="btn btn-primary btn-lg" onclick="app.showSection('home')">🏠 Volver al Menú Principal</button>
            <button class="btn btn-secondary btn-lg" onclick="simce.startExam(document.getElementById('main-content-area'))">🔄 Repetir Ensayo</button>
          </div>
        </div>

        <div class="results-detail-section">
          <h3>📖 Revisión y Retroalimentación Pedagógica Pregunta por Pregunta</h3>
          <p>Revisa cada pregunta para descubrir la explicación y aprender de tus respuestas:</p>

          <div class="feedback-cards-grid">
            ${details.map((d, idx) => `
              <div class="feedback-item-card ${d.isCorrect ? 'item-correct' : 'item-wrong'}">
                <div class="feedback-item-header">
                  <span class="status-icon">${d.isCorrect ? '✅ Correcta' : '❌ Incorrecta'}</span>
                  <span class="feedback-q-num">Pregunta ${idx + 1}</span>
                </div>
                <div class="feedback-item-context">${d.question.context}</div>
                <div class="feedback-comparison">
                  <div>Tu respuesta: <strong>${d.selectedOpt ? d.selectedOpt.letter + ') ' + d.selectedOpt.text : 'No respondida'}</strong></div>
                  <div>Respuesta correcta: <strong>${d.correctOpt.letter}) ${d.correctOpt.text}</strong></div>
                </div>
                <div class="feedback-explanation">
                  💡 <strong>Explicación:</strong> ${d.question.explanation}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    app.updateHeaderStats();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

const simce = new SimceManager();
