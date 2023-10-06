import { findExistingUser, createNewUser, checkPassword } from "../helpers/userHelper,"
import { createToken } from "../middleware/auth";
import { PDFDocument } from "pdf-lib";


export const postSignup = async (req, res) => {
  try {
    const values = req.body
    console.log(values);
    const exists = await findExistingUser(values)
    if (!exists) {
      const user = await createNewUser(values)
      const token = createToken(user)
      res.cookie('token', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 })
      res.status(201).json({
        success: true,
        data: { user: { userId: user._id, username: user.username, name: user.name, email: user.email } },
        message: "User Created Succesfully"
      })
    } else {
      res.status(409).json({
        success: false,
        message: 'User Already Exists'
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }

}

export const postLogin = async (req, res) => {
  try {
    const values = req.body
    const user = await findExistingUser(values)
    if (!user) {
      throw new Error("Invalid Username")
    }
    const valid = await checkPassword(values.password, user.password)
    if (valid) {
      const token = await createToken(user)
      res.cookie('token', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 })
      res.status(201).json({
        success: true,
        data: { user: { userId: user._id, username: user.username, name: user.name, email: user.email } },
        message: "User Logged In Succesfully"
      })
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid Password"
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export const postLogout = (req, res) => {
  try {
    res.clearCookie("token")
    res.status(200).json({
      success: true,
      message: "User Logged Out"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      messgage: error.message
    }) 
  }
}

export const postFileSelect = async (req, res) => {
  try {
    const pdfBuffer = req.file.buffer
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=uploaded.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.log(error.message);
  }
}

export const postModifyFile = async (req, res) => {
  try {
    const pdfFile = req.file.buffer;
    const pdfDoc = await PDFDocument.load(pdfFile)
    const newDoc = await PDFDocument.create()
    const selectedPages = JSON.parse(req.body.selectedPages);
    for (const pageNum of selectedPages) {
      if (pageNum >= 1 && pageNum <= pdfDoc.getPageCount()) {
        const [page] = await newDoc.copyPages(pdfDoc, [pageNum - 1]);
        newDoc.addPage(page);
      }
    }
    const modifiedPdf = await newDoc.save()
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=modified.pdf');
    res.send(modifiedPdf)
  } catch (error) {
    console.log(error.message);
  }
}

