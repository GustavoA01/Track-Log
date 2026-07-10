import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

export const NewFolderTrigger = () => (
  <DialogTrigger render={<Button variant="outline" size="sm" />}>
    <FolderPlus data-icon="inline-start" />
    <span className="max-sm:sr-only">Nova pasta</span>
  </DialogTrigger>
);
