const accountQueries = require("../DB/accountQueries");
const authMethod = require("../auth/authMethods");
const Ajv = require("ajv");
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);
const bcrypt = require("bcryptjs/dist/bcrypt");


class AuthController {
    
    // [POST] /
    async register(req, res) {
        
        const RegisterSchema = {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    minLength: 1,
                    maxLength: 20,
                    nullable: false
                },
                password: {
                    type: "string",
                    minLength: 6,
                    maxLength: 12,
                    nullable: false
                },
                SSN: {
                    type: "string",
                    nullable: false
                },
                gender: {
                    type: "string",
                    enum: ['M', 'F']
                },
                dateOfBirth: {
                    type: "string",
                    format: "date"
                },
                userType: {
                    type: "string",
                    enum: ["user", "admin"]
                },
                role: {
                    type: "string",
                    enum: ["nurse", "doctor"]
                }
            },
            
            required: ['userType'],

            if: {
                properties: { 
                    userType: { 
                        const: "user" 
                    } 
                }
            },
            then: {
                required: ["name", "password", 'SSN', 'gender', 'dateOfBirth']
            },
            else: {
                required: ["name", "password", 'SSN', 'phone', 'role', 'dateOfBirth']
            }
        }

        const valid = ajv.validate(RegisterSchema, req.body);
        
        if (!valid) {
            res.json({
                error: 10001,
                error_type: "Invalid register request body",
                data: ajv.errors
            })
            return;
        }

        try {
            const account = await accountQueries.insertPatientAccount(req);
            res.json({
                error: 0,
                msg: "Registered",
                data: account
            });
        } catch (error) {
            res.json(error)
        }
    }

    // [POST]/

    async login(req, res) {

        const LoginSchema = {
            type: "object",
            properties: {
                password: {
                    type: "string",
                    minLength: 6,
                    maxLength: 12,
                    nullable: false
                },
                SSN: {
                    type: "string",
                    nullable: false
                }
            },
            required: ["password", 'SSN']
        }

        const valid = ajv.validate(LoginSchema, req.body);
        if (!valid) {
            res.json({
                error: 10003,
                error_type: "Invalid login request body",
                data: ajv.errors
            })
            return;
        }

        const SSN = req.body.SSN;
        const password = req.body.password;

        const account = await accountQueries.getAccountBySSN(SSN);

        if (Object.entries(account).length === 0) {
            res.json({
                error: 10004,
                error_type: "This account doesn't exist",
                data: []
            });
            return;
        }
        
        const isPasswordValid = bcrypt.compareSync(password, account.password);
        if (!isPasswordValid) {
            res.json({
                error: 10005,
                error_type: "Password is not correct",
                data: []
            });
            return;
        }

        const dataForAccessToken = {
            SSN: SSN,
            userType: account.userType
        };

        const accessTokenSecret = "LeThaiSon";
        const accessTokenLife = "300m";

        const accessToken = await authMethod.generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife
        );

        if (!accessToken) {
            res.json({
                error: 10006,
                error_type: "Login fail",
                data: []
            })
            return;
        }

        res.json({
            error: 0,
            msg: "Login successfully",
            data: {
                accessToken: accessToken,
                SSN: SSN,
                userType: account.userType
            }
        });
    }
}

module.exports = new AuthController;