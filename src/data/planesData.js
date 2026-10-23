// VALORES DEMOSTRATIVOS. Sustituye nombres, importes y condiciones por los tuyos.
// No existe pasarela de pago ni cobro automático en este proyecto.
export const planesData = [
  {
    id: 'activacion', nombre: 'Activación de perfil', etiqueta: 'PAGO ÚNICO', publico: 'Para quienes inician su recorrido artístico',
    monto: '$2.990', moneda: 'CLP', periodo: 'pago único · ejemplo', destaque: false, rol: 'actor',
    beneficios: ['Tu perfil profesional en la plataforma', 'Book y datos artísticos en un solo lugar', 'Acceso a información de convocatorias', 'Herramientas para compartir tu perfil'],
    cta:'Activar perfil'
  },
  {
    id: 'destacado', nombre: 'Actor destacado', etiqueta: 'MÁS VISIBILIDAD', publico:'Para actores y actrices en crecimiento',
    monto:'$9.990', moneda:'CLP', periodo:'por año · ejemplo', destaque:true, rol:'actor',
    beneficios:['Ficha profesional con contenido ampliado', 'Espacio especial para reel y videos', 'Presentación destacada en el directorio', 'Herramientas de visibilidad para tu trabajo'],
    cta:'Comenzar oferta'
  },
  {
    id: 'productora', nombre:'Productor / convocante', etiqueta:'POR PUBLICACIÓN', publico:'Para equipos y productoras audiovisuales',
    monto:'$4.990', moneda:'CLP', periodo:'por casting · ejemplo', destaque:false, rol:'productor',
    beneficios:['Espacio para publicar oportunidades', 'Convocatorias con requisitos claros', 'Acceso al directorio de artistas', 'Herramientas previstas para organizar postulaciones'],
    cta:'Comenzar ahora'
  }
];
export const planById = id => planesData.find(plan => plan.id === id);
