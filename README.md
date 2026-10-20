# 🌟 Plataforma Educativa "Mis Tablas"
### Evaluación Final II Semestre - Unidad 4: Elaboración de Apps para Dispositivos Electrónicos Móviles
**Departamento de Informática**  
**Dirigido a:** Estudiantes de 4° Básico  
**Autora:** Juliana Gallardo  
**Ubicación:** `C:\xampp\htdocs\misTabla_JulianaGallardo`

---

## 🎯 1. Objetivos del Proyecto

- **Objetivo de Aprendizaje (OA5):** Desarrollar aplicaciones para dispositivos móviles y para dispositivos provistos de sensores y mecanismos de control.
- **Habilidades Desarrolladas:**
  - Analizar problemas simples identificando datos de **Entrada, Proceso y Salida**.
  - Diseñar **algoritmos en pseudocódigo** para resolver problemas matemáticos e interactivos.
  - Implementar una interfaz web interactiva utilizando **HTML5, CSS3 y JavaScript**.
  - Adaptabilidad para **dispositivos móviles** (smartphones y tablets) mediante diseño responsivo y táctil.
  - Documentar y gestionar el código para control de versiones en **GitHub**.

---

## 📁 2. Estructura del Proyecto

```text
C:\xampp\htdocs\misTabla_JulianaGallardo
├── index.html                    # Etapa 1: Pantalla de Ingreso y Selección de Avatar
├── README.md                     # Documentación general y guía de GitHub
├── INFORME_TECNICO.md            # Análisis de Entrada/Proceso/Salida y Pseudocódigo
└── Sistema
    ├── index.html                # Etapas 2, 3 y 4: Menú, Tablas, Juegos, SIMCE y Progreso
    ├── CSS
    │   └── style.css             # Estilos responsivos, infantiles y móviles
    ├── IMAGEN
    │   ├── logo.svg              # Logo oficial de "Mis Tablas"
    │   ├── avatar1.svg           # 🦁 Leo el León Aventurero
    │   ├── avatar2.svg           # 🦊 Foxy la Zorrita Curiosa
    │   ├── avatar3.svg           # 🐼 Pandita el Genio de los Números
    │   ├── avatar4.svg           # 🦉 Buhito el Sabio
    │   ├── avatar5.svg           # 🚀 Astro el Conejito Espacial
    │   ├── star.svg              # Estrella dorada animada
    │   ├── trophy.svg            # Trofeo de logros
    │   └── medal.svg             # Medalla de reconocimiento
    └── JS
        ├── audio.js              # Sintetizador Web Audio API (efectos de sonido nativos)
        ├── confetti.js           # Motor de confeti festivo para premiación
        ├── storage.js            # Persistencia en localStorage (estrellas, medallas, tablas)
        ├── tables-data.js        # Banco de datos pedagógicos de las tablas 2 al 10
        ├── games.js              # 5 Mini-juegos interactivos no monótonos
        ├── simce.js              # Ensayo SIMCE (10 preguntas contextualizadas 4° básico)
        └── app.js                # Controlador principal y navegación
```

---

## 🐾 3. Los 5 Avatares Infantiles

Para hacer la experiencia lúdica y cercana a estudiantes de 4° básico, se crearon 5 personajes ilustrados en formato vectorial SVG:

1. 🦁 **Leo**: El león aventurero, valiente y siempre listo para nuevos desafíos.
2. 🦊 **Foxy**: La zorrita curiosa y astuta, experta en resolver misterios matemáticos.
3. 🐼 **Pandita**: El panda genio con lentes redondos, amante de las ciencias y el orden.
4. 🦉 **Buhito**: El búho sabio con birrete de graduación, guía de estudio paciente.
5. 🚀 **Astro**: El conejito astronauta con casco espacial, veloz para resolver multiplicaciones.

---

## 🚀 4. Etapas del Proyecto Implementadas

### Etapa 1: Ingreso del Estudiante (`index.html`)
- Nombre de la plataforma y logotipo vibrante.
- Campo de texto para ingresar el nombre o apodo del estudiante.
- Galería interactiva para seleccionar uno de los **5 avatares** disponibles.
- Validación de datos (mínimo 2 caracteres, selección obligatoria de avatar).
- Detección automática de partidas previas con opción de continuar partida.
- Redirección fluida a `Sistema/index.html`.

### Etapa 2: Menú Principal y Tablero de Aventuras (`Sistema/index.html`)
- Barra superior con avatar seleccionado, nombre, estrellas ⭐ y medallas 🏅.
- Control de audio (activar/silenciar efectos de sonido con Web Audio API).
- Navegación por pestañas interactivas:
  - 🏠 **Inicio:** Tablero con tarjetas de aventura y progreso global.
  - 📚 **Aprender Tablas:** Módulos de las tablas del 2 al 10.
  - 🎮 **Juegos y Desafíos:** 5 mini-juegos variados.
  - 🏆 **Mi Progreso:** Estadísticas, historial y vitrina de medallas.
  - 📝 **Ensayo SIMCE:** Evaluación formativa con situaciones reales.

