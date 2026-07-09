// src/pages/BlogPost.jsx
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { SEO } from '../components/SEO'
import { blogPosts, getPostBySlug } from '../data/blogPosts'
import '../blog.css'

export function BlogPost({ setIsModalOpen }) {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <Navigate to="/blog" replace />

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <SEO
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.keywords}
        articleData={post}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline mb-8">
          <ArrowLeft size={16} aria-hidden="true" /> Back to blog
        </Link>
        <p className="text-xs text-ink/50 mb-3">
          {new Date(post.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · {post.readTime}
        </p>
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-ink leading-tight mb-6">
          {post.title}
        </h1>
        <div className="aspect-video bg-primary/10 rounded-card overflow-hidden mb-8">
          <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="prose-custom">
          {post.content.map((block, i) =>
            block.type === 'h2' ? (
              <h2 key={i} className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">
                {block.text}
              </h2>
            ) : (
              <p key={i} className="text-ink/75 leading-relaxed mb-4">
                {block.text}
              </p>
            )
          )}
        </div>
        <div className="mt-10 pt-8 border-t border-cream flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-ink/60">Written by Dr. Piyush Agarwal, Pediatrician</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-5 py-2.5 rounded-full cursor-pointer"
            style={{ border: 'none' }}
          >
            Book Appointment <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
        {relatedPosts.length > 0 && (
          <div className="mt-14">
            <h3 className="font-heading font-medium text-ink mb-4">Related articles</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  to={`/blog/${rp.slug}`}
                  className="bg-cream/30 border border-cream rounded-card p-4 hover:shadow-sm transition-shadow"
                >
                  <p className="text-sm font-medium text-ink leading-snug">{rp.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  )
}
