import type { NextFunction, Request, Response } from "express";
import { decodeToken, verifyToken } from "../jwt/jwt.js";

export async function auth(req: Request, res:Response, next: NextFunction){
    if(!req.headers['authorization'])
        return res.status(401).json({statusCode: 401, message: 'User anauthorized.'});

    const token = req.headers['authorization']?.split(' ')[1];
    if(!verifyToken(token!))
        return res.status(401).json({statusCode: 401, message: 'User anauthorized.'});
    
    req.user = decodeToken(token!);
    next();
}