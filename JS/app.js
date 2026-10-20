/**
 * app.js - Controlador principal de la Plataforma Educativa "Mis Tablas"
 * Orquesta la navegación, módulos pedagógicos, progreso y avatares.
 */

class AppController {
  constructor() {
    this.currentSection = 'home';
    this.user = null;
  }

  init() {
    this.user = storage.getUser();
    if (!this.user) {
      // Si no hay datos de usuario, redirigir al index de ingreso
      window.location.href = '../index.html';
      return;
    }

    this.updateHeaderStats();
    this.setupEventListeners();
    this.showSection('home');
  }

  updateHeaderStats() {
    this.user = storage.getUser();
    if (!this.user) return;

    const avatarImg = document.getElementById('header-avatar-img');
    const studentName = document.getElementById('header-student-name');
    const starsCount = document.getElementById('header-stars-count');
    const badgesCount = document.getElementById('header-badges-count');

    if (avatarImg) avatarImg.src = `IMAGEN/${this.user.avatar}.svg`;
    if (studentName) studentName.textContent = this.user.name;
    if (starsCount) starsCount.textContent = this.user.stars || 0;
    
    if (badgesCount) {
      const badges = this.user.achievements || [];
      badgesCount.textContent = badges.length;
    }

    const soundBtn = document.getElementById('btn-sound-toggle');
    if (soundBtn) {
      soundBtn.textContent = sounds.isMuted() ? '🔇 Silenciado' : '🔊 Sonido';
    }
  }

