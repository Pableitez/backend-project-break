const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const mongoose = require('mongoose');
const cloudinary = require('./config/cloudinary');
const Product = require('./models/Product');

const categoryEnum = Product.categoryEnum;
const sizeEnum = Product.sizeEnum;
const designerEnum = Product.designerEnum;

const EXCLUSIVE_NAMES = [
  'El susurro del alba',
  'En penumbra',
  'Segunda luz',
  'Variación nº III',
  'Invierno',
  'Estudio para un abrigo',
  'Fragmento',
  'Luz de atardecer',
  'Óleo',
  'El peso',
  'En reposo',
  'Atardecer',
  'Suspendido',
  'Silencio',
  'Sombra',
  'Del alba',
  'Número 12',
  'Duchesse',
  'En negativo',
  'Del norte',
  'Número 5',
  'Y sombra',
  'Del estudio',
  'Número 9',
  'En blanco',
  'Y tiempo',
  'Número 14',
  'Del atardecer',
  'Número 15',
  'Elasticidad',
  'Privado',
  'Mezcla privada',
  'Estudio',
  'Fragmento 2024',
  'Primavera',
  'Variación nº VII',
  'Penumbra',
  'Crudo',
  'Luz sobre',
  'Italiano',
  'En blanco II',
  'Del atardecer II',
  'El peso II',
  'Número 3',
  'Suspendido II',
  'En reposo II',
  'Número 11',
  'Salvaje',
  'Del alba',
  'Número 6',
  'Y silencio',
  'Número 2',
  'En reposo III',
  'Del norte II',
  'En penumbra II',
  'Número 8',
  'Otoño',
  'Variación',
  'Penumbra II',
  'Luz',
  'Número 7',
  'El estudio',
  'En penumbra III',
  'Número 10',
  'Negativo',
  'Blanco',
  'Número 4',
  'Tiempo',
  'Número 13',
  'Atardecer II',
  'Número 1',
  'Elasticidad nº II',
  'Forro privado',
  'Mezcla del estudio',
  'Suspendido III',
  'Fragmento II',
  'Del atardecer IV',
  'Variación II',
  'Penumbra III',
  'Salvaje II',
  'Luz sobre II',
  'En negativo II',
  'Número 3 II',
  'El peso III',
  'Del norte III',
  'Suspendido IV',
  'En reposo IV',
  'Del estudio II',
  'En penumbra III',
  'Número 11 II',
  'Del alba II',
  'Blanco II',
  'Y silencio II',
  'Número 6 II',
  'En negativo III',
  'Suspendida',
  'Del atardecer III',
  'Número 2 II',
  'En reposo V',
  'Del norte IV',
  'En penumbra IV',
  'Número 15 II'
];

