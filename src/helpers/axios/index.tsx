// ** axios
import axios from "axios"

// ** next
import { NextRouter, useRouter } from "next/router"

// ** config
import { BASE_URL } from "src/configs/api"

// ** type
import { UserDataType } from "src/contexts/types"

// ** helper
import { clearLocalUserData, getLocalUserData } from "src/helpers/store"

// ** react
import { FC } from "react"

// ** auth
import { useAuth } from "src/hooks/useAuth"

// ** jwt
import { jwtDecode } from "jwt-decode";


type TAxiosInterceptor = {
    children: React.ReactNode
}

const instanceAxios = axios.create({ baseURL: BASE_URL })

const handleRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
    if (router.asPath !== '/') {
        router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath }
        })
    } else {
        router.replace('/login')
    }
    setUser(null);
    clearLocalUserData();
}

const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
    const router = useRouter();
    const { accessToken, refreshToken } = getLocalUserData();
    const { setUser } = useAuth();

    instanceAxios.interceptors.request.use(async config => {
        if (accessToken) {
            const decodedAccessToken: any = jwtDecode(accessToken);
            if (decodedAccessToken?.exp > Date.now() / 1000) {
                config.headers["Authorization"] = `Bearer ${accessToken}`
            } else {
                if (refreshToken) {
                    const decodedRefreshToken: any = jwtDecode(refreshToken);
                    if (decodedRefreshToken?.exp > Date.now() / 1000) {
                        await axios.post(`${BASE_URL}/auth/refresh-token`, {}, {
                            headers: {
                                Authorization: `Bearer ${refreshToken}`
                            }
                        }).then(res => {
                            const newAccessToken = res?.data?.data?.access_token;
                            if (newAccessToken) {
                                config.headers["Authorization"] = `Bearer ${newAccessToken}`
                            } else {
                                handleRedirectLogin(router, setUser);
                            }
                        }).catch(e => {
                            console.log(e)
                        })
                    } else {
                        handleRedirectLogin(router, setUser);
                    }
                } else {
                    handleRedirectLogin(router, setUser);
                }
            }
        } else {
            handleRedirectLogin(router, setUser);
        }

        return config;
    })

    instanceAxios.interceptors.response.use(response => {
        return response;
    })

    return <>{children}</>
}

export default instanceAxios;

export { AxiosInterceptor }