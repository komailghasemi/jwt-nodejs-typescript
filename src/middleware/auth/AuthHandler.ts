import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import Container from "typedi";
import Auth from "../../auth/Auth";

const { TokenExpiredError } = jwt;

export class AuthHandler {

    static auth = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let token = req.header('Authorization')
            if (token) {

                let auth = Container.get(Auth)

                try {
                    let decoded = await auth.verifyToken(token)
                    req.params.username = (<any>decoded).data
                    next()
                } catch (err) {
                    if (err instanceof TokenExpiredError) {
                        res.status(401).json("Unauthorized! Access Token was expired!");
                    } else
                        res.sendStatus(401)
                }
            } else {
                res.sendStatus(401)
            }
        } catch (e) {            
            next(e)
        }

    }
}