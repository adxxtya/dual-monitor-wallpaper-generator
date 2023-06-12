import Navbar from "@/components/Navbar";
import Photos from "@/components/Photos";
import Editor from "@/components/Editor";

export default function Home() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Editor />
      </main>
      <article>
        <Photos />
      </article>
    </>
  )
}
