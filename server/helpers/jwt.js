const jwt = require("jsonwebtoken");
// const { use } = require("react");
const secretCode = "bebas";

const tokenGenerator = (data) => {
    const { id, name, email, role } = data;
    const token = jwt.sign(
        {
            id,
            name,
            email,
            role,
        },
        secretCode
    );
    return token;
};

const tokenVerifier = (data) => {
    const verifiedToken = jwt.verify(data, secretCode);

    return verifiedToken;
}

module.exports = {
    tokenGenerator,
    tokenVerifier,
}