require("dotenv").config()
const express = require("express") /* require means to go find the package */
const cors = require("cors") /* Gives permision to collect data from an url" */
const mysql = require("mysql2")
const bcrypt = require("bcrypt")
const session = require("express-session")

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

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true
    }
}))
app.use(express.json()) /* For every request in app, parse JSON */
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})) /* For every request in app, allow cross-origin requests */

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
                    msg: "An internal network error has occured [500]"
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
                                msg: "An internal servor error has occured [501]"
                            })
                            
                        } else {

                            database.query(
                   
                                "INSERT INTO users (lookupName, displayName, passwordHash) VALUES (?, ?, ?)",
                                [username.toLowerCase(), username, hash],
                                
                                (error, results) => {
                                    if (error) {
                                        res.json({
                                            success: false,
                                            msg: "An internal network error has occured [502]"
                                        })
                                    }else {
            
                                        const newUserId = results.insertId /* the id that was just inserted */
                                        
                                        database.query(

                                            "INSERT INTO currencies (userId) VALUES (?)",
                                            [newUserId],

                                            (error, results) => {
                                                if (error) {
                                                    res.json({
                                                        success: false,
                                                        msg: "An internal network error has occured [503]"
                                                    })
                                                } else {

                                                    database.query(
                                                        "INSERT INTO player_dragons (userId, dragonId) VALUES (?, ?)",
                                                        [newUserId, 1], /*start with dragon1 which is milee */

                                                        (error, results) => {
                                                            if (error) {
                                                                
                                                                res.json({
                                                                    success: false,
                                                                    msg: "An internal network error has occured [504]"
                                                                })

                                                            } else {

                                                                database.query(
                                                                    "INSERT INTO team (userId, slot1Id) VALUES (?, ?)",
                                                                    [newUserId, 1], /*equip slot 1 which is going to be milee too */

                                                                    (error, results) => {
                                                                        if (error) {
                                                                            res.json({
                                                                                success: false,
                                                                                msg: "An internal network error has occured [505]"
                                                                            })
                                                                        } else {
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

                                    /* Set Up Login Data */

                                    req.session.userId = results[0].id
                                    req.session.username = results[0].displayName

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

app.get("/me", (req, res) => {
    
    if (req.session.userId) {

        res.json({
            success: true,
            userId: req.session.userId,
            username: req.session.username
        })
    } else {
        res.json({
            success: false,
            msg: "Not logged in"
        })
    }
})

app.get("/data", (req, res) => {

    const userId = req.session.userId

    if (userId) {
        
        database.query(
            "SELECT * FROM currencies WHERE userId = ?",
            [userId],

            (error, results) => {
                if (error) {
                    res.json({
                        success: false
                    })
                } else {

                    const currencyTable = {
                        gold: results[0].gold,
                        gems: results[0].gems,
                        energy: results[0].energy,
                        friendshipPoints: results[0].friendshipPoints
                    }

                    database.query(
                        "SELECT * FROM player_dragons WHERE userId = ?", [userId],

                        (error, results) => {
                            if (error) {
                                res.json({
                                    success: false
                                })
                            } else {

                                const dragonTable = Array(200).fill(null)

                                results.sort((a, b) => a.id - b.id)
                                results.forEach((i, index) => {
                                    dragonTable[index] = i
                                })

                                database.query(
                                    "SELECT * FROM team WHERE userId = ?",
                                    [userId],

                                    (error, results) => {
                                        if (error) {
                                            res.json({
                                                success: false,
                                            })
                                        } else {

                                            const teamTable = {
                                                slot1Id: results[0].slot1Id,
                                                slot2Id: results[0].slot2Id,
                                                slot3Id: results[0].slot3Id,
                                                slot4Id: results[0].slot4Id,
                                            }

                                            res.json({
                              
                                                success: true,
                                                currency: currencyTable,
                                                dragons: dragonTable,
                                                team: teamTable
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
    }
    
})

app.listen(PORT, () => {
    console.log("Dragon Squad backend running on port 3000")
})
