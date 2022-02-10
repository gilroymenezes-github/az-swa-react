const azure = require("azure-storage")

//const connectionString = "DefaultEndpointsProtocol=https;AccountName=ipomoeastorage;AccountKey=lN2KJGBQhVnB2gWhzCIVvP8NiXjZtF/0IWh8Ls2T1+w3IAnJFRJ904CDVwb4HHUIkNzqCCBJSBMcaUrIomvO+w==;EndpointSuffix=core.windows.net"

const tableService = azure.createTableService()//(connectionString)
const tableName = "names"

module.exports = async function (context, req) {
    // context.log('JavaScript HTTP trigger function processed a request.');

    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    // context.res = {
    //     // status: 200, /* Defaults to 200 */
    //     body: responseMessage
    // };

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