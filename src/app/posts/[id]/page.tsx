import Link from 'next/link'

type Post = {
  title: string
  date: string
  content: string
}

type Posts = {
  [key: string]: Post
}

// 模拟文章数据
const posts: Posts = {
  '1': {
    title: '我的第一篇博客文章',
    date: '2024-03-20',
    content: `
      这是我的第一篇博客文章，欢迎阅读！
      
      在这里，我将分享我的想法和经验。希望这些内容对你有帮助。
      
      如果你有任何问题或建议，欢迎在评论区留言。
    `
  },
  '2': {
    title: '学习 Next.js 的心得',
    date: '2024-03-21',
    content: `
      分享我在学习 Next.js 过程中的一些心得体会。
      
      Next.js 是一个非常强大的 React 框架，它提供了很多开箱即用的功能。
      
      在这篇文章中，我将分享一些使用 Next.js 的最佳实践。
    `
  }
}

export default function Post({ params }: { params: { id: string } }) {
  const post = posts[params.id]

  if (!post) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          返回首页
        </Link>
      </div>
    )
  }

  return (
    <article className="min-h-screen p-8 max-w-3xl mx-auto">
      <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
        ← 返回首页
      </Link>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <time className="text-gray-500 text-sm block mb-8">{post.date}</time>
      <div className="prose prose-lg">
        {post.content.split('\n\n').map((paragraph: string, index: number) => (
          <p key={index} className="mb-4">
            {paragraph.trim()}
          </p>
        ))}
      </div>
    </article>
  )
} 