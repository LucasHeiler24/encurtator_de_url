import z from "zod";

export const signupSchema = z.object({
    full_name: z
        .string("Informe um texto corretamente!")
        .trim()
        .min(3, "Informe seu nome corretamente!")
        .nonoptional("Nome é obrigatório!"),
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

export type SignupSchemaType = z.infer<typeof signupSchema>;