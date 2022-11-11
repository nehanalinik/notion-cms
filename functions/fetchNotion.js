const { Client } = require("@notionhq/client")

const {NOTION_KEY, NOTION_DB} = process.env
const notion = new Client({
    // auth: process.env.NOTION_KEY,
    auth: NOTION_KEY,
  })

exports.handler = async function (event, context) {
    try{
        const response = await notion.databases.query({
            database_id: NOTION_DB,
                filter:{
                        property: "Status",
                        select: {
                            equals: "Live"
                        }
                },
        });
        
    return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    }catch(err){
        console.error(err);
        return{
            statusCode: 500,
            body: err.toString()
        }
    }
    
  };