import { usePopoverColorPicker } from '../../../hooks/usePopoverColorPicker'
import { useEmailSignatureFormControls } from '../../../features/EmailSignature/useEmailSignatureFormControls'

import SEO from '../../../components/common/SEO'
import PageTitle from '../../../components/common/PageTitle'

import IntroParagraph from '../../../features/EmailSignature/IntroParagraph'
import EmailForm from '../../../features/EmailSignature/EmailForm'
import EmailOutput from '../../../features/EmailSignature/EmailOutput'
import OutputMessage from '../../../components/common/OutputMessage'

const EmailSignature = () => {
    const { values, errors, formSubmitted, formIsValid, handleChange, handleBlur, handleSubmit } = useEmailSignatureFormControls()

    const { colors, handleBlur: handleColorPickerBlur } = usePopoverColorPicker()

    return (
        <>
            <SEO description='Create an email signature.' title='Email Signature' url='/generate/email-signature' imageUrl='/email-signature.png' />

            <PageTitle>Email Signature</PageTitle>

            <IntroParagraph />

            <EmailForm
                values={values}
                errors={errors}
                formIsValid={formIsValid}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleColorPickerBlur={handleColorPickerBlur}
                handleSubmit={handleSubmit}
            />

            {formSubmitted ? <EmailOutput values={values} themeColor={colors.themeColor} /> : <OutputMessage message='Email signature will appear here.' extraMb />}
        </>
    )
}

export default EmailSignature
