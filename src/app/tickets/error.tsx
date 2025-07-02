"use client"

import Link from "next/link";
import {Placeholder} from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";

export default function Error({error}: {error: Error}) {
   return <Placeholder 
      label={error.message ?? "Something went wrong!"}
      button={<Button asChild variant="outline">
          <Link href={ticketsPath()}>Go to tickets</Link>
      </Button>}
   />
}