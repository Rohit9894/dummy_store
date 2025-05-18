import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { Cart } from "../models/cart.model.js";

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ msg: "Please enter all the fields" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ msg: "User already exists" });
    }
    bcrypt.hash(password, 4, async (err, hash) => {
      const user = new User({
        ...req.body,
        password: hash,
      });
      await user.save();
      return res.status(201).json({ user, msg: "Register sucessfully" });
    });
  } catch (err) {
    return res.status(500).json({ msg: "Sever error", error: err.message });
  }
};

async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all the fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credetials" });
    }
    const hashed_password = user.password;
    const isMatch = await bcrypt.compare(password, hashed_password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credetials" });
    }
    const token = generateToken(user?._id);

    // cart count
 
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 3600000,
    });

    return res.status(200).json({
      msg: "Login successfully",
      data: {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        profilePhoto: user?.profilePhoto,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Sever error", error: err.message });
  }
}

export { registerUser, loginUser };
