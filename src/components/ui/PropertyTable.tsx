import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import { Property } from '../../types/Property';
import PropertyTableItem from './PropertyTableItem';

interface PropertyTableProps {
  properties: Property[];
  onPropertyClick?: (property: Property) => void;
}

type SortField = 'price' | 'date' | null;
type SortDirection = 'asc' | 'desc';

export default function PropertyTable({ properties, onPropertyClick }: PropertyTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const itemsPerPage = 8;
  
  const sortedProperties = useMemo(() => {
    if (!sortField) return properties;
    
    return [...properties].sort((a, b) => {
      let aValue: number;
      let bValue: number;
      
      if (sortField === 'price') {
        aValue = a.price;
        bValue = b.price;
      } else if (sortField === 'date') {
        // Convertir fecha DD-MM-YYYY a timestamp
        const parseDate = (dateStr: string) => {
          const [day, month, year] = dateStr.split('-').map(Number);
          return new Date(year, month - 1, day).getTime();
        };
        aValue = parseDate(a.date);
        bValue = parseDate(b.date);
      } else {
        return 0;
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [properties, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = sortedProperties.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePropertyClick = (property: Property) => {
    onPropertyClick?.(property);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'desc') {
        setSortDirection('asc');
      } else if (sortDirection === 'asc') {
        setSortField(null);
        setSortDirection('desc');
      }
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <FontAwesomeIcon icon={faSort} className="h-3 w-3 text-gray-400" />;
    }
    return sortDirection === 'asc' 
      ? <FontAwesomeIcon icon={faSortUp} className="h-3 w-3 text-gray-600" />
      : <FontAwesomeIcon icon={faSortDown} className="h-3 w-3 text-gray-600" />;
  };

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No hay propiedades disponibles</div>
        <div className="text-gray-500 text-sm">Intenta ajustar los filtros de búsqueda</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Foto
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Oficina
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Referencia
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dirección
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200 select-none"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center space-x-1">
                  <span>Precio</span>
                  {getSortIcon('price')}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Habitaciones
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Superficie
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200 select-none"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center space-x-1">
                  <span>Fecha</span>
                  {getSortIcon('date')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProperties.map((property) => (
              <PropertyTableItem
                key={property.id}
                property={property}
                onClick={handlePropertyClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {currentProperties.map((property) => (
          <div
            key={property.id}
            className="border-b border-gray-200 p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
            onClick={() => handlePropertyClick(property)}
          >
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="w-16 h-12 bg-gray-200 rounded-md overflow-hidden">
                  {property.images && property.images.length > 0 ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                      Sin imagen
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {property.title}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {new Intl.NumberFormat('es-ES', {
                      style: 'currency',
                      currency: property.currency,
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(property.price)}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {property.type}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {property.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 truncate">{property.location}</p>
                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                  {property.bedrooms && (
                    <span>{property.bedrooms} hab</span>
                  )}
                  <span>{property.area} m²</span>
                  <span className="font-mono">{property.id}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 border-t border-gray-200">
          <div className="flex justify-center">
            <div className="flex justify-center sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
            <div className="hidden sm:flex">
              <nav className="inline-flex items-center space-x-2" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Anterior</span>
                  <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const shouldShow = 
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1);
                  
                  if (!shouldShow) {
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }
                  
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        page === currentPage
                          ? 'bg-black text-white'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Siguiente</span>
                  <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
