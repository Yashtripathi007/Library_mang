import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      res.status(200).json({ message: "No Users Found" });
      return;
    }

    res.status(201).json({ data: users, message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
