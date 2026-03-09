import type { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import z from "zod";
import { urlSchema } from "../schemas/urlSchema.js";

export async function all(req:Request, res:Response){
    const data = await prisma.urls.findMany({
        where: {
            id_user: req.user.id
        }
    });

    return res.status(200).json({statusCode: 200, data});
}

export async function createUrl(req:Request, res:Response){
    const result = z.safeParse(urlSchema, req.body);
    if(result.error)
        return res.status(400).json({statusCode: 400, errors: result.error});

    await prisma.urls.create({
        data: {
            url_encurt: result.data.url_encurt,
            url_user: result.data.url_user,
            id_user: req.user.id
        }
    });

    return res.status(201).json({statusCode: 201, message: 'Url created with success!'});
}

export async function deleteUrl(req:Request, res:Response){
    const id = req.params.id;
    await prisma.urls.delete({where: {id: id}});
    return res.status(204);
}

export async function redirect(req:Request, res:Response){
    const key = req.params.key;
    const url = await prisma.urls.findUnique({where: {url_encurt: `http://localhost:8000/url/${key}`}});
    return (!url) ? 
        res.status(404).json({statusCode: 404, message: 'Url not found!'}) : 
        res.redirect(url.url_user);
}