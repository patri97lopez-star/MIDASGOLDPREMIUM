import React from 'react';
import { ActiveTab } from '../types';
import { COMPANY_INFO } from '../data/products';
import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

import { MidasLogo } from './MidasLogo';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#08090d] border-t border-[#d4af37]/20 text-xs text-[#8e897e]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info with Official Logo */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-start">
              <MidasLogo size="sm" showSubtitle={true} className="items-start" />
            </div>
            <p className="text-[#9c978b] leading-relaxed">
              Artesanía tradicional del Damasquinado toledano unida a la más distinguida alta joyería. Piezas embutidas con oro fino de 24K y 18K en Toledo, España.
            </p>
            <div className="text-[11px] text-[#7e796e]">
              Razón Social: <strong className="text-[#ede8dc]">{COMPANY_INFO.legalName}</strong>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#f5ebd7]">
              Secciones
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('midas')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Midas (Historia & Técnica)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogo')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Catálogo & Lookbook
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tienda')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Tienda Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contacto')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Contacto & Cita en Toledo
                </button>
              </li>
            </ul>
          </div>

          {/* Guarantee & Materials */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#f5ebd7]">
              Garantía Toledana
            </h4>
            <ul className="space-y-2 text-[#9c978b]">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Oro 24K y 18K certificado</span>
              </li>
              <li>· Espesor mínimo de 4 micras</li>
              <li>· Acero dulce pavonado al fuego</li>
              <li>· Cincelado manual a buril</li>
              <li>· Cofre con certificado nominativo</li>
            </ul>
          </div>

          {/* Real Contact Data */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#f5ebd7]">
              Taller & Sede Central
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-[#9c978b]">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2 text-[#9c978b]">
                <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone1.replace(/\s+/g, '')}`} className="hover:text-[#f3e5ab]">
                  {COMPANY_INFO.phone1}
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#9c978b]">
                <Mail className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#f3e5ab]">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="text-[11px] text-[#7e796e] pt-1">
                Horario: {COMPANY_INFO.hours}
              </div>
            </div>
          </div>
        </div>

        {/* Legal & FEDER acknowledgment */}
        <div className="mt-12 pt-8 border-t border-[#d4af37]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#6e695e]">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name} ({COMPANY_INFO.legalName}). Todos los derechos reservados. Toledo, España.
          </div>
          <div className="flex items-center gap-4">
            <span>Aviso Legal</span>
            <span>·</span>
            <span>Política de Privacidad</span>
            <span>·</span>
            <span>Política de Cookies</span>
            <span>·</span>
            <span>Fondo Europeo de Desarrollo Regional (FEDER)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
