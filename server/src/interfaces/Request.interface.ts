import { Request as ExpressRequest } from "express";
import User from "./User.interface";

export default interface Request extends ExpressRequest {
    user?: Omit<User, "password">
}