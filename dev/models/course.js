class Course {
    db
    id
    parrentCourseId
    content
    description
    name
    duration
    imgPath
    videoPath

    constructor(db, content, description, name, duration, imgPath, videoPath= "null", parrentCourseId = null,  id = 0) {
        this.db = db
        this.id = id
        this.parrentCourseId = parrentCourseId
        this.content = content
        this.description = description
        this.name = name
        this.duration = duration
        this.imgPath = imgPath
        this.videoPath = videoPath
    }

    static async getCourses(db) {
        const coursesData = await db.courseRepository.get()
        const courses = coursesData.map(courseData => 
            new Course(db, 
                courseData["COURSE_CONTENT"],
                courseData["DESCRIPTION_COURSE"],
                courseData["COURSE_NAME"],
                courseData["COURSE_DURATION"],
                courseData["IMAGE_PATH_DOWNLOAD"],
                courseData["COURSE_VIDEO_PATH"],
                courseData["PARENT_ID"],
                courseData["ID_CURS"]
            )
        );
        return courses
    }

    static async getCourseById(db, id) {
        const courseDetails = await db.courseRepository.getById(id)

        return courseDetails == null ? null : 
            new Course(db, 
                courseData["COURSE_CONTENT"],
                courseData["DESCRIPTION_COURSE"],
                courseData["COURSE_NAME"],
                courseData["COURSE_DURATION"],
                courseData["IMAGE_PATH_DOWNLOAD"],
                courseData["COURSE_VIDEO_PATH"],
                courseData["PARENT_ID"],
                courseData["ID_CURS"]
            )
    }

    static async deleteById(db, id) {
        await db.courseRepository.delete_course_by_id(id)
    }

    async create() {
        this.id = await this.db.courseRepository.create(
            this.parrentCourseId != null ?  this.parrentCourseId : "null", 
            this.content, this.description, this.name, this.duration, this.imgPath, this.videoPath)
    }

    async update() {
        await this.db.courseRepository.update(
            this.id, this.parrentCourseId != null ?  this.parrentCourseId : "null",
            this.content, this.description, this.name, this.duration, this.imgPath, this.videoPath)
    }

    async getChildCourses() {
        const coursesData = await this.db.courseRepository.getByParentId(this.id)
        const courses = coursesData.map(courseData => 
            new Course(this.db, 
                courseData["COURSE_CONTENT"],
                courseData["DESCRIPTION_COURSE"],
                courseData["COURSE_NAME"],
                courseData["COURSE_DURATION"],
                courseData["IMAGE_PATH_DOWNLOAD"],
                courseData["COURSE_VIDEO_PATH"],
                courseData["PARENT_ID"],
                courseData["ID_CURS"]
            )
        );
        return courses
    }
}

export default Course