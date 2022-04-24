import { Request, Response, NextFunction } from "express";
import UserModel from "../model/UserModel";
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import RefreshTokenStore from "../model/RefreshTokenStore";
import '../utils/ext'
import  Auth  from "../auth/Auth";
import Container from "typedi";
export class AuthController{
    static signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
    
            let { name, username, password } = req.body
    
            let user = await UserModel.findOne({ username: username })

            if(user){
                res.sendStatus(403)
                return
            }

            const salt = await bcrypt.genSalt()
            const pass = await bcrypt.hash(password, salt)
    
            let newUser = new UserModel({
                name: name,
                username: username,
                password: pass,
                passwordSalt: salt
            })
    
            await newUser.save()
    
            res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }
    
    static signIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { username, password } = req.body
    
            let user = await UserModel.findOne({ username: username })
    
            if (user) {
    
                let passHash = await bcrypt.hash(password, user.passwordSalt)
                if (passHash === user.password) {
    
                    let auth = Container.get(Auth)
                    let token = auth.generateToken(username)
                    let refresh = uuidv4()
    
                    await new RefreshTokenStore({
                        refresh: refresh,
                        expire: new Date().addDay(7),// 7 day from now
                        username: username
                    }).save()
    
                    res.status(200).json({
                        accessToken: token,
                        refreshToken: refresh
                    })
                } else {
                    res.status(403).json("Wrong Password")
                }
            } else {
                res.status(403).json("Wrong Username")
            }
    
        } catch (e) {
            next(e)
        }
    }
    
    static refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    
        try {
            let refreshToken = req.body.refreshToken
    
            let tokenStore = await RefreshTokenStore.findOne({ refresh: refreshToken })
            if (tokenStore) {
                if (new Date() <= tokenStore.expire) {
                    let user = await UserModel.findOne({ username: tokenStore.username })
    
                    let auth = Container.get(Auth)
                    let token = auth.generateToken(user.username)
    
                    res.status(200).json({
                        accessToken: token,
                        refreshToken: refreshToken
                    })
                } else
                    res.status(403).json("Refresh Token Expired")
            } else
                res.status(403).json("Refresh Token is Wrong")
        } catch (e) {
            next(e)
        }
    
    }
}
