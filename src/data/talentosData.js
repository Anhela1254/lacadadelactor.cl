/**
 * LA CASA DEL ACTOR - CATÁLOGO DE TALENTOS (DEMOSTRACIÓN)
 * ======================================================
 * EDITA SOLO ESTE ARCHIVO para agregar personas o modificar fotografías.
 * Los perfiles incluidos SON FICTICIOS y solo sirven como ejemplo.
 *
 * 1. Coloca tu imagen en public/images, por ejemplo mi-actriz.jpg
 * 2. Cambia foto: '/images/mi-actriz.jpg'
 * 3. Agrega otras fotos en galeria: ['/images/foto-2.jpg', ...]
 * 4. Para reels usa enlaces embed de YouTube/Vimeo, o una URL de YouTube común.
 * 5. Para CV guarda el PDF en public/cv y establece cv: '/cv/mi-talento.pdf'
 * 6. Cada slug es ÚNICO, minúsculas y sin espacios: 'nombre-apellido'
 */

export const talentosData = [
  {
    id: 1,
    slug: 'valentina-rios',
    nombre: 'Valentina Ríos',
    especialidad: 'Actriz',
    categoria: 'Actrices',
    disciplinas: ['Cine', 'Series', 'Teatro'],
    ciudad: 'Santiago',
    pais: 'Chile',
    foto: '/images/talento-01.svg',
    galeria: ['/images/talento-01.svg', '/images/talento-01-b.svg', '/images/talento-01-c.svg'],
    frase: 'La verdad del personaje está en los pequeños gestos.',
    biografia: [
      'Perfil demostrativo de una actriz enfocada en personajes contemporáneos, cine de autor, televisión y teatro. Sustituye este texto por la trayectoria real de tu talento.',
      'Este espacio permite presentar formación, experiencia, proyectos destacados y una descripción personal del estilo interpretativo del artista.'
    ],
    ficha: { 'Rango de edad': '25–35 años', 'Estatura': '1,67 m', 'Idiomas': 'Español · Inglés', 'Residencia': 'Santiago de Chile' },
    experiencia: [
      { anio: '2026', proyecto: 'Proyecto audiovisual de muestra', rol: 'Protagonista', formato: 'Cine' },
      { anio: '2025', proyecto: 'Obra teatral de ejemplo', rol: 'Elenco', formato: 'Teatro' }
    ],
    reel: '', presentacion: '', cv: '', instagram: '', contacto: ''
  },
  {
    id: 2,
    slug: 'mateo-araya',
    nombre: 'Mateo Araya',
    especialidad: 'Actor',
    categoria: 'Actores',
    disciplinas: ['Cine', 'Televisión'],
    ciudad: 'Valparaíso', pais: 'Chile',
    foto: '/images/talento-02.svg',
    galeria: ['/images/talento-02.svg', '/images/talento-02-b.svg', '/images/talento-02-c.svg'],
    frase: 'Cada historia merece una presencia auténtica.',
    biografia: ['Actor de demostración con experiencia narrativa ficticia en cine y televisión. Reemplaza esta descripción con la biografía autorizada del artista.', 'Agrega aquí su formación, premios, trabajos más importantes y otros antecedentes profesionales.'],
    ficha: { 'Rango de edad': '30–40 años', 'Estatura': '1,80 m', 'Idiomas': 'Español', 'Residencia': 'Valparaíso, Chile' },
    experiencia: [{ anio: '2026', proyecto: 'Serie de ficción de muestra', rol: 'Reparto', formato: 'Serie' }],
    reel: '', presentacion: '', cv: '', instagram: '', contacto: ''
  },
  {
    id: 3,
    slug: 'camila-soto',
    nombre: 'Camila Soto',
    especialidad: 'Actriz',
    categoria: 'Actrices',
    disciplinas: ['Teatro', 'Publicidad', 'Cine'],
    ciudad: 'Lima', pais: 'Perú',
    foto: '/images/talento-03.svg',
    galeria: ['/images/talento-03.svg', '/images/talento-03-b.svg', '/images/talento-03-c.svg'],
    frase: 'Mi motor creativo es descubrir otras miradas.',
    biografia: ['Este es un perfil artístico de ejemplo. Escribe aquí la presentación real de una actriz, sus estudios y su experiencia en escena.', 'La ficha está preparada para incluir fotografías, videos de presentación, currículum artístico y redes públicas.'],
    ficha: { 'Rango de edad': '20–30 años', 'Estatura': '1,64 m', 'Idiomas': 'Español · Inglés', 'Residencia': 'Lima, Perú' },
    experiencia: [{ anio: '2025', proyecto: 'Montaje escénico de muestra', rol: 'Elenco', formato: 'Teatro' }],
    reel: '', presentacion: '', cv: '', instagram: '', contacto: ''
  },
  {
    id: 4,
    slug: 'daniel-vega',
    nombre: 'Daniel Vega',
    especialidad: 'Actor',
    categoria: 'Actores',
    disciplinas: ['Teatro', 'Cine', 'Publicidad'],
    ciudad: 'Santiago', pais: 'Chile',
    foto: '/images/talento-04.svg',
    galeria: ['/images/talento-04.svg', '/images/talento-04-b.svg', '/images/talento-04-c.svg'],
    frase: 'La actuación es un encuentro con otras vidas.',
    biografia: ['Perfil de prueba para un actor. Personaliza este espacio con información validada de tus representados.', 'Incluye sus talleres, escuelas de actuación, proyectos o habilidades de interpretación.'],
    ficha: { 'Rango de edad': '35–45 años', 'Estatura': '1,76 m', 'Idiomas': 'Español · Portugués', 'Residencia': 'Santiago de Chile' },
    experiencia: [{ anio: '2024', proyecto: 'Largometraje de muestra', rol: 'Secundario', formato: 'Cine' }],
    reel: '', presentacion: '', cv: '', instagram: '', contacto: ''
  },
  {
    id: 5,
    slug: 'renata-munoz',
    nombre: 'Renata Muñoz',
    especialidad: 'Directora',
    categoria: 'Dirección',
    disciplinas: ['Cine', 'Videoclips'],
    ciudad: 'Concepción', pais: 'Chile',
    foto: '/images/talento-05.svg',
    galeria: ['/images/talento-05.svg', '/images/talento-05-b.svg', '/images/talento-05-c.svg'],
    frase: 'Dirigir es observar con curiosidad y escuchar.',
    biografia: ['Perfil de muestra para profesionales detrás de cámara. Puedes crear fichas de dirección, guion u otros oficios audiovisuales.', 'Cambia la filmografía y los datos técnicos por la trayectoria de la persona con su autorización.'],
    ficha: { 'Especialidad': 'Dirección de cine', 'Idiomas': 'Español · Inglés', 'Residencia': 'Concepción, Chile' },
    experiencia: [{ anio: '2026', proyecto: 'Cortometraje ficticio', rol: 'Dirección', formato: 'Cine' }],
    reel: '', presentacion: '', cv: '', instagram: '', contacto: ''
  },
  {
    id: 6,
    slug: 'lucas-fuentes',
    nombre: 'Lucas Fuentes',
    especialidad: 'Actor',
    categoria: 'Actores',
    disciplinas: ['Series', 'Cine'],
    ciudad: 'Lima', pais: 'Perú',
    foto: '/images/talento-06.svg',
    galeria: ['/images/talento-06.svg', '/images/talento-06-b.svg', '/images/talento-06-c.svg'],
    frase: 'Interpretar también es aprender a escuchar.',
    biografia: ['Presentación de ejemplo para un actor joven. Reemplázala con sus datos reales y añade material promocional autorizado.', 'Puedes escribir varios párrafos dentro del array biografia para que el perfil sea tan completo como necesites.'],
    ficha: { 'Rango de edad': '20–30 años', 'Estatura': '1,77 m', 'Idiomas': 'Español', 'Residencia': 'Lima, Perú' },
    experiencia: [{ anio: '2025', proyecto: 'Piloto audiovisual de muestra', rol: 'Elenco', formato: 'TV' }],
    reel: '', presentacion: '', cv: '', instagram: '', contacto: ''
  },
  {
    id: 7,
    slug: 'ines-campos',
    nombre: 'Inés Campos',
    especialidad: 'Guionista',
    categoria: 'Guion',
    disciplinas: ['Cine', 'Series', 'Teatro'],
    ciudad: 'Santiago', pais: 'Chile',
    foto: '/images/talento-07.svg',
    galeria: ['/images/talento-07.svg', '/images/talento-07-b.svg', '/images/talento-07-c.svg'],
    frase: 'Todas las historias comienzan con una pregunta.',
    biografia: ['Demostración de perfil para una guionista. Escribe aquí una breve sinopsis de su trabajo y su estilo autoral.', 'Agrega proyectos, enlaces a su portafolio profesional y formas de contacto cuando estén disponibles.'],
    ficha: { 'Especialidad': 'Guion de ficción', 'Idiomas': 'Español · Inglés', 'Residencia': 'Santiago de Chile' },
    experiencia: [{ anio: '2025', proyecto: 'Guion de serie de muestra', rol: 'Guion', formato: 'Serie' }],
    reel: '', presentacion: '', cv: '', instagram: '', contacto: ''
  },
  {
    id: 8,
    slug: 'adrian-morales',
    nombre: 'Adrián Morales',
    especialidad: 'Actor',
    categoria: 'Actores',
    disciplinas: ['Publicidad', 'Teatro', 'Series'],
    ciudad: 'Arequipa', pais: 'Perú',
    foto: '/images/talento-08.svg',
    galeria: ['/images/talento-08.svg', '/images/talento-08-b.svg', '/images/talento-08-c.svg'],
    frase: 'Me mueve la posibilidad de contar nuevas historias.',
    biografia: ['Esta ficha de ejemplo muestra cómo se verá el portafolio profesional de uno de tus actores.', 'Aquí podrás agregar técnicas, acentos, experiencia en publicidad, proyectos y entrenamiento.'],
    ficha: { 'Rango de edad': '25–35 años', 'Estatura': '1,82 m', 'Idiomas': 'Español · Inglés', 'Residencia': 'Arequipa, Perú' },
    experiencia: [{ anio: '2026', proyecto: 'Campaña de publicidad de muestra', rol: 'Protagonista', formato: 'Publicidad' }],
    reel: '', presentacion: '', cv: '', instagram: '', contacto: ''
  }
];

export const TALENT_CATEGORIES = ['Todos', 'Actores', 'Actrices', 'Dirección', 'Guion'];

export function getTalentoBySlug(slug) {
  return talentosData.find((item) => item.slug === slug);
}
