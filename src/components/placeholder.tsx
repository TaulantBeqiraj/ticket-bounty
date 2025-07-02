import { LucideMessageSquareWarning } from 'lucide-react';
import React, { cloneElement } from 'react'

type PlacehorderProps = {
  label?: string;
  icon?: React.ReactElement<any>;
  button?: any
}

const Placeholder = ({label, icon = <LucideMessageSquareWarning />, button}: PlacehorderProps) => {
  return (
    <div className="flex-1 flex self-center flex-col items-center justify-center gap-y-2">
      {cloneElement(icon, {
          className: "h-16 w-16",
      })}
      <h2 className='text-center'>{label}</h2>
      
      {cloneElement(button, {className: "h-10"})}
    </div>
  )
}

export {Placeholder}