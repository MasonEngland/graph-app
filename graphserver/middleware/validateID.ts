import {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';

export default function validateID(req: Request, res: Response, next: NextFunction) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next();
    }
    return res.status(400).json({
        success: false,
        errmsg: "invalid ID"
    });
}