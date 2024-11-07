'use client';
// eslint-disable-next-line react/no-unescaped-entities
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, BookOpen, Globe, Smartphone, Cloud } from 'lucide-react';

const WikiPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">
            Wiki: Globalización y Economía Digital
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explorando los conceptos clave de la era digital
          </p>
        </header>

        <Section
          title="Globalización"
          icon={<Globe className="w-6 h-6" />}
          expanded={expandedSections['globalization']}
          onToggle={() => toggleSection('globalization')}
        >
          <h3 className="text-2xl font-semibold mb-4">¿Qué es la Globalización?</h3>
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="md:w-1/2 md:pr-4">
              <p className="mb-4">
                Es un proceso "beneficioso", inevitable e irreversible. El resultado de la innovación humana y el progreso tecnológico. Es la integración de las economías de todo mundo a través del comercio y flujos financieros. El término es usado desde los años 80's y coincide con los adelantos tecnológicos.
              </p>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <Image
                src="/img/world.jpg"
                alt="Globalización"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-2">Ventajas</h4>
          <ul className="list-disc pl-5 mb-4">
            <li>Ofrece grandes oportunidades de alcanzar un desarrollo verdaderamente mundial, pero no está avanzando de manera uniforme.</li>
            <li>Se promueven la eficiencia por medio de la competencia y la división del trabajo, es decir, la especialización que permite a las personas y a las economías centrarse en lo que mejor saben hacer.</li>
            <li>La extensión de la comunicación permite: Beneficiarse de mercados más vastos, tener mayor acceso a los flujos de capital y a la tecnología, beneficiarse de importaciones más baratas y mercados de exportación más amplios.</li>
          </ul>

          <h4 className="text-xl font-semibold mb-2">Desventajas</h4>
          <ul className="list-disc pl-5 mb-4">
            <li>Los mercados no garantizan necesariamente que la mayor eficiencia beneficiará a todos.</li>
            <li>Los países deben estar dispuestos a adoptar las políticas necesarias. (TLC en Costa Rica).</li>
            <li>Algunos aseguran perder soberanía nacional.</li>
            <li>Pone en riesgo la identidad nacional.</li>
            <li>Concentración del capital en grandes multinacionales.</li>
            <li>La fuga de empresas nacionales a países donde los costes de producción son más bajos.</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">Fenómenos de la Globalización</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-semibold mb-2">Fenómeno Económico</h4>
              <ul className="list-disc pl-5 mb-4">
                <li>Reconfigura la forma de abordar los procesos de producción, distribución y consumo de bienes y servicios en el mundo.</li>
                <li>Costa Rica transforma su actividad económica principal.</li>
                <li>Nuevas formas de generar dinero, nuevos modelos de negocios.</li>
                <li>La estabilidad macroeconómica para crear condiciones que favorezcan la inversión y el ahorro.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Fenómeno Político</h4>
              <ul className="list-disc pl-5 mb-4">
                <li>La aplicación de políticas de apertura al exterior.</li>
                <li>Países considerados entre los más pobres en los años 60's, han aumentado su dinamismo económico y con ello fortalecido sus procesos de democratización.</li>
                <li>Otros países americanos o africanos aplicaron políticas hacia el sector interno, resultando en una economía estancada/deteriorada, aumento de la pobreza y una alta inflación.</li>
                <li>Reformas estructurales que estimulan la competencia dentro de cada país.</li>
                <li>Instituciones sólidas y una administración eficaz.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-xl font-semibold mb-2">Fenómeno Tecnológico</h4>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-4">
                <ul className="list-disc pl-5 mb-4">
                  <li>Internet: Principal desarrollo tecnológico que ha cambiado al mundo.</li>
                  <li>Ha sido una herramienta efectiva en el proceso de globalización: acercando clientes con empresas, mejorando la comunicación y la educación (fuente infinita de conocimiento).</li>
                  <li>Permite conocer el entorno, los gustos y preferencias de los clientes y potenciales clientes (El conocimiento es poder).</li>
                </ul>
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0">
                <Image
                  src="/img/fenomeno.jpeg"
                  alt="Fenómeno Tecnológico"
                  width={400}
                  height={250}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-2 mt-6">Fenómeno Social</h4>
          <ul className="list-disc pl-5 mb-4">
            <li>El reto es lograr avance en cuestiones tales como el medio ambiente y las condiciones de trabajo.</li>
            <li>Centrarse en educación, capacitación, investigación y desarrollo para estimular la productividad.</li>
            <li>Está en riesgo la exclusión social de personas que no encajan en este nuevo modelo económico.</li>
            <li>Nace la sociedad del conocimiento, en donde los grandes volúmenes de información juegan un papel fundamental.</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">La Globalización y el COVID-19</h3>
          <p className="mb-4">¿Se está fortaleciendo o se está derrumbando la globalización?</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Relaciones políticas destruidas.</li>
            <li>Aunque cada país domine la pandemia, su economía depende de que otras se superen.</li>
            <li>La producción está descentralizada, las empresas pueden producir donde les salga más barato.</li>
            <li>COVID-19 supone un desafío para la globalización como la conocemos: REINVENTARNOS.</li>
            <li>Irónicamente, una pandemia, que es por definición un fenómeno global, estaría forzando el retroceso de la globalización.</li>
          </ul>
        </Section>

        <Section
          title="Economía Digital"
          icon={<BookOpen className="w-6 h-6" />}
          expanded={expandedSections['digitalEconomy']}
          onToggle={() => toggleSection('digitalEconomy')}
        >
          <h3 className="text-2xl font-semibold mb-4">Conceptos Básicos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-xl font-semibold mb-2">Economía</h4>
              <p className="mb-4">
                Sistema de producción, distribución, comercio y consumo de bienes y servicios de una sociedad o de un país.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Actividad Económica</h4>
              <p className="mb-4">
                Cualquier actividad laboral donde se generan e intercambian productos, bienes o servicios para cubrir las necesidades de las poblaciones.
              </p>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-2">Oferta y Demanda</h4>
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="md:w-1/2 md:pr-4">
              <ul className="list-disc pl-5 mb-4">
                <li>Son las dos fuerzas que rigen el mercado.</li>
                <li>Determinan la cantidad y el precio al que se vende.</li>
                <li>Demanda: Cantidad de bienes o servicios que los consumidores están dispuestos a adquirir.</li>
                <li>Oferta: Cantidad de bienes o servicios que pueden venderse en un momento determinado.</li>
                <li>Si hay mucha demanda y poca oferta, el precio tiende a subir.</li>
                <li>Si hay mucha oferta y poca demanda, el precio tiende a bajar.</li>
              </ul>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <Image
                src="/img/oderta.jpg"
                alt="Oferta y Demanda"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">¿Qué es Economía Digital?</h3>
          <p className="mb-4">
            Es un mercado de valores que se caracteriza por el uso intensivo de internet aplicado a los negocios. También hace referencia a una realidad empresarial en donde no se poseen activos físicos relevantes y sus acciones se cotizan y valoran en función de parámetros intangibles como:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>El conocimiento</li>
            <li>La información</li>
            <li>La innovación</li>
            <li>El talento aplicado en la creación, producción, mercadeo y distribución de bienes y servicios que implican el uso de alta tecnología</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">Creación de valor en la nueva economía</h3>
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="md:w-1/2 md:pr-4">
              <ul className="list-disc pl-5 mb-4">
                <li>El mundo está cambiando</li>
                <li>Pasamos de una sociedad industrial a una dominada por la información</li>
                <li>A raíz de eso nacen nuevos modelos de negocios y surge la "nueva economía"</li>
                <li>Formas de hacer negocios electrónicos</li>
                <li>Re-concebir la oferta y la demanda</li>
                <li>Conquistar o ampliar mercados en un entorno que impone nuevos retos, introducir perspectivas, conceptos y modos de actuar.</li>
              </ul>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <Image
                src="/img/Economia.jpg"
                alt="Creación de valor en la nueva economía"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Factores que impulsaron el surgimiento</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Globalización de mercados
              <ul className="list-disc pl-5">
                <li>Elimina de Fronteras</li>
                <li>Descentraliza operaciones</li>
              </ul>
            </li>
            <li>Poder del Cliente
              <ul className="list-disc pl-5">
                <li>Consumo personalizado</li>
              </ul>
            </li>
            <li>Desarrollo y convergencia de tecnología</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">¿Cómo surge?</h3>
          <ol className="list-decimal pl-5 mb-4">
            <li>Creación de la computadora</li>
            <li>Nace el internet en los 80's y 90's</li>
            <li>Las empresas empezaron a crear sus sitios web</li>
            <li>Surgen los primeros catálogos online</li>
            <li>Soluciones E-commerce que permiten comprar en línea</li>
            <li>Empresas deben garantizar que las operaciones electrónicas son seguras</li>
            <li>Integración de sistemas E-commerce con sistemas transaccionales de la empresa</li>
            <li>El cliente (nuevas generaciones) exige hacer todo de manera electrónica</li>
          </ol>

          <h3 className="text-2xl font-semibold mb-4">Modelos de Negocios</h3>
          <h4 className="text-xl font-semibold mb-2">¿Qué es un modelo de negocio?</h4>
          <ul className="list-disc pl-5 mb-4">
            <li>Va más allá de la manera en que una empresa genera dinero</li>
            <li>Se centra en las necesidades de los posibles clientes</li>
            <li>Recoge las bases de creación de valor de un negocio o proyecto</li>
            <li>Es un plano o croquis que representa las bases de un negocio</li>
            <li>Herramienta para testear y validar modelos negocios</li>
          </ul>
          <p className="mb-4 italic">
            "Un modelo de negocio es la manera que una empresa o persona crea, entrega y captura valor para el cliente" - Alex Osterwalder
          </p>

          <h4 className="text-xl font-semibold mb-2">Modelo de Negocio vs. Estrategia</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h5 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Modelo de Negocio</h5>
              <p>Actividades que una empresa debe realizar para obtener ganancias</p>
              <ul className="list-disc pl-5 mt-2">
                <li>¿Cómo vamos a ganar dinero?</li>
                <li>¿Qué costos tendremos?</li>
                <li>¿Cómo haremos rentable a la empresa?</li>
                <li>¿De dónde proveerán nuestros ingresos?</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h5 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Estrategia</h5>
              <p>Conjunto de decisiones integradas que indican cómo se logrará un desempeño superior frente a la competencia</p>
              <ul className="list-disc pl-5 mt-2">
                <li>¿Cómo podemos ganar más dinero que nuestros competidores?</li>
                <li>¿Cómo podemos generar rendimientos superiores a nuestra industria?</li>
                <li>¿Cómo podemos sostener esa ventaja a lo largo del tiempo?</li>
              </ul>
            </div>
          </div>
          <p className="mb-4">
            Mientras que un modelo de negocio se enfoca en cómo una empresa crea y captura valor a través de su operación diaria, la estrategia se refiere a la dirección y las decisiones de alto nivel que guían a la empresa hacia el logro de sus objetivos a largo plazo. Una estrategia sólida a menudo se basa en un modelo de negocio efectivo.
          </p>

          <h4 className="text-xl font-semibold mb-2">Canvas de Modelo de Negocio</h4>
          <p className="mb-4">
            Es una herramienta visual que permite describir, diseñar, desafiar e innovar en modelos de negocio de manera clara y concisa. Consiste en un lienzo dividido en nueve bloques o componentes clave que representan los aspectos fundamentales de un modelo de negocio.
          </p>

          <h4 className="text-xl font-semibold mb-2">Rol del Internet</h4>
          <p className="mb-4">
            La evolución del ecosistema digital ha permitido la creación de innumerables negocios a nivel mundial. Muchos emprendedores han logrado el éxito a través de modelos de negocio que serían impensables sin la democratización de Internet.
          </p>
        </Section>

        <Section
          title="Aplicaciones Móviles"
          icon={<Smartphone className="w-6 h-6" />}
          expanded={expandedSections['mobileApps']}
          onToggle={() => toggleSection('mobileApps')}
        >
          <h3 className="text-2xl font-semibold mb-4">¿Qué es una app?</h3>
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="md:w-1/2 md:pr-4">
              <p className="mb-4">
                Una aplicación móvil consiste en un software que funciona en un dispositivo móvil (teléfonos y tabletas) y ejecuta ciertas tareas para el usuario.
              </p>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <Image
                src="/img/aplicaciones.jpg"
                alt="Aplicación Móvil"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Origen</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Primera aplicación móvil surge a partir de finales de los 90's</li>
            <li>¿Cuáles eran?
              <ul className="list-disc pl-5">
                <li>Agendas</li>
                <li>Arcades game</li>
                <li>Editores de ringtone</li>
              </ul>
            </li>
            <li>Diseño muy simple</li>
            <li>Sin acceso a internet</li>
            <li>Preinstaladas en el dispositivo</li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-xl font-semibold mb-2">Apple apps</h4>
              <ul className="list-disc pl-5 mb-4">
                <li>Aparece en el 2007 el iPhone de Apple</li>
                <li>Un teléfono con una plataforma para correr aplicaciones</li>
                <li>Intuitivo, potente, táctil y siempre online</li>
                <li>Con un proceso definido y homogéneo de desarrollo para su sistema operativo: iOS</li>
                <li>Ayuda a sacar el máximo potencial de las capacidades técnicas del teléfono, mejorando la experiencia del usuario</li>
                <li>Permite a desarrolladores y empresas externas ofrecerlas en su app store</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Android apps</h4>
              <ul className="list-disc pl-5 mb-4">
                <li>2007: Android fue presentado para avanzar en los estándares abiertos de los dispositivos móviles</li>
                <li>HTC Dream, primer móvil vendido con Android, octubre 2008</li>
                <li>Adopta el mismo concepto de mercado de aplicaciones</li>
                <li>Aparece la tienda de aplicaciones que empezó con 50 aplicaciones</li>
                <li>Ventaja: Cualquier fabricante de teléfonos puede escoger libremente Android como SO</li>
                <li>Google se ha convertido en principal competidor de Apple</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Características de una app móvil</h3>
          <ul className="list-disc pl-5 mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            <li>Integración con redes sociales</li>
            <li>Funciones de búsqueda</li>
            <li>Permitir comentarios de usuarios</li>
            <li>Diseño simple y adaptado para diferentes dispositivos y tamaños de pantallas</li>
            <li>Capacidad para trabajar offline</li>
            <li>Interoperabilidad</li>
            <li>Analítica</li>
            <li>Opciones de Personalización</li>
            <li>Actualización periódica de la App</li>
            <li>Disponible en Android y iOS</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">Impacto de las aplicaciones móviles</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Aumento de consumo de aplicaciones que satisfacen necesidades, gracias al entorno de compra y potentes funcionalidades</li>
            <li>Las tablets, con sus pantallas más grandes, contribuyen a que se consuman app con funcionalidades potenciadas</li>
            <li>El consumo de Internet vía móvil y de aplicaciones ha sido propiciado por:
              <ul className="list-disc pl-5">
                <li>La disminución de precios de las tarifas planas de navegación por parte de las operadoras.</li>
                <li>La promoción de planes que incluyen datos</li>
                <li>Una mayor gama de smartphones en el mercado</li>
              </ul>
            </li>
            <li>El mundo del marketing no es ajeno a este fenómeno y muchos anunciantes ya lo están aprovechando para conseguir sus objetivos.</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">Categorías de las Apps</h3>
          <h4 className="text-xl font-semibold mb-2">Según el entorno en el que se ejecutan</h4>
          <ul className="list-disc pl-5 mb-4">
            <li>Funcionamiento de la app en sistemas operativos móviles nativos como:
              <ul className="list-disc pl-5">
                <li>Apple iOS</li>
                <li>Google Android</li>
                <li>Windows Mobile</li>
                <li>Blackberry OS</li>
              </ul>
            </li>
            <li>Estos entornos llegan habitualmente preinstalados en los terminales</li>
            <li>Funcionamiento de la aplicación en "web" móvil dando lugar a las Aplicaciones Web y ejecutándose desde el propio navegador del dispositivo</li>
            <li>Pueden ser instaladas en distintos sistemas operativos, aunque con un menor rendimiento y aprovechamiento de las capacidades técnicas en determinadas situaciones</li>
          </ul>

          <h4 className="text-xl font-semibold mb-2">Con Base a las Funcionalidades</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <CategoryCard title="Comunicaciones" items={['Clientes de redes sociales', 'Mensajería instantánea', 'Clientes de email', 'Navegadores web', 'Servicios de noticias']} />
            <CategoryCard title="Juegos" items={['Cartas o de casino', 'Puzle o estrategia', 'Acción o aventura', 'Deportes', 'Deportes de Ocio']} />
            <CategoryCard title="Multimedia" items={['Visores de gráficos o imágenes', 'Visores de presentaciones', 'Reproductores de vídeo', 'Reproductores de audio', 'Reproductores de streaming']} />
            <CategoryCard title="Productividad" items={['Calendarios', 'Calculadoras', 'Notas, recordatorios o procesadores de textos', 'Hojas de cálculo', 'Servicios de directorio', 'Bancos o finanzas']} />
            <CategoryCard title="Viajes" items={['Guías de ciudades', 'Convertidores de moneda', 'Traductores', 'Mapas / GPS', 'Itinerarios programados', 'Previsión meteorológica']} />
            <CategoryCard title="Compras" items={['Clientes de tiendas web', 'Subastas', 'Cupones de descuento', 'Lista de la compra']} />
            <CategoryCard title="Entretenimiento" items={['Lectores de libros', 'Horóscopos', 'Recetas', 'Cómics']} />
            <CategoryCard title="Bienestar" items={['Seguimiento de dietas', 'Primeros auxilios', 'Consejos al embarazo', 'Entrenamiento personal', 'Guías de salud']} />
          </div>

          <h3 className="text-2xl font-semibold mb-4">Capacidades del hardware</h3>
          <p className="mb-4">
            Las capacidades del hardware han permitido la creación de app con funciones impensables:
          </p>
          <ul className="list-disc pl-5 mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            <li>La incorporación de GPS, brújula digital y cámaras de alta capacidad</li>
            <li>Grabación en vídeo HD</li>
            <li>Giroscopio y acelerómetro que al girar la pantalla habilita funciones especiales</li>
            <li>Sensores de proximidad e incluso de luz ambiental</li>
            <li>Aumento de la memoria que permite ejecutar varias aplicaciones a la vez</li>
            <li>Alta resolución, soporte de gráficos 3D y pantallas de nueva generación</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">Ecosistemas</h3>
          <p className="mb-4">
            Se tiene un ecosistema móvil, donde la tecnología está al servicio de las marcas. Permite llegar a una audiencia global, mediante las tiendas de app.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Beneficios de las Aplicaciones</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Las aplicaciones aprovechan al máximo de las capacidades de los terminales móviles</li>
            <li>Pueden funcionar con baja o nula conectividad a Internet</li>
            <li>Se puede acceder a todas las funcionalidades de hardware de un dispositivo:
              <ul className="list-disc pl-5">
                <li>Recepción de notificaciones personalizadas</li>
                <li>El uso de la cámara para tomar fotos y vídeo</li>
                <li>La utilización de la geolocalización mediante GPS</li>
                <li>Aprovechar las opciones multitáctiles de las pantallas</li>
              </ul>
            </li>
            <li>Los usuarios obtienen más beneficios de sus celulares</li>
            <li>Les proporciona facilidad de acceso al contenido</li>
            <li>Almacenamiento seguro de datos personales</li>
            <li>Permite efectuar compras inmediatas, en cualquier lugar</li>
            <li>A las Marcas:
              <ul className="list-disc pl-5">
                <li>Permite ganar presencia, misma que tienen en nuevos canales como las tiendas de apps</li>
                <li>Posibilidad de establecer comunicación con sus clientes, mediante notificaciones push</li>
                <li>Canal de venta directa e inmediata 24/7</li>
              </ul>
            </li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">Objetivos de las aplicaciones</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Notoriedad e imagen de marca: Impactar eficazmente al público objetivo generando notoriedad y una imagen positiva de marca</li>
            <li>Fidelización de usuarios/clientes: Canal de comunicación permanente y personalizado entre marca y usuario</li>
            <li>App como herramienta de gestión: App especializadas para empresas para seguimiento de procesos de trabajo</li>
            <li>App como herramienta y canal de venta (mobile commerce): Son medio para crear hábitos de compra y provocar la venta de los bienes o servicios de una empresa</li>
            <li>App generadoras de ingresos: Apps exitosas generan ingresos directos a sus desarrolladores mediante: espacios publicitarios en una app que se distribuye gratuitamente y por la venta de la app en sí</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">Proceso de Desarrollo de Apps</h3>
          <ol className="list-decimal pl-5 mb-4">
            <li><strong>Conceptualización:</strong> El resultado de esta etapa es una idea de aplicación. Tiene en cuenta las necesidades y problemas de los usuarios. La idea responde a una investigación preliminar y a la posterior comprobación de la viabilidad del concepto.</li>
            <li><strong>Definición:</strong> Se describe con detalle a los usuarios para quienes se diseñará la aplicación. Se sientan las bases de la funcionalidad, lo cual determinará el alcance del proyecto y la complejidad de diseño y programación de la app.</li>
            <li><strong>Diseño:</strong> Se llevan a un plano tangible los conceptos y definiciones anteriores. Primero en forma de wireframes, que permiten crear los primeros prototipos para ser probados con usuarios, y posteriormente, en un diseño visual acabado que será provisto al desarrollador, en forma de archivos separados y pantallas modelo, para la programación del código.</li>
            <li><strong>Desarrollo:</strong> El programador le da vida a los diseños. Se crea la estructura sobre la cual se apoyará el funcionamiento de la aplicación. A partir de la versión inicial, se dedica a la corrección de errores funcionales para asegurar el correcto desempeño de la app. La prepara para su aprobación en las tiendas.</li>
            <li><strong>Publicación:</strong> La aplicación es puesta a disposición de los usuarios en las tiendas. Se realiza un seguimiento a través de analíticas, estadísticas y comentarios de usuarios, para evaluar el comportamiento y desempeño de la app, corregir errores, realizar mejoras y actualizarla en futuras versiones.</li>
          </ol>
        </Section>

        <Section
          title="Computación en la Nube"
          icon={<Cloud className="w-6 h-6" />}
          expanded={expandedSections['cloudComputing']}
          onToggle={() => toggleSection('cloudComputing')}
        >
          <h3 className="text-2xl font-semibold mb-4">¿Qué es computación en la nube?</h3>
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="md:w-1/2 md:pr-4">
              <p className="mb-4">
                Es el resultado natural de la evolución de una serie de tecnologías que han llevado a alterar la manera en la que las organizaciones de hoy (y de mañana) conceptualizan y construyen su infraestructura de TI.
              </p>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <Image
                src="/img/Nube.jpg"
                alt="Computación en la Nube"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">¿Cómo funciona la computación en la nube?</h3>
          <p className="mb-4">
            La computación en la nube permite acceder a servicios de almacenamiento, procesamiento y aplicaciones a través de Internet, usando servidores remotos en lugar de infraestructura propia. Ofrece acceso remoto, escalabilidad (aumentar o reducir recursos según demanda), y pago por uso, solo pagando por los recursos utilizados.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Tareas diarias que son posibles gracias a la nube</h3>
          <ul className="list-disc pl-5 mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            <li>Enviar un correo electrónico</li>
            <li>Usar la banca en línea</li>
            <li>Almacenar o crear copias de seguridad de archivos</li>
            <li>Utilizar las redes sociales</li>
            <li>Comprar por Internet</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">Beneficios de la Nube</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Costos de inversión iniciales son mucho más bajos: Debido a que no es necesario invertir en infraestructura</li>
            <li>Los recursos que se puede contratar son "ilimitados": Siempre se puede acceder a más espacio de almacenamiento, mayor poder de procesamiento o aplicaciones más robustas</li>
            <li>Escalabilidad y crecimiento: Le permite a las empresas ajustar la infraestructura según su necesidad y capacidad financiera. Manejar el crecimiento continuo de trabajo de manera fluida</li>
            <li>Cero mantenimiento: Toda la infraestructura está a cargo de un tercero. Las áreas de TI se centran en funciones más operativas, en lugar de largos procesos de mantenimiento y actualización</li>
            <li>Seguridad: Los proveedores cuentan con los sistemas más robustos de seguridad disponibles en el mercado. De esta forma se evitan cualquier tipo de ciberataques</li>
            <li>Seguridad de la información: al tener la información alojada en servidores de proveedores con amplia infraestructura, los procesos de respaldo de información (backup) son constantes por lo que es prácticamente imposible que haya pérdida de información</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">Tipos de Nubes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <CloudTypeCard
              title="Privada"
              description="Ofrecen servicios informáticos a través de una red interna privada, exclusiva a algunos usuarios y no disponible al público general. Es también conocida como nube interna o corporativa."
              advantages={[
                "Aporta gran parte de las ventajas de la nube pública, pero con el control y la disponibilidad del recurso de infraestructura local",
                "Ofrecen un nivel más alto de seguridad y privacidad con firewalls de la compañía y hospedaje interno",
                "Los recursos no se comparten con otros"
              ]}
              disadvantages={[
                "El departamento de TI de la compañía es responsable de la administración de la nube privada y el costo que conlleva",
                "Requieren el mismo gasto de personal, administración y mantenimiento que los centros de datos tradicionales"
              ]}
            />
            <CloudTypeCard
              title="Pública"
              description="Servicios informáticos que son ofrecidos por proveedores externos a través del internet, por lo tanto, están disponibles a todo el mundo. Los servicios en la nube pública pueden ser gratuitos u ofrecidos bajo el modelo de pago por uso."
              advantages={[
                "Configuración fácil y económica, porque el proveedor cubre los costos de hardware, aplicaciones y ancho de banda",
                "Escalabilidad para satisfacer las necesidades",
                "No desperdicia recursos porque paga por lo que usa",
                "Se pueden implementar con más rapidez que las infraestructuras locales"
              ]}
              disadvantages={[
                "Ha surgido cierta preocupación en cuanto a la seguridad de los entornos de nube pública, eso depende de una buena implementación"
              ]}
            />
            <CloudTypeCard
              title="Híbrida"
              description="Combina ambas características, lo cual permite una dinámica entre nubes, dependiendo de las necesidades y los costos con los que se cuente. Esta solución es la más flexible de todas. Lo mejor de ambos mundos."
              advantages={[
                "Control: la empresa puede mantener una infraestructura privada para los recursos confidenciales",
                "Flexibilidad: puede aprovechar los recursos adicionales de la nube pública cuando los necesite",
                "Rentabilidad: gracias a la posibilidad de escalar a la nube pública, solo pagará por la capacidad informática adicional cuando sea necesaria",
                "Facilidad: realizar la transición a la nube no tiene por qué ser compleja, se trasladan cargas de trabajo en etapas"
              ]}
              disadvantages={[]}
            />
          </div>

          <h3 className="text-2xl font-semibold mb-4">Modelos de Servicio</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceModelCard
              title="IaaS (Infraestructura como Servicio)"
              description="Es una infraestructura informática aprovisionada y administrada a través de internet"
              features={[
                "Aumenta y disminuye rápidamente por demanda",
                "Evita gastos y costos de administración de plataformas físicas",
                "El proveedor del servicio en la nube administra la infraestructura, mientras la empresa se dedica a la compra, instalación, configuración y administración del software (SO, middleware, etc)"
              ]}
            />
            <ServiceModelCard
              title="PaaS (Plataforma como Servicio)"
              description="Es un entorno de desarrollo e implementación completo en la nube"
              features={[
                "Incluye infraestructura (servidores, almacenamiento y redes), middleware, herramientas de desarrollo, servicios de inteligencia empresarial (BI), sistemas de administración de bases de datos, etc",
                "PaaS está diseñado para sustentar el ciclo de vida completo de las aplicaciones web: compilación, pruebas, implementación, administración y actualización"
              ]}
            />
            <ServiceModelCard
              title="SaaS (Software como Servicio)"
              description="Permite a los usuarios conectarse a aplicaciones basadas en la nube a través de Internet y usarlas"
              features={[
                "App de uso personal: el correo electrónico, los calendarios y las herramientas ofimáticas",
                "App de productividad: CRM, ERP, administración de documentos",
                "Modelo de pago por uso",
                "Toda la infraestructura subyacente: el middleware, el software y los datos de las aplicaciones se encuentran en el centro de datos del proveedor"
              ]}
            />
          </div>
        </Section>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, expanded, onToggle, children }) => {
  return (
    <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left font-bold text-lg flex justify-between items-center focus:outline-none bg-indigo-50 dark:bg-indigo-900"
        onClick={onToggle}
      >
        <span className="flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform ${expanded ? 'transform rotate-180' : ''}`} />
      </button>
      {expanded && <div className="px-6 py-4">{children}</div>}
    </div>
  );
};

interface CategoryCardProps {
  title: string;
  items: string[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, items }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h5 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">{title}</h5>
      <ul className="list-disc pl-5">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

interface CloudTypeCardProps {
  title: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
}

const CloudTypeCard: React.FC<CloudTypeCardProps> = ({ title, description, advantages, disadvantages }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h4 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">{title}</h4>
      <p className="mb-4">{description}</p>
      <h5 className="font-semibold mb-2">Ventajas</h5>
      <ul className="list-disc pl-5 mb-4">
        {advantages.map((advantage, index) => (
          <li key={index}>{advantage}</li>
        ))}
      </ul>
      {disadvantages.length > 0 && (
        <>
          <h5 className="font-semibold mb-2">Desventajas</h5>
          <ul className="list-disc pl-5">
            {disadvantages.map((disadvantage, index) => (
              <li key={index}>{disadvantage}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

interface ServiceModelCardProps {
  title: string;
  description: string;
  features: string[];
}

const ServiceModelCard: React.FC<ServiceModelCardProps> = ({ title, description, features }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h4 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">{title}</h4>
      <p className="mb-4">{description}</p>
      <ul className="list-disc pl-5">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default WikiPage;