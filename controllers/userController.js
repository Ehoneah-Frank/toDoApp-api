import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";





// Register a new user
export const registerUser = async () => {

    const { username, email, password } = req.body;

    try {
        // check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        //  Create new user
        user = new user({
            username,
            email,
            password,
        });

        //  Hash the password
        const hashedPassword = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, hashedPassword);


        // Save the user to the database
        await user.save();


        // generate token
        const genToken = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            genToken,
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    }

};

// login a user 
export const loginUser = async () => {

    const { email, password } = req.body;

    try {
        // check if the user exist
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // generate token

        const genToken = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            genToken,
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    }

};


// Get authenticated user
export const getAuthenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};