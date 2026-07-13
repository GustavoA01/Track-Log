import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type AvatarButtonProps = {
  name?: string | null;
};

export const AvatarButton = ({ name }: AvatarButtonProps) => {
  const initial = name?.trim().charAt(0).toUpperCase() || "?";

  return (
    <Avatar>
      <AvatarFallback>{initial}</AvatarFallback>
    </Avatar>
  );
};
