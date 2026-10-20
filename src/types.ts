export type ActiveTab = 'home' | 'midas' | 'catalogo' | 'tienda' | 'contacto';

export type ProductStyle = 'arabe' | 'renacimiento' | 'geometrico';

export type MainCategory = 'mujer' | 'hombre' | 'hogar' | 'religioso' | 'regalo';

export interface Product {
  id: string;
  name: string;
  category: MainCategory;
  categoryLabel: string;
  subCategory: string; // e.g. "Pendientes", "Zippos", "Platos Damasquinados"
  style: ProductStyle; // "arabe" | "renacimiento"
  styleLabel: string; // "Estilo Árabe / Mudéjar" | "Estilo Renacimiento"
  price: number;
  originalPrice?: number;
  image: string;
  tag?: string;
  shortDesc: string;
  longDesc: string;
  availableSizes?: string[]; // for rings
  specifications: {
    oro: string; // "Oro fino 24K (999‰) y oro verde 18K"
    espesor: string; // "Mínimo 4 micras garantizadas"
    base: string; // "Acero dulce pavonado al fuego"
    dimensiones?: string;
    tecnica: string; // "Damasquinado toledano a golpe de buril"
    referencia: string;
  };
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

