import jwt from "jsonwebtoken"

export const createToken = async (userDetails) => {
  const token = jwt.sign({ userId: userDetails._id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" })
  return token
}

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies["token"]
    const valid = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (valid) {
      next()
    } 
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    })
  }
}