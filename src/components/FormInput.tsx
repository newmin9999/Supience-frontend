import React from 'react';
import { IconType } from 'react-icons';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  min?: string;
  icon?: IconType;
  rows?: number;
  placeholder?: string;
}

export default function FormInput({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
  min,
  icon: Icon,
  rows,
  placeholder,
}: FormInputProps) {
  const inputClassName = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {Icon && <Icon className="inline-block mr-2" />}
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={inputClassName}
          required={required}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClassName}
          required={required}
          min={min}
          placeholder={placeholder}
        />
      )}
    </div>
  );
} 