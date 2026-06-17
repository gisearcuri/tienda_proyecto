import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET;

const validateToken = (req, res, next) => {
    const {token_usuario} = req.headers;
    jwt.verify(token_usuario, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido o expirado" });
        }
        req.infoUser = decoded;
        next();
    });
};

export default validateToken;