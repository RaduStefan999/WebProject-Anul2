import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const AdminPageController = {

    view: async (zen, request, response) => {
        Course.getCourses(zen.db)

        await response.sendZenView({}, "views/adminPage.html")
    },
    
    create: async (zen, request, response) => {
        const uploadImageURL = zen.fileManager.upload(request.body.files["image"])
        const uploadVideoURL = zen.fileManager.upload(request.body.files["video"])

        const course = new Course(zen.db, request.body.fields["content"], 
                                request.body.fields["descirption"], request.body.fields["name"],
                                request.body.fields["duration"], uploadImageURL, uploadVideoURL,
                                request.body.fields["parrentCourse"])
        
        await course.create()

        await response.redirect("/adminPage")
    }
}

export default AdminPageController;