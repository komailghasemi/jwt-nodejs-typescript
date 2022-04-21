import { Service } from "typedi";
import jwt from 'jsonwebtoken'


@Service({ transient: true })
export default class Auth {


    generateToken = (data: any) => {
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),// 1h
            data: data
        }, process.env.JWT_SECRET || 'secret')

    }

    verifyToken = async (token: string): Promise<string | jwt.JwtPayload | undefined> => {
        return new Promise<string | jwt.JwtPayload | undefined>((resolver, reject) => {
            jwt.verify(token, process.env.JWT_SECRET || 'secret', function (err, decoded) {
                if (!err) {
                    resolver(decoded)
                } else {
                    reject(err)
                }
            });
        })
    }

}