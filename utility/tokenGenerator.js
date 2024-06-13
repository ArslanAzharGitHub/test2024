import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'anySecret';

const generateToken = ({ email, id }) => {
    const token = jwt.sign({ email, id }, JWT_SECRET);
    return {
        id,
        token
    }
}

export default generateToken;