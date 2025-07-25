'use client';

import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import React, { cloneElement } from 'react'
import clsx from "clsx";

type SubmitButtonProps = {
  label?: string;
  icon?: React.ReactElement<any>;
  variant?: | "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon"
}
      
const SubmitButton = ({label, icon, variant, size}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return(
    <Button disabled={pending} type="submit" variant={variant} size={size} className="w-full">
      {pending && <LucideLoaderCircle className={clsx(
        "w-4 h-4 animate-spin",
        {"mr-2": !!label},
        )}/>}
      {label}
      { pending ? null : icon ? (
        <span>
          {cloneElement(icon, {
              className: "h-4 w-4",
          })}
        </span>) :
        null
       }
    </Button>
  )
}

export {SubmitButton}