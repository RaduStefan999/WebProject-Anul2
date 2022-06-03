import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const SearchBarController = {

    search: async (zen, request, response) => {
        await response.status(200).json ({"resoult": "rezultat"})
    }
}

export default SearchBarController;