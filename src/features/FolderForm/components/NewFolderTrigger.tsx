import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

export const NewFolderTrigger = () => (
  <DialogTrigger
    render={
      <Button
        variant="outline"
        size="sm"
        className="max-sm:size-8 max-sm:p-0 sm:pl-1.5"
      />
    }
  >
    <FolderPlus className="size-4 sm:size-3.5" />
    <span className="max-sm:sr-only">Nova pasta</span>
  </DialogTrigger>
);
