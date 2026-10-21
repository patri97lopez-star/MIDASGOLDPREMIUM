import React, { useState } from 'react';
import { useDemoStore } from '../../context/DemoStoreContext';
import { Product, MainCategory } from '../../types';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowUpDown,
} from 'lucide-react';
import { ProductEditModal } from './ProductEditModal';

export const AdminProductos: React.FC = () => {
  const {
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    toggleProductPublish,
    updateProductStock,
  } = useDemoStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  const [stockFilter, setStockFilter] = useState<'todos' | 'en_stock' | 'agotado' | 'publicado' | 'borrador'>('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specifications.referencia.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subCategory.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'todos' || p.category === categoryFilter;

    let matchesStock = true;
    if (stockFilter === 'en_stock') {
      matchesStock = (p.stock ?? 0) > 0;
    } else if (stockFilter === 'agotado') {
      matchesStock = (p.stock ?? 0) === 0;
    } else if (stockFilter === 'publicado') {
      matchesStock = p.published !== false;
    } else if (stockFilter === 'borrador') {
      matchesStock = p.published === false;
    }

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (prodData: Product) => {
    if (editingProduct) {
      updateProduct(prodData);
      showToast(`«${prodData.name}» actualizado con éxito. El cambio se refleja en la tienda.`);
    } else {
      addProduct(prodData);
      showToast(`Nueva pieza «${prodData.name}» añadida al catálogo.`);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
    showToast('Producto eliminado del catálogo de demostración.');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1f2128] text-[#f5ebd7] px-4 py-3 rounded-lg shadow-xl border border-[#d4af37]/40 flex items-center gap-2 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e0d8] pb-5">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1a1918]">
            Catálogo de Productos
          </h1>
          <p className="text-xs text-[#6e685c] mt-0.5">
            Administración del catálogo toledano ({products.length} piezas). Modifica precios, stock o publicación y compruébalo al instante en la tienda pública.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#1f2128] text-[#f5ebd7] hover:bg-[#33353d] active:scale-98 rounded transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#d4af37]" />
          Crear producto de prueba
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-lg border border-[#e5e0d8] shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8c867b] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, referencia o pieza..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#fcfbf9] border border-[#d8d3c8] rounded focus:outline-hidden focus:border-[#c59e35]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#736e65] whitespace-nowrap">Categoría:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#fcfbf9] border border-[#d8d3c8] rounded focus:outline-hidden focus:border-[#c59e35]"
            >
              <option value="todos">Todas las colecciones</option>
              <option value="mujer">Para Mujer</option>
              <option value="hombre">Para Hombre</option>
              <option value="hogar">Colección Hogar</option>
              <option value="religioso">Artículos Religiosos</option>
              <option value="regalo">Regalos Corporativos</option>
            </select>
          </div>

          {/* Stock / Publication Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#736e65] whitespace-nowrap">Estado:</span>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-[#fcfbf9] border border-[#d8d3c8] rounded focus:outline-hidden focus:border-[#c59e35]"
            >
              <option value="todos">Todos los estados</option>
              <option value="publicado">Publicados en tienda</option>
              <option value="borrador">Ocultos (Borrador)</option>
              <option value="en_stock">Con existencias (&gt;0)</option>
              <option value="agotado">Agotados (0 u.)</option>
            </select>
          </div>
        </div>

        {/* Results summary counter */}
        <div className="flex items-center justify-between text-[11px] text-[#787368] pt-1 border-t border-[#f0ede6]">
          <span>
            Mostrando <strong>{filteredProducts.length}</strong> de {products.length} productos
          </span>
          {(searchQuery || categoryFilter !== 'todos' || stockFilter !== 'todos') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('todos');
                setStockFilter('todos');
              }}
              className="text-[#997314] hover:underline cursor-pointer"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-[#e5e0d8] shadow-xs overflow-hidden">
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf8f5] text-[#6b665c] uppercase text-[10px] tracking-wider border-b border-[#e5e0d8]">
                <tr>
                  <th className="py-3 px-4 font-semibold w-14">Imagen</th>
                  <th className="py-3 px-4 font-semibold">Pieza & Colección</th>
                  <th className="py-3 px-4 font-semibold">Referencia</th>
                  <th className="py-3 px-4 font-semibold text-right">Precio (€)</th>
                  <th className="py-3 px-4 font-semibold text-center">Existencias</th>
                  <th className="py-3 px-4 font-semibold text-center">Publicación</th>
                  <th className="py-3 px-4 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ece7de]">
                {filteredProducts.map((p) => {
                  const isPublished = p.published !== false;
                  const currentStock = p.stock ?? 0;
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-[#fbf9f5] transition-colors"
                    >
                      {/* Image Thumbnail */}
                      <td className="py-3 px-4">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-11 h-11 rounded object-cover border border-[#e0dad0]"
                        />
                      </td>

                      {/* Name & Category */}
                      <td className="py-3 px-4 max-w-xs">
                        <p className="font-semibold text-[#1a1918] truncate">{p.name}</p>
                        <p className="text-[11px] text-[#736e65]">
                          {p.categoryLabel} · <span className="text-[#8c867b]">{p.subCategory}</span>
                        </p>
                        {p.availableSizes && p.availableSizes.length > 0 && (
                          <span className="text-[10px] text-[#c59e35] font-mono block">
                            {p.availableSizes.length} tallas configuradas
                          </span>
                        )}
                      </td>

                      {/* Reference */}
                      <td className="py-3 px-4 font-mono font-medium text-[#4a463d]">
                        {p.specifications.referencia}
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 text-right font-mono font-bold text-sm text-[#1a1918]">
                        {p.price.toLocaleString('es-ES')} €
                      </td>

                      {/* Stock controls (quick inline adjuster) */}
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 bg-[#fcfbf9] border border-[#d8d3c8] rounded px-2 py-0.5">
                          <button
                            type="button"
                            onClick={() => updateProductStock(p.id, Math.max(0, currentStock - 1))}
                            className="text-[#787368] hover:text-[#1a1918] font-bold text-xs px-1 cursor-pointer"
                            title="Reducir existencias"
                          >
                            -
                          </button>
                          <span className={`font-mono text-xs font-bold px-1 tabular-nums ${
                            currentStock === 0
                              ? 'text-rose-700'
                              : currentStock <= 2
                              ? 'text-amber-700'
                              : 'text-emerald-700'
                          }`}>
                            {currentStock}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateProductStock(p.id, currentStock + 1)}
                            className="text-[#787368] hover:text-[#1a1918] font-bold text-xs px-1 cursor-pointer"
                            title="Aumentar existencias"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Publication Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => toggleProductPublish(p.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all cursor-pointer ${
                            isPublished
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                          }`}
                          title={isPublished ? 'Haz clic para ocultar en tienda' : 'Haz clic para publicar en tienda'}
                        >
                          {isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {isPublished ? 'Publicado' : 'Borrador'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 text-[#5a554c] hover:text-[#1a1918] hover:bg-[#ede8dc] rounded transition-colors cursor-pointer"
                            title="Editar pieza"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(p.id)}
                            className="p-1.5 text-[#8c867b] hover:text-rose-700 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                            title="Eliminar del catálogo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-2">
            <p className="font-serif text-base font-bold text-[#1a1918]">
              No se han encontrado piezas
            </p>
            <p className="text-xs text-[#787368]">
              No hay productos que coincidan con los criterios de búsqueda o filtros seleccionados.
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full border border-[#d8d3c8] shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
              <AlertTriangle className="w-5 h-5" />
              ¿Eliminar producto de demostración?
            </div>
            <p className="text-xs text-[#6e685c]">
              Esta pieza desaparecerá del catálogo y de la tienda en este navegador. Puedes restaurar los datos iniciales en cualquier momento.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 text-xs font-medium text-[#5e594f] hover:bg-[#ede8dc] rounded cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-1.5 text-xs font-semibold bg-rose-700 text-white rounded hover:bg-rose-800 cursor-pointer"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Edit / Create Modal */}
      <ProductEditModal
        isOpen={isModalOpen}
        product={editingProduct}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
      />
    </div>
  );
};
