import mongoose from 'mongoose';
export default function validateID(req, res, next) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next();
    }
    return res.status(400).json({
        success: false,
        errmsg: "invalid ID"
    });
}
//# sourceMappingURL=validateID.js.map