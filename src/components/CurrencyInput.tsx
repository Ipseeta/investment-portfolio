import { useState } from 'react';

interface CurrencyInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function CurrencyInput({ id, label, value, onChange }: CurrencyInputProps) {
  const [focused, setFocused] = useState(false);

  const displayValue = focused && value === '0' ? '' : value;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="block mb-1 font-medium text-sm">
        {label}
      </label>
      <div className="flex">
        <span className="inline-flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md text-sm">
          &#8377;
        </span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          id={id}
          value={displayValue}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            if (value === '') onChange('0');
          }}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9.]/g, '');
            const cleaned = raw.replace(/^0+(\d)/, '$1');
            onChange(cleaned);
          }}
          className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
    </div>
  );
}
