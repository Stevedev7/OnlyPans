import { Secret, sign, verify } from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'this is a very confidential secret key.';

export const generateToken = (payload: any) => {
    return new Promise((resolve, reject) => {
        sign(payload, JWT_SECRET as Secret, {
            expiresIn: '3h'
        }, (error, token) => {
            if(error) {return reject(error);}
            return resolve(token);
        });
    });
};

export const verifyToken = async (token: string) => {
    return new Promise((resolve, reject) => {
        verify(token, JWT_SECRET as Secret, (error, payload) => {
            if(error) {return reject(error);}
            return resolve(payload);
        });
    });
};

export default {
    generateToken,
    verifyToken
};