import { useRouter } from 'next/router'

import ErrorTitle from '../components/common/ErrorTitle'

const Fallback = () => {
    const router = useRouter()
    return (
        <>
            <ErrorTitle
                errorMessage='Missing cached files. Please reconnect to the internet to download the latest updates.'
                buttonText='Go back'
                buttonAction={() => router.back()}
                isFallback={true}
            />
        </>
    )
}

export default Fallback
