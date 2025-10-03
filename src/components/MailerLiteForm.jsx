
import { Helmet } from "react-helmet";

function MailerLiteForm() {
  
  return (
    <section id="mailerLiteForm" className="mb-20">
        <Helmet>
           <script>
            {`
    (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
    .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
    n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
    (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
    ml('account', '1812919');
                `}
</script>
        </Helmet>
      <div className="ml-embedded" data-form="sl1w9c"></div>
    </section>
  );
}

export default MailerLiteForm;