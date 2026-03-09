import jwt from "jsonwebtoken";
import type { UserType } from "../types/UserType.js";

export function createToken(data:Omit<UserType, 'password' | 'email'>, type: 'login' | 'refresh'):string {
    return jwt.sign(data, process.env.SECRET_TOKEN!, {
        algorithm: 'HS256',
        expiresIn: type == 'login' ? '1d' : '7d'
    });
}

export function decodeToken(token:string): boolean | null | jwt.JwtPayload | string {
    return (!verifyToken(token)) ? false : jwt.decode(token)
}

export function verifyToken(token:string):boolean {
    try{
        jwt.verify(token, process.env.SECRET_TOKEN!);
        return true;
    }
    catch(e){
        return false;
    }
}