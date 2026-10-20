# 📄 INFORME TÉCNICO Y PEDAGÓGICO
## Análisis Entrada-Proceso-Salida (IPO) y Algoritmos en Pseudocódigo
**Asignatura:** Elaboración de apps para dispositivos electrónicos móviles  
**Unidad 4:** Evaluación Final II Semestre  
**Proyecto:** Plataforma Educativa "Mis Tablas"  
**Alumna:** Juliana Gallardo  

---

## 🧩 1. Análisis de Problemas: Entrada, Proceso y Salida (IPO)

A continuación se detalla el análisis de los 4 módulos principales de la plataforma:

### Módulo 1: Identificación y Registro del Estudiante
- **Datos de Entrada:**
  - `nombreEstudiante` (Texto: nombre o apodo, mínimo 2 caracteres).
  - `avatarSeleccionado` (Cadena: identificador de uno de los 5 personajes: 'avatar1' a 'avatar5').
- **Proceso:**
  - Verificar que el nombre no contenga únicamente espacios en blanco ni esté vacío.
  - Verificar que exista un avatar seleccionado en la interfaz.
  - Comprobar en el almacenamiento local (`localStorage`) si ya existe un perfil registrado con ese nombre.
  - Si es nuevo, inicializar el objeto de datos con 0 estrellas, tabla del 2 desbloqueada y listas vacías de logros.
  - Si ya existe, actualizar el avatar y mantener el progreso acumulado.
- **Datos de Salida:**
  - Mensaje de validación / bienvenida.
  - Objeto de sesión guardado.
  - Redirección hacia `Sistema/index.html`.

---

### Módulo 2: Aprendizaje Interactivo y Suma Repetida
- **Datos de Entrada:**
  - `numeroTabla` (Entero: del 2 al 10).
  - `factor` (Entero: del 1 al 10).
- **Proceso:**
  - Calcular el producto: `resultado = numeroTabla * factor`.
  - Construir la cadena de suma repetida sumando `factor` veces el número de la tabla.
  - Generar la representación visual de grupos con emojis temáticos según la tabla (dados, cerezas, estrellas, autos, etc.).
  - Obtener la pista pedagógica y patrón matemático correspondiente.
- **Datos de Salida:**
  - Tarjeta desplegada con la fórmula completa, la suma iterada, los grupos gráficos y la explicación.

---

### Módulo 3: Mini-Juego "Atrapa el Resultado" (Burbujas)
- **Datos de Entrada:**
  - Clic o toque táctil en una burbuja con valor `respuestaSeleccionada`.
  - Tiempo transcurrido en la ronda.
- **Proceso:**
  - Generar una multiplicación aleatoria dentro de las tablas disponibles.
  - Calcular la respuesta correcta: `correcta = factor1 * factor2`.
  - Generar 3 opciones distractoras numéricas cercanas.
  - Al pulsar la burbuja:
    - Si `respuestaSeleccionada == correcta`: sumar 20 puntos, reproducir sonido de acierto, animación de burbuja reventada y avanzar de ronda.
    - Si `respuestaSeleccionada != correcta`: reproducir sonido de error, registrar fallo y permitir reintentar.
- **Datos de Salida:**
  - Actualización de puntaje en pantalla, estrellas de bonificación y confeti al finalizar las 5 rondas.

---

### Módulo 4: Ensayo Matemático tipo SIMCE
- **Datos de Entrada:**
  - Respuestas marcadas por el estudiante para cada una de las 10 preguntas: `respuestas[1..10]`.
  - Confirmación de entrega del ensayo.
- **Proceso:**
  - Inicializar contador `puntaje = 0`.
  - Recorrer desde la pregunta 1 hasta la 10:
    - Comparar la alternativa elegida por el alumno con la alternativa correcta.
    - Si coincide: incrementar `puntaje = puntaje + 1` y marcar estado "Correcta".
    - Si no coincide: marcar estado "Incorrecta".
  - Calcular el porcentaje de logro: `porcentaje = (puntaje / 10) * 100`.
  - Determinar el nivel de logro según estándares SIMCE:
    - Si `porcentaje >= 80%`: Nivel Adecuado.
    - Si `porcentaje >= 60% y porcentaje < 80%`: Nivel Elemental.
    - Si `porcentaje < 60%`: Nivel Insuficiente.
  - Otorgar bonificación de estrellas proporcionales al resultado y guardar en el historial.
