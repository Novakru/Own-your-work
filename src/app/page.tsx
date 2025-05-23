import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

async function getPosts() {
  const dir = path.join(process.cwd(), 'src/content')
  const files = fs.readdirSync(dir)
  
  const posts = files.map(file => {
    const filePath = path.join(dir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(fileContent)
    
    return {
      slug: file.replace(/\.md$/, ''),
      title: data.title,
      date: typeof data.date === 'string' ? data.date : String(data.date)
    }
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Own-your-work</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h2>
            <time className="text-gray-500 text-sm">{post.date}</time>
          </article>
        ))}
      </div>
    </main>
  )
}