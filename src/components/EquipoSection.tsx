import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Mail, Check, Copy, Sparkles, Building, Phone, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface EquipoSectionProps {
  onNavigate?: (tab: ActiveTab) => void;
}

interface TeamMember {
  name: string;
  role: string;
  email: string;
  quote: string;
  initials: string;
  specialty: string;
  badge: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'ENRIQUE FERNÁNDEZ',
    role: 'CEO Y FUNDADOR',
    email: 'enrique@dydtoledo.com',
    quote: 'Será un placer atenderle.',
    initials: 'EF',
    specialty: 'Dirección General · Tradición & Visión Artesana de Toledo',
    badge: 'Dirección General',
  },
  {
    name: 'PAOLA DE LA VARGA',
    role: 'COMERCIAL',
    email: 'comercial@dydtoledo.com',
    quote: 'Será un placer atenderle.',
    initials: 'PV',
    specialty: 'Atención al Cliente · Asesoramiento en Joyería & Damasquinado',
    badge: 'Atención & Ventas',
  },
  {
    name: 'MANUEL FERNÁNDEZ',
    role: 'DIRECTOR COMERCIAL',
    email: 'manuel@dydtoledo.com',
    quote: 'Será un placer atenderle.',
    initials: 'MF',
    specialty: 'Estrategia Comercial · Grandes Cuentas & Encargos Institucionales',
    badge: 'Dirección Comercial',
  },
];