  setupEventListeners() {
    const soundBtn = document.getElementById('btn-sound-toggle');
    if (soundBtn) {
      soundBtn.onclick = () => {
        const isMuted = sounds.toggleMute();
        soundBtn.textContent = isMuted ? '🔇 Silenciado' : '🔊 Sonido';
      };
    }

    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        if (confirm('¿Deseas volver a la pantalla de inicio o cambiar de estudiante?')) {
          window.location.href = '../index.html';
        }
      };
    }
  }

  showSection(sectionId) {
    sounds.playClick();
    this.currentSection = sectionId;
    this.updateNavPills(sectionId);
    this.updateHeaderStats();

    const mainContainer = document.getElementById('main-content-area');
    if (!mainContainer) return;

    switch (sectionId) {
      case 'home':
        this.renderHome(mainContainer);
        break;
      case 'tables':
        this.renderTablesMenu(mainContainer);
        break;
      case 'games':
        this.renderGamesMenu(mainContainer);
        break;
      case 'progress':
        this.renderProgress(mainContainer);
        break;
      case 'simce':
        this.renderSimceEntry(mainContainer);
        break;
      default:
        this.renderHome(mainContainer);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateNavPills(activeId) {
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === activeId);
    });
  }

  // -----------------------------------------------------------------
  // VISTA: INICIO / DASHBOARD
  // -----------------------------------------------------------------
  renderHome(container) {
    const completedTablesCount = Object.values(this.user.tables).filter(t => t.completed).length;
    const isSimceReady = storage.isSimceUnlocked();

    container.innerHTML = `
      <div class="dashboard-hero">
        <div class="hero-left">
          <div class="hero-greeting">
            ¡Hola de nuevo, <span class="highlight-name">${this.user.name}</span>! 👋
          </div>
          <h2 class="hero-title">¡Bienvenido a tu Isla de Aventuras Matemáticas!</h2>
          <p class="hero-desc">
            Aprende las tablas de multiplicar del 2 al 10 jugando, desafía tu mente con entretenidos retos y prepárate para brillar en tu ensayo SIMCE.
          </p>
          <div class="hero-quick-actions">
            <button class="btn btn-primary btn-lg" onclick="app.showSection('tables')">
              📚 Aprender Tablas
            </button>
            <button class="btn btn-accent btn-lg" onclick="app.showSection('games')">
              🎮 Juegos y Desafíos
            </button>
          </div>
        </div>
        <div class="hero-right">
          <div class="avatar-spotlight-card">
            <img src="IMAGEN/${this.user.avatar}.svg" alt="Avatar" class="spotlight-avatar-img">
            <div class="spotlight-avatar-name">${this.getAvatarName(this.user.avatar)}</div>
            <div class="spotlight-stats">
              <span>⭐ ${this.user.stars} Estrellas</span>
              <span>🏅 ${completedTablesCount}/9 Tablas</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Rutas de Aprendizaje en Tarjetas Visuales -->
      <div class="adventure-cards-grid">
        <!-- Tarjeta 1: Aprender Tablas -->
        <div class="adv-card adv-tables" onclick="app.showSection('tables')">
          <div class="adv-icon">🌟</div>
          <div class="adv-body">
            <h3>Aprender Tablas</h3>
            <p>Descubre patrones mágicos, representaciones con grupos de objetos y trucos visuales del 2 al 10.</p>
            <div class="adv-progress-bar">
              <div class="adv-progress-fill" style="width: ${(completedTablesCount / 9) * 100}%;"></div>
            </div>
            <span class="adv-footer-meta">${completedTablesCount} de 9 tablas dominadas</span>
          </div>
          <div class="adv-arrow">➡</div>
        </div>

        <!-- Tarjeta 2: Juegos y Desafíos -->
        <div class="adv-card adv-games" onclick="app.showSection('games')">
          <div class="adv-icon">🎮</div>
          <div class="adv-body">
            <h3>Juegos y Desafíos</h3>
            <p>Memoria matemática, atrapa burbujas, construye multiplicaciones y desafía a los personajes.</p>
            <span class="adv-footer-meta">5 Mini-juegos interactivos disponibles</span>
          </div>
          <div class="adv-arrow">➡</div>
        </div>

        <!-- Tarjeta 3: Progreso y Trofeos -->
        <div class="adv-card adv-progress" onclick="app.showSection('progress')">
          <div class="adv-icon">🏆</div>
          <div class="adv-body">
            <h3>Progreso y Trofeos</h3>
            <p>Observa tus estrellas acumuladas, medallas desbloqueadas y porcentaje de avance escolar.</p>
            <span class="adv-footer-meta">Vitrina de medallas y logros</span>
          </div>
          <div class="adv-arrow">➡</div>
        </div>

        <!-- Tarjeta 4: Ensayo SIMCE -->
        <div class="adv-card adv-simce ${isSimceReady ? '' : 'adv-locked'}" onclick="app.showSection('simce')">
          <div class="adv-icon">${isSimceReady ? '📝' : '🔒'}</div>
          <div class="adv-body">
            <h3>Ensayo tipo SIMCE</h3>
            <p>${isSimceReady ? '10 situaciones reales con compras, grupos y situaciones escolares de 4° básico.' : 'Completa al menos 3 tablas o reúne 6 estrellas para desbloquearlo.'}</p>
            <span class="adv-footer-meta">${isSimceReady ? '✅ ¡Desbloqueado y listo para rendir!' : '🔒 Desafío Bloqueado'}</span>
          </div>
          <div class="adv-arrow">➡</div>
        </div>
      </div>
    `;
  }

  getAvatarName(avatarId) {
    const names = {
      avatar1: 'Leo el León 🦁',
      avatar2: 'Foxy la Zorrita 🦊',
      avatar3: 'Pandita el Genio 🐼',
      avatar4: 'Buhito el Sabio 🦉',
      avatar5: 'Astro Conejito 🚀'
    };
    return names[avatarId] || 'Mi Avatar';
  }

  // -----------------------------------------------------------------
  // VISTA: MENÚ DE TABLAS (2 al 10)
  // -----------------------------------------------------------------
  renderTablesMenu(container) {
    const userTables = this.user.tables;

    container.innerHTML = `
      <div class="section-heading">
        <h2>📚 Módulos de Aprendizaje de Tablas</h2>
        <p>Selecciona una tabla para explorar sus representaciones visuales, patrones matemáticos y ponerte a prueba.</p>
      </div>

      <div class="tables-cards-grid">
        ${Object.keys(TABLES_DATA).map(numStr => {
          const num = parseInt(numStr);
          const data = TABLES_DATA[num];
          const userStatus = userTables[num] || { unlocked: false, completed: false, stars: 0 };
          const isUnlocked = userStatus.unlocked || num === 2; // La tabla del 2 siempre abierta

          return `
            <div class="table-card ${isUnlocked ? 'unlocked' : 'locked'}" 
                 onclick="${isUnlocked ? `app.openTableModule(${num})` : `app.notifyLockedTable(${num})`}">
              <div class="table-card-badge" style="background-color: ${data.color}">
                <span class="table-card-emoji">${data.emoji}</span>
              </div>
              <div class="table-card-num">Tabla del ${num}</div>
              <div class="table-card-item">${data.item}</div>
              
              <div class="table-card-stars">
                ${[1, 2, 3].map(s => `
                  <span class="star-icon ${s <= userStatus.stars ? 'filled' : 'empty'}">★</span>
                `).join('')}
              </div>

              <div class="table-card-status">
                ${isUnlocked 
                  ? (userStatus.completed ? '<span class="status-done">✅ Dominada</span>' : '<span class="status-play">▶ Practicar</span>') 
                  : '<span class="status-locked">🔒 Bloqueada</span>'}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  notifyLockedTable(tableNum) {
    sounds.playWrong();
    alertModal(
      '¡Tabla Bloqueada!',
      `Para desbloquear la Tabla del ${tableNum}, primero debes completar y ganar estrellas en la tabla del ${tableNum - 1}. ¡Tú puedes lograrlo!`,
      'info'
    );
  }

  // MÓDULO INTERACTIVO DE UNA TABLA ESPECÍFICA
  openTableModule(tableNum) {
    sounds.playClick();
    const data = TABLES_DATA[tableNum];
    const container = document.getElementById('main-content-area');

    container.innerHTML = `
      <div class="table-module-view">
        <div class="module-header-bar">
          <button class="btn btn-secondary btn-sm" onclick="app.showSection('tables')">
            ⬅ Volver a Tablas
          </button>
          <div class="module-title-wrap">
            <span class="module-emoji">${data.emoji}</span>
            <div>
              <h3>${data.title}</h3>
              <span class="module-curiosity">${data.curiosity}</span>
            </div>
          </div>
        </div>

        <!-- Caja de Patrón y Truco Secreto -->
        <div class="pattern-secret-box" style="border-left-color: ${data.color};">
          <div class="pattern-header">💡 ¡Truco Secreto y Patrón Matemático!</div>
          <div class="pattern-content">${data.pattern}</div>
        </div>

        <!-- Pestañas de la Tabla: Explorar vs Desafío -->
        <div class="table-subtabs">
          <button class="btn btn-primary subtab-btn active" id="tab-btn-explore" onclick="app.switchTableSubtab('explore', ${tableNum})">
            👀 1. Explorar y Descubrir
          </button>
          <button class="btn btn-outline subtab-btn" id="tab-btn-quiz" onclick="app.switchTableSubtab('quiz', ${tableNum})">
            🎯 2. Desafío de la Tabla (Ganar Estrellas)
          </button>
        </div>

        <div id="table-subtab-content">
          <!-- Cargado por switchTableSubtab -->
        </div>
      </div>
    `;

    this.switchTableSubtab('explore', tableNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  switchTableSubtab(tabName, tableNum) {
    sounds.playClick();
    const data = TABLES_DATA[tableNum];
    const container = document.getElementById('table-subtab-content');
    if (!container) return;

    document.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(`tab-btn-${tabName}`);
    if (activeBtn) activeBtn.classList.add('active');

    if (tabName === 'explore') {
      container.innerHTML = `
        <div class="explore-instructions">
          Toca cualquier fila para ver cómo se agrupan los objetos, su suma iterada y la explicación paso a paso:
        </div>
        <div class="multiplication-rows-list">
          ${data.items.map((item, idx) => `
            <div class="mult-row-card" onclick="app.toggleRowDetail(this, ${tableNum}, ${idx})">
              <div class="mult-row-summary">
                <span class="mult-op-badge">${item.f1} × ${item.f2}</span>
                <span class="mult-equals">=</span>
                <span class="mult-res-badge">${item.res}</span>
                <span class="mult-click-hint">Toca para ver grupos 👇</span>
              </div>
              <div class="mult-row-expanded" style="display: none;">
                <div class="mult-visual-groups">
                  <div class="groups-title">📦 Representación visual (${item.visual}):</div>
                  <div class="groups-display">
                    ${Array.from({ length: item.f2 }).map(() => `
                      <span class="group-box-pill">${Array(item.f1).fill(data.emoji).join(' ')}</span>
                    `).join(' + ')}
                  </div>
                </div>
                <div class="mult-repeated-sum">
                  ➕ <strong>Suma repetida:</strong> ${item.sum} = <strong>${item.res}</strong>
                </div>
                <div class="mult-pedagogical-hint">
                  💡 <strong>Pista de aprendizaje:</strong> ${item.hint}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="text-align: center; margin-top: 2rem;">
          <button class="btn btn-success btn-lg" onclick="app.switchTableSubtab('quiz', ${tableNum})">
            🚀 ¡Ya exploré! Ahora quiero ganar estrellas en el Desafío
          </button>
        </div>
      `;
    } else {
      this.renderTableQuiz(container, tableNum);
    }
  }

  toggleRowDetail(rowCard, tableNum, idx) {
    sounds.playPop();
    const detail = rowCard.querySelector('.mult-row-expanded');
    const isVisible = detail.style.display === 'block';
    detail.style.display = isVisible ? 'none' : 'block';
    rowCard.classList.toggle('active-row', !isVisible);
  }

  // DESAFÍO INTERACTIVO DE LA TABLA (5 Preguntas)
  renderTableQuiz(container, tableNum) {
    const data = TABLES_DATA[tableNum];
    // Generar 5 preguntas aleatorias de esta tabla
    const questions = [...data.items].sort(() => Math.random() - 0.5).slice(0, 5);

    let currentQ = 0;
    let correctCount = 0;

    const renderQuizQuestion = () => {
      if (currentQ >= questions.length) {
        // Fin del desafío
        const starsEarned = correctCount >= 5 ? 3 : (correctCount >= 3 ? 2 : 1);
        storage.completeTable(tableNum, starsEarned, correctCount * 20);
        sounds.playFanfare();
        confetti.launch(80);

        container.innerHTML = `
          <div class="quiz-completed-box">
            <div class="quiz-trophy">🌟</div>
            <h3>¡Desafío de la Tabla del ${tableNum} Superado!</h3>
            <p>Acertaste <strong>${correctCount} de ${questions.length}</strong> preguntas.</p>
            <div class="quiz-stars-display">
              ${[1, 2, 3].map(s => `
                <span class="star-icon ${s <= starsEarned ? 'filled' : 'empty'}">★</span>
              `).join('')}
            </div>
            <p class="quiz-feedback-msg">
              ${starsEarned === 3 ? '¡Increíble! Dominas esta tabla como un verdadero genio matemático.' : '¡Muy buen trabajo! Sigue repasando para obtener las 3 estrellas doradas.'}
            </p>
            <div class="quiz-actions">
              <button class="btn btn-primary" onclick="app.openTableModule(${tableNum})">🔄 Repetir Desafío</button>
              <button class="btn btn-success" onclick="app.showSection('tables')">📚 Ir a la siguiente Tabla</button>
            </div>
          </div>
        `;
        app.updateHeaderStats();
        return;
      }

      const q = questions[currentQ];
      // Generar 4 alternativas
      const options = new Set([q.res]);
      while (options.size < 4) {
        const offset = (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1);
        const wrong = Math.max(1, q.res + (offset * (Math.random() > 0.5 ? tableNum : 1)));
        options.add(wrong);
      }
      const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);

      container.innerHTML = `
        <div class="quiz-question-box">
          <div class="quiz-header">
            <span>Pregunta ${currentQ + 1} de ${questions.length}</span>
            <span>Aciertos: ${correctCount}</span>
          </div>

          <div class="quiz-formula-display">
            ${q.f1} × ${q.f2} = <span class="highlight-q">?</span>
          </div>

          <p class="quiz-help-hint">💡 Recuerda: significa ${q.f2} grupos de ${q.f1} objetos.</p>

          <div class="quiz-options-grid">
            ${shuffledOptions.map(val => `
              <button class="btn btn-quiz-opt" onclick="app.handleQuizOptionClick(this, ${val}, ${q.res}, ${tableNum})">
                ${val}
              </button>
            `).join('')}
          </div>

          <div class="quiz-feedback-banner" id="quiz-feedback" style="display: none;"></div>
        </div>
      `;
    };

    this.handleQuizOptionClick = (btnEl, selectedVal, correctVal, tNum) => {
      const feedbackEl = document.getElementById('quiz-feedback');
      const allBtns = document.querySelectorAll('.btn-quiz-opt');
      allBtns.forEach(b => b.disabled = true);

      if (selectedVal === correctVal) {
        sounds.playCorrect();
        btnEl.classList.add('correct-opt');
        correctCount++;
        storage.recordAnswer(true);
        feedbackEl.style.display = 'block';
        feedbackEl.className = 'quiz-feedback-banner feedback-positive';
        feedbackEl.innerHTML = `🎉 ¡Correcto! ${selectedVal} es la respuesta exacta.`;
      } else {
        sounds.playWrong();
        btnEl.classList.add('wrong-opt');
        storage.recordAnswer(false);
        // Resaltar la correcta
        allBtns.forEach(b => {
          if (parseInt(b.textContent.trim()) === correctVal) {
            b.classList.add('correct-opt');
          }
        });
        feedbackEl.style.display = 'block';
        feedbackEl.className = 'quiz-feedback-banner feedback-negative';
        feedbackEl.innerHTML = `¡Casi! La respuesta correcta era <strong>${correctVal}</strong>. ¡No te rindas, en la siguiente lo harás genial!`;
      }

      setTimeout(() => {
        currentQ++;
        renderQuizQuestion();
      }, 1400);
    };

    renderQuizQuestion();
  }

  // -----------------------------------------------------------------
  // VISTA: MENÚ DE JUEGOS
  // -----------------------------------------------------------------
  renderGamesMenu(container) {
    container.innerHTML = `
      <div class="section-heading">
        <h2>🎮 Mini-Juegos y Desafíos Matemáticos</h2>
        <p>Aprende jugando de forma no monótona. Gana estrellas adicionales para tu perfil.</p>
      </div>

      <div class="games-cards-grid">
        <!-- Juego 1: Memoria Matemática -->
        <div class="game-select-card" onclick="games.startMemoryGame(document.getElementById('main-content-area'))">
          <div class="game-select-icon">🧠</div>
          <h3>Memoria Matemática</h3>
          <p>Encuentra parejas de cartas relacionando cada multiplicación con su resultado correcto.</p>
          <button class="btn btn-primary btn-block">¡Jugar Memoria! 🃏</button>
        </div>

        <!-- Juego 2: Atrapa el Resultado -->
        <div class="game-select-card" onclick="games.startCatchGame(document.getElementById('main-content-area'))">
          <div class="game-select-icon">🎈</div>
          <h3>Atrapa el Resultado</h3>
          <p>Burbujas dinámicas flotantes: revienta la burbuja con el número correcto antes que se escape.</p>
          <button class="btn btn-primary btn-block">¡Atrapar Burbujas! 🎯</button>
        </div>

        <!-- Juego 3: Construye la Multiplicación -->
        <div class="game-select-card" onclick="games.startBuildGame(document.getElementById('main-content-area'))">
          <div class="game-select-icon">🏗️</div>
          <h3>Construye la Multiplicación</h3>
          <p>Agrupa objetos reales en cajas para descubrir visualmente la suma iterada de las tablas.</p>
          <button class="btn btn-primary btn-block">¡Construir Grupos! 🍎</button>
        </div>

        <!-- Juego 4: ¿Quién tiene la respuesta? -->
        <div class="game-select-card" onclick="games.startWhoHasItGame(document.getElementById('main-content-area'))">
          <div class="game-select-icon">🐾</div>
          <h3>¿Quién tiene la respuesta?</h3>
          <p>Leo, Foxy, Pandita, Buhito y Astro tienen números. ¡Descubre quién dice la verdad!</p>
          <button class="btn btn-primary btn-block">¡Elegir Personaje! 🦊</button>
        </div>

        <!-- Juego 5: Arrastra y Completa -->
        <div class="game-select-card" onclick="games.startDragGame(document.getElementById('main-content-area'))">
          <div class="game-select-icon">🧩</div>
          <h3>Arrastra y Completa</h3>
          <p>Asocia y coloca fichas numéricas en los casilleros correspondientes de cada operación.</p>
          <button class="btn btn-primary btn-block">¡Completar Fichas! 🧩</button>
        </div>
      </div>
    `;
  }

  // -----------------------------------------------------------------
  // VISTA: PROGRESO Y RECOMPENSAS
  // -----------------------------------------------------------------
  renderProgress(container) {
    const user = this.user;
    const completedTablesCount = Object.values(user.tables).filter(t => t.completed).length;
    const globalPercent = Math.round((completedTablesCount / 9) * 100);
    const achievements = storage.getAchievementsList();

    container.innerHTML = `
      <div class="section-heading">
        <h2>🏆 Mi Progreso y Trofeos</h2>
        <p>Revisa tus estadísticas de estudio, tablas dominadas y medallas coleccionadas.</p>
      </div>

      <!-- Resumen de Estadísticas -->
      <div class="progress-stats-summary">
        <div class="stat-box">
          <div class="stat-number">⭐ ${user.stars}</div>
          <div class="stat-label">Estrellas Acumuladas</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${globalPercent}%</div>
          <div class="stat-label">Avance Global de Tablas</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${completedTablesCount}/9</div>
          <div class="stat-label">Tablas Completadas</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${(user.simceHistory || []).length}</div>
          <div class="stat-label">Ensayos SIMCE Rendidos</div>
        </div>
      </div>

      <!-- Vitrina de Logros / Medallas -->
      <div class="achievements-section">
        <h3>🏅 Vitrina de Medallas y Logros</h3>
        <p class="section-subtitle">Completa desafíos para desbloquear todas las insignias matemáticas:</p>
        <div class="achievements-grid">
          ${achievements.map(a => `
            <div class="achievement-card ${a.unlocked ? 'badge-unlocked' : 'badge-locked'}">
              <div class="badge-icon">${a.unlocked ? a.icon : '🔒'}</div>
              <div class="badge-name">${a.name}</div>
              <div class="badge-desc">${a.desc}</div>
              <div class="badge-status-tag">
                ${a.unlocked ? '✅ Desbloqueado' : '⏳ Por desbloquear'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Historial SIMCE -->
      <div class="simce-history-section">
        <h3>📝 Historial de Ensayos SIMCE</h3>
        ${(!user.simceHistory || user.simceHistory.length === 0) ? `
          <p class="empty-history-msg">Aún no has rendido ningún ensayo SIMCE. ¡Prepárate y rinde tu primer ensayo!</p>
        ` : `
          <div class="history-table-wrapper">
            <table class="history-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Puntaje</th>
                  <th>Porcentaje</th>
                  <th>Nivel de Logro</th>
                </tr>
              </thead>
              <tbody>
                ${user.simceHistory.map(h => `
                  <tr>
                    <td>${h.date}</td>
                    <td><strong>${h.score} / ${h.total}</strong></td>
                    <td>${h.percent}%</td>
                    <td>${h.level}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;
  }

  // -----------------------------------------------------------------
  // VISTA: ENTRADA AL ENSAYO SIMCE
  // -----------------------------------------------------------------
  renderSimceEntry(container) {
    const isUnlocked = storage.isSimceUnlocked();

    if (!isUnlocked) {
      container.innerHTML = `
        <div class="simce-locked-card">
          <div class="locked-icon">🔒</div>
          <h2>Ensayo Matemático SIMCE 4° Básico</h2>
          <p>
            ¡Hola, ${this.user.name}! Para garantizar tu éxito en el ensayo SIMCE, primero debes entrenar y consolidar tus tablas de multiplicar.
          </p>
          <div class="locked-conditions-box">
            <h4>Requisitos de Desbloqueo:</h4>
            <ul>
              <li>Completar al menos <strong>3 tablas de multiplicar</strong> (Llevas: ${Object.values(this.user.tables).filter(t => t.completed).length}/3)</li>
              <li>O acumular al menos <strong>6 estrellas doradas</strong> (Llevas: ${this.user.stars}/6 ⭐)</li>
            </ul>
          </div>
          <div style="margin-top: 1.5rem;">
            <button class="btn btn-primary btn-lg" onclick="app.showSection('tables')">
              📚 Ir a Practicar Tablas
            </button>
            <button class="btn btn-secondary btn-lg" onclick="app.showSection('games')">
              🎮 Jugar Minijuegos
            </button>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="simce-intro-card">
        <div class="simce-intro-hero">
          <div class="simce-hero-icon">📝</div>
          <h2>¡Bienvenido al Ensayo Matemático tipo SIMCE!</h2>
          <p>
            Este ensayo fue diseñado especialmente para estudiantes de <strong>4° Básico</strong>. Evaluará tu capacidad para resolver problemas de multiplicación en situaciones reales de compras, recreos, salas de clases, deportes y vida cotidiana.
          </p>
        </div>

        <div class="simce-info-chips">
          <div class="info-chip"><span>📋</span> 10 Preguntas contextualizadas</div>
          <div class="info-chip"><span>⏳</span> Sin límite de tiempo (hazlo con calma)</div>
          <div class="info-chip"><span>💡</span> Explicación pedagógica al finalizar</div>
          <div class="info-chip"><span>⭐</span> Recompensas y estrellas para tu perfil</div>
        </div>

        <div style="text-align: center; margin-top: 2rem;">
          <button class="btn btn-success btn-xl" onclick="simce.startExam(document.getElementById('main-content-area'))">
            🚀 ¡Comenzar Ensayo Ahora!
          </button>
        </div>
      </div>
    `;
  }
}

// Modal amigable para alertas en la app
function alertModal(title, message, type = 'info') {
  sounds.playPop();
  const modal = document.createElement('div');
  modal.className = 'custom-modal-backdrop';
  modal.innerHTML = `
    <div class="custom-modal-box">
      <div class="modal-info-icon">${type === 'info' ? 'ℹ️' : '💡'}</div>
      <h3>${title}</h3>
      <p>${message}</p>
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="this.closest('.custom-modal-backdrop').remove()">
          ¡Entendido! 👍
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

const app = new AppController();
window.addEventListener('DOMContentLoaded', () => app.init());
