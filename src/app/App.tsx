import { Dashboard, Home, RoleCreatePage, RoleEditPage, RoleListPage } from 'pages/Dashboard'
import { Error } from 'pages/Error'
import { LoginPage } from 'pages/Login'
import { Root } from 'pages/Root'
import { Unauthorized } from 'pages/Unauthorized'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RequireAuth } from 'shared'
import { resourceListLoader, resourceOneLoader } from 'utils'
import { Providers } from './Providers'
export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/',
      errorElement: <Error />,
      element: <Root />,
      children: [
        {
          path: '',
          element: <Dashboard />,
          children: [
            {
              index: true,
              element: <Home />
            },
            {
              path: 'roles',
              children: [
                {
                  index: true,
                  element: <RequireAuth><RoleListPage /></RequireAuth>,
                  loader: resourceListLoader('role')
                },
                {
                  path: ':id',
                  element: <RequireAuth><RoleEditPage /></RequireAuth>,
                  loader: resourceOneLoader('role')
                },
                {
                  path: 'create',
                  element: <RequireAuth><RoleCreatePage /></RequireAuth>
                }
              ]
            }
          ]
        },

      ]
    },
    {
      path: 'unauthorized',
      element: <Unauthorized />
    }
  ])
  return <Providers>
    <RouterProvider router={router} fallbackElement={<div>dasdasdasdasd</div>} />
  </Providers>
}
