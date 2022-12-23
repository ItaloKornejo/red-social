const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Red Social API",
            description: "Servidor de una red social",
            version: "1.0.0"
        },
        servers: [{ url: "http://localhost:9005/" }],
        tags: [{
            name: "User",
            description: "Operations about user"
        }, {
            name: "Post",
            description: "Operations about Post"
        }, {
            name: "Follow",
            description: "Operations about Follow"
        }],
        components: {
            securitySchemes: {
                jwtAuth: {
                    description: `<strong>Add 'JWT' before insert token :</strong> "JWT 2sdasd.....dsdsdsd"`,
                    type: 'apiKey',
                    in: "header",
                    name: 'Authorization'
                }
            },
            schemas: {
                user: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email', 'nickName', 'password', 'gender', 'birthday'],
                    properties: {
                        firstName: {
                            type: 'string',
                            example: "John"
                        },
                        lastName: {
                            type: 'string',
                            example: "Doe"
                        },
                        email: {
                            type: 'string',
                            format: "date",
                            example: "name@email.com"
                        },
                        nickName: {
                            type: 'string',
                            example: "aka"
                        },
                        password: {
                            type: 'string',
                            minLength: 8,
                            example: "pass1234"
                        },
                        gender: {
                            type: 'string',
                            example: "male"
                        },
                        birthday: {
                            type: "string",
                            format: "date",
                            example: "1945-12-12"
                        },
                    }
                }
            }
        },
        paths: {
            "/api/v1/users": {
                post: {
                    tags: [
                        "User"
                    ],
                    summary: "Add a new User",
                    description: "Add a new User to red social",
                    operationId: "addUser",
                    requestBody: {
                        description: "After registering, a verification email will be sent to your email",
                        content: {
                            "application/json": {
                                schema: {
                                    "$ref": "#/components/schemas/user"
                                }
                            }
                        },
                        required: true
                    },
                    responses: {
                        201: {
                            description: "Successful operation",
                            content: {
                                "application/json": {
                                    schema: {
                                        "$ref": "#/components/schemas/user"
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Invalid ID supplied"
                        }
                    }
                },
                get: {
                    tags: [
                        "User"
                    ],
                    summary: "get all Users",
                    description: "search all users of the social network",
                    operationId: "findAllUser",
                    responses: {
                        200: {
                            description: "Successful operation",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            properties: {
                                                id: {
                                                    type: 'string', example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                                },
                                                firstName: {
                                                    type: 'string', example: "Name"
                                                },
                                                lastName: {
                                                    type: 'string', example: "LastName"
                                                },
                                                email: {
                                                    type: 'string', format: "date", example: "unknown@email.com"
                                                },
                                                gender: {
                                                    type: 'string', example: "male"
                                                },
                                                birthday: {
                                                    type: "string", format: "date", example: "1925-12-12"
                                                },
                                                nickName: {
                                                    type: 'string', example: "aka"
                                                },
                                                isVerified: {
                                                    type: 'boolean', example: "false"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Invalid ID supplied"
                        }
                    }
                }
            },
            "/api/v1/users/me": {
                get: {
                    tags: [
                        "User"
                    ],
                    summary: "Get my data",
                    description: "Get my information",
                    operationId: "getMyUser",
                    responses: {
                        "200": {
                            description: "successful operation",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: 'string', example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                            },
                                            firstName: {
                                                type: 'string', example: "Name"
                                            },
                                            lastName: {
                                                type: 'string', example: "LastName"
                                            },
                                            email: {
                                                type: 'string', format: "date", example: "unknown@email.com"
                                            },
                                            gender: {
                                                type: 'string', example: "male"
                                            },
                                            birthday: {
                                                type: "string", format: "date", example: "1925-12-12"
                                            },
                                            nickName: {
                                                type: 'string', example: "aka"
                                            },
                                            profileImg: {
                                                type: 'string', example: "url"
                                            },
                                            role: {
                                                type: 'string', example: "normal"
                                            },
                                            status: {
                                                type: 'string', example: "active"
                                            },
                                            isVerified: {
                                                type: 'boolean', example: "false"
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    },
                    security: [
                        {
                            jwtAuth: []
                        }
                    ]
                },
                patch: {
                    tags: [
                        "User"
                    ],
                    summary: "Update my User",
                    description: "Update a User to red social",
                    operationId: "updateMyUser",
                    requestBody: {
                        description: "update logged in user",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        firstName: {
                                            type: 'string', example: "NEW_ame"
                                        },
                                        lastName: {
                                            type: 'string', example: "NEW_LastName"
                                        },
                                        gender: {
                                            type: 'string', example: "male"
                                        },
                                        birthday: {
                                            type: "string", format: "date", example: "1925-12-12"
                                        }
                                    }
                                }
                            }
                        },
                        required: true
                    },
                    responses: {
                        200: {
                            description: "Your user was edited succesfully!",
                        },
                        400: {
                            description: "Invalid ID supplied"
                        }
                    },
                    security: [
                        {
                            jwtAuth: []
                        }
                    ]
                },
                delete: {
                    tags: [
                        "User"
                    ],
                    summary: "Delete my data",
                    description: "Delete my information",
                    operationId: "deleteMyUser",
                    responses: {
                        204: {
                            description: "",
                        },
                        400: {
                            description: "Error",
                        }
                    },
                    security: [
                        {
                            jwtAuth: []
                        }
                    ]
                }
            },
            "/api/v1/users/{id}'": {
                get: {
                    tags: [
                        "User"
                    ],
                    summary: "Get user data",
                    description: "Get user information",
                    operationId: "getUserById",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of user",
                            required: true,
                            schema: {
                                type: "string",
                                format: "uuid"
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "successful operation",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: 'string', example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                            },
                                            firstName: {
                                                type: 'string', example: "Name"
                                            },
                                            lastName: {
                                                type: 'string', example: "LastName"
                                            },
                                            email: {
                                                type: 'string', format: "date", example: "unknown@email.com"
                                            },
                                            gender: {
                                                type: 'string', example: "male"
                                            },
                                            birthday: {
                                                type: "string", format: "date", example: "1925-12-12"
                                            },
                                            nickName: {
                                                type: 'string', example: "aka"
                                            },
                                            profileImg: {
                                                type: 'string', example: "url"
                                            },
                                            role: {
                                                type: 'string', example: "normal"
                                            },
                                            status: {
                                                type: 'string', example: "active"
                                            },
                                            isVerified: {
                                                type: 'boolean', example: "false"
                                            }

                                        }
                                    }
                                }
                            }
                        },
                        404: {
                            description: "Invalid ID supplied"
                        },
                        400: {
                            description: "Invalid ID supplied"
                        }

                    }
                },
                patch: {
                    tags: [
                        "User"
                    ],
                    summary: "Update any User - Only admin",
                    description: "Update any user of the social network",
                    operationId: "updateUser",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of user",
                            required: true,
                            schema: {
                                type: "string",
                                format: "uuid"
                            }
                        }
                    ],
                    requestBody: {
                        description: "Update user",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        firstName: {
                                            type: 'string', example: "NEW_ame"
                                        },
                                        lastName: {
                                            type: 'string', example: "NEW_LastName"
                                        },
                                        email: {
                                            type: 'string', format: "date", example: "unknown@email.com"
                                        },
                                        gender: {
                                            type: 'string', example: "male"
                                        },
                                        birthday: {
                                            type: "string", format: "date", example: "1925-12-12"
                                        },
                                        role: {
                                            type: 'string', example: "normal"
                                        },
                                        status: {
                                            type: 'string', example: "active"
                                        }
                                    }
                                }
                            }
                        },
                        required: true
                    },
                    responses: {
                        200: {
                            description: "Your user was edited succesfully!",
                        },
                        404: {
                            description: "Invalid ID supplied"
                        },
                        400: {
                            description: "Invalid ID supplied"
                        }
                    },
                    security: [
                        {
                            jwtAuth: []
                        }
                    ]
                },
                delete: {
                    tags: [
                        "User"
                    ],
                    summary: "Delete any User - Only admin",
                    description: "Delete any user of the social network",
                    operationId: "deleteUser",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of user",
                            required: true,
                            schema: {
                                type: "string",
                                format: "uuid"
                            }
                        }
                    ],
                    responses: {
                        204: {
                            description: "",
                        },
                        400: {
                            description: "Error",
                        }
                    },
                    security: [
                        {
                            jwtAuth: []
                        }
                    ]
                }

            },
            "/api/v1/users/{id}/follow'": {
                post: {
                    tags: [
                        "User"
                    ],
                    summary: "Follow User",
                    description: "Follow user of the social network",
                    operationId: "postFollower",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of user",
                            required: true,
                            schema: {
                                type: "string",
                                format: "uuid"
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "Your user was edited succesfully!",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            properties: {
                                                id: {
                                                    type: 'string',format: "uuid", example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                                },
                                                userId: {
                                                    type: 'string',format: "uuid", example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                                },
                                                userId2: {
                                                    type: 'string',format: "uuid", example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                                },
                                                updatedAt: {
                                                    type: 'string', format: "date", example: "YYYY-MM-DD"
                                                },
                                                createdAt: {
                                                    type: 'string', format: "date", example: "YYYY-MM-DD"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        404: {
                            description: "Invalid ID supplied"
                        },
                        400: {
                            description: "Invalid ID supplied"
                        }
                    },
                    security: [
                        {
                            jwtAuth: []
                        }
                    ]
                }
            }
        }
    },
    apis: ["src/users/users.router.js"]
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app, port) => {
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json")
        res.send(swaggerSpec)
    })
    console.log(
        `SWAGGER HOST: /api/v1/docs.json `
    );
}

module.exports = { swaggerDocs }