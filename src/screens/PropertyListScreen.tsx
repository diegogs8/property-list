import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/ui/Button";
import SearchBar from "../components/ui/SearchBar";
import PropertyTable from "../components/ui/PropertyTable";
import { Property } from "../types/Property";
import propertiesData from "../data/properties.json";
import { useSearch } from "../hooks/useSearch";

export default function PropertyListScreen() {
  const properties: Property[] = propertiesData as Property[];
  
  const {
    searchTerm,
    filteredProperties,
    isSearching,
    handleSearchChange,
    handleSearch,
    hasResults,
    totalResults
  } = useSearch({ properties });

  const handlePropertyClick = (property: Property) => {
    console.log('Propiedad seleccionada:', property);
  };

  return (
    <div className="bg-white min-h-screen p-6 m-6 rounded-lg border-1 border-gray-300">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-semibold text-gray-600">Propiedades</p>
        <Button
          variant="black"
          icon={faPlus}
          onClick={() => {}}
        >
          Añadir nueva propiedad
        </Button>
      </div>

      <div className="flex justify-center mb-6">
        <SearchBar
          placeholder="Buscar propiedades..."
          value={searchTerm}
          onChange={handleSearchChange}
          onSearch={handleSearch}
        />
      </div>

      {searchTerm && (
        <div className="mb-4 text-center">
          {
            <div className="text-gray-600 text-sm">
              {hasResults 
                ? `Se encontraron ${totalResults} propiedades para "${searchTerm}"`
                : `No se encontraron propiedades para "${searchTerm}"`
              }
            </div>
          }
        </div>
      )}

      <PropertyTable
        properties={filteredProperties}
        onPropertyClick={handlePropertyClick}
      />
    </div>
  );
}
