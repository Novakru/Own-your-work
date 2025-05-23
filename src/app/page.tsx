import Link from 'next/link'

export default function Home() {
  const posts = [
    {
      id: 1,
      title: '我的第一篇博客文章',
      date: '2024-03-20',
      excerpt: '这是我的第一篇博客文章，欢迎阅读！'
    },
    {
      id: 2,
      title: '学习 Next.js 的心得',
      date: '2024-03-21',
      excerpt: '分享我在学习 Next.js 过程中的一些心得体会...'
    }
  ]

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">我的博客</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="border p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/posts/${post.id}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h2>
            <time className="text-gray-500 text-sm">{post.date}</time>
            <p className="mt-4 text-gray-700">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
