import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'


const Home = lazy(() => import('../../pages/Home'))
const Login = lazy(() => import('../../pages/Login'))
const Signup = lazy(() => import('../../pages/Signup'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense><Home /></Suspense>
  },
  {
    path: 'signup',
    element: <Suspense><Signup /></Suspense>
  },
  {
    path: 'login',
    element: <Suspense><Login /></Suspense>
  }
])

export default router