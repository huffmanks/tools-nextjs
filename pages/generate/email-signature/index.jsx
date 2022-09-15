import { useThemeColor } from '../../../hooks/useThemeColor'
import { useEmailSignatureFormControls } from '../../../features/EmailSignature/useEmailSignatureFormControls'

import SEO from '../../../components/common/SEO'
import PageTitle from '../../../components/common/PageTitle'

import IntroParagraph from '../../../features/EmailSignature/IntroParagraph'
import EmailForm from '../../../features/EmailSignature/EmailForm'
import EmailOutput from '../../../features/EmailSignature/EmailOutput'
import OutputMessage from '../../../components/common/OutputMessage'

const EmailSignature = () => {
    const { values, errors, formSubmitted, formIsValid, handleChange, handleBlur, handleSubmit } = useEmailSignatureFormControls()

    const { values: themeValues, handleFocus, handleChange: handleThemeChange } = useThemeColor()

    return (
        <>
            <SEO description='Create an email signature.' title='Email Signature' url='/generate/email-signature' imageUrl='/email-signature.png' />

            <PageTitle>Email Signature</PageTitle>

            <IntroParagraph />

            <EmailForm
                values={values}
                themeValues={themeValues}
                errors={errors}
                formIsValid={formIsValid}
                handleFocus={handleFocus}
                handleChange={handleChange}
                handleThemeChange={handleThemeChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
            />

            {formSubmitted ? <EmailOutput values={values} themeValues={themeValues} /> : <OutputMessage message='Email signature will appear here.' extraMb />}
        </>
    )
}

export default EmailSignature
