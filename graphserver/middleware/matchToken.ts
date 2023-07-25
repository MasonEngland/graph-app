import {Request, Response, NextFunction} from 'express';

// not so pointless after all
export default function matchToken(req: Request, res: Response, next: NextFunction) {
    if (req.params.id != req.body.tokenID) {
        return res.status(401).json({
            success: false,
            errmsg: "illegal token"
        })
    }
    next();
}
