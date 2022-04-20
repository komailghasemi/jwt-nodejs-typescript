import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

const { TokenExpiredError } = jwt;

export class Auth {

    static auth = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let token = req.header('Authorization')
            if (token) {

                jwt.verify(token, process.env.JWT_SECRET || 'secret', function (err, decoded) {
                    if (!err) {

                        req.params.username = (<any>decoded).data
                        next()
                    } else {
                        if (err instanceof TokenExpiredError) {
                            res.status(401).send("Unauthorized! Access Token was expired!");
                        } else
                            res.sendStatus(401).send("Unauthorized!");
                    }
                });
            } else {
                res.sendStatus(401)
            }
        } catch (e) {
            next(e)
        }

    }
}