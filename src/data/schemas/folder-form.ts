import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || z.string().url().safeParse(value).success,
    { message: "Informe uma URL válida" },
  );

export const folderFormSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  imageUrl: optionalUrl,
});

export type FolderFormValuesType = z.infer<typeof folderFormSchema>;

export const folderFormDefaultValues: FolderFormValuesType = {
  name: "",
  imageUrl: "",
};
