import { useRouter } from 'next/router'

import ErrorTitle from '../components/common/ErrorTitle'

const Custom404 = () => {
    const router = useRouter()
    return (
        <>
            <ErrorTitle errorCode='404' errorMessage='Page not found' errorFontSize={50} buttonText='Go back' buttonAction={() => router.back()} />
        </>
    )
}

export default Custom404
