import SEO from '../../components/layout/SEO'
import PageTitle from '../../components/layout/PageTitle'
import IntroParagraph from '../../components/EmailSignature/IntroParagraph'
import Form from '../../components/EmailSignature/Form'

const EmailSignature = () => {
    return (
        <>
            <SEO description='Create an email signature.' title='Email Signature' url='/email-signature' />
            <PageTitle>Email Signature</PageTitle>
            <IntroParagraph />
            <Form />
        </>
    )
}

export default EmailSignature
