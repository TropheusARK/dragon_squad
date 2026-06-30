require("dotenv").config()
const express = require("express") /* require means to go find the package */
const cors = require("cors") /* Gives permision to collect data from an url" */
const mysql = require("mysql2")
const bcrypt = require("bcrypt")
const { use } = require("react")

const app = express() /* App is OUR SERVER! */
const PORT = process.env.PORT /* The PORT we run our bakend on */
const database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

database.connect((error) => {
    if (error) {
        console.log("Database connection failed")
        console.log(error)
    } else{
        console.log("Connected to MySQL")
    }
})

app.use(express.json()) /* For every request in app, parse JSON */
app.use(cors()) /* For every request in app, allow cross-origin requests */

/* REQUEST AND RESPONSE */
app.get("/", (req, res) =>{
    res.send("Dragon Squad backend is alive!")
} ) /* Get request from the route '/' */



/* Recieve Post Request from /signup, we are running on port 3000 */
app.post("/signup", (req, res) => {

    const username = req.body.username
    const password = req.body.password
    
    database.query(
        "SELECT * FROM users WHERE lookupName = ?",
        [username.toLowerCase()],
        (error, results) => {

            if (error){

                res.json({
                    success: false,
                    msg: "An internal network error has occured"
                })

            } else if (results.length > 0) {
                
                res.json({
                    success: false,
                    msg: "Username Taken"
                })

            } else {
                          
                bcrypt.hash(password, 10,
                    (error, hash) => {

                        if (error) {
                           
                            res.json({
                                success: false,
                                msg: "An internal servor error has occured"
                            })
                            
                        } else {

                            database.query(
                   
                                "INSERT INTO users (lookupName, displayName, passwordHash) VALUES (?, ?, ?)",
                                [username.toLowerCase(), username, hash],
                                
                                (error, results) => {
                                    if (error) {
                                        res.json({
                                            success: false,
                                            msg: "An internal network error has occured"
                                        })
                                    }else {
            
                                        res.json({
                                            success: true,
                                            msg: "Account Has been created"
                                        })
                                    }
                                }
                            )
                        }
                    }
                )

                
            }
        }
    
    )
})

app.post("/login", (req, res) => {

    const username = req.body.username
    const password = req.body.password

    database.query(
        "SELECT * FROM users WHERE lookupName = ?",
        [username.toLowerCase()],
        (error, results) => {

            if (error) {
                res.json({
                    success: false,
                    msg: "An internal server error has occured"
                })
            } else{
                
                if (results.length > 0) {
                    
                    const storedHash = results[0].passwordHash

                    bcrypt.compare(password, storedHash, 
                        (error, isCorrect) => {

                            if (error) {
                                res.json({
                                    success: false,
                                    msg: "An internal server error has occured"
                                })
                            } else{
                                if (isCorrect) {
                                    res.json({
                                        success: true,
                                        msg: "Login"
                                    })
                                } else {
                                    res.json({
                                        success: false,
                                        msg: "Invalid username or password"
                                    }) 
                                }
                            }
                        }
                    )

                } else{
                    res.json({
                        success: false,
                        msg: "Invalid username or password"
                    })
                }
            }
        }
    )
})

app.listen(PORT, () => {
    console.log("Dragon Squad backend running on port 3000")
})
