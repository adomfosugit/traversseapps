'use client';

import { BiDollar } from 'react-icons/bi';

interface IUnregisteredInputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  placeholder?: string;
  required?: boolean;
  styles?: string;
  value: string;
}

const UnregisteredInput = ({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  placeholder,
  required,
  value,
  styles,
}: IUnregisteredInputProps) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        value={value}
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-base
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${styles ? styles : ''}
        `}
      />
      <label
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default UnregisteredInput;
