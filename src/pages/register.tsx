// ** react
import { ReactNode } from "react"

// ** next
import { NextPage } from "next"

// ** layout
import BlankLayout from "src/views/layouts/BlankLayout"

// ** views
import RegisterPage from "src/views/pages/register"

type TProps = {

}

const Register: NextPage<TProps> = () => {
    return (
        <RegisterPage />
    )
}

export default Register

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
