import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  endSessionSchema,
  type EndSessionValuesType,
} from "@/data/schemas/end-session";

export const useEndSessionDialog = ({
  onSave,
  onDiscard,
  isSubmitting,
}: {
  onSave: (notes: string) => void | Promise<void>;
  onDiscard: () => void;
  isSubmitting: boolean;
}) => {
  const methods = useForm<EndSessionValuesType>({
    resolver: zodResolver(endSessionSchema),
    defaultValues: { notes: "" },
  });

  const handleDiscard = () => {
    if (isSubmitting) return;
    methods.reset({ notes: "" });
    onDiscard();
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) handleDiscard();
  };

  const onSubmit = async (values: EndSessionValuesType) => {
    await onSave(values.notes);
    methods.reset({ notes: "" });
  };

  return {
    methods,
    handleDiscard,
    handleOpenChange,
    onSubmit,
  };
};
