# Property List - Sistema de Gestión de Propiedades

Una aplicación web moderna para la gestión y visualización de propiedades inmobiliarias, desarrollada con React, TypeScript y Tailwind CSS.

## 📋 Tabla de Contenidos

- [Instalación y Ejecución](#instalación-y-ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Decisiones Técnicas](#decisiones-técnicas)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Desafíos y Soluciones](#desafíos-y-soluciones)
- [Mejoras Futuras](#mejoras-futuras)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd property-list
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter ESLint

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── layout/          # Componentes de layout
│   │   └── Sidebar.tsx  # Barra lateral de navegación
│   └── ui/              # Componentes de interfaz
│       ├── Button.tsx   # Botón personalizado
│       ├── PropertyDetailModal.tsx  # Modal de detalles
│       ├── PropertyTable.tsx        # Tabla de propiedades
│       ├── PropertyTableItem.tsx    # Item de tabla
│       ├── SearchBar.tsx            # Barra de búsqueda
│       └── sidebar/                 # Componentes del sidebar
│           └── SidebarButton.tsx    # Botón del sidebar
├── data/                # Datos estáticos
│   └── properties.json  # Base de datos de propiedades
├── hooks/               # Hooks personalizados
│   └── useSearch.ts     # Hook de búsqueda
├── screens/             # Pantallas principales
│   └── PropertyListScreen.tsx  # Pantalla principal
├── types/               # Definiciones de tipos
│   └── Property.ts      # Interfaz de Property
├── App.jsx              # Componente principal
├── main.jsx             # Punto de entrada
└── index.css            # Estilos globales
```

## 🛠 Decisiones Técnicas

### Arquitectura y Organización

1. **Separación de Responsabilidades**
   - `screens/`: Pantallas principales de la aplicación
   - `components/ui/`: Componentes reutilizables de interfaz
   - `components/layout/`: Componentes de estructura
   - `hooks/`: Lógica reutilizable
   - `types/`: Definiciones de TypeScript

2. **Gestión de Estado**
   - Estado local con `useState` para simplicidad
   - Hook personalizado `useSearch` para lógica de búsqueda
   - No se implementó Redux/Zustand por la simplicidad del proyecto

3. **Estilos**
   - **Tailwind CSS**: Para estilos utilitarios y diseño responsivo
   - **FontAwesome**: Para iconografía consistente
   - Diseño mobile-first con breakpoints responsivos

4. **Datos**
   - **JSON estático**: Para simplicidad y rapidez de desarrollo
   - Estructura de datos tipada con TypeScript
   - Fácil migración futura a API REST

### Patrones de Diseño

1. **Componentes Funcionales**: Uso exclusivo de React Hooks
2. **Props Drilling Controlado**: Para componentes simples
3. **Composición**: Componentes pequeños y especializados
4. **Custom Hooks**: Para lógica reutilizable (búsqueda)

## ✨ Funcionalidades Implementadas

### 🔍 Sistema de Búsqueda Avanzado

- **Búsqueda en tiempo real** con debounce (300ms)
- **Múltiples campos de búsqueda**: título, ubicación, tipo, estado, oficina, ID
- **Búsqueda en arrays**: características de propiedades
- **Indicadores visuales**: estado de búsqueda y contador de resultados

```typescript
// Ejemplo de uso del hook de búsqueda
const {
  searchTerm,
  filteredProperties,
  isSearching,
  handleSearchChange,
  hasResults,
  totalResults
} = useSearch({ properties });
```

### 📊 Tabla de Propiedades Interactiva

- **Paginación**: 8 propiedades por página
- **Ordenamiento**: Por precio y fecha (ascendente/descendente)
- **Diseño responsivo**: Vista de tabla en desktop, cards en móvil
- **Navegación intuitiva**: Controles de paginación con elipsis

### 🏠 Modal de Detalles de Propiedad

- **Vista completa**: Información detallada de la propiedad
- **Galería de imágenes**: Navegación entre múltiples fotos
- **Información estructurada**: Precio, características, descripción
- **Cierre intuitivo**: Click en backdrop o botón de cerrar

### 🎨 Interfaz de Usuario

- **Sidebar colapsible**: Navegación expandible/contraíble
- **Diseño moderno**: Colores neutros y tipografía clara
- **Responsive design**: Adaptable a todos los dispositivos
- **Estados de carga**: Indicadores visuales durante búsquedas

### 📱 Experiencia Móvil

- **Vista optimizada**: Cards en lugar de tabla en móvil
- **Touch-friendly**: Botones y áreas de toque apropiadas
- **Navegación simplificada**: Sidebar colapsible por defecto

## 🚧 Desafíos y Soluciones

### 1. **Ordenamiento de Fechas**

**Desafío**: Las fechas estaban en formato DD-MM-YYYY, no compatible con ordenamiento nativo.

**Solución**: Implementé una función de parsing personalizada:
```typescript
const parseDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).getTime();
};
```

### 2. **Búsqueda Eficiente**

**Desafío**: Búsqueda en tiempo real sin afectar el rendimiento.

**Solución**: 
- Implementé debounce para evitar búsquedas excesivas
- Búsqueda en múltiples campos con `Array.some()`
- Filtrado optimizado con `useCallback`

### 3. **Paginación Compleja**

**Desafío**: Mostrar navegación de páginas intuitiva con elipsis.

**Solución**: Algoritmo que muestra páginas relevantes:
```typescript
const shouldShow = 
  page === 1 || 
  page === totalPages || 
  (page >= currentPage - 1 && page <= currentPage + 1);
