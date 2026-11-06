import siteMetadata from "@/src/utils/siteMetaData"
import Link from "next/link"
import AskClient from "@/src/components/Ask/AskClient"

export const metadata = {
  title: "Ask about my work",
  description: `Ask a question about ${siteMetadata.author}'s projects, research and experience. Answers come only from this site, public READMEs and the accepted numbers on /verify, with citations.`,
  alternates: { canonical: `${siteMetadata.siteUrl}/ask` },
}

export default function AskPage() {
  return (
    <main className="flex flex-col items-center px-5 sm:px-10 md:px-24 lg:px-32 my-12">
      <article className="max-w-3xl w-full text-dark dark:text-light">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Ask about my work</h1>
        <p className="text-lg text-dark/80 dark:text-light/80 mb-3">
          Ask about my projects, research, experience or education. The answers come only from this site, my public
          GitHub READMEs and the accepted numbers on the <Link href="/verify" className="underline hover:text-accent">verify page</Link>,
          and every answer cites its sources.
        </p>
        <p className="text-sm text-dark/60 dark:text-light/60 mb-8">
          A model writes each answer, and plain code checks it before you see it: an answer that states a number no
          accepted claim supports is blocked. Questions outside my work get a short refusal. Analytics record a topic
          label and a hash of your question, never the text.
        </p>
        <AskClient />
      </article>
    </main>
  )
}
