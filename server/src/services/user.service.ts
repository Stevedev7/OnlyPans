import User from '../interfaces/User.interface'
import db from '../utils/db'
import { hashPassword } from '../utils/password';

export const createUser = async (user: Pick<User, 'email' | 'firstName' |'lastName' | 'password'>) : Promise< {user: Pick<User, "email">;}>=> {
    try{
        const { email, firstName, lastName, password } = user;
        const hash : any = await hashPassword(password);
        await db.auth.create({
            data:   {
                email,
                password:hash
            }
        })
        await db.userProfile.create({
            data: {
                emailId: email,
                firstName,
                lastName,
            }
        })

        return {
            user: {
                email
            }
        }
    } catch(error) {
        throw error
    }
}


export const getUserProfile = async (id: number) => {
    try {
        const user = await db.userProfile.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                emailId: true,
                firstName: true,
                lastName: true,
            }
        })
        if(! user){
            throw Error("Invalid ID")
        }
        return user
    } catch(error){
        throw error
    }
}


export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.auth.findUnique({
            where: {
                email
            },
            select: {
                password: true,
                UserProfile: true
            }
        });
        return user
        
    } catch (error) {
        throw error
    }
}

export default {
    createUser,
    getUserProfile,
    getUserByEmail
}
