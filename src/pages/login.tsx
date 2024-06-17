// ** react
import { ReactNode } from "react"

// ** next
import { NextPage } from "next"

// ** layout
import BlankLayout from "src/views/layouts/BlankLayout"

// ** views
import LoginPage from "src/views/pages/login"

type TProps = {

}

const Login: NextPage<TProps> = () => {
    return (
        <LoginPage />
    )
}

export default Login

Login.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Login.guestGuard = true;