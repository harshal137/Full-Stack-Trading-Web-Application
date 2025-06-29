
const jwt = require("jsonwebtoken")

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized, Login Again' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode?.id) {
            req.user = { id: tokenDecode.id }; // ✅ Clean way to attach user data
            next();
        } else {
            return res.json({ success: false, message: 'Not Authorized, Login Again' });
        }

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

module.exports = userAuth
