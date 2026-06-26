import { FolderPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

export const NewFolderTrigger = () => (
  <DialogTrigger
    render={
      <Button variant="outline" size="sm" className="hidden sm:inline-flex" />
    }
  >
    <FolderPlus data-icon="inline-start" />
    Nova pasta
  </DialogTrigger>
);
