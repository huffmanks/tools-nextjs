import { useEmailSignatureFormControls } from '../../../features/EmailSignature/useEmailSignatureFormControls'

import SEO from '../../../components/common/SEO'
import PageTitle from '../../../components/common/PageTitle'

import IntroParagraph from '../../../features/EmailSignature/IntroParagraph'
import EmailForm from '../../../features/EmailSignature/EmailForm'
import EmailOutput from '../../../features/EmailSignature/EmailOutput'
import OutputMessage from '../../../components/common/OutputMessage'

const EmailSignature = () => {
    const { values, errors, formSubmitted, formIsValid, handleFocus, handleChange, handleBlur, handleSubmit } = useEmailSignatureFormControls()

    return (
        <>
            <SEO description='Create an email signature.' title='Email Signature' url='/generate/email-signature' imageUrl='/email-signature.png' />

            <PageTitle>Email Signature</PageTitle>

            <IntroParagraph />

            <EmailForm values={values} errors={errors} formIsValid={formIsValid} handleFocus={handleFocus} handleChange={handleChange} handleBlur={handleBlur} handleSubmit={handleSubmit} />

            {formSubmitted ? <EmailOutput values={values} /> : <OutputMessage message='Email signature will appear here.' extraMb />}
        </>
    )
}

export default EmailSignature
