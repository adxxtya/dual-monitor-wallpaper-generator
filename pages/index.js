import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Photos from "@/components/Photos";
import Editor from "@/components/Editor";
import Playground from "@/components/Playground";

export default function Home() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        {/* <Hero /> */}
        <Editor />
        {/* <Playground /> */}
      </main>
      <article>
        <Photos />
      </article>
    </>
  )
}
