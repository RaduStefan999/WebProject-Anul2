import { User } from "../../models/index.js"
import jwt from 'jsonwebtoken';


const addSession = async (zen, request) => {
    let isLoggedIn = false
    let user = null

    do {
        if (!request.cookies["authToken"]){
            break
        }

        const authToken = request.cookies["authToken"]

        try {
            const decodedObject = jwt.verify(authToken, process.env.SECURITY_SECRET_KEY);
            user = await User.getUserByEmail(zen.db, decodedObject["email"])
            //here we have an object of type user

            if (user != null) {
                isLoggedIn = true
            }
        } 
        catch(error) {
            console.log(error)
        }        

    } while(false)

    zen.session = {
        "isLoggedIn": isLoggedIn,
        "user": user
    }
    return zen
}

const AddZenFunctionalities = (zen) => {
    zen.augment = async (db, fileManager, request) => {
        zen.db = db;
        zen.fileManager = fileManager
        zen = await addSession(zen, request)
    }
    return zen
}

export default AddZenFunctionalities