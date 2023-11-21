import chalk from "chalk";
import onFinished from 'on-finished'
import Request from "../interfaces/Request.interface";
import { NextFunction, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const {
        method,
        originalUrl: url
    }: {
        method: string,
        originalUrl: string
    } = req

    let methodStyle: string;

    switch(method){
        case "GET": 
            methodStyle = chalk.green.bold(method as string) as string;
            break;
        case "POST": 
            chalk.blue.bold(method) as string;
            break;
        case "DELETE":
            chalk.redBright.bold(method) as string;
            break;
        case "PUT":
            chalk.yellow.bold(method) as string;
            break;
            default:
                chalk.yellow.grey(method) as string;
    }
    onFinished(res, (error, response) => {
        const time = Date.now() - start;
        const { statusCode } = response
        console.log(methodStyle)
    })
    next();
}

export default logger