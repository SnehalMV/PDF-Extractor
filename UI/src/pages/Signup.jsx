import { useFormik } from "formik"
import { useState, useEffect } from "react"
import instance from "../utils/apiInstance"
import signupValidation from "../utils/validation/signupValidation"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../utils/store/userSlice"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"


const Signup = () => {
  const [submitError, setSubmitError] = useState("")
  const user = useSelector(state => state.user)
  const isLoggedIn = user.success
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  const onSubmit = async () => {
    try {
      const response = await instance.post('/signup', values)
      if (response.data.success) {
        const data = { user: response.data.data.user, success: response.data.success }
        dispatch(login(data))
        navigate('/')
      }
    } catch (error) {
      setSubmitError(error.response.data.message);
      setTimeout(() => setSubmitError(''), 5000)
    }

  }

  const { values, handleBlur, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: '',
      userName: '',
      fullName: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signupValidation,
    onSubmit: onSubmit
  })


  return (
    <>
      <Header />

      <div className='flex justify-center items-center p-2 mt-10'>
        <div className=" flex items-center h-80 w-52 border-r-2 max-md:hidden border-red-200 mr-10">
          <p className="text-4xl">
            PDF extractor
          </p>
        </div>
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 shadow sm:p-6 md:p-8 dark:bg-gray-700 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-2xl font-medium text-gray-900 dark:text-white">Sign Up</h5>
            {submitError && <p className="text-white text-xs font-semibold bg-red-500 p-2 rounded-md">{submitError}</p>}

            <div>
              <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Email" required onChange={handleChange} onBlur={handleBlur} value={values.email} />
              {errors.email && touched.email && <p className="text-red-400 text-xs p-1">{errors.email}</p>}
            </div>
            <div>
              <input type="text" name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Username" required onChange={handleChange} onBlur={handleBlur} value={values.userName} />
              {errors.userName && touched.userName && <p className="text-red-400 text-xs p-1">{errors.userName}</p>}
            </div>
            <div>
              <input type="text" name="fullName" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Name" required onChange={handleChange} onBlur={handleBlur} value={values.fullName} />
              {errors.fullName && touched.fullName && <p className="text-red-400 text-xs p-1">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input type="password" name="password" id="password" placeholder="•••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} onBlur={handleBlur} value={values.password} />
              {errors.password && touched.password && <p className="text-red-400 text-xs p-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input type="password" name="confirmPassword" id="confirmPassword" placeholder="•••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} />
              {errors.confirmPassword && touched.confirmPassword && <p className="text-red-400 text-xs p-1">{errors.confirmPassword}</p>}
            </div>
            <div className="flex items-center">
            </div>
            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Signup</button>

            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already have an account? <Link to={'/login'} className="text-blue-600 hover:underline duration-100">Login</Link>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}

export default Signup