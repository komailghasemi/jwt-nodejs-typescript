import { Request, Response, NextFunction } from "express";
import UserModel from "../model/UserModel";
import '../utils/ext'


export class UserController {
    static me = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let username = req.params.username
            let user = await UserModel.findOne({ username: username })
            if (user) {
                res.status(200).json({
                    username: user.username,
                    name: user.name
                })
            } else {
                res.status(403).json("User Not Found")
            }

        } catch (e) {
            next(e)
        }
    }
}