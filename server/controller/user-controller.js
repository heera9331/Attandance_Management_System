import User from "../model/user.js";


const loginUser = async(req, res) => {
    try {
        const user = req.body;

        const newUser = new User(user);
        // await newUser.save

        res.status(200).json({msg: 'logn success'})
    } catch (error) {
        return res.status(500).json({msg: 'server internal error'});
    }
}

export default loginUser;