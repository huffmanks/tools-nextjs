import EmailForm from "@/features/EmailSignature/EmailForm";
import EmailOutput from "@/features/EmailSignature/EmailOutput";
import IntroParagraph from "@/features/EmailSignature/IntroParagraph";
import { useEmailSignatureFormControls } from "@/features/EmailSignature/useEmailSignatureFormControls";

import OutputMessage from "@/components/common/OutputMessage";
import PageTitle from "@/components/common/PageTitle";
import SEO from "@/components/common/SEO";

const EmailSignature = () => {
  const {
    values,
    errors,
    formSubmitted,
    formIsValid,
    handleChange,
    handleColorChange,
    handleReset,
    handleBlur,
    handleSubmit,
  } = useEmailSignatureFormControls();

  return (
    <>
      <SEO
        description="Create an email signature."
        title="Email Signature"
        url="/generate/email-signature"
        imageUrl="/email-signature.png"
      />

      <PageTitle>Email Signature</PageTitle>

      <IntroParagraph />

      <EmailForm
        values={values}
        errors={errors}
        formIsValid={formIsValid}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleColorChange={handleColorChange}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
      />

      {formSubmitted ? (
        <EmailOutput values={values} />
      ) : (
        <OutputMessage message="Email signature will appear here." extraMb />
      )}
    </>
  );
};

export default EmailSignature;
