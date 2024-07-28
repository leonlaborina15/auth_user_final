const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());


//ROUTES
app.get('/' , async (req,res)=>{
    res.send("Your server is running");
})
// signup
app.post('/signup', async (req, res) => {
    try {

        const { user_name, email, pass, pass2 } = req.body;

        const existingUser = await pool.query("SELECT * FROM auth WHERE user_name = $1", [user_name]);
        const existingEmail = await pool.query("SELECT * FROM auth WHERE email = $1", [email]);
        
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "Username already exists" });
        }
        
        if (existingEmail.rows.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
        }
        

        if (!user_name || !email || !pass || !pass2) {
            return res.status(400).json({ msg: 'Please enter alllllll fields' });
        }

        if (pass !== pass2) {
            return res.status(400).json({ msg: 'Passwords do not match' });
        }
        if (pass.length < 8) {

            if (pass[0] !== pass[0].toUpperCase()) {
                return res.status(400).json({ error: "Your password is too short and pass 1st letter need to be upper case" })
            } else {
                return res.status(400).json({ error: "Your password is too short" })
            }
        } else {
            if (pass[0] !== pass[0].toUpperCase()) {
                return res.status(400).json({ error: "Your password first letter need to be upper case " })
            }
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);

        const addUser = await pool.query('INSERT INTO auth (user_name, email, pass) VALUES ($1, $2, $3) RETURNING *', [user_name, email, hashedPassword]);
        res.json(addUser.rows[0])

    } catch (err) {
        console.log(err);
    }
})
// login

// login
app.post('/login', async (req, res) => {
    try {
        const { email, pass } = req.body;

        const user = await pool.query("SELECT * FROM auth WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const validPassword = await bcrypt.compare(pass, user.rows[0].pass);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid password" });
        }
        res.json({ message: "Login successfullyyyyy" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server errorrrr" });
    }
});

// 
// 

app.listen(4000, () => {
    console.log("Your app is running on port 4000")
})