import React, { useEffect, useRef } from 'react';
import IMask from 'imask';
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type InputProps = {
  id: string;
  type: string;
  label?: string;
  value: string | number;
  prefix?: string
  touched?: boolean;
  mask?: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  error,
  label,
  touched,
  prefix,
  mask,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && mask) {
      const maskInstance = IMask(inputRef.current, {
        mask,
        blocks: {
          currency: {
            mask: Number,
            max: 9999999999999,
            radix: '.',
          }
        }
      });

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
      <div className="flex justify-center items-center">
        {prefix &&
          <div className="rounded-l-sm bg-gray-200 h-12 flex items-center p-2 mr-2">{prefix}</div>
        }
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
      </div>
      {touched && error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
};

export default Input;
