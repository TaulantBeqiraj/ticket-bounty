import { LucideLoaderCircle } from "lucide-react";

const Spinner = () => {

  return(
    <div className="flex-1 flex items-center justify-center self-center">
      <LucideLoaderCircle className=" h-12 w-12 animate-spin"/>
    </div>
  );
}

export {Spinner};