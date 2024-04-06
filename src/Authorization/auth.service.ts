import { injectable } from "tsyringe";
import { Request, Response} from 'express';
@injectable()
export class AuthService {
    constructor () {}

    userLogin = async (req:Request, res: Response) => {
        try {
            //check the email of the user exist 
            // if not we call the register to create the user
            // and send an email token to the user throw sendGrid 
            

            res.status(200).json();
        } catch (error) {
            console.log(error);
        }
    }
}