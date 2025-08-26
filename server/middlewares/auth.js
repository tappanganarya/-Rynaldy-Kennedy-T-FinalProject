const { Item } = require("../models/");
const { tokenVerifier } = require("../helpers/jwt");

const authentication = (req, res, next) => {
    console.log("Authentication");
    const { access_token } = req.headers;

    if (!access_token) {
        return res.status(401).json({ message: "Token not found" });
    }

    try {
        const decoded = tokenVerifier(access_token);
        req.userData = decoded;
        next();
    } catch (err) {
        console.error("JWT error:", err);
        return res.status(401).json({ message: "Invalid token" });
    }
};


const authorization = async (req, res, next) => {
    console.log("Authorization");

    try {
        const id = +req.params.id;
        const UserId = req.userData.id;
        const item = await Item.findOne({
            where: { id },
        });
        if (item) {
            if (item.UserId === UserId) {
                next();
            } else {
                throw {
                    message: "You are not allowed",
                };
            }
        } else {
            throw {
                message: "Item not Found"
            }
        }
    } catch (err) {
        res.send(err);
    }
};

module.exports = {
    authentication,
    authorization,
}