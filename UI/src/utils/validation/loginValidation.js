import * as Yup from 'yup'

const loginValidation = Yup.object({
  email: Yup.string().email("Invalid Email Address").required("Email is required"),
  password: Yup.string().required("Required")
})

export default loginValidation