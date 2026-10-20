import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/products';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  HelpCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

export const ContactoSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'particular',
    message: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    const generatedTicket = `MG-TOL-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedTicket);
    setSubmitted(true);
  };

  const faqs = [
    {
      q: '¿Cómo garantizan que las piezas contienen oro de 24 y 18 kilates?',
      a: 'Todas las piezas de Midas Gold (DYD TOLEDO, S.L.) se entregan con un Certificado Oficial de Autenticidad Toledana que acredita el uso de oro fino de 24K (amarillo, 999 milésimas) y oro de 18K (verde) embutido a mano en el acero dulce a golpe de buril.',
    },
    {
      q: '¿Qué significa que el oro tiene un espesor mínimo garantizado de 4 micras?',
      a: 'A diferencia de los baños electroquímicos de bisutería (que oscilan entre 0,1 y 0,5 micras y se desvanecen en pocos meses), en Midas Gold embutimos hilos y láminas macizas de oro con al menos 4 micras de profundidad. Esto asegura que la incrustación y el contraste permanecen inalterables con el paso de los años.',
    },
    {
      q: '¿Cuál es el plazo de entrega y con qué empresa se envían los pedidos?',
      a: 'Los envíos en territorio español peninsular se realizan a través de la compañía DHL u operadores urgentes de su red. El plazo estimado de entrega es de 3 días laborables una vez preparado el pedido, y se facilita un número de seguimiento para rastrear el paquete en tiempo real.',
    },
    {
      q: '¿Qué formas de pago admite la tienda online?',
      a: 'Aceptamos tarjetas de crédito y débito Visa, Visa Electron y Mastercard mediante Comercio Electrónico Seguro (CES) a través de la pasarela bancaria oficial Redsys (BBVA), así como transferencias bancarias directas, Bizum y PayPal, todo bajo cifrado seguro SSL.',
    },
    {
      q: '¿Cuál es la política de devoluciones?',
      a: 'Dispone de un plazo legal de 14 días naturales desde la recepción de su pedido para ejercer su derecho de desistimiento notificándolo por email a comercial@midasgold.es. Los productos deben devolverse en su estuche original con su factura. Quedan excluidos los artículos personalizados a medida o pendientes/dilataciones por razones de higiene.',
    },
    {
      q: '¿Se puede visitar el taller y showroom de Midas Gold en Toledo?',
      a: 'Por supuesto. Nuestras instalaciones centrales se ubican en C/ Río Jarama, 132 (Nave 3.05) en Toledo. Rogamos solicitar cita previa mediante este formulario o llamando a nuestros teléfonos (+34 925 504 699 / +34 917 692 759) para garantizar que un maestro artesano pueda dedicarle la atención que merece.',
    },
    {
      q: '¿Realizan piezas personalizadas con escudos de armas o logotipos corporativos?',
      a: 'Sí. Contamos con amplia experiencia en la realización de encargos a medida: gemelos con escudo nobiliario, placas conmemorativas, platos ceremoniales de protocolo y regalos institucionales para empresas y organismos oficiales.',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="relative py-16 border-b border-[#d4af37]/20 bg-[#0e1015]">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
            Atención al Cliente & Sede Oficial
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#f5ebd7]">
            Contacto & Showroom en Toledo
          </h1>
          <p className="text-sm sm:text-base text-[#9c978b] max-w-2xl mx-auto leading-relaxed">
            Póngase en contacto directo con el equipo de <strong className="text-[#f3e5ab] font-medium">{COMPANY_INFO.name}</strong> ({COMPANY_INFO.legalName}). Estamos a su servicio para asesorarle, gestionar sus pedidos o recibirle en nuestra sede en la ciudad de Toledo.
          </p>
        </div>
      </section>

      {/* Contact Cards & Form Split */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0e1015] border border-[#d4af37]/20 p-6 rounded-sm space-y-6">
              <div className="border-b border-[#d4af37]/15 pb-4">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                  Razón Social: {COMPANY_INFO.legalName}
                </div>
                <h3 className="font-display text-lg font-bold text-[#f5ebd7] mt-0.5">
                  Sede Central & Taller Artesano
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-sm bg-[#14161f] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#8e897e] uppercase tracking-wider text-[10px]">Dirección Postal</div>
                    <div className="text-[#ede8dc] font-medium mt-0.5 leading-relaxed">
                      {COMPANY_INFO.address}
                    </div>
                    <div className="text-[#9c978b] text-[11px] mt-0.5">
                      Polígono Industrial de Toledo · 45007 Toledo, España
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-sm bg-[#14161f] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#8e897e] uppercase tracking-wider text-[10px]">Teléfonos de Atención</div>
                    <div className="mt-0.5 space-y-0.5">
                      <div>
                        <a
                          href={`tel:${COMPANY_INFO.phone1.replace(/\s+/g, '')}`}
                          className="text-[#f3e5ab] hover:underline font-mono"
                        >
                          {COMPANY_INFO.phone1}
                        </a>
                      </div>
                      <div>
                        <a
                          href={`tel:${COMPANY_INFO.phone2.replace(/\s+/g, '')}`}
                          className="text-[#f3e5ab] hover:underline font-mono"
                        >
                          {COMPANY_INFO.phone2}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-sm bg-[#14161f] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#8e897e] uppercase tracking-wider text-[10px]">Correo Electrónico Oficial</div>
                    <div className="mt-0.5">
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="text-[#f3e5ab] hover:underline font-medium"
                      >
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-sm bg-[#14161f] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#8e897e] uppercase tracking-wider text-[10px]">Horario de Taller & Showroom</div>
                    <div className="text-[#ede8dc] mt-0.5 font-medium">
                      {COMPANY_INFO.hours}
                    </div>
                    <div className="text-[#8e897e] text-[11px]">Sábados y Domingos: cerrado</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Toledo Travel & Logistics Note */}
            <div className="p-6 bg-[#101217] border border-[#d4af37]/15 rounded-sm space-y-3 text-xs text-[#9c978b]">
              <div className="flex items-center gap-2 text-[#d4af37] font-semibold uppercase tracking-wider text-[11px]">
                <Building2 className="w-4 h-4" />
                <span>Cómo llegar a Toledo</span>
              </div>
              <p className="leading-relaxed">
                Nuestras instalaciones cuentan con excelente comunicación por carretera mediante la autovía <strong className="text-[#d8ceba]">A-42 (Madrid - Toledo)</strong> y conexión ferroviaria directa en <strong className="text-[#d8ceba]">AVE (25 minutos desde Madrid-Atocha)</strong>. Disponemos de aparcamiento privado para clientes en la nave.
              </p>
            </div>
          </div>

          {/* Right Column: Contact & Visit Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0e1015] border border-[#d4af37]/20 p-8 rounded-sm">
              <div className="border-b border-[#d4af37]/15 pb-4 mb-6">
                <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                  Formulario Directo
                </span>
                <h3 className="font-display text-xl font-bold text-[#f5ebd7] mt-1">
                  Envíenos su consulta o solicite cita previa en el taller
                </h3>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-[#10131b] border border-[#d4af37]/40 rounded-sm space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 border border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#f5ebd7]">
                    ¡Mensaje Recibido Correctamente!
                  </h4>
                  <p className="text-xs text-[#9c978b] max-w-md mx-auto leading-relaxed">
                    Hemos registrado su solicitud en nuestro sistema de atención al cliente de Toledo. Un responsable de <strong className="text-[#f3e5ab]">{COMPANY_INFO.name}</strong> se pondrá en contacto con usted en un plazo máximo de 24 horas laborables.
                  </p>
                  <div className="inline-block p-3 bg-[#0b0c10] border border-[#d4af37]/20 font-mono text-xs text-[#d4af37]">
                    Referencia de Solicitud: {ticketId}
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'particular',
                          message: '',
                        });
                      }}
                      className="text-xs uppercase tracking-wider text-[#d4af37] hover:underline cursor-pointer"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[#9c978b] uppercase tracking-wider text-[11px] font-medium">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej. Carmen Rodríguez"
                        className="w-full bg-[#12141c] border border-[#d4af37]/20 rounded-sm px-3.5 py-2.5 text-[#ede8dc] placeholder-[#6e695e] focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[#9c978b] uppercase tracking-wider text-[11px] font-medium">
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ejemplo@correo.es"
                        className="w-full bg-[#12141c] border border-[#d4af37]/20 rounded-sm px-3.5 py-2.5 text-[#ede8dc] placeholder-[#6e695e] focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[#9c978b] uppercase tracking-wider text-[11px] font-medium">
                        Teléfono de contacto
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+34 600 000 000"
                        className="w-full bg-[#12141c] border border-[#d4af37]/20 rounded-sm px-3.5 py-2.5 text-[#ede8dc] placeholder-[#6e695e] focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[#9c978b] uppercase tracking-wider text-[11px] font-medium">
                        Motivo de su consulta
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#12141c] border border-[#d4af37]/20 rounded-sm px-3.5 py-2.5 text-[#ede8dc] focus:outline-none focus:border-[#d4af37] cursor-pointer"
                      >
                        <option value="particular" className="bg-[#12141c]">Consulta sobre piezas / Compra particular</option>
                        <option value="visita" className="bg-[#12141c]">Cita previa para visita al taller en Toledo</option>
                        <option value="corporativo" className="bg-[#12141c]">Regalo institucional / Pedidos de empresa</option>
                        <option value="medida" className="bg-[#12141c]">Personalización y escudo heráldico a medida</option>
                        <option value="mayorista" className="bg-[#12141c]">Distribución mayorista y exportación</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#9c978b] uppercase tracking-wider text-[11px] font-medium">
                      Mensaje o detalles de su consulta *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Indique las piezas de su interés, fecha deseada de visita a Toledo o detalles de su pedido..."
                      className="w-full bg-[#12141c] border border-[#d4af37]/20 rounded-sm p-3 text-[#ede8dc] placeholder-[#6e695e] focus:outline-none focus:border-[#d4af37]"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#0b0c10] bg-gradient-to-r from-[#eed588] via-[#d4af37] to-[#b38612] hover:brightness-110 active:scale-98 transition-all rounded-sm cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 text-[#0b0c10]" />
                      <span>Enviar Consulta a {COMPANY_INFO.name}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
            Transparencia & Compromiso Oficial
          </span>
          <h3 className="font-display text-2xl font-bold text-[#f5ebd7]">
            Preguntas Frecuentes sobre Midas Gold y el Damasquinado
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#0e1015] border border-[#d4af37]/15 p-6 rounded-sm space-y-2 hover:border-[#d4af37]/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <h4 className="font-display text-sm font-semibold text-[#f5ebd7]">
                  {faq.q}
                </h4>
              </div>
              <p className="text-xs text-[#9c978b] pl-7 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
