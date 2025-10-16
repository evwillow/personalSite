import siteMetadata from '@/src/utils/siteMetaData'

const FAQSchema = () => {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does Evan Maus study at UC Berkeley?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evan Maus is pursuing a Bachelor of Arts in Economics and Data Science with a minor in Computer Science at UC Berkeley, focusing on building solutions at the intersection of AI, finance, and sustainability."
        }
      },
      {
        "@type": "Question", 
        "name": "What programming languages and technologies does Evan work with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evan works with Python, JavaScript, React, Next.js, PyTorch, TensorFlow, and various other technologies for full-stack development, machine learning, and quantitative research."
        }
      },
      {
        "@type": "Question",
        "name": "What kind of projects does Evan work on?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Evan works on projects involving algorithmic trading systems, AI/ML applications, full-stack web development, and quantitative research at the intersection of economics, data science, and technology."
        }
      },
      {
        "@type": "Question",
        "name": "How can I contact Evan Maus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can contact Evan via email at evan_maus@berkeley.edu, connect on LinkedIn at linkedin.com/in/evwillow, or follow on Twitter @evwillow1."
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData)
      }}
    />
  )
}

export default FAQSchema