```

### 4. **Responsive Design**

**Desafío**: Adaptar tabla compleja a dispositivos móviles.

**Solución**: 
- Vista de tabla en desktop (`hidden md:block`)
- Vista de cards en móvil (`md:hidden`)
- Información condensada pero completa

### 5. **Gestión de Estado del Modal**

**Desafío**: Controlar apertura/cierre del modal y datos seleccionados.

**Solución**: Estado sincronizado con `useState`:
```typescript
const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);
```

## 🔮 Mejoras Futuras

### Funcionalidades Prioritarias

1. **Sistema de Filtros Avanzados**
   - Filtros por rango de precio
   - Filtros por tipo de propiedad
   - Filtros por ubicación

2. **Gestión de Propiedades**
   - Formulario para añadir nuevas propiedades
   - Edición de propiedades existentes
   - Eliminación de propiedades

3. **Funcionalidades Adicionales**
   - Sistema de propiedades favoritas
   - Comparación de propiedades
   - Modo oscuro o personalización del tema

### Mejoras Técnicas

1. **Estado Global**
   - Implementar stores con Redux

2. **Testing**
   - Tests unitarios con Jest/Vitest
   - Tests de integración con Testing Library

3. **Performance**
   - Lazy loading de imágenes

4. **Internacionalización**
   - Soporte multiidioma (i18n)
   - Formateo de fechas, números y monedas localizado

## 🛠 Tecnologías Utilizadas

### Frontend
- **React 19.1.1** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite 7.1.7** - Build tool y dev server
- **Tailwind CSS 4.1.14** - Framework de estilos

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **FontAwesome** - Iconografía

### Estructura de Datos
- **JSON** - Base de datos estática
- **TypeScript Interfaces** - Definición de tipos

---

## 📝 Notas de Desarrollo

Este proyecto fue desarrollado como una demostración de habilidades en React y TypeScript, enfocándose en:

- **Código limpio y mantenible**
- **Experiencia de usuario fluida**
- **Diseño responsivo**
- **Arquitectura escalable**

La aplicación está lista para ser extendida con funcionalidades adicionales y puede servir como base para un sistema de gestión inmobiliaria más complejo.

---

*Desarrollado con ❤️ usando React y TypeScript*