- **Datos de Salida:**
  - Puntaje total (ej. 9/10), porcentaje, nivel de logro SIMCE, estrellas otorgadas y detalle pedagógico con la explicación de cada pregunta.

---

## 💻 2. Diseño de Algoritmos en Pseudocódigo

### Algoritmo 1: Validación y Acceso del Estudiante
```text
Algoritmo IngresoEstudiante
    Definir nombre Como Cadena
    Definir avatar Como Cadena
    Definir datosValidos Como Logico
    
    Escribir "Ingrese su nombre:"
    Leer nombre
    Escribir "Seleccione su avatar (avatar1 a avatar5):"
    Leer avatar
    
    datosValidos <- Verdadero
    
    Si Longitud(nombre) < 2 Entonces
        Escribir "Error: El nombre debe tener al menos 2 caracteres."
        datosValidos <- Falso
    FinSi
    
    Si avatar = "" Entonces
        Escribir "Error: Debe seleccionar un avatar de los 5 personajes."
        datosValidos <- Falso
    FinSi
    
    Si datosValidos = Verdadero Entonces
        Si ExisteUsuarioEnAlmacenamiento(nombre) Entonces
            ActualizarAvatarUsuario(nombre, avatar)
        Sino
            CrearNuevoUsuario(nombre, avatar, 0)
        FinSi
        Escribir "¡Bienvenido! Redirigiendo a Sistema/index.html..."
        Redirigir("Sistema/index.html")
    FinSi
FinAlgoritmo
```

---

### Algoritmo 2: Evaluación y Calificación del Ensayo SIMCE
```text
Algoritmo EvaluarEnsayoSIMCE
    Definir respuestasEstudiante Como Arreglo[10] de Entero
    Definir respuestasCorrectas Como Arreglo[10] de Entero
    Definir puntaje Como Entero
    Definir porcentaje Como Real
    Definir nivelLogro Como Cadena
    Definir i Como Entero
    
    puntaje <- 0
    
    Para i <- 1 Hasta 10 Con Paso 1 Hacer
        Si respuestasEstudiante[i] = respuestasCorrectas[i] Entonces
            puntaje <- puntaje + 1
        FinSi
    FinPara
    
    porcentaje <- (puntaje / 10) * 100
    
    Si porcentaje >= 80 Entonces
        nivelLogro <- "Adecuado"
    Sino
        Si porcentaje >= 60 Entonces
            nivelLogro <- "Elemental"
        Sino
            nivelLogro <- "Insuficiente"
        FinSi
    FinSi
    
    Escribir "Tu puntaje obtenido es: ", puntaje, " de 10"
    Escribir "Porcentaje de logro: ", porcentaje, "%"
    Escribir "Nivel de desempeño SIMCE: ", nivelLogro
    
    GuardarEnHistorial(puntaje, porcentaje, nivelLogro)
    OtorgarEstrellasDePremio(Redondear(puntaje / 2))
FinAlgoritmo
```

---

### Algoritmo 3: Representación Gráfica de Grupos y Suma Iterada
```text
Algoritmo ConstruirMultiplicacionVisual
    Definir tabla Como Entero
    Definir factor Como Entero
    Definir sumaIterada Como Cadena
    Definir totalObjetos Como Entero
    Definir i Como Entero
    
    Escribir "Ingrese el número de la tabla:"
    Leer tabla
    Escribir "Ingrese el factor a multiplicar:"
    Leer factor
    
    totalObjetos <- tabla * factor
    sumaIterada <- ""
    
    Para i <- 1 Hasta factor Con Paso 1 Hacer
        Si i = 1 Entonces
            sumaIterada <- ConvertirATexto(tabla)
        Sino
            sumaIterada <- sumaIterada + " + " + ConvertirATexto(tabla)
        FinSi
    FinPara
    
    Escribir "Multiplicación: ", tabla, " x ", factor, " = ", totalObjetos
    Escribir "Representación como suma iterada: ", sumaIterada, " = ", totalObjetos
    Escribir "Grupos visuales: Hay ", factor, " grupos con ", tabla, " elementos cada uno."
FinAlgoritmo
```
