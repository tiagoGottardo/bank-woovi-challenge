import React from 'react'

import { Input as ShadcnInput } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type InputProps = {
  id: string,
  type: string,
  label?: string,
  value: string,
  touched: boolean | undefined,
  error?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  error,
  label,
  value,
  touched,
  onChange,
  onBlur
}) => {
  return (
    <div className="text-start m-8 my-0">
      <Label className={`${touched && error && "text-red-600"}`}>{label}</Label>
      <ShadcnInput
        className={`
          h-12 rounded-sm focus-visible:border-2 
          ${touched && error ?
            "focus-visible:border-red-600 ring-0 border-red-600"
            : "focus-visible:border-woovi focus-visible:ring-0  hover:border-black hover:border-1"}
          `}

        id={id}
        type={type}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        required
      />
      {touched && error && <div className="text-red-600 text-sm">{error}</div>}
    </div >
  )
}

export default Input
