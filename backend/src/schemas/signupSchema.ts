import z from "zod";

export const signinSchema = z.object({
    email: z
        .email("Informe um e-mail válido!")
        .trim()
        .nonoptional("E-mail é obrigatório!"),
    password: z
        .string("Informe um texto corretamente!")
        .trim()
        .min(6, "Informe uma senha de no mínimo 6 caracteres!")
        .nonoptional("Senha é obrigatória!")
});

export type SigninSchemaType = z.infer<typeof signinSchema>;