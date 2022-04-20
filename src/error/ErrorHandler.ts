import { ErrorRequestHandler } from "express";

export class ErrorHandler{
    static handle : ErrorRequestHandler = async (err, req, res, next) => {
        console.log('error ->', err)
    
        try {
    
           // save error
        } catch (e) {
    
        }
    
        res.status(500).json("internal Error")
    };
}