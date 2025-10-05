# Product Requirements Document (PRD)
## Property List Table Implementation

### 1. Overview
This PRD outlines the implementation of a property list table component that displays property data in a paginated table format. The table will be integrated into the existing PropertyListScreen and will display property information with clickable rows for future functionality.

### 2. Objectives
- Create a responsive property table with pagination
- Implement reusable components for property display
- Integrate with existing property data from JSON file
- Prepare for future click functionality on table rows

### 3. Functional Requirements

#### 3.1 Table Structure
The table must contain the following columns in Spanish:
- **Foto** (Photo) - Display property image
- **Oficina** (Office) - Display office/branch information
- **Referencia** (Reference) - Display property reference ID
- **Tipo** (Type) - Display property type
- **Dirección** (Address) - Display property location/address
- **Precio** (Price) - Display property price with currency
- **Habitaciones** (Rooms) - Display number of bedrooms
- **Superficie** (Surface) - Display property area in square meters
- **Fecha** (Date) - Display property listing date

#### 3.2 Pagination Requirements
- Display exactly 8 properties per page
- Implement pagination controls (Previous/Next buttons and page numbers)
- Show current page indicator
- Handle edge cases (first page, last page, empty results)

#### 3.3 Component Architecture

##### 3.3.1 PropertyList Component
**Location:** `src/components/ui/PropertyList.tsx`

**Props:**
- `properties: Property[]` - Array of property objects
- `onPropertyClick?: (property: Property) => void` - Optional click handler for future implementation

**Responsibilities:**
- Render the complete table structure with headers
- Implement pagination logic
- Manage current page state
- Pass individual properties to PropertyListItem components
- Handle pagination controls

##### 3.3.2 PropertyListItem Component
**Location:** `src/components/ui/PropertyListItem.tsx`

**Props:**
- `property: Property` - Single property object
- `onClick?: (property: Property) => void` - Optional click handler

**Responsibilities:**
- Render a single table row with property data
- Format property data for display (price, area, etc.)
- Handle click events on the row
- Display property image with fallback
- Show property status/type with appropriate styling

#### 3.4 Data Integration
- Import property data from `src/data/properties.json`
- Transform data to match table requirements
- Handle missing or incomplete property data gracefully
- Maintain data consistency across components

### 4. Technical Requirements

#### 4.1 Component Structure
```
src/components/ui/
├── PropertyList.tsx      # Main table component
└── PropertyListItem.tsx  # Individual row component
```

#### 4.2 Data Mapping
Map JSON properties to table columns:
- `images[0]` → Foto
- `id` → Referencia  
- `type` → Tipo
- `location` → Dirección
- `price` + `currency` → Precio
- `bedrooms` → Habitaciones
- `area` → Superficie
- `createdDate` or `listingDate` → Fecha (to be added to JSON if missing)

#### 4.3 Styling Requirements
- Use Tailwind CSS v4 for styling
- Implement responsive design for mobile and desktop
- Ensure table is visually consistent with existing design
- Add hover effects for clickable rows
- Style pagination controls appropriately

#### 4.4 State Management
- Manage current page state in PropertyList component
- Calculate total pages based on property count
- Handle page navigation (next, previous, specific page)
- Maintain selected property state for future functionality

### 5. Implementation Details

#### 5.1 PropertyList Component Features
- Table header with all required columns
- Pagination controls (Previous, page numbers, Next)
- Responsive table layout
- Loading state handling
- Empty state handling

#### 5.2 PropertyListItem Component Features
- Clickable row with hover effects
- Image display with fallback
- Formatted price display
- Status/type indicators
- Responsive cell content

#### 5.3 Integration with PropertyListScreen
- Import and use PropertyList component
- Pass property data from JSON file
- Maintain existing header and search functionality
- Position table below search bar

### 6. Data Requirements

#### 6.1 Property Object Structure
Ensure each property object contains:
- `id` - Unique identifier
- `title` - Property title
- `price` - Numeric price value
- `currency` - Currency code (EUR)
- `location` - Property address/location
- `bedrooms` - Number of bedrooms
- `area` - Property area in square meters
- `type` - Property type (apartamento, casa, etc.)
- `images` - Array of image URLs
- `status` - Property status (en venta, en alquiler)

#### 6.2 Missing Data Handling
- Provide fallback values for missing fields
- Display "N/A" or placeholder for empty data
- Handle missing images with placeholder
- Ensure consistent data formatting

### 7. Future Considerations

#### 7.1 Click Functionality
- PropertyListItem should be clickable
- Prepare for modal/detail view implementation
- Maintain property selection state
- Add visual feedback for selected items

#### 7.2 Extensibility
- Design components to be easily extensible
- Support for additional columns in the future
- Flexible data structure for new property fields
- Reusable pagination component

### 8. Acceptance Criteria

#### 8.1 Functional Criteria
- [ ] Table displays all 10 properties from JSON data
- [ ] Pagination shows 8 items per page (2 pages total)
- [ ] All required columns are present and properly labeled
- [ ] PropertyListItem components are clickable
- [ ] Pagination controls work correctly
- [ ] Data is properly formatted and displayed

#### 8.2 Technical Criteria
- [ ] Components are properly typed with TypeScript
- [ ] Code follows existing project structure
- [ ] Tailwind CSS is used for styling
- [ ] Components are reusable and maintainable
- [ ] No console errors or warnings

#### 8.3 Integration Criteria
- [ ] PropertyListScreen successfully imports and uses new components
- [ ] Existing functionality (header, search) remains intact
- [ ] Table integrates seamlessly with current design
- [ ] Responsive design works on mobile and desktop

### 9. Dependencies
- React 18+
- Tailwind CSS v4
- Existing property data structure
- FontAwesome icons (if needed for pagination)

### 10. Risks and Mitigation
- **Risk:** Missing property data fields
  - **Mitigation:** Add fallback values and data validation
- **Risk:** Performance with large datasets
  - **Mitigation:** Implement efficient pagination and lazy loading
- **Risk:** Responsive design challenges
  - **Mitigation:** Use Tailwind responsive utilities and test on multiple devices

### 11. Success Metrics
- Table loads and displays all property data correctly
- Pagination functions properly with 8 items per page
- Components are reusable and maintainable
- Integration with existing screen is seamless
- Code quality meets project standards