const EXCLUSIVE_DESCRIPTIONS = [
  'Donde la luz se detiene un instante.',
  'Un gesto suspendido en el tiempo.',
  'Lo que queda cuando el ruido se va.',
  'Cuerpo y vacío en el mismo frame.',
  'La línea que separa deseo de memoria.',
  'Silencio con forma de piel.',
  'Arqueología de un gesto cotidiano.',
  'El pliegue como pregunta.',
  'Atmósfera antes que objeto.',
  'Lo que el cuerpo recuerda y la tela olvida.',
  'Una pausa en el movimiento.',
  'Geografía íntima.',
  'El peso de lo que no se dice.',
  'Superficie y profundidad en diálogo.',
  'Restos de un ritual privado.',
  'La sombra como materia.',
  'Espacio negativo habitado.',
  'Huella de un contacto.',
  'Lo efímero hecho volumen.',
  'Umbral entre dos estados.',
  'Presencia que se retira.',
  'El vacío como contenedor.',
  'Fragmento de un relato sin narrador.',
  'Tiempo condensado en un pliegue.',
  'Lo que resiste al nombre.',
  'Cuerpo como paisaje interior.',
  'El borde como lugar de encuentro.',
  'Memoria táctil.',
  'Lo que la luz no alcanza a nombrar.',
  'Superficie que guarda un secreto.',
  'Gesto congelado, tiempo en fuga.',
  'Lo mínimo necesario para existir.',
  'Arquitectura del instante.',
  'El silencio tiene esta forma.',
  'Resto de una ceremonia íntima.',
  'Donde la piel y el aire se confunden.',
  'Lo que queda después del gesto.',
  'Pregunta sin respuesta visible.',
  'El cuerpo como territorio.',
  'Límite entre dentro y fuera.',
  'Presencia que se ofrece y se niega.',
  'Lo que el tacto recuerda.',
  'Fragmento de un cuerpo posible.',
  'El pliegue como memoria.',
  'Vacío con intención.',
  'Superficie que habla sin palabras.',
  'Lo que la mirada no termina de capturar.',
  'Restos de un movimiento.',
  'El tiempo hecho materia.',
  'Cuerpo como documento.',
  'Umbral, no frontera.',
  'Lo que permanece cuando todo se va.',
  'Gesto que se repite solo.',
  'La sombra como testimonio.',
  'Espacio que el cuerpo inventa.',
  'Lo que no tiene nombre pero existe.',
  'Superficie como paisaje.',
  'Memoria sin fecha.',
  'El vacío como refugio.',
  'Presencia en negativo.',
  'Lo que la luz dibuja y borra.',
  'Fragmento de una historia sin fin.',
  'Cuerpo como archivo.',
  'El pliegue como pregunta sin respuesta.',
  'Resto de un ritual olvidado.',
  'Lo que el tacto inventa.',
  'Atmósfera con densidad.',
  'Límite que invita a cruzar.',
  'Lo que queda entre dos gestos.',
  'Superficie que guarda memoria.',
  'El silencio tiene peso.',
  'Cuerpo como territorio ambiguo.',
  'Lo que la mirada construye.',
  'Presencia que se desvanece.',
  'Vacío con memoria.',
  'El tiempo en un pliegue.',
  'Restos de una presencia.',
  'Lo que no se puede nombrar del todo.',
  'Gesto que se ofrece al vacío.',
  'Superficie como umbral.',
  'Lo que el cuerpo deja atrás.',
  'Fragmento de un cuerpo en tránsito.',
  'El pliegue como geografía.',
  'Memoria sin dueño.',
  'Lo que la luz esconde.',
  'Presencia en suspenso.',
  'Cuerpo como pregunta.',
  'El vacío como forma.',
  'Lo que resiste a la mirada.',
  'Resto de un movimiento infinito.',
  'Superficie que invita al tacto.',
  'Lo que queda cuando el gesto termina.',
  'El silencio como materia.',
  'Límite entre presencia y ausencia.',
  'Lo que el cuerpo no termina de decir.',
  'Fragmento de una ceremonia.',
  'El pliegue como tiempo.',
  'Vacío que contiene.',
  'Lo que la sombra revela.',
  'Presencia que se despliega.',
  'Cuerpo como resto.',
  'Lo que la mirada inventa.',
  'Superficie como memoria táctil.',
  'El gesto como paisaje.',
  'Lo que permanece en el vacío.',
  'Restos de un cuerpo posible.',
  'El tiempo como superficie.',
  'Lo que el tacto no alcanza a nombrar.',
  'Presencia que se retira al mirar.',
  'Fragmento de un ritual.',
  'Lo que la luz guarda.',
  'Cuerpo como umbral.',
  'El vacío como gesto.',
  'Lo que queda entre dos miradas.',
  'Superficie que pregunta.',
  'El pliegue como presencia.',
  'Lo que el silencio dibuja.',
  'Memoria sin cuerpo.',
  'Lo que la sombra esconde.',
  'Presencia en tránsito.',
  'Resto de un gesto infinito.'
];

function randomLuxuryPrice() {
  const min = 89;
  const max = 489;
  const base = min + Math.random() * (max - min);
  const endings = [0.95, 0.99, 0.50, 0.00];
  const end = endings[Math.floor(Math.random() * endings.length)];
  return Math.floor(base) + end;
}

async function seed() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('Faltan variables de Cloudinary en .env');
    process.exit(1);
  }
  try {
    let resources = [];
    let nextCursor = null;
    do {
      const opts = { type: 'upload', resource_type: 'image', max_results: 500 };
      if (nextCursor) opts.next_cursor = nextCursor;
      const result = await cloudinary.api.resources(opts);
      resources = resources.concat(result.resources || []);
      nextCursor = result.next_cursor || null;
    } while (nextCursor);

    if (resources.length === 0) {
      console.log('No hay imágenes en tu Cloudinary.');
      process.exit(0);
    }
    console.log('Imágenes encontradas:', resources.length);

    resources.sort((a, b) => (b.created_at || 0) - (a.created_at || 0));

    const products = resources.map((r, i) => ({
      name: EXCLUSIVE_NAMES[i % EXCLUSIVE_NAMES.length],
      description: EXCLUSIVE_DESCRIPTIONS[i % EXCLUSIVE_DESCRIPTIONS.length],
      image: r.secure_url,
      designer: designerEnum[i % designerEnum.length],
      category: categoryEnum[i % categoryEnum.length],
      size: sizeEnum[i % sizeEnum.length],
      price: randomLuxuryPrice()
    }));

    let uri = process.env.MONGO_URI.trim().replace(/\r/g, '');
    if (uri.includes('mongodb.net') && !uri.includes('authSource=')) {
      uri += uri.includes('?') ? '&authSource=admin' : '?authSource=admin';
    }
    await mongoose.connect(uri);
    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log('Productos creados:', products.length, '- Tienda de lujo por diseñadores.');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
