import siteMetadata from "@/src/utils/siteMetaData"

export const metadata = {
  title: "Contact",
  description: `Get in touch with ${siteMetadata.author} for collaborations, questions or opportunities.`,
}

export default function ContactLayout({ children }) {
  return children
}
