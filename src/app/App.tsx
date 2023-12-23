import { useEffect, useState } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { Outlet, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
import { Providers } from './Providers'
import { apiClient } from 'utils/axios'
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { notifications } from '@mantine/notifications'
import { Dashboard } from 'pages/Dashboard'
import { Error } from 'pages/Error'
import { Unauthorized } from 'pages/Unauthorized'
const AppWrapper = () => {
  const getToken = useAuthHeader()
  const navigate = useNavigate()
  const [lunched, setLunched] = useState(false)
  useEffect(() => {
    const token = getToken()
    function responseHandler(response: AxiosResponse<any, any>): AxiosResponse<any, any> {
      return response
    }
    function requestHandler(request: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> {
      const regex = /^\/auth\//;
      if (request.url && !regex.test(request.url as string)) {
        request.headers.Authorization = token
      }
      return request;
    }

    const errInterceptor = (error: any) => {
      if (error.response.status == 401) {
        navigate('/unauthorized', {
          replace: true
        })
      } else {
        notifications.show({
          title: error.response.data.title ?? "Error",
          message: error.response.data.detail,
          color: 'red'
        })
      }
      return Promise.reject(error);
    }

    const responseInterceptor = apiClient.interceptors.response.use(responseHandler, errInterceptor);
    const requestInterceptor = apiClient.interceptors.request.use(requestHandler, errInterceptor);
    setLunched(true)
    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    }
  }, [getToken()])
  return (
    lunched && <Outlet />
  )
}
export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppWrapper />,
      errorElement: <Error />,
      children: [
        {
          path: 'login',
          lazy: () => import('pages/Login')
        },
        {
          children: [
            {
              path: '',
              element: <Dashboard />,
              children: [
                {
                  path: 'roles',
                  children: [
                    {
                      index: true,
                      lazy: () => import('pages/Dashboard/Role/List')
                    },
                    {
                      path:'create',
                      lazy: () => import('pages/Dashboard/Role/Create')
                    }
                  ]
                },
              ]
            }
          ]
        },
        {
          path: 'unauthorized',
          element: <Unauthorized />
        }
      ]
    }
  ])
  return <Providers>
    <RouterProvider router={router} fallbackElement={<div>dasdasdasdasd</div>} />
  </Providers>
}
