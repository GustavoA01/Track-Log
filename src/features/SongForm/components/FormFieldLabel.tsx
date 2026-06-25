import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldLabelProps = {
  htmlFor?: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
};

export function FormFieldLabel({
  htmlFor,
  icon: Icon,
  children,
  className,
}: FormFieldLabelProps) {
  return (
    <Label
      htmlFor={htmlFor}
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      <Icon className="size-3.5 shrink-0 text-muted-foreground" />
      {children}
    </Label>
  );
}
