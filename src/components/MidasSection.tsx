import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/products';
import { ActiveTab } from '../types';
import {
  Award,
  Hammer,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Globe2,
} from 'lucide-react';

import { MidasLogo } from './MidasLogo';

interface MidasSectionProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const MidasSection: React.FC<MidasSectionProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeStyleTab, setActiveStyleTab] = useState<'arabe' | 'renacimiento'>('arabe');

  const steps = [
    {
      step: '01',
      title: 'El Rayado o Picado del Acero',
      subtitle: 'Creación microscópica de estrías sobre acero al carbono',
      description:
        'Sobre la plancha de acero dulce forjado, el maestro damasquinador realiza miles de incisiones diagonales cruzadas utilizando una cuchilla de acero templado finamente afilada. Este picado genera micro-dientes casi invisibles al ojo humano, orientados a un ángulo exacto, que servirán como anclaje mecánico indestructible para las hebras de oro.',
      detail: 'Ángulo constante a 45º · Sin rebabas · Acero al carbono maleable',
    },
    {
      step: '02',
      title: 'El Embutido del Oro a Golpe de Buril',
      subtitle: 'Incrustación milimétrica de oro de 24K y 18K verde',
      description:
        'Con una maestría forjada durante años de aprendizaje, el artesano sostiene con la mano izquierda el hilo de oro fino de 24 quilates (y láminas de oro verde de 18 quilates), mientras con la derecha golpea rítmicamente con un pequeño martillo y punzón de acero. El oro, al ser más blando que el acero templado, penetra en las incisiones y queda atrapado mecánicamente de forma perpetua.',
      detail: 'Oro fino 24K (999‰) y 18K verde · Mínimo 4 micras garantizadas',
    },
    {
      step: '03',
      title: 'El Pavonado al Fuego',
      subtitle: 'Oxidación química controlada para lograr el negro azabache',
      description:
        'Una vez completado el dibujo, la pieza se sumerge en un baño químico especial a base de sales de sosa cáustica y nitrato de potasio a más de 140 ºC. El acero reacciona transformando su óxido superficial en magnetita negra, profunda y aterciopelada, mientras que el oro, metal noble inerte, permanece inmaculado brillando con todo su fulgor.',
      detail: 'Baño a >140 ºC · Tratamiento antioxidante perenne',
    },
    {
      step: '04',
      title: 'El Cincelado y Bruñido con Ágata',
      subtitle: 'Realce de matices, sombreado y pulido con piedra noble',
      description:
        'Con la pieza pavonada y fría, el maestro vuelve a empuñar el buril para cincelar sombreados, estrías florales o nervaduras de hojas sobre el oro. Para concluir, frota la superficie con una piedra dura de ágata fina pulida: este bruñido aplasta el oro, lo asienta firmemente y le confiere su brillo satinado inconfundible y eterno.',
      detail: 'Piedra de ágata natural · Acabado satinado imperial',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Header Banner with Official Midas Logo */}
      <section className="relative py-20 border-b border-[#d4af37]/20 bg-[#0e1015]">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-5">
          <div className="flex justify-center mb-2">
            <MidasLogo size="md" showSubtitle={false} />
          </div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#d4af37]">
            <span className="w-8 h-[1px] bg-[#d4af37]"></span>
            <span>Midas Gold · Toledo, España</span>
            <span className="w-8 h-[1px] bg-[#d4af37]"></span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-[#f5ebd7] leading-tight">
            Midas: Historia, Alma y Damasquinado de Toledo
          </h1>
          <p className="text-base sm:text-lg text-[#bbb5a7] max-w-3xl mx-auto font-light leading-relaxed">
            Continuamos la milenaria tradición del Damasquinado toledano. Fundada por <strong className="text-[#f3e5ab] font-medium">{COMPANY_INFO.legalName}</strong>, Midas Gold une el saber ancestral de los maestros orfebres con las tecnologías y exigencias de la alta joyería contemporánea.
          </p>
        </div>
      </section>

      {/* Real History from midasgold.es/midas */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
              El Arte Milenario en Toledo
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#f5ebd7] leading-tight">
              Introducido por los árabes en el siglo VIII en la Ciudad Imperial
            </h2>
            <div className="space-y-4 text-sm text-[#9c978b] leading-relaxed">
              <p>
                El arte del damasquinado fue introducido en Toledo por los árabes durante su invasión en el siglo VIII, contribuyendo de forma decisiva a la renombrada tradición metalúrgica y armera toledana. A lo largo de los siglos, Toledo se convirtió en crisol de civilizaciones donde la pericia de sus herreros y la delicadeza de sus orfebres forjaron una fama universal.
              </p>
              <p>
                <strong className="text-[#f3e5ab] font-medium">{COMPANY_INFO.name}</strong> nació para dar continuidad a este oficio legendario. Frente a las imitaciones químicas y las estampaciones industriales que desvirtúan la tradición, en nuestro taller garantizamos que cada producto se fabrica íntegramente en Toledo, con <strong className="text-[#ede8dc]">oro de 24 quilates amarillo y 18 quilates verde</strong>, asegurando un espesor mínimo de <strong className="text-[#ede8dc]">4 micras</strong>.
              </p>
              <p>
                Nuestra filosofía se basa en un compromiso inquebrantable: tratar a nuestros clientes con profundo respeto y honestidad, ofreciendo piezas de altísima calidad bajo una conducta rigurosamente ética, con la aspiración de ser el motor que dé a conocer el damasquinado toledano en todos los rincones del mundo.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('tienda')}
                className="px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#0b0c10] bg-[#d4af37] hover:bg-[#e4c35b] transition-all rounded-sm cursor-pointer whitespace-nowrap"
              >
                Comprar en Tienda
              </button>
              <button
                onClick={() => onNavigate('catalogo')}
                className="px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#f5ebd7] border border-[#d4af37]/35 hover:border-[#d4af37] transition-all rounded-sm cursor-pointer whitespace-nowrap"
              >
                Ver Catálogo Oficial
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-[#d4af37]/30 bg-[#12141a] shadow-2xl">
              <img
                src="/src/assets/images/midas_artisan_workshop_1791902044234.jpg"
                alt="Maestro damasquinador en el taller de Midas Gold Toledo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-4 p-4 bg-[#101217] border border-[#d4af37]/15 rounded-sm flex items-center justify-between text-xs text-[#8f8a7e]">
              <span className="text-[#d4af37] font-medium uppercase tracking-wider">
                Taller Oficial {COMPANY_INFO.legalName}
              </span>
              <span>C/ Río Jarama 132, Toledo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Los Dos Grandes Estilos Toledanos: Árabe vs Renacimiento (Real from midasgold.es) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
            Doble Tradición Artística
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f5ebd7]">
            Los Dos Estilos del Damasquinado de Toledo
          </h2>
          <p className="text-sm text-[#9c978b]">
            En Midas Gold cultivamos con igual reverencia las dos corrientes históricas que definen el arte toledano: la pureza geométrica árabe y la exuberancia renacentista.
          </p>
        </div>

        {/* Style Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-[#12141c] border border-[#d4af37]/20 rounded-sm">
            <button
              onClick={() => setActiveStyleTab('arabe')}
              className={`px-6 py-2.5 text-xs uppercase tracking-[0.16em] font-medium rounded-sm transition-colors cursor-pointer ${
                activeStyleTab === 'arabe'
                  ? 'bg-[#d4af37] text-[#0b0c10] font-semibold'
                  : 'text-[#8e897e] hover:text-[#ede8dc]'
              }`}
            >
              01. Estilo Árabe / Mudéjar (El Más Genuino)
            </button>
            <button
              onClick={() => setActiveStyleTab('renacimiento')}
              className={`px-6 py-2.5 text-xs uppercase tracking-[0.16em] font-medium rounded-sm transition-colors cursor-pointer ${
                activeStyleTab === 'renacimiento'
                  ? 'bg-[#d4af37] text-[#0b0c10] font-semibold'
                  : 'text-[#8e897e] hover:text-[#ede8dc]'
              }`}
            >
              02. Estilo Renacimiento (Flores & Aves)
            </button>
          </div>
        </div>

        {/* Style Detail Card */}
        {activeStyleTab === 'arabe' ? (
          <div className="bg-[#101217] border border-[#d4af37]/30 p-8 sm:p-12 rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-block px-3 py-1 bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#f3e5ab]">
                Estilo Árabe / Mudéjar · Tradición Original
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f5ebd7]">
                La Pureza Geométrica y las Lacerías Infinitas
              </h3>
              <p className="text-sm text-[#bbb5a7] leading-relaxed">
                Considerado por los historiadores y maestros orfebres como el estilo más característico y auténtico del damasquinado toledano. Hunde sus raíces en el arte andalusí y mudéjar que embelleció las mezquitas, sinagogas y alcázares de Toledo.
              </p>
              <div className="space-y-2 text-xs text-[#9c978b]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span><strong>Motivos predominantes:</strong> Estrellas de 8 y 12 puntas, tracerías continuas, arabescos y celosías geométricas.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span><strong>Simetría absoluta:</strong> Ningún filamento de oro se interrumpe; cada trazo se entrelaza en armonía matemática.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span><strong>Piezas icónicas:</strong> Platos mudéjares, medallones colgantes, gemelos hexagonales y pisacorbatas.</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 aspect-square bg-[#0b0c10] border border-[#d4af37]/20 rounded-sm overflow-hidden">
              <img
                src="/src/assets/images/hero_damascene_gold_1791902042124.jpg"
                alt="Damasquinado toledano estilo árabe con oro de 24K"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ) : (
          <div className="bg-[#101217] border border-[#d4af37]/30 p-8 sm:p-12 rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-block px-3 py-1 bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#f3e5ab]">
                Estilo Renacimiento · Siglos XVI - XVII
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f5ebd7]">
                Flores, Aves del Paraíso y Volutas Esculpidas
              </h3>
              <p className="text-sm text-[#bbb5a7] leading-relaxed">
                Durante el Renacimiento español, los orfebres toledanos comenzaron a incorporar motivos ornamentales occidentales a la técnica del damasquinado para dotar a las piezas de mayor plasticidad y libertad creativa. Fue la época dorada en la que se crearon los grandes arcones, cofres, joyeros y empuñaduras de espada de la corte imperial.
              </p>
              <div className="space-y-2 text-xs text-[#9c978b]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span><strong>Motivos predominantes:</strong> Flores de lis, pájaros del paraíso, hojas de acanto, volutas y guirnaldas.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span><strong>Bicolor de oro:</strong> Combinación de oro amarillo de 24 quilates y oro verde de 18 quilates para crear claroscuros.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span><strong>Piezas icónicas:</strong> Brazaletes anchos, pendientes en lágrima, abrecartas y cajas joyero de madera noble.</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 aspect-square bg-[#0b0c10] border border-[#d4af37]/20 rounded-sm overflow-hidden">
              <img
                src="/src/assets/images/damascene_bracelets_rings_1791902081179.jpg"
                alt="Damasquinado estilo renacimiento con flores y aves en oro de 24K"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}
      </section>

      {/* Los Cuatro Pasos del Damasquinado Toledano */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
            Técnica Ancestral Explicada
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f5ebd7]">
            Los Cuatro Pasos Manuales del Damasquinado de Toledo
          </h2>
          <p className="text-sm text-[#9c978b]">
            En Midas Gold no hay procesos industriales de electrodeposición ni fotograbados químicos: el oro se embuta a mano golpe a golpe.
          </p>
        </div>

        {/* Step selector tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {steps.map((item, index) => {
            const isSelected = activeStep === index;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(index)}
                className={`p-4 text-left border rounded-sm transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#d4af37] bg-[#1a1c24] shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                    : 'border-[#d4af37]/20 bg-[#0e1015] hover:border-[#d4af37]/40'
                }`}
              >
                <div className="font-display text-lg font-bold text-[#d4af37] mb-1">
                  {item.step}
                </div>
                <div className={`text-xs font-semibold ${isSelected ? 'text-[#f5ebd7]' : 'text-[#8e897e]'}`}>
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active step display */}
        <div className="bg-[#101217] border border-[#d4af37]/25 p-8 sm:p-12 rounded-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d4af37]/15 pb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                Fase {steps[activeStep].step} del Oficio
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f5ebd7] mt-1">
                {steps[activeStep].title}
              </h3>
              <p className="text-xs text-[#8e897e] mt-1">
                {steps[activeStep].subtitle}
              </p>
            </div>
            <div className="text-xs text-[#d4af37] bg-[#d4af37]/10 px-3.5 py-1.5 border border-[#d4af37]/30 rounded-sm self-start sm:self-auto font-medium">
              {steps[activeStep].detail}
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#bbb5a7] leading-relaxed">
            {steps[activeStep].description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#d4af37]/10 text-xs text-[#9c978b]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Sin adhesivos ni químicos
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Fijación puramente mecánica
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Belleza inalterable de por vida
            </div>
          </div>
        </div>
      </section>

      {/* European Union FEDER Project Information (Real from midasgold.es) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#0e1015] border border-[#d4af37]/30 p-8 sm:p-12 rounded-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#d4af37]/15 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                <Globe2 className="w-4 h-4" />
                <span>Unión Europea & Fondo Europeo de Desarrollo Regional (FEDER)</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f5ebd7]">
                Proyecto de Innovación Digital de {COMPANY_INFO.legalName}
              </h3>
            </div>
            <div className="text-xs px-3.5 py-1.5 border border-[#d4af37]/30 text-[#f3e5ab] bg-[#d4af37]/10 rounded-sm self-start md:self-auto">
              Una manera de hacer Europa
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#9c978b] leading-relaxed">
            <strong className="text-[#ede8dc]">{COMPANY_INFO.legalName}</strong> (titular de la marca comercial <strong className="text-[#f3e5ab]">{COMPANY_INFO.name}</strong>) ha sido beneficiaria del Fondo Europeo de Desarrollo Regional (FEDER), cuyo objetivo es potenciar la investigación, el desarrollo tecnológico y la innovación. Gracias a esta ayuda, se han implementado soluciones avanzadas de optimización web, presencia en redes sociales, soluciones de comercio electrónico y campañas de marketing para llevar el damasquinado toledano a los mercados globales con los más altos estándares tecnológicos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#d4af37]/10 text-xs text-[#8e897e]">
            <div className="space-y-1">
              <div className="text-[#ede8dc] font-semibold">Sede en Toledo:</div>
              <div>{COMPANY_INFO.address}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[#ede8dc] font-semibold">Teléfonos Oficiales:</div>
              <div>{COMPANY_INFO.phone1} / {COMPANY_INFO.phone2}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[#ede8dc] font-semibold">Correo de Contacto:</div>
              <div>{COMPANY_INFO.email}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
