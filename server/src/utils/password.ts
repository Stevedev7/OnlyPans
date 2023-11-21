import crypto from 'crypto';


export const hashPassword = (plainPassword: string) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(32).toString('base64');
        crypto.pbkdf2(plainPassword, salt, 100, 32, 'sha512', (error, hash) => {
            if (error){
                return reject(error);
            }
            const hashedPassword =  salt + ':' + hash.toString('base64');
            resolve(hashedPassword);
        });
    });
};

export const comparePassword = (plainPassword: string, hashedPassword: string) => {
    return new Promise((resolve, reject) => {
        const [salt, hash] = hashedPassword.split(':');
        crypto.pbkdf2(plainPassword, salt, 100, 32, 'sha512', (error, newHash) => {
            if(error){
                return reject(error);
            }
            resolve(hash == newHash.toString('base64'));
        });
    });
};

export default {
    hashPassword,
    comparePassword
};