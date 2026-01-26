// API route for Markdown content delivery
import { getFileBySlug, formatSlug } from '@/lib/mdx'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  const { slug } = req.query
  const slugPath = slug.join('/')

  try {
    // Check if this is a Markdown request
    const acceptHeader = req.headers['accept'] || ''
    const isMarkdownRequest = acceptHeader.includes('text/markdown') || slugPath.endsWith('.md')

    if (!isMarkdownRequest) {
      return res.status(406).json({ error: 'This endpoint only serves Markdown content' })
    }

    // Remove .md extension if present
    const cleanSlug = slugPath.replace(/\.md$/, '')

    // Get the raw markdown content
    const root = process.cwd()
    const mdxPath = path.join(root, 'data', 'blog', `${cleanSlug}.mdx`)
    const mdPath = path.join(root, 'data', 'blog', `${cleanSlug}.md`)

    let filePath
    if (fs.existsSync(mdxPath)) {
      filePath = mdxPath
    } else if (fs.existsSync(mdPath)) {
      filePath = mdPath
    } else {
      return res.status(404).json({ error: 'Blog post not found' })
    }

    const source = fs.readFileSync(filePath, 'utf8')
    const { data: frontMatter, content } = matter(source)

    // Build clean Markdown output with metadata
    const markdownOutput = `---
title: ${frontMatter.title || 'Untitled'}
date: ${frontMatter.date || ''}
tags: ${frontMatter.tags ? frontMatter.tags.join(', ') : ''}
summary: ${frontMatter.summary || ''}
---

${content}
`

    // Set appropriate headers
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
    res.setHeader('X-Robots-Tag', 'noindex') // Prevent duplicate content issues

    return res.status(200).send(markdownOutput)
  } catch (error) {
    console.error('Error serving Markdown:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
