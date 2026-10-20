/**
 * storage.js - Gestión de almacenamiento local (localStorage)
 * Persiste el progreso del estudiante, estrellas, tablas desbloqueadas, logros y puntajes.
 */

const STORAGE_KEY = 'misTablas_student_session';

class StorageManager {
  constructor() {
    this.user = this.load();
  }

  getDefaultUser(name = 'Estudiante', avatar = 'avatar1') {
    return {
      name: name,
      avatar: avatar,
      stars: 0,
      score: 0,
      tables: {
        2: { unlocked: true, completed: false, stars: 0, bestScore: 0 },
        3: { unlocked: false, completed: false, stars: 0, bestScore: 0 },
        4: { unlocked: false, completed: false, stars: 0, bestScore: 0 },
        5: { unlocked: false, completed: false, stars: 0, bestScore: 0 },
        6: { unlocked: false, completed: false, stars: 0, bestScore: 0 },
        7: { unlocked: false, completed: false, stars: 0, bestScore: 0 },
        8: { unlocked: false, completed: false, stars: 0, bestScore: 0 },
        9: { unlocked: false, completed: false, stars: 0, bestScore: 0 },
        10: { unlocked: false, completed: false, stars: 0, bestScore: 0 }
      },
      achievements: [],
      simceHistory: [],
      stats: {
        gamesPlayed: 0,
        questionsAnswered: 0,
        correctAnswers: 0
      }
    };
  }

  load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error al cargar datos de almacenamiento', e);
    }
    return null;
  }

  save() {
    try {
      if (this.user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user));
      }
    } catch (e) {
      console.error('Error al guardar datos de almacenamiento', e);
    }
  }

  createUser(name, avatar) {
    this.user = this.getDefaultUser(name, avatar);
    this.save();
    return this.user;
  }

  getUser() {
    if (!this.user) {
      this.user = this.load();
    }
    return this.user;
  }

  hasUser() {
    return this.getUser() !== null;
  }

  addStars(amount) {
    if (!this.user) return;
    this.user.stars = (this.user.stars || 0) + amount;
    this.user.score = (this.user.score || 0) + (amount * 50);
    this.checkAchievements();
    this.save();
  }

  recordAnswer(isCorrect) {
    if (!this.user) return;
    if (!this.user.stats) {
      this.user.stats = { gamesPlayed: 0, questionsAnswered: 0, correctAnswers: 0 };
    }
    this.user.stats.questionsAnswered++;
    if (isCorrect) {
      this.user.stats.correctAnswers++;
    }
    this.save();
  }

  completeTable(tableNum, starsEarned, score) {
    if (!this.user) return;
    const t = this.user.tables[tableNum];
    if (t) {
      t.completed = true;
      if (starsEarned > t.stars) {
        const starDiff = starsEarned - t.stars;
        this.addStars(starDiff);
        t.stars = starsEarned;
      }
      if (score > t.bestScore) {
        t.bestScore = score;
      }

      // Desbloquear la siguiente tabla si existe
      const nextTableNum = parseInt(tableNum) + 1;
      if (this.user.tables[nextTableNum]) {
        this.user.tables[nextTableNum].unlocked = true;
      }

      this.checkAchievements();
      this.save();
    }
  }

  isSimceUnlocked() {
    if (!this.user) return false;
    // El SIMCE se habilita al dominar al menos 3 tablas o conseguir al menos 6 estrellas
    const completedCount = Object.values(this.user.tables).filter(t => t.completed).length;
    return completedCount >= 3 || this.user.stars >= 6;
  }

  saveSimceResult(score, total, answersDetail) {
    if (!this.user) return;
    if (!this.user.simceHistory) this.user.simceHistory = [];

    const percent = Math.round((score / total) * 100);
    let level = 'Inicial';
    if (percent >= 80) level = 'Adecuado ⭐⭐⭐';
    else if (percent >= 60) level = 'Elemental ⭐⭐';
    else level = 'Insuficiente (¡Sigue practicando!) ⭐';

    const result = {
      date: new Date().toLocaleDateString('es-CL'),
      score,
      total,
      percent,
      level,
      answers: answersDetail
    };

    this.user.simceHistory.push(result);
    // Bonificación de estrellas por SIMCE
    const bonusStars = Math.round((score / total) * 5);
    this.addStars(bonusStars);

    this.checkAchievements();
    this.save();
    return result;
  }

  checkAchievements() {
    if (!this.user) return;
    const badges = this.user.achievements || [];
    const completedTables = Object.values(this.user.tables).filter(t => t.completed).length;

    const list = [
      { id: 'first_star', name: 'Primera Estrella 🌟', desc: '¡Obtuviste tu primera estrella!', condition: () => this.user.stars >= 1 },
      { id: 'first_table', name: 'Maestro de Inicio 🏅', desc: '¡Completaste tu primera tabla de multiplicar!', condition: () => completedTables >= 1 },
      { id: 'tables_3', name: 'Trío Matemático 🚀', desc: '¡Completaste 3 tablas de multiplicar!', condition: () => completedTables >= 3 },
      { id: 'stars_15', name: 'Coleccionista de Estrellas ✨', desc: '¡Has acumulado 15 o más estrellas!', condition: () => this.user.stars >= 15 },
      { id: 'simce_hero', name: 'Héroe del SIMCE 🏆', desc: '¡Rendiste tu primer ensayo tipo SIMCE!', condition: () => (this.user.simceHistory && this.user.simceHistory.length > 0) },
      { id: 'all_tables', name: 'Gran Sabio de las Tablas 👑', desc: '¡Completaste las tablas del 2 al 10!', condition: () => completedTables === 9 }
    ];

    let newUnlocked = false;
    list.forEach(badge => {
      if (!badges.includes(badge.id) && badge.condition()) {
        badges.push(badge.id);
        newUnlocked = true;
      }
    });

    this.user.achievements = badges;
    return newUnlocked;
  }

  getAchievementsList() {
    const list = [
      { id: 'first_star', icon: '🌟', name: 'Primera Estrella', desc: 'Obtén tu primera estrella' },
      { id: 'first_table', icon: '🏅', name: 'Maestro de Inicio', desc: 'Completa tu primera tabla' },
      { id: 'tables_3', icon: '🚀', name: 'Trío Matemático', desc: 'Completa 3 tablas distintas' },
      { id: 'stars_15', icon: '✨', name: 'Cazador de Estrellas', desc: 'Acumula 15 estrellas en total' },
      { id: 'simce_hero', icon: '🏆', name: 'Héroe del SIMCE', desc: 'Rinde y supera un ensayo SIMCE' },
      { id: 'all_tables', icon: '👑', name: 'Gran Sabio de las Tablas', desc: 'Domina todas las tablas del 2 al 10' }
    ];
    const userBadges = (this.user && this.user.achievements) || [];
    return list.map(item => ({
      ...item,
      unlocked: userBadges.includes(item.id)
    }));
  }

  resetAll() {
    localStorage.removeItem(STORAGE_KEY);
    this.user = null;
  }
}

const storage = new StorageManager();
