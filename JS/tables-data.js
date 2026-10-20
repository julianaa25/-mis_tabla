/**
 * tables-data.js - Información pedagógica y visual de las tablas del 2 al 10
 * Contiene patrones visuales, sumas iteradas, trucos y actividades.
 */

const TABLES_DATA = {
  2: {
    number: 2,
    title: "Tabla del 2: ¡El Poder de los Pares y los Dobles!",
    item: "Cerezas",
    emoji: "🍒",
    color: "#FF6B6B",
    pattern: "¡Todos los resultados son números pares! Terminan siempre en 0, 2, 4, 6 u 8. Multiplicar por 2 es exactamente igual que sumar el número consigo mismo (el doble).",
    curiosity: "¿Sabías que los ojos, las orejas, los zapatos y los guantes casi siempre vienen en grupos de 2?",
    items: [
      { f1: 2, f2: 1, res: 2, sum: "2", visual: "1 grupo de 2 cerezas", hint: "Cualquier número por 1 es el mismo número." },
      { f1: 2, f2: 2, res: 4, sum: "2 + 2", visual: "2 grupos de 2 cerezas", hint: "El doble de 2 es 4." },
      { f1: 2, f2: 3, res: 6, sum: "2 + 2 + 2", visual: "3 grupos de 2 cerezas", hint: "Suma 2 tres veces: 2, 4, 6." },
      { f1: 2, f2: 4, res: 8, sum: "2 + 2 + 2 + 2", visual: "4 grupos de 2 cerezas", hint: "El doble de 4 es 8." },
      { f1: 2, f2: 5, res: 10, sum: "2 + 2 + 2 + 2 + 2", visual: "5 grupos de 2 cerezas", hint: "¡Una decena completa! 5 pares son 10." },
      { f1: 2, f2: 6, res: 12, sum: "2 + 2 + 2 + 2 + 2 + 2", visual: "6 grupos de 2 cerezas", hint: "10 + 2 = 12 (una docena)." },
      { f1: 2, f2: 7, res: 14, sum: "2 + ... (7 veces)", visual: "7 grupos de 2 cerezas", hint: "El doble de 7 es 14." },
      { f1: 2, f2: 8, res: 16, sum: "2 + ... (8 veces)", visual: "8 grupos de 2 cerezas", hint: "El doble de 8 es 16." },
      { f1: 2, f2: 9, res: 18, sum: "2 + ... (9 veces)", visual: "9 grupos de 2 cerezas", hint: "Casi 20, le quitas 2 y queda 18." },
      { f1: 2, f2: 10, res: 20, sum: "2 + ... (10 veces)", visual: "10 grupos de 2 cerezas", hint: "El doble de 10 es 20." }
    ]
  },
  3: {
    number: 3,
    title: "Tabla del 3: ¡Saltando de Tres en Tres!",
    item: "Tréboles",
    emoji: "☘️",
    color: "#2ED573",
    pattern: "¡Magia de la suma! Si sumas los dígitos del resultado de la tabla del 3, siempre te dará 3, 6 o 9 (por ejemplo: 12 -> 1+2=3; 24 -> 2+4=6).",
    curiosity: "Un triángulo tiene 3 lados y 3 vértices. ¡El número 3 está en todas partes!",
    items: [
      { f1: 3, f2: 1, res: 3, sum: "3", visual: "1 grupo de 3 hojas", hint: "Una sola vez 3 es 3." },
      { f1: 3, f2: 2, res: 6, sum: "3 + 3", visual: "2 grupos de 3 hojas", hint: "3 más 3 es 6." },
      { f1: 3, f2: 3, res: 9, sum: "3 + 3 + 3", visual: "3 grupos de 3 hojas", hint: "Tres veces tres es nueve." },
      { f1: 3, f2: 4, res: 12, sum: "3 + 3 + 3 + 3", visual: "4 grupos de 3 hojas", hint: "Una docena de hojas: 12." },
      { f1: 3, f2: 5, res: 15, sum: "3 + ... (5 veces)", visual: "5 grupos de 3 hojas", hint: "La mitad de 30 es 15." },
      { f1: 3, f2: 6, res: 18, sum: "3 + ... (6 veces)", visual: "6 grupos de 3 hojas", hint: "Suma 3 a 15: da 18." },
      { f1: 3, f2: 7, res: 21, sum: "3 + ... (7 veces)", visual: "7 grupos de 3 hojas", hint: "20 más 1 = 21." },
      { f1: 3, f2: 8, res: 24, sum: "3 + ... (8 veces)", visual: "8 grupos de 3 hojas", hint: "Las 24 horas del día." },
      { f1: 3, f2: 9, res: 27, sum: "3 + ... (9 veces)", visual: "9 grupos de 3 hojas", hint: "A 30 le restas 3 y da 27." },
      { f1: 3, f2: 10, res: 30, sum: "3 + ... (10 veces)", visual: "10 grupos de 3 hojas", hint: "Tres decenas: 30." }
    ]
  },
  4: {
    number: 4,
    title: "Tabla del 4: ¡El Doble del Doble!",
    item: "Autitos",
    emoji: "🚗",
    color: "#1E90FF",
    pattern: "¡Truco secreto! Para calcular la tabla del 4, solo calcula el doble y vuelve a doblar. Por ejemplo: para 4 × 6: el doble de 6 es 12, y el doble de 12 es 24.",
    curiosity: "Casi todos los automóviles tienen 4 ruedas, y las mesas tienen 4 patas para sostenerse con firmeza.",
    items: [
      { f1: 4, f2: 1, res: 4, sum: "4", visual: "1 auto con 4 ruedas", hint: "Un auto tiene 4 ruedas." },
      { f1: 4, f2: 2, res: 8, sum: "4 + 4", visual: "2 autos con 4 ruedas", hint: "Dos autos tienen 8 ruedas." },
      { f1: 4, f2: 3, res: 12, sum: "4 + 4 + 4", visual: "3 autos con 4 ruedas", hint: "El doble de 6 es 12." },
      { f1: 4, f2: 4, res: 16, sum: "4 + 4 + 4 + 4", visual: "4 autos con 4 ruedas", hint: "El doble de 8 es 16." },
      { f1: 4, f2: 5, res: 20, sum: "4 + ... (5 veces)", visual: "5 autos con 4 ruedas", hint: "5 autos tienen 20 ruedas en total." },
      { f1: 4, f2: 6, res: 24, sum: "4 + ... (6 veces)", visual: "6 autos con 4 ruedas", hint: "El doble de 12 es 24." },
      { f1: 4, f2: 7, res: 28, sum: "4 + ... (7 veces)", visual: "7 autos con 4 ruedas", hint: "Suma 4 a 24 y obtienes 28." },
      { f1: 4, f2: 8, res: 32, sum: "4 + ... (8 veces)", visual: "8 autos con 4 ruedas", hint: "El doble de 16 es 32." },
      { f1: 4, f2: 9, res: 36, sum: "4 + ... (9 veces)", visual: "9 autos con 4 ruedas", hint: "A 40 le restas 4 y da 36." },
      { f1: 4, f2: 10, res: 40, sum: "4 + ... (10 veces)", visual: "10 autos con 4 ruedas", hint: "4 decenas: 40 ruedas." }
    ]
  },
  5: {
    number: 5,
    title: "Tabla del 5: ¡El Ritmo de las Manos!",
    item: "Estrellitas",
    emoji: "⭐",
    color: "#FFA502",
    pattern: "¡Todos los resultados terminan en 0 o en 5! Si multiplicas por un número par termina en 0 (ej: 5×4=20), y si es impar termina en 5 (ej: 5×3=15).",
    curiosity: "Tenemos 5 dedos en cada mano y pie. Contar de 5 en 5 es como chocar palmas.",
    items: [
      { f1: 5, f2: 1, res: 5, sum: "5", visual: "1 estrella de 5 puntas", hint: "Una estrella tiene 5 puntas." },
      { f1: 5, f2: 2, res: 10, sum: "5 + 5", visual: "2 estrellas de 5 puntas", hint: "Tus dos manos juntas tienen 10 dedos." },
      { f1: 5, f2: 3, res: 15, sum: "5 + 5 + 5", visual: "3 estrellas de 5 puntas", hint: "Termina en 5: 15." },
      { f1: 5, f2: 4, res: 20, sum: "5 + 5 + 5 + 5", visual: "4 estrellas de 5 puntas", hint: "Termina en 0: 20." },
      { f1: 5, f2: 5, res: 25, sum: "5 + ... (5 veces)", visual: "5 estrellas de 5 puntas", hint: "Cinco veces cinco: 25." },
      { f1: 5, f2: 6, res: 30, sum: "5 + ... (6 veces)", visual: "6 estrellas de 5 puntas", hint: "Tres decenas exactas: 30." },
      { f1: 5, f2: 7, res: 35, sum: "5 + ... (7 veces)", visual: "7 estrellas de 5 puntas", hint: "Termina en 5: 35." },
      { f1: 5, f2: 8, res: 40, sum: "5 + ... (8 veces)", visual: "8 estrellas de 5 puntas", hint: "Termina en 0: 40." },
      { f1: 5, f2: 9, res: 45, sum: "5 + ... (9 veces)", visual: "9 estrellas de 5 puntas", hint: "Casi 50, le quitas 5: 45." },
      { f1: 5, f2: 10, res: 50, sum: "5 + ... (10 veces)", visual: "10 estrellas de 5 puntas", hint: "Medio centenar: 50." }
    ]
  },
  6: {
    number: 6,
    title: "Tabla del 6: ¡El Doble de la del 3!",
    item: "Dados",
    emoji: "🎲",
    color: "#9B59B6",
    pattern: "¡Patrón asombroso! Al multiplicar 6 por un número par, el resultado termina en ese mismo número: 6 × 2 = 12 (termina en 2), 6 × 4 = 24 (termina en 4), 6 × 6 = 36, 6 × 8 = 48.",
    curiosity: "Un dado tradicional tiene exactamente 6 caras numeradas del 1 al 6.",
    items: [
      { f1: 6, f2: 1, res: 6, sum: "6", visual: "1 dado con 6 caras", hint: "6 por 1 siempre da 6." },
      { f1: 6, f2: 2, res: 12, sum: "6 + 6", visual: "2 dados con 6 caras", hint: "Termina en 2: 12 (una docena)." },
      { f1: 6, f2: 3, res: 18, sum: "6 + 6 + 6", visual: "3 dados con 6 caras", hint: "El triple de 6: 18." },
      { f1: 6, f2: 4, res: 24, sum: "6 + ... (4 veces)", visual: "4 dados con 6 caras", hint: "Termina en 4: 24." },
      { f1: 6, f2: 5, res: 30, sum: "6 + ... (5 veces)", visual: "5 dados con 6 caras", hint: "La mitad de 60 es 30." },
      { f1: 6, f2: 6, res: 36, sum: "6 + ... (6 veces)", visual: "6 dados con 6 caras", hint: "Termina en 6: 36 (seis por seis)." },
      { f1: 6, f2: 7, res: 42, sum: "6 + ... (7 veces)", visual: "7 dados con 6 caras", hint: "Suma 6 a 36 y da 42." },
      { f1: 6, f2: 8, res: 48, sum: "6 + ... (8 veces)", visual: "8 dados con 6 caras", hint: "Termina en 8: 48." },
      { f1: 6, f2: 9, res: 54, sum: "6 + ... (9 veces)", visual: "9 dados con 6 caras", hint: "A 60 le restas 6: 54." },
      { f1: 6, f2: 10, res: 60, sum: "6 + ... (10 veces)", visual: "10 dados con 6 caras", hint: "6 decenas: 60." }
    ]
  },
  7: {
    number: 7,
    title: "Tabla del 7: ¡El Camino de las Semanas!",
    item: "Arcoíris",
    emoji: "🌈",
    color: "#E84393",
    pattern: "¡Piensa en semanas del calendario! 1 semana tiene 7 días, 2 semanas tienen 14 días, 3 semanas tienen 21 días, 4 semanas son 28 días (un mes lunar).",
    curiosity: "El arcoíris tiene 7 colores hermosos: rojo, naranja, amarillo, verde, cian, azul y violeta.",
    items: [
      { f1: 7, f2: 1, res: 7, sum: "7", visual: "1 semana = 7 días", hint: "Una semana completa: 7 días." },
      { f1: 7, f2: 2, res: 14, sum: "7 + 7", visual: "2 semanas = 14 días", hint: "Dos semanas: 14 días." },
      { f1: 7, f2: 3, res: 21, sum: "7 + 7 + 7", visual: "3 semanas = 21 días", hint: "Tres semanas: 21 días." },
      { f1: 7, f2: 4, res: 28, sum: "7 + ... (4 veces)", visual: "4 semanas = 28 días", hint: "Cuatro semanas: 28 días (febrero)." },
      { f1: 7, f2: 5, res: 35, sum: "7 + ... (5 veces)", visual: "5 semanas = 35 días", hint: "Termina en 5: 35." },
      { f1: 7, f2: 6, res: 42, sum: "7 + ... (6 veces)", visual: "6 semanas = 42 días", hint: "Suma 7 a 35: 42." },
      { f1: 7, f2: 7, res: 49, sum: "7 + ... (7 veces)", visual: "7 semanas = 49 días", hint: "¡Siete por siete es cuarenta y nueve!" },
      { f1: 7, f2: 8, res: 56, sum: "7 + ... (8 veces)", visual: "8 semanas = 56 días", hint: "Un truco: 5, 6, 7, 8 -> 56 = 7 × 8." },
      { f1: 7, f2: 9, res: 63, sum: "7 + ... (9 veces)", visual: "9 semanas = 63 días", hint: "A 70 le quitas 7: 63." },
      { f1: 7, f2: 10, res: 70, sum: "7 + ... (10 veces)", visual: "10 semanas = 70 días", hint: "7 decenas completas: 70." }
    ]
  },
  8: {
    number: 8,
    title: "Tabla del 8: ¡El Triple Doble del Pulpo!",
    item: "Pulpitos",
    emoji: "🐙",
    color: "#0984E3",
    pattern: "¡El doble del doble del doble! Para 8 × 5: el doble de 5 es 10, el doble de 10 es 20, y el doble de 20 es 40. Además todos sus resultados son pares.",
    curiosity: "Los pulpos tienen 8 tentáculos muy inteligentes y las arañas tienen 8 patas.",
    items: [
      { f1: 8, f2: 1, res: 8, sum: "8", visual: "1 pulpo con 8 tentáculos", hint: "Un pulpo tiene 8 tentáculos." },
      { f1: 8, f2: 2, res: 16, sum: "8 + 8", visual: "2 pulpos con 8 tentáculos", hint: "Dos pulpos tienen 16 tentáculos." },
      { f1: 8, f2: 3, res: 24, sum: "8 + 8 + 8", visual: "3 pulpos con 8 tentáculos", hint: "24 tentáculos." },
      { f1: 8, f2: 4, res: 32, sum: "8 + ... (4 veces)", visual: "4 pulpos con 8 tentáculos", hint: "El doble de 16 es 32." },
      { f1: 8, f2: 5, res: 40, sum: "8 + ... (5 veces)", visual: "5 pulpos con 8 tentáculos", hint: "La mitad de 80 es 40." },
      { f1: 8, f2: 6, res: 48, sum: "8 + ... (6 veces)", visual: "6 pulpos con 8 tentáculos", hint: "Suma 8 a 40: 48." },
      { f1: 8, f2: 7, res: 56, sum: "8 + ... (7 veces)", visual: "7 pulpos con 8 tentáculos", hint: "Recuerda: 5, 6, 7, 8 -> 56 = 7 × 8." },
      { f1: 8, f2: 8, res: 64, sum: "8 + ... (8 veces)", visual: "8 pulpos con 8 tentáculos", hint: "¡Ocho por ocho es sesenta y cuatro!" },
      { f1: 8, f2: 9, res: 72, sum: "8 + ... (9 veces)", visual: "9 pulpos con 8 tentáculos", hint: "A 80 le restas 8: 72." },
      { f1: 8, f2: 10, res: 80, sum: "8 + ... (10 veces)", visual: "10 pulpos con 8 tentáculos", hint: "8 decenas: 80." }
    ]
  },
  9: {
    number: 9,
    title: "Tabla del 9: ¡El Asombroso Truco de los Dedos!",
    item: "Planetas",
    emoji: "🪐",
    color: "#6C5CE7",
    pattern: "¡La suma mágica del 9! En todos los resultados de la tabla del 9, la suma de sus dígitos siempre da 9: 18 (1+8=9), 27 (2+7=9), 36 (3+6=9), 45 (4+5=9). ¡Además, la decena siempre es uno menos que el factor!",
    curiosity: "¡El truco de los dedos! Pon tus 10 dedos frente a ti. Para 9 × 3, baja tu tercer dedo. A la izquierda quedan 2 dedos, y a la derecha quedan 7: ¡27!",
    items: [
      { f1: 9, f2: 1, res: 9, sum: "9", visual: "1 planeta", hint: "Una vez 9 es 9." },
      { f1: 9, f2: 2, res: 18, sum: "9 + 9", visual: "2 grupos de 9 planetas", hint: "1 y 8 suman 9: 18." },
      { f1: 9, f2: 3, res: 27, sum: "9 + 9 + 9", visual: "3 grupos de 9 planetas", hint: "2 y 7 suman 9: 27." },
      { f1: 9, f2: 4, res: 36, sum: "9 + ... (4 veces)", visual: "4 grupos de 9 planetas", hint: "3 y 6 suman 9: 36." },
      { f1: 9, f2: 5, res: 45, sum: "9 + ... (5 veces)", visual: "5 grupos de 9 planetas", hint: "4 y 5 suman 9: 45." },
      { f1: 6, f2: 9, res: 54, sum: "9 + ... (6 veces)", visual: "6 grupos de 9 planetas", hint: "5 y 4 suman 9: 54." },
      { f1: 7, f2: 9, res: 63, sum: "9 + ... (7 veces)", visual: "7 grupos de 9 planetas", hint: "6 y 3 suman 9: 63." },
      { f1: 8, f2: 9, res: 72, sum: "9 + ... (8 veces)", visual: "8 grupos de 9 planetas", hint: "7 y 2 suman 9: 72." },
      { f1: 9, f2: 9, res: 81, sum: "9 + ... (9 veces)", visual: "9 grupos de 9 planetas", hint: "8 y 1 suman 9: 81." },
      { f1: 9, f2: 10, res: 90, sum: "9 + ... (10 veces)", visual: "10 grupos de 9 planetas", hint: "9 decenas: 90." }
    ]
  },
  10: {
    number: 10,
    title: "Tabla del 10: ¡El Cohete de las Decenas!",
    item: "Globos",
    emoji: "🎈",
    color: "#00CEC9",
    pattern: "¡El truco más veloz de las matemáticas! Solo debes escribir el mismo número y agregarle un cero (0) a la derecha. Por ejemplo: 10 × 7 = 70.",
    curiosity: "El sistema que usamos en el mundo entero se llama Sistema Decimal porque se basa en grupos de 10.",
    items: [
      { f1: 10, f2: 1, res: 10, sum: "10", visual: "1 decena de globos", hint: "1 con un cero al lado: 10." },
      { f1: 10, f2: 2, res: 20, sum: "10 + 10", visual: "2 decenas de globos", hint: "2 con un cero: 20." },
      { f1: 10, f2: 3, res: 30, sum: "10 + 10 + 10", visual: "3 decenas de globos", hint: "3 con un cero: 30." },
      { f1: 10, f2: 4, res: 40, sum: "10 + ... (4 veces)", visual: "4 decenas de globos", hint: "4 con un cero: 40." },
      { f1: 10, f2: 5, res: 50, sum: "10 + ... (5 veces)", visual: "5 decenas de globos", hint: "5 con un cero: 50." },
      { f1: 10, f2: 6, res: 60, sum: "10 + ... (6 veces)", visual: "6 decenas de globos", hint: "6 con un cero: 60." },
      { f1: 10, f2: 7, res: 70, sum: "10 + ... (7 veces)", visual: "7 decenas de globos", hint: "7 con un cero: 70." },
      { f1: 10, f2: 8, res: 80, sum: "10 + ... (8 veces)", visual: "8 decenas de globos", hint: "8 con un cero: 80." },
      { f1: 10, f2: 9, res: 90, sum: "10 + ... (9 veces)", visual: "9 decenas de globos", hint: "9 con un cero: 90." },
      { f1: 10, f2: 10, res: 100, sum: "10 + ... (10 veces)", visual: "10 decenas de globos", hint: "10 con un cero: ¡El gran 100!" }
    ]
  }
};
