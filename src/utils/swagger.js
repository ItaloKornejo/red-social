const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: "Red Social API",
            description: "Servidor de una red social" ,
            version:"1.0.0"
        },
        servers:[{url:"http://localhost:9005/"}],
        tags:[{
            name : "User",
            description: "Operations about user"
        },{
            name : "Post",
            description: "Operations about Post"
        },{
            name : "Like",
            description: "Operations about Like"
        },{
            name : "Follow",
            description: "Operations about Follow"
        }], 
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            schemas:{
                user: {
                    type:'object',
                    required: ['firstName','lastName','email','nickName','password','gender','birthday'],
                    properties:{
                        firstName:{
                            type:'string',
                            example: "John"
                        },
                        lastName:{
                            type:'string',
                            example: "Doe"
                        },
                        email:{
                            type:'string',
                            format: "date",
                            example: "name@email.com"
                        },
                        nickName:{
                            type:'string',
                            example: "Kezlar"
                        },
                        password:{
                            type:'string',
                            minLength: 8
                        },
                        gender:{
                            type:'string',
                            example: "male"
                        },
                        birthday:{
                            type: "string",
                            format: "date",
                            example: "YYYY-MM-DD"
                        },
                    }
                }
            }
        },
        "paths": {
            "/api/v1/users": {
              "post": {
                "tags": [
                  "User"
                ],
                "summary": "Update an existing pet",
                "description": "Update an existing pet by Id",
                "operationId": "updatePet",
                "requestBody": {
                  "description": "Update an existent pet in the store",
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/user"
                      }
                    }
                  },
                  "required": true
                },
                "responses": {
                  "200": {
                    "description": "Successful operation",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/user"
                        }
                      }
                    }
                  },
                  "400": {
                    "description": "Invalid ID supplied"
                  },
                  "404": {
                    "description": "Pet not found"
                  },
                  "405": {
                    "description": "Validation exception"
                  }
                },
                "security": [
                  {
                    "petstore_auth": [
                      "write:pets",
                      "read:pets"
                    ]
                  }
                ]
              },
            }
        }
    },
    apis:["src/users/users.router.js"]
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs= (app,port) =>  {
    app.use("/api/v1/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
    app.get("/api/v1/docs.json",(req,res)=>{
        res.setHeader("Content-Type","application/json")
        res.send(swaggerSpec)
    })
    console.log(
        `SWAGGER HOST: /api/v1/docs.json `
    );
}

module.exports = { swaggerDocs }