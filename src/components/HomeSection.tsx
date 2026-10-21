import React, { useState, useEffect, useRef } from 'react';
import { ActiveTab, Product } from '../types';
import { COMPANY_INFO, OFFICIAL_CATEGORIES } from '../data/products';
import { useDemoStore } from '../context/DemoStoreContext';
import { MidasLogo } from './MidasLogo';
import {
  ArrowRight,
  ShieldCheck,
  Gem,
  Hammer,
  Award,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (tab: ActiveTab) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const HERO_SLIDES = [
    {
      id: 'slide-1',
      image: '/assets/images/hero_damascene_gold_1791902042124.jpg',
      badge: 'Toledo, España · Cuna Imperial del Damasquinado',
      titlePrefix: 'El Renacer del',
      titleHighlight: 'Damasquinado',
      titleSuffix: 'de Toledo',
      description:
        'Oro puro de 24 quilates amarillo y 18 quilates verde embutido a mano sobre acero noble pavonado al fuego. La joya imperial toledana reinterpretada con la más refinada distinción.',
      primaryBtnText: 'Comprar en la Tienda Online',
      primaryBtnTab: 'tienda' as ActiveTab,
      secondaryBtnText: 'Ver Catálogo Completo',
      secondaryBtnTab: 'catalogo' as ActiveTab,
      navLabel: 'Alta Joyería',
    },
    {
      id: 'slide-2',
      image: '/assets/images/midas_artisan_workshop_1791902044234.jpg',
      badge: 'Taller Artesano · Tradición Gremial desde el Siglo VIII',
      titlePrefix: 'El Alma y Oficio de',
      titleHighlight: 'Maestros',
      titleSuffix: 'Damascadores',
      description:
        'Cada filamento de oro fino es embutido a golpe de buril y martillo. Sin adhesivos químicos ni procesos industriales: artesanía toledana pura con un mínimo de 4 micras garantizadas.',
      primaryBtnText: 'Conocer la Historia & Técnica',
      primaryBtnTab: 'midas' as ActiveTab,
      secondaryBtnText: 'Concertar Visita al Taller',
      secondaryBtnTab: 'contacto' as ActiveTab,
      navLabel: 'Taller en Toledo',
    },
    {
      id: 'slide-3',
      image: '/assets/images/jewelry_necklace_earrings_1791902044385.jpg',
      badge: 'Alta Joyería Femenina · Colección Renacimiento',
      titlePrefix: 'Flores, Aves del Paraíso y',
      titleHighlight: 'Elegancia',
      titleSuffix: 'Eterna',
      description:
        'Gargantillas, colgantes en lágrima y pendientes labrados en relieve con oro fino de 24K. Diseños renacentistas que contrastan con la noble sobriedad del acero azabache.',
      primaryBtnText: 'Explorar Joyería Mujer',
      primaryBtnTab: 'tienda' as ActiveTab,
      secondaryBtnText: 'Lookbook de Colección',
      secondaryBtnTab: 'catalogo' as ActiveTab,
      navLabel: 'Colección Mujer',
    },
    {
      id: 'slide-4',
      image: '/assets/images/mens_cufflinks_zippo_1791902044581.jpg',
      badge: 'Colección Caballero · Distinción y Coleccionismo',
      titlePrefix: 'Zippos Oficiales, Gemelos y',
      titleHighlight: 'Nobleza',
      titleSuffix: 'Masculina',
      description:
        'Encendedores Zippo genuinos personalizados con placas damasquinadas y gemelos de estrella mudéjar toledana con oro puro de 24 quilates.',
      primaryBtnText: 'Ver Colección Caballero',
      primaryBtnTab: 'tienda' as ActiveTab,
      secondaryBtnText: 'Catálogo de Accesorios',
      secondaryBtnTab: 'catalogo' as ActiveTab,
      navLabel: 'Línea Caballero',
    },
    {
      id: 'slide-5',
      image: '/assets/images/decorative_damascene_plate_1791902080741.jpg',
      badge: 'Colección Hogar & Protocolo Institucional',
      titlePrefix: 'Platos Mudéjares, Abrecartas y',
      titleHighlight: 'Piezas de Arte',
      titleSuffix: 'Toledano',
      description:
        'Platos ceremoniales de 18 cm con rosetón mudéjar, abrecartas con empuñadura cincelada y arquetas de nogal forradas en terciopelo.',
      primaryBtnText: 'Ver Colección Hogar',
      primaryBtnTab: 'tienda' as ActiveTab,
      secondaryBtnText: 'Catálogo de Decoración',
      secondaryBtnTab: 'catalogo' as ActiveTab,
      navLabel: 'Hogar & Platos',
    },
  ];

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, HERO_SLIDES.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const { products } = useDemoStore();
  const featuredProducts = products.filter((p) => p.featured && p.published !== false).slice(0, 4);
  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <div className="space-y-32 pb-24">
      {/* Dynamic Hero Section with Smooth Changing Images */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-[#d4af37]/25 bg-[#08080a]">
        {/* Carousel Background Images (Crossfade with slow zoom) */}
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.navLabel}
                  className={`w-full h-full object-cover object-center filter brightness-[0.36] contrast-[1.12] transition-transform duration-[7000ms] ease-out ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                  referrerPolicy="no-referrer"
                />
              </div>
            );
          })}

          {/* Measured Dark Scrim & Radial Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/65 to-[#08080a]/50"></div>
          <div className="absolute inset-0 bg-radial from-transparent via-[#08080a]/40 to-[#08080a]/90"></div>
          {/* Subtle Ambient Gold Radial Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#d4af37]/10 blur-[140px] pointer-events-none rounded-full"></div>
        </div>

        {/* Top Spacer */}
        <div className="relative z-10 pt-8 sm:pt-12"></div>

        {/* Hero Central Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 text-center my-auto">
          {/* Official Royal Crown & Kicker */}
          <div className="inline-flex flex-col items-center mb-6">
            <MidasLogo size="sm" showSubtitle={false} className="mb-2 opacity-95" />
            <div className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.32em] text-[#e0c890] font-medium py-1 px-4 rounded-full bg-[#10121a]/60 border border-[#d4af37]/25 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_6px_rgba(212,175,55,0.8)]"></span>
              <span>{activeSlideData.badge}</span>
            </div>
          </div>

          {/* Display Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#fbf7ee] max-w-4xl mx-auto leading-[1.12] text-balance">
            {activeSlideData.titlePrefix}{' '}
            <span className="gold-text-gradient">{activeSlideData.titleHighlight}</span>{' '}
            {activeSlideData.titleSuffix}
          </h1>

          <p className="mt-8 text-base sm:text-lg text-[#ccc6b8] max-w-2xl mx-auto font-light leading-relaxed font-editorial italic text-lg sm:text-xl">
            "{activeSlideData.description}"
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate(activeSlideData.primaryBtnTab)}
              className="w-full sm:w-auto px-9 py-4 text-xs uppercase tracking-[0.2em] font-bold text-[#08080a] bg-gradient-to-r from-[#fae7b1] via-[#d4af37] to-[#ba9028] hover:brightness-110 active:scale-98 transition-all shadow-[0_4px_25px_rgba(212,175,55,0.45)] rounded-xs cursor-pointer whitespace-nowrap"
            >
              {activeSlideData.primaryBtnText}
            </button>
            <button
              onClick={() => onNavigate(activeSlideData.secondaryBtnTab)}
              className="w-full sm:w-auto px-9 py-4 text-xs uppercase tracking-[0.2em] font-medium text-[#f5ebd7] border border-[#d4af37]/45 hover:border-[#d4af37] hover:bg-[#d4af37]/15 bg-[#0e1017]/50 backdrop-blur-xs transition-all rounded-xs cursor-pointer whitespace-nowrap"
            >
              {activeSlideData.secondaryBtnText}
            </button>
          </div>
        </div>

        {/* Carousel Bottom Control Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-8 pt-4">
          <div className="border-t border-[#d4af37]/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Slide Navigation Strip */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto justify-center md:justify-start">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`group text-left px-3.5 py-2.5 rounded-xs border transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'border-[#d4af37] bg-[#161822] shadow-[0_0_18px_rgba(212,175,55,0.25)]'
                        : 'border-[#d4af37]/15 bg-[#0a0b10]/60 hover:border-[#d4af37]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-[#d4af37]' : 'text-[#7e796e]'}`}>
                        0{index + 1}
                      </span>
                      <span className={`text-[11px] uppercase tracking-wider ${isActive ? 'text-[#fbf6ec] font-semibold' : 'text-[#8e897e] group-hover:text-[#ede8dc]'}`}>
                        {slide.navLabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Chevrons & Play/Pause */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-xs bg-[#10121a] border border-[#d4af37]/25 text-[#bbb5a7] hover:text-[#f3e5ab] hover:border-[#d4af37] transition-all cursor-pointer"
                title={isPlaying ? 'Pausar rotación' : 'Reanudar rotación'}
                aria-label={isPlaying ? 'Pausar rotación' : 'Reanudar rotación'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#d4af37]" /> : <Play className="w-3.5 h-3.5 text-[#d4af37]" />}
              </button>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevSlide}
                  className="p-2.5 rounded-xs bg-[#10121a] border border-[#d4af37]/25 text-[#bbb5a7] hover:text-[#f3e5ab] hover:border-[#d4af37] transition-all cursor-pointer"
                  aria-label="Diapositiva anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="p-2.5 rounded-xs bg-[#10121a] border border-[#d4af37]/25 text-[#bbb5a7] hover:text-[#f3e5ab] hover:border-[#d4af37] transition-all cursor-pointer"
                  aria-label="Diapositiva siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Maison Quote Section */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-4 text-[#d4af37]/40 mb-4">
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/60"></span>
          <span className="text-[#d4af37] text-xs">◆</span>
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/60"></span>
        </div>
        <p className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-[#f7eed9] leading-relaxed font-light">
          «El damasquinado toledano no es sólo oro sobre acero; es la alquimia paciente donde el fuego, el buril y el alma artesana cincelan piezas destinadas a la eternidad.»
        </p>
        <div className="mt-4 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-[#d4af37]">
          <span>Midas Gold Toledo</span>
          <span className="text-[#d4af37]/40">·</span>
          <span className="text-[#a49984]">Maestros Damascadores desde el Siglo VIII</span>
        </div>
        <div className="flex items-center justify-center gap-4 text-[#d4af37]/40 mt-4">
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/60"></span>
          <span className="text-[#d4af37] text-xs">◆</span>
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/60"></span>
        </div>
      </section>

      {/* Las 4 Colecciones Oficiales de la Web Real de Midas Gold */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.28em] text-[#d4af37] font-semibold">
            Gamas de Creación Imperial
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#faf5eb]">
            Las Colecciones Oficiales de Midas Gold
          </h2>
          <p className="text-sm sm:text-base text-[#a8a192] font-light leading-relaxed">
            Cada pieza responde a una rigurosa selección de materiales nobles y técnicas de artesanía toledana transmitidas de generación en generación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {OFFICIAL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#0e0f16] border border-[#d4af37]/22 p-7 rounded-xs flex flex-col justify-between hover:border-[#d4af37]/60 hover:shadow-[0_12px_36px_-10px_rgba(212,175,55,0.2)] transition-all duration-300 group relative overflow-hidden"
            >
              {/* Subtle top corner gold shimmer accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#d4af37]/15 to-transparent pointer-events-none"></div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-[#d4af37] font-semibold mb-2.5 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#d4af37]"></span>
                  <span>Colección Oficial</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#fbf7ee] group-hover:text-[#d4af37] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#a0998b] mt-2.5 mb-5 leading-relaxed font-light">
                  {cat.description}
                </p>
                <ul className="space-y-2 text-xs text-[#8e887a] border-t border-[#d4af37]/15 pt-4">
                  {cat.items.map((subItem) => (
                    <li key={subItem} className="flex items-center gap-2">
                      <span className="text-[#d4af37] text-[10px]">✦</span>
                      <span>{subItem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-5 border-t border-[#d4af37]/15">
                <button
                  onClick={() => onNavigate('catalogo')}
                  className="w-full py-2.5 text-xs uppercase tracking-[0.16em] text-[#e0c890] hover:text-[#08080a] font-semibold border border-[#d4af37]/35 hover:border-[#d4af37] hover:bg-gradient-to-r hover:from-[#f5e1a4] hover:to-[#d4af37] rounded-xs transition-all cursor-pointer"
                >
                  Explorar {cat.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-[#d4af37]/15 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.28em] text-[#d4af37] font-semibold">
              Selección Exclusiva
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-[#faf5eb] mt-1.5">
              Piezas Singulares de Alta Joyería y Decoración
            </h2>
          </div>
          <button
            onClick={() => onNavigate('catalogo')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#e0c890] hover:text-[#fff] transition-colors cursor-pointer group"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#d4af37]" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#0e0f16] border border-[#d4af37]/20 rounded-xs overflow-hidden flex flex-col hover:border-[#d4af37]/55 hover:shadow-[0_14px_40px_-12px_rgba(212,175,55,0.22)] transition-all duration-400"
            >
              {/* Visual Container */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative aspect-square overflow-hidden cursor-pointer bg-[#141620]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f16] via-transparent to-transparent opacity-65"></div>
                {product.tag && (
                  <div className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 bg-[#08080a]/90 border border-[#d4af37]/40 text-[#f6eccd] font-semibold shadow-xs">
                    {product.tag}
                  </div>
                )}
                <div className="absolute bottom-2.5 right-2.5 text-[10px] font-mono text-[#d4af37] bg-[#08080a]/85 px-2.5 py-0.5 border border-[#d4af37]/25">
                  {product.styleLabel}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#938c7f] mb-1.5">
                    {product.categoryLabel} · {product.subCategory}
                  </div>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-display text-sm font-semibold text-[#f5ebd7] group-hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#a0998b] line-clamp-2 leading-relaxed font-light">
                    {product.shortDesc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#d4af37]/15 flex items-center justify-between">
                  <div>
                    <span className="font-display text-lg font-bold text-[#faf5eb] tabular-nums">
                      {product.price} €
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-xs text-[#736d61] line-through tabular-nums">
                        {product.originalPrice} €
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="text-xs uppercase tracking-[0.16em] text-[#d4af37] hover:text-[#ffffff] font-semibold border-b border-[#d4af37]/50 hover:border-[#d4af37] pb-0.5 cursor-pointer transition-colors"
                  >
                    Añadir +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workshop & Heritage Spotlight */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#0e0f16] border border-[#d4af37]/25 rounded-xs overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-stretch shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]">
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#d4af37] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
              <span>Sede Central en Toledo · Cuna Histórica</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#faf5eb] leading-tight">
              Donde el fuego y el oro desafían al tiempo
            </h2>
            <p className="text-sm sm:text-base text-[#bfb8a8] leading-relaxed font-light">
              En nuestras instalaciones de la Calle Río Jarama en Toledo, cada pieza de damasquinado nace del silencio concentrado del orfebre. No hay atajos mecánicos para embutir los hilos de oro de 24 quilates: sólo la presión exacta del buril y la templanza del fuego.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('midas')}
                className="px-7 py-3.5 text-xs uppercase tracking-[0.18em] font-bold text-[#08080a] bg-gradient-to-r from-[#fae7b1] via-[#d4af37] to-[#ba9028] hover:brightness-110 active:scale-98 transition-all shadow-[0_4px_20px_rgba(212,175,55,0.4)] rounded-xs cursor-pointer whitespace-nowrap text-center"
              >
                Conocer la Historia y Técnica
              </button>
              <button
                onClick={() => onNavigate('contacto')}
                className="px-7 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#fbf6ec] border border-[#d4af37]/40 hover:border-[#d4af37] hover:bg-[#d4af37]/15 transition-all rounded-xs cursor-pointer whitespace-nowrap text-center"
              >
                Concertar Visita al Taller
              </button>
            </div>
          </div>

          <div className="relative min-h-[360px] lg:min-h-full">
            <img
              src="/assets/images/midas_artisan_workshop_1791902044234.jpg"
              alt="Maestro damasquinador en el taller de Midas Gold Toledo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0e0f16] via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Official Toledo Warranty & Philosophy */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <div className="inline-block p-4 border border-[#d4af37]/35 text-[#d4af37] mb-2 bg-[#0e0f16] shadow-[0_0_20px_rgba(212,175,55,0.15)] rounded-xs">
          <ShieldCheck className="w-8 h-8 mx-auto" />
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#faf5eb]">
          Compromiso {COMPANY_INFO.legalName} & {COMPANY_INFO.name}
        </h3>
        <p className="text-sm sm:text-base text-[#a8a192] leading-relaxed max-w-2xl mx-auto font-light">
          "Tratamos a nuestros clientes con respeto y honestidad, ofreciendo productos de la más alta calidad y actuando siempre éticamente. Somos el motor para hacer llegar el arte del damasquinado toledano a todo el mundo."
        </p>
        <div className="pt-4 text-xs uppercase tracking-[0.22em] text-[#d4af37] font-medium">
          {COMPANY_INFO.address} · Garantía Oficial de Autenticidad Toledana
        </div>
      </section>
    </div>
  );
};
