import { jwt } from "jsonwebtoken";


export const auth = (req, res, next) => {

    // get the token from the header
    const token = req.header('x-auth-token');

    // check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // add user from payload
        req.user = decoded.user;
        next();

    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
    