export const EquipoSection: React.FC<EquipoSectionProps> = ({ onNavigate }) => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2500);
    });
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Header Banner */}
      <section className="relative py-20 border-b border-[#d4af37]/20 bg-[#0a0b10]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-[#d4af37]/9 blur-[130px] pointer-events-none rounded-full"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold py-1 px-4 rounded-full bg-[#12141d]/80 border border-[#d4af37]/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse"></span>
            DYD TOLEDO · MIDAS GOLD
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fbf7ee]">
            NUESTRO <span className="gold-text-gradient">EQUIPO</span>
          </h1>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-3"></div>
          <p className="text-base sm:text-lg text-[#c8c2b5] max-w-2xl mx-auto font-light font-editorial italic leading-relaxed">
            «Detrás de cada pieza de damasquinado toledano y de cada joya única hay un equipo humano comprometido con la excelencia artesana, la honradez y la atención personalizada a cada cliente.»
          </p>
        </div>
      </section>

      {/* Main Team Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
            Atención Directa & Personalizada
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf7ee]">
            Liderazgo y Pasión por el Damasquinado
          </h2>
          <p className="text-sm text-[#9c9588] leading-relaxed">
            Póngase en contacto directo con cualquiera de nuestros responsables. Estaremos encantados de asesorarle sobre nuestras colecciones de oro de 24K, encargos especiales o visitas privadas a nuestras instalaciones en Toledo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => {
            const isCopied = copiedEmail === member.email;

            return (
              <div
                key={member.name}
                className="group relative bg-[#0e0f16] border border-[#d4af37]/25 hover:border-[#d4af37]/60 rounded-xs p-8 sm:p-9 transition-all duration-300 hover:shadow-[0_12px_40px_-10px_rgba(212,175,55,0.22)] flex flex-col justify-between"
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                  <div className="absolute transform rotate-45 bg-gradient-to-r from-[#d4af37]/20 to-[#fae7b1]/30 w-16 h-2 -top-1 -right-6"></div>
                </div>

                <div>
                  {/* Avatar / Monogram Shield */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1a1c26] via-[#11131c] to-[#0a0b10] border-2 border-[#d4af37]/50 group-hover:border-[#d4af37] flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.18)] transition-all">
                        <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#fae7b1]">
                          {member.initials}
                        </span>
                      </div>
                      {/* Gold ring accent */}
                      <span className="absolute -inset-1 rounded-full border border-[#d4af37]/20 group-hover:border-[#d4af37]/40 pointer-events-none transition-all"></span>
                    </div>

                    <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 bg-[#141620] border border-[#d4af37]/30 text-[#e6d08c] font-semibold rounded-full">
                      {member.badge}
                    </span>
                  </div>

                  {/* Name and Role */}
                  <div className="space-y-2 mb-6">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#fbf7ee] group-hover:text-[#fae7b1] transition-colors">
                      {member.name}
                    </h3>
                    <div className="inline-block">
                      <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#d4af37]">
                        {member.role}
                      </p>
                      <div className="w-12 h-[1px] bg-[#d4af37]/40 mt-1"></div>
                    </div>
                  </div>

                  {/* Specialty */}
                  <p className="text-xs text-[#9c9588] mb-6 leading-relaxed">
                    {member.specialty}
                  </p>

                  {/* User specific quote */}
                  <div className="my-6 p-4 rounded-xs bg-[#12131c] border-l-2 border-[#d4af37] space-y-1">
                    <p className="font-editorial italic text-base sm:text-lg text-[#fae7b1]">
                      «{member.quote}»
                    </p>
                    <p className="text-[11px] text-[#7d776b] uppercase tracking-wider">
                      Compromiso de cercanía
                    </p>
                  </div>
                </div>

                {/* Email and Actions */}
                <div className="pt-6 border-t border-[#d4af37]/15 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#c8c2b5] bg-[#090a0f] p-3 rounded-xs border border-[#d4af37]/20">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                      <span className="font-mono text-xs text-[#e6d08c] truncate selection:bg-[#d4af37]/30">
                        {member.email}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyEmail(member.email)}
                      className="ml-2 text-[#9c9588] hover:text-[#fae7b1] transition-colors p-1"
                      title="Copiar email"
                      type="button"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <a
                    href={`mailto:${member.email}?subject=Consulta%20Midas%20Gold%20-%20Alta%20Joyería`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs uppercase tracking-[0.2em] font-bold text-[#08080a] bg-gradient-to-r from-[#fae7b1] via-[#d4af37] to-[#ba9527] hover:from-[#fff0c8] hover:via-[#e2be4c] hover:to-[#cb9f2a] transition-all duration-200 rounded-xs shadow-[0_4px_16px_rgba(212,175,55,0.25)]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#08080a]" />
                    <span>Contactar Directamente</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Contact & Maison Toledo Banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-xs border border-[#d4af37]/35 bg-gradient-to-r from-[#12141d] via-[#0e0f16] to-[#12141d] p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#d4af37]/8 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            <div className="lg:col-span-2 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                Sede Central y Showroom en Toledo
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf7ee]">
                ¿Desea una cita privada o un encargo institucional exclusivo?
              </h3>
              <p className="text-sm text-[#aba395] leading-relaxed max-w-2xl">
                Tanto Enrique Fernández, Paola de la Varga como Manuel Fernández le recibirán personalmente en nuestras instalaciones de Toledo o atenderán su consulta telefónica con la máxima discreción y detalle.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs text-[#c8c2b5]">
                <div className="flex items-center gap-2.5">
                  <Building className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>C/ Río Jarama, 132 · Toledo</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>+34 925 504 699</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Lunes a Viernes 8:00 - 15:00</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('contacto')}
                  className="w-full py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-bold text-[#08080a] bg-gradient-to-r from-[#fae7b1] via-[#d4af37] to-[#ba9527] hover:from-[#fff0c8] hover:via-[#e2be4c] hover:to-[#cb9f2a] transition-all rounded-xs flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(212,175,55,0.2)]"
                >
                  <span>Formulario de Contacto</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {onNavigate && (
                <button
                  onClick={() => onNavigate('catalogo')}
                  className="w-full py-3 px-6 text-xs uppercase tracking-[0.2em] font-semibold text-[#f7eed9] border border-[#d4af37]/40 hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all rounded-xs text-center"
                >
                  Ver Catálogo Oficial
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values & Integrity */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="border border-[#d4af37]/20 bg-[#0e0f16]/60 rounded-xs p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <span className="font-serif text-2xl font-bold text-[#fae7b1]">DYD TOLEDO</span>
            <p className="text-xs text-[#9c9588]">Empresa titular y taller toledano de alta tradición</p>
          </div>
          <div className="space-y-2 border-y sm:border-y-0 sm:border-x border-[#d4af37]/15 py-4 sm:py-0">
            <span className="font-serif text-2xl font-bold text-[#fae7b1]">24K & 18K</span>
            <p className="text-xs text-[#9c9588]">Oro auténtico certificado en cada pieza damasquinada</p>
          </div>
          <div className="space-y-2">
            <span className="font-serif text-2xl font-bold text-[#fae7b1]">100% CERCANÍA</span>
            <p className="text-xs text-[#9c9588]">Contacto directo con los fundadores y directores</p>
          </div>
        </div>
      </section>
    </div>
  );
};
