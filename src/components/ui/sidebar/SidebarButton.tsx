import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface SidebarButtonProps {
  icon: IconDefinition;
  label: string;
  selected: boolean;
  expanded: boolean;
  onClick?: () => void;
}

export default function SidebarButton({ 
  icon, 
  label, 
  selected, 
  expanded, 
  onClick 
}: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
        expanded ? "px-4" : "justify-center"
      } ${
        selected 
          ? "bg-gray-200 shadow-sm" 
          : "hover:bg-gray-100"
      }`}
    >
      <FontAwesomeIcon 
        icon={icon} 
        className={`${
          selected 
            ? "text-gray-800" 
            : "text-gray-400"
        }`} 
      />
      {expanded && (
        <span className={`text-sm ${
          selected 
            ? "text-gray-800 font-medium" 
            : "text-gray-700"
        }`}>
          {label}
        </span>
      )}
    </button>
  );
}
