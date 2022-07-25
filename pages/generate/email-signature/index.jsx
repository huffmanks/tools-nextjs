import SEO from '../../../components/layout/SEO'
import PageTitle from '../../../components/layout/PageTitle'
import IntroParagraph from '../../../components/EmailSignature/IntroParagraph'
import EmailForm from '../../../components/EmailSignature/EmailForm'

const EmailSignature = () => {
    return (
        <>
            <SEO description='Create an email signature.' title='Email Signature' url='/generate/email-signature' imageUrl='/email-signature.png' />
            <PageTitle>Email Signature</PageTitle>
            <IntroParagraph />
            <EmailForm />
        </>
    )
}

export default EmailSignature
