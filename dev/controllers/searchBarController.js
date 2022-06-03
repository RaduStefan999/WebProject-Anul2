import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const SearchBarController = {

    search: async (zen, request, response) => {
        {
            let courses = await Course.getCourses(zen.db)
            
            for (let it = 0; it < courses.length; it++) {
                courses[it].computedProgress = await courses[it].getProgressForUser(zen.session["user"].id);
            }

            const foundCourses = courses.filter(course => course.name.includes(pattern)) 

            await response.status(200).json ({"courses": foundCourses})
       } 
    }
}



export default SearchBarController;
