import React from 'react';
import { IconType } from 'react-icons';

interface Option {
  value: number | string;
  label: string;
}

export interface FormInputProps {
  label: string;
  name: string;
  type: 'text' | 'textarea' | 'datetime-local' | 'select';
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  min?: string;
  placeholder?: string;
  rows?: number;
  icon?: IconType;
  options?: Option[];
}

export default function FormInput({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
  min,
  placeholder,
  rows = 3,
  icon: Icon,
  options
}: FormInputProps) {
  const commonClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const iconClasses = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400";
  const inputWrapperClasses = "relative";

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value as string}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            rows={rows}
            className={`${commonClasses} pl-10`}
          />
        );
      case 'select':
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`${commonClasses} pl-10 appearance-none`}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={type}
            name={name}
            value={value as string}
            onChange={onChange}
            required={required}
            min={min}
            placeholder={placeholder}
            className={`${commonClasses} pl-10`}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className={inputWrapperClasses}>
        {Icon && <Icon className={iconClasses} />}
        {renderInput()}
      </div>
    </div>
  );
} 