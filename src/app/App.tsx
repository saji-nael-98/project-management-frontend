import { Dashboard, Home, RoleCreatePage, RoleEditPage, RoleListPage } from 'pages/Dashboard'
import { LoginPage } from 'pages/Login'
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom'
import { getRolesQuery } from 'modules/Role/infrastructure'
import { RequireAuth } from 'shared'
import { Providers } from './Providers'
import { Error } from 'pages/Error'
import { queryClient, resourceListLoader } from 'utils'
import { Root } from 'pages/Root'
import { Unauthorized } from 'pages/Unauthorized'
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
                  element: <RequireAuth><RoleEditPage /></RequireAuth>
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
