import { LucideMessageSquareWarning } from 'lucide-react';
import React, { cloneElement } from 'react'
import { Button } from './ui/button';
import { ticketsPath } from '@/paths';
import Link from 'next/link';

type PlacehorderProps = {
  label?: string;
  icon?: React.ReactElement<any>;
  button?: React.ReactElement<any>
}

const Placeholder = ({label, icon = <LucideMessageSquareWarning />, button}: PlacehorderProps) => {
  return (
    <div className="flex-1 flex self-center flex-col items-center justify-center gap-y-2">
      {cloneElement(icon, {
          className: "h-16 w-16",
      })}
      <h2 className='text-center'>{label}</h2>
      
      {/* {cloneElement(button, {className: "h-10"})} */}
      <Button variant="outline" className="h-10" asChild>
        <Link href={ticketsPath()}>Go to tickets</Link>
      </Button>
    </div>
  )
}

export {Placeholder}