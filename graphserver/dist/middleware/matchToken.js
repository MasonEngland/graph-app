// not so pointless after all
export default function matchToken(req, res, next) {
    if (req.params.id != req.body.tokenID) {
        return res.status(401).json({
            success: false,
            errmsg: "illegal token"
        });
    }
    next();
}
//# sourceMappingURL=matchToken.js.map