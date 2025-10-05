import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/ui/Button";
import SearchBar from "../components/ui/SearchBar";
import PropertyTable from "../components/ui/PropertyTable";
import { Property } from "../types/Property";
import propertiesData from "../data/properties.json";

export default function PropertyListScreen() {
  const properties: Property[] = propertiesData as Property[];

  const handleAddProperty = () => {
    // TODO: Implementar lógica para añadir nueva propiedad
    console.log('Añadir nueva propiedad');
  };

  const handleSearch = (searchTerm: string) => {
    // TODO: Implementar lógica de búsqueda
    console.log('Buscar:', searchTerm);
  };

  const handleSearchChange = (value: string) => {
    // TODO: Implementar lógica de cambio en búsqueda (debounce, etc.)
    console.log('Cambio en búsqueda:', value);
  };

  const handlePropertyClick = (property: Property) => {
    // TODO: Implementar lógica para mostrar detalles de la propiedad
    console.log('Propiedad seleccionada:', property);
  };

  return (
    <div className="bg-white min-h-screen p-6 m-6 rounded-lg border-1 border-gray-300">
      {/* Primera línea: Título y botón */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-semibold text-gray-600">Propiedades</p>
        <Button
          variant="black"
          icon={faPlus}
          onClick={handleAddProperty}
        >
          Añadir nueva propiedad
        </Button>
      </div>

      {/* Segunda línea: Barra de búsqueda */}
      <div className="flex justify-center mb-6">
        <SearchBar
          placeholder="Buscar"
          onChange={handleSearchChange}
          onSearch={handleSearch}
        />
      </div>

      {/* Tabla de propiedades */}
      <PropertyTable
        properties={properties}
        onPropertyClick={handlePropertyClick}
      />
    </div>
  );
}
