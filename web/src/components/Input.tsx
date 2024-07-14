import React, { useEffect, useRef } from 'react';
import IMask from 'imask';
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type InputProps = {
  id: string;
  type: string;
  label?: string;
  value: string;
  touched?: boolean;
  mask?: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  error,
  label,
  touched,
  mask,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && mask) {
      const maskInstance = IMask(inputRef.current, { mask });
      return () => maskInstance.destroy();
    }
  }, [mask]);

  return (
    <div className="text-start m-8 my-0">
      {label && (
        <Label className={`${touched && error ? "text-red-600" : ""}`}>
          {label}
        </Label>
      )}
      <ShadcnInput
        ref={inputRef}
        className={`
          h-12 rounded-sm focus-visible:border-2 
          ${touched && error
            ? "focus-visible:border-red-600 ring-0 border-red-600"
            : "focus-visible:border-woo-green focus-visible:ring-0 hover:border-black hover:border-1"}
          `}
        {...rest}
      />
      {touched && error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
};

export default Input;
