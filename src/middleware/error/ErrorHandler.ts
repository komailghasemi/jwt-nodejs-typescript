import { ErrorRequestHandler , RequestHandler } from "express";

export class ErrorHandler{
    static internal : ErrorRequestHandler = (err, req, res, next) => {
        console.log('error ->', err)
    
        try {
    
           // save error
        } catch (e) {
    
        }
    
        res.status(500).json("internal Error")
    };

    static notFound : RequestHandler = (req, res, next) => {
        res.status(404).json("Whats you looking for ??? check url again , please")
    };
}