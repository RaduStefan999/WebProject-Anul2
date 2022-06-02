import fs from "fs"

class ReminderRepository {
    db

    constructor(db) {
        this.db = db;
    }

    async initRepoEnvironment() {
        try {
            const data = fs.readFileSync('vendor/database/oracle/plsql/ReminderPackage.sql', 'utf8');
            const  sqlCommands = data.split("/* STATEMENT */;").join("#")
                                .split("/* STATEMENT */").join("#")
                                .split("#");
            
            for (const sqlCommand of sqlCommands) {
                console.log(sqlCommand)
                
                try {
                    const result = await this.db.execute(sqlCommand);
                    console.log(result)
                }
                catch(err) {
                    console.error(err);
                }
            }
        } 
        catch (err) {
            console.error(err);
        }

    }

    async create(plantID, content) {
        try {
            const result = await this.db.execute(
                `SELECT reminder_packege.add_reminder('${plantID}', '${content}') FROM DUAL`);
                           
            console.log(result);
            return result.rows[0][Object.keys(result.rows[0])[0]]; 
        }
        catch (err) {
            console.log(err);
        }
    }

    async getById(id) {
        try {
            const result = await this.db.execute(
                `SELECT * from TABLE( reminder_packege.get_plant_by_id('${id}'))`);
            
            console.log(result);
            return result.rows.length == 0 ? null : result.rows[0]; //the id
        }
        catch (err) {
            console.log(err);
        }
    }
}

export  default  ReminderRepository;

