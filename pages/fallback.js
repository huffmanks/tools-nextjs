import { useRouter } from 'next/router'

import ErrorTitle from '../components/layout/ErrorTitle'

const Fallback = () => {
    const router = useRouter()
    return (
        <>
            <ErrorTitle errorMessage='Something went wrong...' errorFontSize={35} buttonText='Go back' buttonAction={() => router.back()} />
        </>
    )
}

export default Fallback
