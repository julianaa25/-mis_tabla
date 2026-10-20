/**
 * games.js - Mini-juegos dinámicos y actividades variadas para aprender las tablas
 * Implementa:
 * 1. Memoria Matemática (Memotest de cartas)
 * 2. Atrapa el Resultado (Burbujas dinámicas)
 * 3. Construye la Multiplicación (Agrupación visual interactiva)
 * 4. ¿Quién tiene la respuesta? (Personajes interactivos)
 * 5. Arrastra y Completa (Asociación táctil / Drag & Drop)
 */

class GamesHub {
  constructor() {
    this.currentGame = null;
    this.timer = null;
  }

  // -------------------------------------------------------------
  // JUEGO 1: MEMORIA MATEMÁTICA
  // -------------------------------------------------------------
  startMemoryGame(container, tableNumber = null) {
    this.clearTimer();
    const tablesPool = tableNumber ? [parseInt(tableNumber)] : [2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // Generar 4 pares de multiplicación y resultado
    const pairs = [];
    const used = new Set();
    while (pairs.length < 4) {
      const t = tablesPool[Math.floor(Math.random() * tablesPool.length)];
      const f = Math.floor(Math.random() * 9) + 2;
      const key = `${t}x${f}`;
      if (!used.has(key)) {
        used.add(key);
        pairs.push({
          id: key,
          operation: `${t} × ${f}`,
          result: `${t * f}`
        });
      }
    }

    // Crear cartas (8 cartas: 4 operaciones y 4 resultados)
    const cards = [];
    pairs.forEach(p => {
      cards.push({ id: p.id, text: p.operation, type: 'op' });
      cards.push({ id: p.id, text: p.result, type: 'res' });
    });
    // Barajar
    cards.sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <div class="game-wrapper">
        <div class="game-header">
          <button class="btn btn-secondary btn-sm" onclick="app.showSection('games')">⬅ Volver a Juegos</button>
          <h3>🧠 Memoria Matemática</h3>
          <div class="game-badge">Pares encontrados: <span id="mem-pairs">0</span>/4</div>
        </div>
        <p class="game-instruction">Haz clic en dos cartas para emparejar cada multiplicación con su resultado correcto.</p>
        <div class="memory-grid" id="memory-board">
          ${cards.map((c, i) => `
            <div class="memory-card" data-index="${i}" data-id="${c.id}" onclick="games.flipCard(this)">
              <div class="card-inner">
                <div class="card-front">❓</div>
                <div class="card-back">${c.text}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.memoryState = {
      cards: cards,
      flipped: [],
      matchedCount: 0,
      lock: false
    };
  }

  flipCard(cardEl) {
    if (this.memoryState.lock || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) {
      return;
    }

    sounds.playPop();
    cardEl.classList.add('flipped');
    this.memoryState.flipped.push(cardEl);

    if (this.memoryState.flipped.length === 2) {
      this.memoryState.lock = true;
      const [c1, c2] = this.memoryState.flipped;
      const id1 = c1.dataset.id;
      const id2 = c2.dataset.id;

      if (id1 === id2) {
        // Coincidencia correcta!
        setTimeout(() => {
          sounds.playCorrect();
          c1.classList.add('matched');
          c2.classList.add('matched');
          this.memoryState.matchedCount++;
          document.getElementById('mem-pairs').textContent = this.memoryState.matchedCount;
          this.memoryState.flipped = [];
          this.memoryState.lock = false;

          if (this.memoryState.matchedCount === 4) {
            this.handleGameWin('¡Memoria Brillante! 🧠✨', 'Encontraste todas las parejas matemáticas a la perfección.', 2);
          }
        }, 500);
      } else {
        // No coinciden
        setTimeout(() => {
          sounds.playWrong();
          c1.classList.remove('flipped');
          c2.classList.remove('flipped');
          this.memoryState.flipped = [];
          this.memoryState.lock = false;
        }, 1000);
      }
    }
  }

  // -------------------------------------------------------------
  // JUEGO 2: ATRAPA EL RESULTADO (Burbujas flotantes rápidas)
  // -------------------------------------------------------------
  startCatchGame(container, tableNumber = null) {
    this.clearTimer();
    const tablesPool = tableNumber ? [parseInt(tableNumber)] : [2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    let score = 0;
    let round = 1;
    const maxRounds = 5;

    container.innerHTML = `
      <div class="game-wrapper">
        <div class="game-header">
          <button class="btn btn-secondary btn-sm" onclick="app.showSection('games')">⬅ Volver a Juegos</button>
          <h3>🎈 Atrapa el Resultado</h3>
          <div class="game-badge">Puntos: <span id="catch-score">0</span> | Ronda: <span id="catch-round">1</span>/${maxRounds}</div>
        </div>
        <div class="catch-target-box">
          <div class="catch-target-title">¿Cuál es el resultado de...?</div>
          <div class="catch-target-op" id="catch-question">Cargando...</div>
        </div>
        <div class="bubbles-arena" id="bubbles-arena"></div>
      </div>
    `;

    const nextRound = () => {
      if (round > maxRounds) {
        this.handleGameWin('¡Cazador de Resultados Estrella! 🎈🌟', `Lograste atrapar las respuestas con un puntaje de ${score} puntos.`, 3);
        return;
      }
      document.getElementById('catch-round').textContent = round;
      document.getElementById('catch-score').textContent = score;

      const t = tablesPool[Math.floor(Math.random() * tablesPool.length)];
      const f = Math.floor(Math.random() * 9) + 2;
      const correct = t * f;

      document.getElementById('catch-question').textContent = `${t} × ${f} = ?`;

      // Generar 3 respuestas incorrectas cercanas
      const options = new Set([correct]);
      while (options.size < 4) {
        const offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
        const wrong = Math.max(1, correct + offset);
        options.add(wrong);
      }

      const shuffled = Array.from(options).sort(() => Math.random() - 0.5);
      const arena = document.getElementById('bubbles-arena');
      arena.innerHTML = '';

      shuffled.forEach(val => {
        const bubble = document.createElement('div');
        bubble.className = 'floating-bubble';
        bubble.textContent = val;
        bubble.onclick = () => {
          if (val === correct) {
            sounds.playCorrect();
            bubble.classList.add('pop-correct');
            score += 20;
            round++;
            storage.recordAnswer(true);
            setTimeout(nextRound, 600);
          } else {
            sounds.playWrong();
            bubble.classList.add('shake-wrong');
            storage.recordAnswer(false);
          }
        };
        arena.appendChild(bubble);
      });
    };

    nextRound();
  }

  // -------------------------------------------------------------
  // JUEGO 3: CONSTRUYE LA MULTIPLICACIÓN (Grupos visuales de objetos)
  // -------------------------------------------------------------
  startBuildGame(container, tableNumber = null) {
    this.clearTimer();
    const t = tableNumber ? parseInt(tableNumber) : (Math.floor(Math.random() * 4) + 2); // 2, 3, 4 o 5
    const f = Math.floor(Math.random() * 4) + 2; // 2, 3, 4 o 5
    const targetResult = t * f;

    const emojiIcons = ['🍎', '⭐', '🍪', '🌸', '🚗', '🍬'];
    const chosenEmoji = emojiIcons[Math.floor(Math.random() * emojiIcons.length)];

    let currentItemsPerGroup = 0;

    container.innerHTML = `
      <div class="game-wrapper">
        <div class="game-header">
          <button class="btn btn-secondary btn-sm" onclick="app.showSection('games')">⬅ Volver a Juegos</button>
          <h3>🏗️ Construye la Multiplicación</h3>
        </div>
        <div class="build-challenge-card">
          <h4>¡Misión de Arquitecto Matemático!</h4>
          <p>Representa la multiplicación colocando la cantidad correcta de objetos en cada caja:</p>
          <div class="build-target-formula">${t} × ${f} = <span class="highlight-target">?</span></div>
          <div class="build-helper-hint">💡 Necesitamos <strong>${t} cajas</strong>, y en cada caja debes poner <strong>${f} objetos</strong>.</div>
        </div>

        <div class="build-controls">
          <button class="btn btn-accent" id="btn-add-item">➕ Agregar 1 a cada caja</button>
          <button class="btn btn-outline" id="btn-rem-item">➖ Quitar 1 de cada caja</button>
          <button class="btn btn-success" id="btn-check-build">✅ ¡Comprobar Construcción!</button>
        </div>

        <div class="boxes-container" id="boxes-container">
          ${Array.from({ length: t }).map((_, i) => `
            <div class="math-box">
              <div class="box-label">Caja ${i + 1}</div>
              <div class="box-items-slot" id="box-slot-${i}">
                <span class="empty-slot-msg">Vacía</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="build-summary-box" id="build-summary">
          Total de objetos colocados: <strong id="total-objects-count">0</strong>
        </div>
      </div>
    `;

    const updateBoxes = () => {
      for (let i = 0; i < t; i++) {
        const slot = document.getElementById(`box-slot-${i}`);
        if (currentItemsPerGroup === 0) {
          slot.innerHTML = '<span class="empty-slot-msg">Vacía</span>';
        } else {
          slot.innerHTML = Array.from({ length: currentItemsPerGroup }).map(() => `<span class="placed-item">${chosenEmoji}</span>`).join('');
        }
      }
      document.getElementById('total-objects-count').textContent = currentItemsPerGroup * t;
    };

    document.getElementById('btn-add-item').onclick = () => {
      if (currentItemsPerGroup < 10) {
        sounds.playPop();
        currentItemsPerGroup++;
        updateBoxes();
      }
    };

    document.getElementById('btn-rem-item').onclick = () => {
      if (currentItemsPerGroup > 0) {
        sounds.playPop();
        currentItemsPerGroup--;
        updateBoxes();
      }
    };

    document.getElementById('btn-check-build').onclick = () => {
      if (currentItemsPerGroup === f) {
        sounds.playCorrect();
        const repeatedSum = Array.from({ length: t }).map(() => f).join(' + ');
        this.handleGameWin('¡Excelente Construcción! 🏗️🌟', `¡Exacto! ${t} grupos de ${f} objetos son en total ${targetResult} objetos (${repeatedSum} = ${targetResult}).`, 2);
      } else {
        sounds.playWrong();
        const msg = currentItemsPerGroup < f ? 'Te faltan objetos en las cajas. ¡Agrega un poco más!' : 'Pusiste demasiados objetos. ¡Prueba quitando algunos!';
        alertModal('¡Casi lo logras!', msg, 'info');
      }
    };
  }

  // -------------------------------------------------------------
  // JUEGO 4: ¿QUIÉN TIENE LA RESPUESTA? (Avatares interactivos)
  // -------------------------------------------------------------
  startWhoHasItGame(container, tableNumber = null) {
    this.clearTimer();
    const tablesPool = tableNumber ? [parseInt(tableNumber)] : [2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    let currentRound = 1;
    const maxRounds = 4;
    let score = 0;

    const avatars = [
      { id: 'avatar1', name: 'Leo', img: 'IMAGEN/avatar1.svg' },
      { id: 'avatar2', name: 'Foxy', img: 'IMAGEN/avatar2.svg' },
      { id: 'avatar3', name: 'Pandita', img: 'IMAGEN/avatar3.svg' },
      { id: 'avatar4', name: 'Buhito', img: 'IMAGEN/avatar4.svg' },
      { id: 'avatar5', name: 'Astro', img: 'IMAGEN/avatar5.svg' }
    ];

    container.innerHTML = `
      <div class="game-wrapper">
        <div class="game-header">
          <button class="btn btn-secondary btn-sm" onclick="app.showSection('games')">⬅ Volver a Juegos</button>
          <h3>🐾 ¿Quién tiene la respuesta?</h3>
          <div class="game-badge">Aciertos: <span id="who-score">0</span> | Desafío <span id="who-round">1</span>/${maxRounds}</div>
        </div>
        <div class="who-question-banner">
          <div class="who-sub">Observa a los personajes y selecciona al que tenga la respuesta correcta a:</div>
          <div class="who-op" id="who-target-op">Cargando...</div>
        </div>
        <div class="characters-row" id="characters-stage"></div>
      </div>
    `;

    const nextQuestion = () => {
      if (currentRound > maxRounds) {
        this.handleGameWin('¡Detective de Personajes! 🐾🏅', `¡Genial trabajo! Ayudaste a tus amigos con un puntaje de ${score} puntos.`, 3);
        return;
      }
      document.getElementById('who-round').textContent = currentRound;
      document.getElementById('who-score').textContent = score;

      const t = tablesPool[Math.floor(Math.random() * tablesPool.length)];
      const f = Math.floor(Math.random() * 9) + 2;
      const correct = t * f;

      document.getElementById('who-target-op').textContent = `${t} × ${f} = ?`;

      // Seleccionar 4 personajes
      const chosenChars = [...avatars].sort(() => Math.random() - 0.5).slice(0, 4);
      // Asignar el valor correcto a uno aleatorio
      const correctIndex = Math.floor(Math.random() * 4);

      // Generar 3 distractores
      const distractors = new Set([correct]);
      while (distractors.size < 4) {
        const offset = (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1);
        distractors.add(Math.max(2, correct + offset));
      }
      const vals = Array.from(distractors).filter(v => v !== correct);

      const stage = document.getElementById('characters-stage');
      stage.innerHTML = '';

      chosenChars.forEach((ch, idx) => {
        const answerVal = (idx === correctIndex) ? correct : vals.pop();
        const charCard = document.createElement('div');
        charCard.className = 'character-card';
        charCard.innerHTML = `
          <div class="char-bubble">${answerVal}</div>
          <img src="${ch.img}" alt="${ch.name}" class="char-img">
          <div class="char-name">${ch.name}</div>
        `;

        charCard.onclick = () => {
          if (idx === correctIndex) {
            sounds.playCorrect();
            charCard.classList.add('char-win');
            score += 25;
            currentRound++;
            storage.recordAnswer(true);
            setTimeout(nextQuestion, 800);
          } else {
            sounds.playWrong();
            charCard.classList.add('char-wrong');
            storage.recordAnswer(false);
          }
        };

        stage.appendChild(charCard);
      });
    };

    nextQuestion();
  }

  // -------------------------------------------------------------
  // JUEGO 5: ARRASTRA Y COMPLETA (Drag & Drop táctil amigable)
  // -------------------------------------------------------------
  startDragGame(container, tableNumber = null) {
    this.clearTimer();
    const tablesPool = tableNumber ? [parseInt(tableNumber)] : [2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // 3 operaciones
    const items = [];
    const used = new Set();
    while (items.length < 3) {
      const t = tablesPool[Math.floor(Math.random() * tablesPool.length)];
      const f = Math.floor(Math.random() * 9) + 2;
      const key = `${t}x${f}`;
      if (!used.has(key)) {
        used.add(key);
        items.push({ op: `${t} × ${f}`, res: t * f });
      }
    }

    container.innerHTML = `
      <div class="game-wrapper">
        <div class="game-header">
          <button class="btn btn-secondary btn-sm" onclick="app.showSection('games')">⬅ Volver a Juegos</button>
          <h3>🧩 Arrastra y Completa</h3>
        </div>
        <p class="game-instruction">Toca una ficha de resultado de la derecha y luego toca la casilla vacía que corresponda para completar la operación.</p>

        <div class="drag-match-arena">
          <div class="drag-targets-column">
            ${items.map((item, idx) => `
              <div class="match-row" data-res="${item.res}">
                <div class="match-op">${item.op} =</div>
                <div class="drop-zone" data-target="${item.res}" onclick="games.handleDropZoneClick(this)">
                  <span class="placeholder-text">Toca aquí</span>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="drag-chips-column" id="chips-pool">
            ${[...items].sort(() => Math.random() - 0.5).map(item => `
              <div class="number-chip" data-val="${item.res}" onclick="games.handleChipClick(this)">
                ${item.res}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.dragState = {
      selectedChip: null,
      matchedCount: 0,
      total: items.length
    };
  }

  handleChipClick(chipEl) {
    if (chipEl.classList.contains('placed')) return;
    sounds.playPop();
    document.querySelectorAll('.number-chip').forEach(c => c.classList.remove('selected-chip'));
    chipEl.classList.add('selected-chip');
    this.dragState.selectedChip = chipEl;
  }

  handleDropZoneClick(dropZone) {
    if (dropZone.classList.contains('filled')) return;
    if (!this.dragState.selectedChip) {
      alertModal('¡Atención!', 'Primero toca una de las fichas con números de la derecha, y luego toca esta casilla.', 'info');
      return;
    }

    const expected = dropZone.dataset.target;
    const selectedVal = this.dragState.selectedChip.dataset.val;

    if (expected === selectedVal) {
      sounds.playCorrect();
      dropZone.innerHTML = `<span class="placed-number">${selectedVal}</span>`;
      dropZone.classList.add('filled');
      this.dragState.selectedChip.classList.add('placed');
      this.dragState.selectedChip.classList.remove('selected-chip');
      this.dragState.selectedChip = null;
      this.dragState.matchedCount++;
      storage.recordAnswer(true);

      if (this.dragState.matchedCount === this.dragState.total) {
        this.handleGameWin('¡Rompecabezas Completado! 🧩🎉', 'Asociaste correctamente todas las multiplicaciones con sus respuestas.', 2);
      }
    } else {
      sounds.playWrong();
      dropZone.classList.add('shake-wrong');
      setTimeout(() => dropZone.classList.remove('shake-wrong'), 600);
      storage.recordAnswer(false);
    }
  }

  // Manejador común de victoria en minijuegos
  handleGameWin(title, message, starsReward = 2) {
    sounds.playFanfare();
    confetti.launch(70);
    storage.addStars(starsReward);

    const winModal = document.createElement('div');
    winModal.className = 'custom-modal-backdrop';
    winModal.innerHTML = `
      <div class="custom-modal-box">
        <div class="modal-trophy-icon">🏆</div>
        <h2>${title}</h2>
        <p>${message}</p>
        <div class="modal-stars-earned">
          +${starsReward} Estrellas Ganadas ⭐
        </div>
        <div class="modal-actions">
          <button class="btn btn-primary btn-lg" onclick="this.closest('.custom-modal-backdrop').remove(); app.showSection('games');">
            🎮 Ir a Menú de Juegos
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(winModal);
    app.updateHeaderStats();
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

const games = new GamesHub();
