import * as React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src/content')
  const files = fs.readdirSync(dir)
  return files.map(file => ({
    slug: file.replace(/\.md$/, '')
  }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
	const { slug } = await params
	const filePath = path.join(process.cwd(), 'src/content', `${slug}.md`)
  if (!fs.existsSync(filePath)) return notFound()

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return (
    <article className="prose mx-auto p-8">
      <h1>{data.title}</h1>
      <p className="text-gray-500">{data.date.toString()}</p>
      <MDXRemote source={content} />
    </article>
  )
} 