### Etapa 3: Módulos de Aprendizaje Interactivo (Tablas del 2 al 10)
- **Modo Explorar:**
  - Descubrimiento de **patrones matemáticos** y trucos secretos de cada tabla.
  - Representación visual con grupos de objetos reales (frutas, tréboles, estrellas, etc.).
  - Desglose de la **suma repetida o iterada** ($a \times b = b + b + \dots$).
  - Pistas pedagógicas paso a paso al tocar cada multiplicación.
- **Modo Desafío (Ponte a Prueba):**
  - Cuestionario interactivo con retroalimentación inmediata, pistas y sonidos.
  - Sistema de 1 a 3 estrellas doradas según el desempeño.
  - Desbloqueo progresivo de la siguiente tabla.

### Actividades y Mini-Juegos No Monótonos
1. **Memoria Matemática:** Memotest interactivo de cartas 3D con volteo suave para emparejar multiplicaciones con su producto.
2. **Atrapa el Resultado:** Burbujas dinámicas flotantes contrarreloj donde el alumno debe reventar la respuesta correcta.
3. **Construye la Multiplicación:** Colocación visual de objetos en cajas para comprender el concepto de grupos iguales.
4. **¿Quién tiene la respuesta?:** Los avatares muestran resultados y el alumno debe identificar al personaje correcto.
5. **Arrastra y Completa:** Asociación táctil / arrastrar y soltar de fichas numéricas a sus casilleros correspondientes.

### Etapa 4: Ensayo Matemático tipo SIMCE (4° Básico)
- **10 Preguntas contextualizadas** en la realidad de los alumnos:
  1. *Compras y precios:* Paquetes de galletas en el kiosco escolar.
  2. *Organización de grupos:* Filas de sillas para el acto del colegio.
  3. *Distribución de materiales:* Pinceles y témperas en la sala de Artes.
  4. *Conteo de elementos:* Bicicletas y ruedas en el estacionamiento.
  5. *Ahorro y semanas:* Monedas de \$100 en la alcancía.
  6. *Biblioteca escolar:* Repisas y libros de aventuras.
  7. *Puntajes de torneos:* Videojuego matemático educativo.
  8. *Huerto escolar:* Hileras de lechugas sembradas.
  9. *Fiestas de cumpleaños:* Bolsitas de sorpresas y juguetes.
  10. *Situación cotidiana:* Cajas de 10 huevos en la pastelería.
- **Panel lateral numerado del 1 al 10** que indica preguntas actuales, respondidas y pendientes.
- Cálculo de puntaje, nivel de desempeño SIMCE (*Adecuado*, *Elemental*, *Insuficiente*).
- **Retroalimentación pedagógica detallada** con explicación de cada respuesta.

---

## 📱 5. Adaptación para Dispositivos Móviles

1. **Meta Viewport:** Configurado con `width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no` para prevenir zoom accidental al tocar.
2. **Zonas táctiles amplias:** Botones, cartas y alternativas con una altura mínima de 48px a 54px para fácil pulsación con los dedos de niños.
3. **Diseño Mobile-First & Flexbox/Grid:** Se reorganiza verticalmente en pantallas de teléfonos inteligentes sin scroll horizontal.
4. **Acceso desde el celular en red local:**
   - Abre la consola de comandos y escribe `ipconfig` para conocer tu IPv4 local (ejemplo: `192.168.1.45`).
   - Desde el navegador de tu celular conectado al mismo Wi-Fi, ingresa a:  
     `http://192.168.1.45/misTabla_JulianaGallardo/`

---

## 🌐 6. Guía para Subir el Proyecto a GitHub

Para cumplir con el respaldo colaborativo y control de versiones:

1. **Crear repositorio en GitHub:**
   - Ingresa a [GitHub](https://github.com/) con tu cuenta.
   - Haz clic en **New repository** y nómbralo `misTablas-JulianaGallardo`.
   - Selecciona **Public** y deja desmarcadas las casillas de README/gitignore (ya tenemos los archivos listos).
2. **Subir archivos mediante Git Bash / Terminal:**
   ```bash
   cd C:\xampp\htdocs\misTabla_JulianaGallardo
   git init
   git add .
   git commit -m "Entrega Final: Plataforma Educativa Mis Tablas - Juliana Gallardo"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/misTablas-JulianaGallardo.git
   git push -u origin main
   ```
3. **Alternativa con GitHub Desktop:**
   - Abre **GitHub Desktop** > Menú *File* > *Add local repository*.
   - Elige la carpeta `C:\xampp\htdocs\misTabla_JulianaGallardo`.
   - Escribe el resumen del commit y presiona **Publish repository**.
