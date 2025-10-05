import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
}

export default function SearchBar({
  placeholder = "Buscar",
  value = "",
  onChange,
  onSearch,
  onKeyPress,
  className = "",
  disabled = false,
  maxLength,
  autoFocus = false
}: SearchBarProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange?.(newValue);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch?.(value);
    }
    onKeyPress?.(event);
  };

  const baseClasses = "w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const disabledClasses = disabled ? "bg-gray-100 cursor-not-allowed" : "";
  const classes = `${baseClasses} ${disabledClasses} ${className}`;

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FontAwesomeIcon 
          icon={faSearch} 
          className={`${disabled ? 'text-gray-300' : 'text-gray-400'}`} 
        />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        maxLength={maxLength}
        autoFocus={autoFocus}
        className={classes}
      />
    </div>
  );
}
