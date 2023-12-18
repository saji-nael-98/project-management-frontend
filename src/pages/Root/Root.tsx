import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import React, { useEffect, useState } from 'react'
import { useSignOut } from 'react-auth-kit'
import { Outlet, useNavigate } from 'react-router-dom'
import { apiClient } from 'utils'

export const Root = () => {
    const navigate = useNavigate()
    const signOut = useSignOut()
    const [isSet, setIsSet] = useState<boolean>(false)
    useEffect(() => {
        function responseHandler(response: AxiosResponse<any, any>): AxiosResponse<any, any> {
            return response
        }
        function requestHandler(request: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> {
            const regex = /^\/auth\//;
            if (request.url && !regex.test(request.url as string) && localStorage.getItem("token")) {
                request.headers.Authorization = `Bearer ` + localStorage.getItem("token")
            }
            return request;
        }

        const errInterceptor = (error: any) => {
            if (error.response.status == 401) {
                navigate('/unauthorized', {
                    replace: true
                })
            }
            return Promise.reject(error);
        }

        const responseInterceptor = apiClient.interceptors.response.use(responseHandler, errInterceptor);
        const requestInterceptor = apiClient.interceptors.request.use(requestHandler, errInterceptor);
        setIsSet(true)
        return () => {
            apiClient.interceptors.request.eject(requestInterceptor);
            apiClient.interceptors.response.eject(responseInterceptor);
        }

    }, [])
    return (
        isSet && <Outlet />
    )
}
