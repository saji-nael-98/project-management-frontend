import React, { useEffect } from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

export const Error = () => {
  const navigate = useNavigate()
  const error = useRouteError()
  useEffect(() => {
    if (error?.response?.status == 401) {
      navigate('/unauthorized', {
        replace: true
      })
    }
  }, [])
  return (
    <div>Error</div>
  )
}
