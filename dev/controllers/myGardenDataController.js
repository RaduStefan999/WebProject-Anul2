import { StatusCodes } from "http-status-codes"
import { Plant, PlantType, Reminder } from "../models/index.js"

const MyGardenDataController = {

    download: async (zen, request, response) => {
        let data = []

        const userPlantTypes = await PlantType.getUserPlantTypes(zen.db, zen.session.user.id);

        userPlantTypes.forEach(userPlantType => {
            const userPlantTypePOJO = userPlantType.toPOJO()
            data.push(userPlantTypePOJO)
        });

        for (let it = 0; it < data.length; it++) {
            data[it].plantsOfType = 
                (await Plant.getAllUserPlantByType(zen.db, zen.session["user"].id, data[it].id)).map(plant => plant.toPOJO())
        }

        response.status(200).json(data)
    },

    upload: async (zen, request, response) => {

        let userPlantTypes = await PlantType.getUserPlantTypes(zen.db,zen.session.user.id);
        let plantTypes = await PlantType.getPlantTypes(zen.db);
        console.log(plantTypes);
     
        let reminders = await Reminder.getByUserId(zen.db,zen.session.user.id);
        console.log(reminders);
        
     
        response.sendZenView({"plantTypes": plantTypes , "userPlantTypes" : userPlantTypes,"reminders":reminders},"views/myGarden.html");
        
        return response;
    }
}

export default MyGardenDataController;