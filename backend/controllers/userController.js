import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "all fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "your password does not match" });
    }

    //if user already exist
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username already exists please try new username" });
    }
    //hashed password with bcryt salts
    const hashedPassword = await bcrypt.hash(password, 10);

    //profile pic
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    //create new user
    await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: gender == "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });

    return res
      .status(200)
      .json({ message: "User successfully created", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    //if user doesnt exist it will not login
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
        success: false,
      });
    }
    //to comapre password with hashed password coming from db
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid username or password",
        success: false,
      });
    }
    //genrating token by jwt
    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
    //storing in browser as cookie ex = const token = xkjsnd in browser
    return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, http:true, sameSite: 'strict'}).json({
        _id:user._id,
        username:user.username,
        fullName:user.fullName,
        profilePhoto:user.profilePhoto
    })

  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) =>{
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message: "logged out successfully"
        })
    } catch (error) {
        console.log(error);
    }
}

export const getOtherUser = async (req, res) =>{
    try {
       const loggedInUser = req.id;
       const otherUsers = await User.find({_id:{$ne:loggedInUser}}).select("-password");
       return res.status(200).json(otherUsers)
    } catch (error) {
        console.log(error);
    }
}
