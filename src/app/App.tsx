import { Dashboard, Home, RoleList } from 'pages/Dashboard'
import { LoginPage } from 'pages/Login'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RequireAuth } from 'shared'
import { Providers } from './Providers'
export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/',
      children: [
        {
          path: '',
          element: <RequireAuth><Dashboard /></RequireAuth>,
          children: [
            {
              index: true,
              element: <Home />
            },
            {
              path: 'roles',
              element: <RoleList />
            }
          ]
        },

      ]
    }
  ])
  return <Providers>
    <RouterProvider router={router} />
  </Providers>
}
