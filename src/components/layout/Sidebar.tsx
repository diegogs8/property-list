import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faHeart,
  faBell,
  faMap,
  faFileAlt,
  faChartPie,
  faUsers,
  faBuilding,
  faGear,
  faRightFromBracket,
  faArrowRight,
  faArrowLeft,
  faUserPlus,
  faPeopleGroup,
  faCoins,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";
import SidebarButton from "../ui/sidebar/SidebarButton";

const menuItems = [
  { icon: faHouse, label: "Inicio", id: "inicio" },
  { icon: faUserPlus, label: "Usuarios", id: "usuarios" },
  { icon: faUsers, label: "Grupos", id: "grupos" },
  { icon: faHeart, label: "Favoritos", id: "favoritos" },
  { icon: faCoins, label: "Precios", id: "precios" },
  { icon: faBuilding, label: "Propiedades", id: "propiedades" },
  { icon: faCalendar, label: "Calendario", id: "calendario" },
  { icon: faFileAlt, label: "Archivos", id: "archivos" },
  { icon: faMap, label: "Mapa", id: "mapa" },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState("propiedades");

  return (
    <aside
      className={`h-screen flex flex-col justify-between bg-white border-r border-gray-300 shadow-sm transition-all duration-300
      ${expanded ? "w-48" : "w-16"}`}
    >
      <div className="relative flex flex-col items-center py-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className={`absolute top-10 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 shadow hover:bg-gray-100
          transition-all duration-300 ${expanded ? "left-45" : "left-13"}`}
        >
          <FontAwesomeIcon icon={expanded ? faArrowLeft : faArrowRight} size="xs" className="text-neutral-700"/>
        </button>

        <div className="flex flex-col gap-4 w-full">
          {menuItems.map((item) => (
            <SidebarButton
              key={item.id}
              icon={item.icon}
              label={item.label}
              selected={selectedItem === item.id}
              expanded={expanded}
              onClick={() => setSelectedItem(item.id)}
            />
          ))}
        </div>
      </div>


      <div className="flex flex-col border-t p-4 gap-3 border-t-2 border-gray-100">
        <SidebarButton
          icon={faGear}
          label="Ajustes"
          selected={false}
          expanded={expanded}
          onClick={() => {}}
        />

        <SidebarButton
          icon={faRightFromBracket}
          label="Salir"
          selected={false}
          expanded={expanded}
          onClick={() => {}}
        />
      </div>
    </aside>
  );
}
