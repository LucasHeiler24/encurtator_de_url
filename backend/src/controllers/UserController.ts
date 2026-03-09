import type { Request, Response } from "express";
import z from "zod";
import { signupSchema } from "../schemas/signinSchema.js";
import { signinSchema } from "../schemas/signupSchema.js";
import { prisma } from "../lib/db.js";
import bcrypt from "bcrypt";
import { createToken } from "../jwt/jwt.js";

export async function signup(req:Request, res:Response){
    const result = z.safeParse(signupSchema, req.body);
    if(result.error)
        return res.status(400).json({statusCode: 400, errors: result.error});

    result.data.password = bcrypt.hashSync(result.data.password, bcrypt.genSaltSync(10));
    await prisma.users.create({
        data: result.data
    });

    return res.status(201).json({statusCode: 201, message: "User created with success."});
}

export async function signin(req:Request, res:Response){
    const result = z.safeParse(signinSchema, req.body);
    if(result.error)
        return res.status(400).json({statusCode: 400, errors: result.error});

    const user = await prisma.users.findUnique({
        where: {
            email: result.data.email
        }
    });

    if(!user || !bcrypt.compareSync(result.data.password, user.password))
        return res.status(401).json({statusCode: 401, error: "User anauthorized."});

    const loginToken = createToken(user, 'login');
    const refreshToken = createToken(user, 'refresh');

    const existRefresh = await prisma.refresh_tokens.findFirst({
        where: {
            id_user: user.id
        }
    });

    if(!existRefresh){
        await prisma.refresh_tokens.create({
            data: {
                id_user: user.id,
                refresh_token: refreshToken
            }
        });
    }
    else {
        await prisma.refresh_tokens.update({
            where: {
                id: existRefresh.id
            },
            data: {
                refresh_token: refreshToken
            }
        });
    }

    return res.status(200).json({statusCode: 200, token: loginToken});
}