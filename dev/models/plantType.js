class PlantType {
    db
    id
    name
    pathImage
    
    constructor(db,name,pathImage,id)
    {
        this.db = db;
        this.name = name;
        this.pathImage = pathImage;
        this.id = id;
    }

    static async getPlantTypes(db){
        const plantsTypesData = await db.plantTypeRepository.getAllPlantsTypes(); //obiect cu plantele mele
        const plantsType = plantsTypesData.map(plantTypeData => 
            new PlantType(db,
                        plantTypeData["NAME"],
                        plantTypeData["IMAGE_LINK"],
                        plantTypeData["ID"]
                        ));
            return plantsType;
    }

    static async getUserPlantTypes(db,id_user) {
        const plantsTypesData = await db.plantTypeRepository.getAllUserPlantTypes(id_user); //obiect cu plantele mele
        const userPlantsType = plantsTypesData.map(userPlantType =>
            new PlantType(db,
                        userPlantType["NAME"],
                        userPlantType["IMAGE_LINK"],
                        userPlantType["ID"])
            );
            return userPlantsType
    }
}

export default  PlantType