import bcrypt from 'bcrypt'
import UserModel from "../models/userModel";


const findExistingUser = async (userDetails) => {
  try {
    const { email, userName } = userDetails
    const exists = await UserModel.findOne({$or: [{ email: email } ,{ username: userName }]})
    if (exists) {
      return exists
    } else {
      return null
    }
  } catch (error) {
    console.error(error.message);
    throw error
  }

}

const createNewUser = async (userDetails) => {
  try {
    const { email, userName, fullName, password } = userDetails
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new UserModel({
      email: email,
      username: userName,
      name: fullName,
      password: hashedPassword
    })  

    await newUser.save()
    return newUser
  } catch (error) {
    throw error
  }

}

const checkPassword = async (password, hashedPassword) => {
  try {
    const checked = await bcrypt.compare(password, hashedPassword)
    if(checked){
      return true
    } else {
      return false
    }
  } catch (error) {
    throw new Error("Unexpected error while password check")
  }
}

export { findExistingUser, createNewUser, checkPassword }