import z from "zod";

export const urlSchema = z.object({
    url_user: z
        .url("Informe uma url válida!")
        .trim()
        .nonoptional("Url é obrigatório!"),
    url_encurt: z
        .url("Informe uma url válida!")
        .trim()
});

export type UrlSchemaType = z.infer<typeof urlSchema>;