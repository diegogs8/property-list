import React from 'react';
import { Property } from '../../types/Property';

interface PropertyTableItemProps {
  property: Property;
  onClick?: (property: Property) => void;
}

export default function PropertyTableItem({ property, onClick }: PropertyTableItemProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <tr 
      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
      onClick={() => onClick?.(property)}
    >
      <td className="px-4 py-3">
        <div className="w-16 h-12 bg-gray-200 rounded-md overflow-hidden relative">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : null}
          <div 
            className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs"
            style={{display: property.images && property.images.length > 0 ? 'none' : 'flex'}}
          >
            Sin imagen
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-sm text-gray-600">
        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
          {property.office}
        </span>
      </td>

      <td className="px-4 py-3 text-sm font-mono text-gray-600">
        {property.id}
      </td>

      <td className="px-4 py-3">
        <span className={`px-2 py-1 text-xs capitalize`}>
          {property.type}
        </span>
      </td>

      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs">
        <div className="truncate" title={property.location}>
          {property.location}
        </div>
      </td>

      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
        {formatPrice(property.price, property.currency)}
      </td>

      <td className="px-4 py-3 text-sm text-gray-600 text-center">
        {property.bedrooms}
      </td>

      <td className="px-4 py-3 text-sm text-gray-600 text-center">
        {property.area} m²
      </td>

      <td className="px-4 py-3 text-sm text-gray-600">
        {property.date}
      </td>
    </tr>
  );
}
