import React, { useEffect } from 'react';
import { Property } from '../../types/Property';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClose
} from "@fortawesome/free-solid-svg-icons";

interface PropertyDetailModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyDetailModal({ property, isOpen, onClose }: PropertyDetailModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/50 "
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-[60vw] h-[90vh] mx-4 overflow-hidden transform transition-all duration-300"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 id="modal-title" className="text-2xl font-semibold text-gray-800">
            {property.title}
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full p-2"
            aria-label="Cerrar modal"
          >
            <FontAwesomeIcon icon={faClose} className="text-neutral-700"/>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(90vh-80px)] overflow-hidden">
          <div className="flex-1 lg:w-3/5 p-6 overflow-y-auto">
            <div className="mb-8">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {formatPrice(property.price, property.currency)}
              </div>
              <div className="text-lg text-gray-600">
                {property.location}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Características</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Superficie</div>
                  <div className="font-semibold text-gray-900">{property.area} m²</div>
                </div>
                
                {property.bedrooms && (
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Habitaciones</div>
                    <div className="font-semibold text-gray-900">{property.bedrooms}</div>
                  </div>
                )}
                
                {property.bathrooms && (
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Baños</div>
                    <div className="font-semibold text-gray-900">{property.bathrooms}</div>
                  </div>
                )}
                
                <div className="text-center">
                  <div className="text-sm text-gray-600">Tipo de propiedad</div>
                  <div className="font-semibold text-gray-900 capitalize">{property.type}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-600">Estado / Conservación</div>
                  <div className="font-semibold text-gray-900 capitalize">{property.status}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-600">Oficina</div>
                  <div className="font-semibold text-gray-900">{property.office}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-600">Fecha de publicación</div>
                  <div className="font-semibold text-gray-900">{formatDate(property.date)}</div>
                </div>
              </div>
            </div>

            {property.features && property.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Detalles</h3>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium capitalize"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {property.images && property.images.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Imágenes</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.images.slice(0, 6).map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={image}
                        alt={`${property.title} - Imagen ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                    </div>
                  ))}
                  {property.images.length > 6 && (
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-600">+{property.images.length - 6}</div>
                        <div className="text-sm text-gray-500">más imágenes</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 lg:w-2/5 p-6 border-l border-gray-200 overflow-y-auto">
            {property.description && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Descripción</h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {property.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
