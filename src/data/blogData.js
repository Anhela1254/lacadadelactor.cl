// EDITA AQUÍ artículos, portadas, categorías y contenido.
// Son artículos originales de demostración, no copiados del sitio de referencia.
export const blogData = [
  {
    slug:'preparar-tu-primer-casting', titulo:'Cómo prepararte para tu primer casting', categoria:'Casting', nivel:'Principiante', formato:'Guía', lectura:6,
    imagen:'/images/Posteo para Facebook Búsqueda laboral Profesional Amarillo y blanco (2).png', destacado:true, fecha:'2026-10-10',
    resumen:'Del análisis del personaje al momento de entrar a la sala: una ruta sencilla para audicionar con claridad.',
    contenido:[
      { subtitulo:'Investiga el proyecto', texto:'Antes de presentarte, identifica el tono de la producción, las necesidades del personaje y las indicaciones de la convocatoria. No supongas información que no aparezca en el llamado.' },
      { subtitulo:'Prepara decisiones, no respuestas rígidas', texto:'Lee la escena varias veces. Piensa qué quiere el personaje, qué obstáculos enfrenta y a quién se dirige. Ensaya diferentes posibilidades sin perder naturalidad.' },
      { subtitulo:'Cuida tu presentación', texto:'Llega con anticipación o verifica cámara, sonido y encuadre si envías un self-tape. Respeta los requisitos del casting y mantén tu material actualizado.' }
    ]
  },
  {
    slug:'book-fotografico-profesional', titulo:'Tu book fotográfico: qué imágenes elegir', categoria:'Preparación', nivel:'Principiante', formato:'Artículo', lectura:5,
    imagen:'/images/blog-book.svg', fecha:'2026-09-22', resumen:'Una guía para seleccionar retratos que expresen presencia, versatilidad y personalidad.',
    contenido:[{subtitulo:'Menos es más',texto:'Prioriza fotografías actuales, bien iluminadas y que se parezcan a ti. Una selección breve y coherente suele comunicar mejor que decenas de imágenes similares.'},{subtitulo:'Varía los registros',texto:'Incluye primeros planos y planos medios donde se aprecien distintos matices expresivos, sin recurrir a retoques que alteren tus rasgos.'}]
  },
  {
    slug:'selftape-que-funciona', titulo:'Self-tape: iluminación, sonido y encuadre', categoria:'Técnica', nivel:'Intermedio', formato:'Video-tip', lectura:4,
    imagen:'/images/blog-tecnica.svg', fecha:'2026-09-18', resumen:'Mejora tus audiciones grabadas con ajustes sencillos que puedes hacer en casa.',
    contenido:[{subtitulo:'Prepara el espacio',texto:'Busca un fondo limpio, evita contraluces y coloca la cámara a la altura de los ojos. Un encuadre estable permite concentrarse en la actuación.'},{subtitulo:'Prueba el sonido',texto:'Graba unos segundos antes de empezar. Comprueba que la voz sea clara y que no haya ruido ambiental que distraiga.'}]
  },
  {
    slug:'entrenamiento-actoral', titulo:'Entrenar la escucha en escena', categoria:'Actuación', nivel:'Intermedio', formato:'Artículo', lectura:7,
    imagen:'/images/blog-actuacion.svg', fecha:'2026-08-26', resumen:'Ejercicios para reaccionar de forma orgánica y construir vínculos en una escena.',
    contenido:[{subtitulo:'Escuchar también es actuar',texto:'Tu compañero influye en cada decisión. Observa cambios de ritmo, silencios y acciones en vez de esperar tu turno de hablar.'},{subtitulo:'Ejercicio práctico',texto:'Repite una escena corta modificando tu objetivo. Fíjate en cómo cambian las acciones aunque las palabras sigan siendo las mismas.'}]
  },
  {
    slug:'perfil-artistico-digital', titulo:'Construye un perfil artístico que te represente', categoria:'Industria', nivel:'Principiante', formato:'Guía', lectura:6,
    imagen:'/images/IMG_5808.jpg', fecha:'2026-08-11', resumen:'Cómo organizar experiencia, habilidades, fotos y enlaces para que encuentren tu trabajo.',
    contenido:[{subtitulo:'Lo esencial primero',texto:'Usa un nombre profesional consistente, una biografía breve y enlaces vigentes. Organiza tu material para que un equipo de casting encuentre lo importante fácilmente.'},{subtitulo:'Actualiza con intención',texto:'Cada nuevo proyecto puede aportar al perfil, pero no necesitas publicar todo. Conserva lo que describe tu experiencia actual.'}]
  },
  {
    slug:'monologo-audicion', titulo:'Cómo elegir un monólogo para audicionar', categoria:'Preparación', nivel:'Avanzado', formato:'Artículo', lectura:8,
    imagen:'/images/blog-book.svg', fecha:'2026-07-29', resumen:'Encuentra un texto adecuado a tu registro y aprovéchalo para mostrar decisiones interpretativas.',
    contenido:[{subtitulo:'Busca un material cercano',texto:'Elige una pieza que puedas defender con verdad y que cumpla el tiempo solicitado. Evita utilizar un texto solo por su popularidad.'},{subtitulo:'Construye la situación',texto:'Un monólogo no es un discurso aislado. Define a quién hablas, para qué y qué cambia durante el recorrido.'}]
  },
  {
    slug:'trabajo-en-set', titulo:'Buenas prácticas en tu primer rodaje', categoria:'Industria', nivel:'Principiante', formato:'Guía', lectura:5,
    imagen:'/images/blog-industria.svg', fecha:'2026-07-05', resumen:'Puntualidad, continuidad y comunicación dentro de un equipo audiovisual.',
    contenido:[{subtitulo:'La colaboración es clave',texto:'Aprende los tiempos de producción, escucha indicaciones y lleva un registro de vestuario o accesorios cuando corresponda.'},{subtitulo:'Respeta el equipo',texto:'Pregunta por los canales adecuados para plantear dudas y confirma horarios y lugares con la producción.'}]
  },
  {
    slug:'improvisacion-con-objetivo', titulo:'Improvisación: jugar con un objetivo claro', categoria:'Actuación', nivel:'Avanzado', formato:'Taller', lectura:6,
    imagen:'/images/blog-actuacion.svg', fecha:'2026-06-16', resumen:'Herramientas para crear situaciones espontáneas sin perder el sentido de la escena.',
    contenido:[{subtitulo:'Una acción concreta',texto:'Una improvisación mejora cuando cada participante sabe qué busca conseguir del otro. Prueba verbos de acción en vez de emociones abstractas.'},{subtitulo:'Acepta y transforma',texto:'Escucha las propuestas de tus compañeros y construye a partir de ellas. La escena avanza gracias a acciones compartidas.'}]
  }
];
export const BLOG_CATEGORIES = ['Todas', 'Actuación', 'Casting', 'Industria', 'Técnica', 'Preparación'];
export const BLOG_LEVELS = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'];
