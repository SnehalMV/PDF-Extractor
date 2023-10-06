import * as Yup from 'yup'


const passwordRules = /^(?=.*[A-Za-z0-9])[A-Za-z0-9!@#$%^&*()-_=+{}|;:'",.<>?[\]\\/]{6,}$/

const signupValidation = Yup.object({
  email: Yup.string().email("Invalid Email Address").required("Email is required"),
  userName: Yup.string().required("Username is required"),
  fullName: Yup.string().required("Name is Required"),
  password: Yup.string().matches(passwordRules, {message:"1 special character and 6 characters"}).required("Required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), ''], "Passwords must match").required("Required")

})

export default signupValidation