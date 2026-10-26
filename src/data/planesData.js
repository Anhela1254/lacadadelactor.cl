// VALORES DEMOSTRATIVOS. Sustituye nombres, importes y condiciones por los tuyos.
// No existe pasarela de pago ni cobro automático en este proyecto.
export const planesData = [
  {
    id: 'activacion', nombre: 'Perfil externo', etiqueta: 'VISIBILIDAD ACTORAL', publico: 'Para actores que no pertenecen todavía a la comunidad',
    monto: 'Por definir', moneda: '', periodo: 'tarifa pendiente de confirmación', destaque: false, rol: 'actor',
    beneficios: ['Tu perfil profesional en la plataforma', 'Book y datos artísticos en un solo lugar', 'Acceso a información de convocatorias', 'Herramientas para compartir tu perfil'],
    cta:'Activar perfil'
  },
  {
    id: 'destacado', nombre: 'Socio de la comunidad', etiqueta: 'MEMBRESÍA LCDA', publico:'Para actores y actrices integrantes de La Casa del Actor',
    monto:'Por definir', moneda:'', periodo:'membresía pendiente de confirmación', destaque:true, rol:'actor',
    beneficios:['Ficha profesional con contenido ampliado', 'Espacio especial para reel y videos', 'Presentación destacada en el directorio', 'Herramientas de visibilidad para tu trabajo'],
    cta:'Comenzar oferta'
  },
  {
    id: 'productora', nombre:'Productor / acceso anual', etiqueta:'MODELO PROPUESTO', publico:'Para directores, reclutadores y productoras audiovisuales',
    monto:'$150.000', moneda:'CLP', periodo:'por año · cifra del documento, sujeta a confirmación', destaque:false, rol:'productor',
    beneficios:['Proponer convocatorias a revisión', 'Modelo previsto: un casting al mes', 'Acceso al directorio según activación', 'Herramientas de búsqueda y contacto previstas'],
    cta:'Comenzar ahora'
  }
];
export const planById = id => planesData.find(plan => plan.id === id);
