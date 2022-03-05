const azure = require("azure-storage")

const tableService = azure.createTableService()//(connectionString)
const tableName = "names"

module.exports = async function (context, req) {
    const getNames = async() => {
        return new Promise((resolve, reject ) => {
            var query = new azure.TableQuery().top(100)
            tableService.queryEntities(tableName, query, null, function(error, result, response) {
                if (!error) {
                    resolve(response)
                } else {
                    reject(null)
                }
            })
        })
        
    }

    let names = await getNames();

    if (!names) {
        context.res.status(500).json({error: "not found"})
    } else {
        context.res.status(200).json(names)
    }

    // context.res.json({
    //     text: "Hello, Azure Faas!"
    // })
}