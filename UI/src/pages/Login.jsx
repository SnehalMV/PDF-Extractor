import { Link } from "react-router-dom"
import { useFormik } from "formik"
import { useState, useEffect } from "react"
import loginValidation from "../utils/Validation/LoginValidation"
import instance from "../utils/apiInstance"
import { useNavigate } from "react-router-dom"
import { login } from "../utils/store/userSlice"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const isLoggedIn = user.success
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])


  const onSubmit = async () => {
    try {
      const response = await instance.post('/login', values, { withCredentials: true })
      console.log(response.data.data.user);
      if (response.data.success) {
        const data = { user: response.data.data.user, success: response.data.success }
        console.log(data);
        dispatch(login(data))
        navigate('/')
      }
    } catch (error) {
      setSubmitError(error.response.data.message)
      setTimeout(() => setSubmitError(''), 5000)
    }

  }

  const { values, handleBlur, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginValidation,
    onSubmit: onSubmit,

  })

  return (
    <>
      <Header />
      <div className='flex justify-center items-center p-9 mt-16'>
        <div className=" flex items-center h-80 w-52 border-r-2 max-md:hidden border-red-200 mr-10">
          <p className="text-4xl">
            PDF extractor 
          </p>
        </div>
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 shadow sm:p-6 md:p-8 dark:bg-gray-700 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-2xl font-medium text-gray-900 dark:text-white">Sign in</h5>
            {submitError && <p className="text-white text-xs font-semibold bg-red-500 p-2 rounded-md">{submitError}</p>}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email or Username</label>
              <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Email" required onChange={handleChange} onBlur={handleBlur} value={values.email} />
              {errors.email && touched.email && <p className="text-red-400 text-xs p-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} onBlur={handleBlur} value={values.password} />
              {errors.password && touched.password && <p className="text-red-400 text-xs p-1">{errors.password}</p>}
            </div>
            <div className="flex items-center">

              <a href="#" className="ml-auto text-sm text-blue-600 hover:underline dark:text-blue-500">Forgot Password?</a>
            </div>
            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>

            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered? <Link to={'/signup'} className="text-blue-600 hover:underline duration-100">Create account</Link>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}

export default Login