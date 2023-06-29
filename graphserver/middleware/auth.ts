import {Request, Response, NextFunction} from 'express';
import { default as env } from 'dotenv';
import { default as jwt } from 'jsonwebtoken';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    env.config();
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {return res.status(401).json({success: false, errmsg: "invalid token"})}

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: Error, data: any) => {
        if (err) return res.status(403).json({success: false, errmsg: "problem with token"})

        next();
    })
}

export default authenticateToken;