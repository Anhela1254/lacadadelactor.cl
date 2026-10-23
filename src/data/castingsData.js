/**
 * LA CASA DEL ACTOR · EDITA TUS CONVOCATORIAS AQUÍ
 * ------------------------------------------------
 * 1. Guarda tus imágenes en public/images/.
 * 2. Cambia imagen: '/images/mi-casting.jpg'
 * 3. Cambia titulo, productora, descripcion, etc.
 * 4. Si tienes un enlace real de postulaciones, colócalo en postulacionUrl.
 * 5. Al publicarlo en producción, carga castings desde tu backend.
 *
 * TODOS ESTOS REGISTROS SON FICTICIOS Y SE USAN PARA MOSTRAR EL DISEÑO.
 */

export const castingsData = [
  {
    id: 'ultima-funcion',
    titulo: 'La última función',
    productora: 'Escena Abierta · productora de ejemplo',
    tipo: 'Cortometraje',
    remuneracion: 'Remunerado',
    region: 'Metropolitana',
    imagen: '/images/casting-01.svg',
    descripcion: 'Buscamos intérpretes para un cortometraje dramático sobre los recuerdos que permanecen después del último aplauso.',
    requisitos: ['Actor o actriz de 25 a 40 años', 'Disponibilidad de ensayo a coordinar', 'Material actoral o video de presentación'],
    fechas: 'Por definir',
    cierre: 'Por definir',
    postulacionUrl: ''
  },
  {
    id: 'otro-verano',
    titulo: 'Otro verano',
    productora: 'Costa Films · proyecto ficticio',
    tipo: 'Publicidad',
    remuneracion: 'Remunerado',
    region: 'Valparaíso',
    imagen: '/images/casting-02.svg',
    descripcion: 'Convocatoria de ejemplo para un spot de una marca imaginaria sobre la energía de los encuentros de verano.',
    requisitos: ['Talentos entre 20 y 35 años', 'Expresividad frente a cámara', 'Adjuntar fotografía de rostro y cuerpo entero'],
    fechas: 'Por definir',
    cierre: 'Por definir',
    postulacionUrl: ''
  },
  {
    id: 'vocaciones',
    titulo: 'Vocaciones',
    productora: 'Cámara Sur · ejercicio académico',
    tipo: 'Estudiantil',
    remuneracion: 'Por definir',
    region: 'Metropolitana',
    imagen: '/images/casting-03.svg',
    descripcion: 'Proyecto universitario ficticio sobre las decisiones que nos acercan y nos alejan de aquello que amamos.',
    requisitos: ['Actrices y actores de distintas edades', 'Interés por proyectos estudiantiles', 'Self tape de presentación'],
    fechas: 'Por definir',
    cierre: 'Por definir',
    postulacionUrl: ''
  },
  {
    id: 'luces-de-barrio',
    titulo: 'Luces de barrio',
    productora: 'Casa Norte · productora ficticia',
    tipo: 'Serie',
    remuneracion: 'Remunerado',
    region: 'Biobío',
    imagen: '/images/casting-04.svg',
    descripcion: 'Serie dramática de muestra sobre una comunidad que busca reinventarse a través del arte y la música.',
    requisitos: ['Personas mayores de 18 años', 'Experiencia escénica deseable, no excluyente', 'Presentar videobook si se dispone de uno'],
    fechas: 'Por definir',
    cierre: 'Por definir',
    postulacionUrl: ''
  },
  {
    id: 'la-puerta-azul',
    titulo: 'La puerta azul',
    productora: 'Compañía Andén · compañía ficticia',
    tipo: 'Teatro',
    remuneracion: 'Por definir',
    region: 'Metropolitana',
    imagen: '/images/casting-05.svg',
    descripcion: 'Obra de teatro contemporáneo de demostración que mezcla humor, movimiento y relatos de familia.',
    requisitos: ['Actrices y actores con disponibilidad para ensayos', 'Interés en teatro físico', 'Audición presencial por coordinar'],
    fechas: 'Por definir',
    cierre: 'Por definir',
    postulacionUrl: ''
  },
  {
    id: 'en-movimiento',
    titulo: 'En movimiento',
    productora: 'Visual Colectivo · ejemplo',
    tipo: 'Videoclip',
    remuneracion: 'Remunerado',
    region: 'Los Lagos',
    imagen: '/images/casting-06.svg',
    descripcion: 'Videoclip narrativo ficticio que invita a artistas de danza y actuación a participar en una pieza audiovisual.',
    requisitos: ['Actores, actrices o bailarines de 18 a 45 años', 'Disponibilidad para un día de rodaje', 'Video de movimiento o portafolio'],
    fechas: 'Por definir',
    cierre: 'Por definir',
    postulacionUrl: ''
  }
];
