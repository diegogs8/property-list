import { useState, useEffect, useCallback } from 'react';
import { Property } from '../types/Property';

interface UseSearchProps {
  properties: Property[];
  searchFields?: (keyof Property)[];
  debounceMs?: number;
}

export function useSearch({ 
  properties, 
  searchFields = ['title', 'location', 'type', 'status', 'office', 'id'],
  debounceMs = 300 
}: UseSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [isSearching, setIsSearching] = useState(false);

  const filterProperties = useCallback((term: string, propertiesList: Property[]) => {
    if (!term.trim()) {
      return propertiesList;
    }

    const lowerTerm = term.toLowerCase().trim();
    
    return propertiesList.filter(property => {
      return searchFields.some(field => {
        const value = property[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerTerm);
        }
        if (typeof value === 'number') {
          return value.toString().includes(lowerTerm);
        }
        if (Array.isArray(value)) {
          return value.some(item => 
            typeof item === 'string' && item.toLowerCase().includes(lowerTerm)
          );
        }
        return false;
      });
    });
  }, [searchFields]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProperties(properties);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      const filtered = filterProperties(searchTerm, properties);
      setFilteredProperties(filtered);
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, properties, filterProperties, debounceMs]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return {
    searchTerm,
    filteredProperties,
    isSearching,
    handleSearchChange,
    handleSearch,
    clearSearch,
    hasResults: filteredProperties.length > 0,
    totalResults: filteredProperties.length
  };
}
