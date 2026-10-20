# Midas Gold Toledo · Alta Joyería & Damasquinado de Toledo

> Renovación moderna, elegante y lujosa de la plataforma web oficial de **Midas Gold** (**DYD TOLEDO, S.L.**), salvaguardando la técnica milenaria del damasquinado toledano con oro fino de 24 quilates y 18 quilates verde.

![Midas Gold Preview](https://img.shields.io/badge/Toledo-Damasquinado%2024K-gold?style=for-the-badge)
![React 19](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.x-646cff?style=for-the-badge&logo=vite&logoColor=white)

---

## 🏛️ Sobre el Proyecto

Este proyecto es una reinterpretación de alta gama de la web original [midasgold.es](https://midasgold.es/midas), combinando una estética editorial sobria en negro azabache y oro imperial con la información comercial, técnica y legal 100% real de **DYD TOLEDO, S.L.** en Toledo, España.

### Características Principales

1. **👑 Logotipo Oficial Midas Gold**:
   - Recreación vectorial del emblema imperial: corona estilizada de orfebrería con perlas y remates de flor de lis, tipografía noble `MIDAS GOLD` y subtítulo `TOLEDO` en oro puro.
2. **✨ Hero Dinámico con Carrusel Editorial**:
   - Rotación suave y automática (cada 6 segundos) entre 5 escenas representativas:
     - *01. Alta Joyería Imperial* (oro 24K y 18K verde).
     - *02. Taller en Toledo* (maestros damasquinadores y tradición del siglo VIII).
     - *03. Colección Renacimiento* (flores, aves del paraíso y gargantillas).
     - *04. Línea Caballero* (Zippos oficiales y gemelos mudéjares).
     - *05. Colección Hogar* (platos ceremoniales de 18 cm y abrecartas).
   - Efecto cinematográfico *Ken Burns*, indicadores numéricos, control de pausa/reproducción y saltos manuales.
3. **📜 Apartado "Midas" (`/midas`)**:
   - Origen histórico del damasquinado introducido en Toledo por los árabes en el siglo VIII.
   - Selector interactivo entre **Estilo Árabe / Mudéjar** (geometría y lacerías) y **Estilo Renacimiento** (flores y aves).
   - Las 4 fases artesanales: Rayado a 45º, Embutido a golpe de buril, Pavonado al fuego y Bruñido con piedra de ágata natural.
   - Reconocimiento oficial del Fondo Europeo de Desarrollo Regional (**FEDER**) para DYD TOLEDO, S.L.
4. **📖 Apartado "Catálogo"**:
   - Filtros por subfamilias reales: *Mujer* (pendientes, pulseras, gargantillas, anillos, relojes, dilataciones), *Hombre* (Zippos, gemelos, pisacorbatas, llaveros, carteras), *Hogar* (platos, abrecartas, cajas de madera, cuadros) y *Religioso*.
   - Fichas técnicas completas: aleación, micras, peso, dimensiones y referencias oficiales (`MG-MUJ-...`, `MG-HOM-...`, etc.).
   - Descargador modal del Dossier Oficial Midas Gold en PDF.
5. **🛍️ Apartado "Tienda"**:
   - Proceso oficial de compra ("Cómo Comprar") en 4 pasos.
   - Selector de tallas toledanas para anillos y dilataciones con guía métrica.
   - Políticas oficiales de envío (**DHL Express** en 3 días laborables) y devolución (14 días naturales según ley).
   - Métodos de pago seguros: Redsys (BBVA), Visa/Mastercard con Comercio Electrónico Seguro (CES), Bizum y PayPal.
6. **👜 Cesta de Compra Deslizante (Cart Drawer)**:
   - Medidor de envío gratuito garantizado (umbral 150 €), control de unidades, selector de variantes y simulador de checkout con generación de referencia de pedido.
7. **📍 Apartado "Contacto"**:
   - Datos reales: C/ Río Jarama, 132 - Nave 3.05, 45007 Toledo (+34 925 504 699 / +34 917 692 759 / comercial@midasgold.es).
   - Formulario interactivo para citas en el taller de Toledo o encargos heráldicos institucionales.
   - Preguntas frecuentes oficiales sobre la contrastación del oro, las 4 micras y el envío.

---

## 🛠️ Tecnologías Empleadas

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) (`@theme` con fuentes Cinzel y Plus Jakarta Sans)
- **Bundler & Tooling**: [Vite 8](https://vite.dev/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Animaciones**: CSS Transitions + Tailwind Animations

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos

- **Node.js** v18 o superior (recomendado v20+)
- **npm**, **pnpm** o **yarn**

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO/midas-gold-toledo.git
   cd midas-gold-toledo
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abrir `http://localhost:3000` en el navegador.

4. Construir para producción:
   ```bash
   npm run build
   ```

5. Previsualizar la versión de producción:
   ```bash
   npm run preview
   ```

---

## 📂 Estructura del Código

```text
├── index.html                  # Entry point con fuentes Google Fonts (Cinzel + Plus Jakarta Sans)
├── package.json                # Dependencias y scripts
├── vite.config.ts              # Configuración moderna de Vite con alias
├── tsconfig.json               # Configuración TypeScript estricta
├── .gitignore                  # Exclusiones optimizadas para GitHub
├── .env.example                # Variables de entorno de ejemplo
└── src/
    ├── main.tsx                # Bootstrap de React 19
    ├── App.tsx                 # Estado global de navegación y carrito
    ├── index.css               # Estilos globales y tokens de oro en Tailwind v4
    ├── types.ts                # Modelos de datos (Product, CartItem, ActiveTab)
    ├── data/
    │   └── products.ts         # Catálogo oficial, especificaciones y datos reales de empresa
    ├── components/
    │   ├── Navbar.tsx          # Barra superior con Top Bar Contract y MidasLogo
    │   ├── MidasLogo.tsx       # Logotipo oficial con corona estilizada
    │   ├── HomeSection.tsx     # Portada con carrusel dinámico y colecciones
    │   ├── MidasSection.tsx    # Historia de Toledo, estilos árabe/renacimiento y FEDER
    │   ├── CatalogoSection.tsx # Lookbook con filtros por subfamilia y estilo
    │   ├── TiendaSection.tsx   # Boutique online, selector de tallas y políticas
    │   ├── ContactoSection.tsx # Dirección en Toledo, formulario y FAQs
    │   ├── ProductDetailModal.tsx # Modal de detalle técnico (PDP)
    │   ├── CartDrawer.tsx      # Cesta deslizante interactiva y checkout
    │   └── Footer.tsx          # Pie de página editorial con sellos de garantía
    └── assets/
        └── images/             # Fotografías en alta resolución de damasquinado y taller
```

---

## 📦 Instrucciones para Subir a GitHub

El repositorio remoto ya ha sido vinculado a tu repositorio de GitHub:
`https://github.com/patri97lopez-star/midasgold.git`

Para subir el código a GitHub desde tu terminal local o mediante un token:

```bash
# Opción 1: Con Personal Access Token (PAT)
git remote set-url origin https://<TU_GITHUB_TOKEN>@github.com/patri97lopez-star/midasgold.git
git push -u origin main

# Opción 2: Si ya tienes tus credenciales de GitHub configuradas en tu terminal
git push -u origin main
```

---

## 🚀 Despliegue en Vercel (1 Clic)

El proyecto incluye la configuración predeterminada `vercel.json` para Vite SPA:

1. Inicia sesión en [Vercel](https://vercel.com/).
2. Haz clic en **"Add New..."** → **"Project"**.
3. Selecciona tu repositorio: `patri97lopez-star/midasgold`.
4. Vercel detectará automáticamente el framework como **Vite**, el directorio de salida como **`dist`** y el comando **`npm run build`**.
5. Haz clic en **"Deploy"**. En menos de 60 segundos tu web estará en vivo con HTTPS y dominio gratuito `.vercel.app`.

---

## 📜 Licencia & Créditos

- Marca y contenidos: **DYD TOLEDO, S.L.** (Toledo, España).
- Código fuente bajo licencia [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).
