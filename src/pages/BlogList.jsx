// src/pages/BlogList.jsx
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { blogPosts } from '../data/blogPosts'
import '../blog.css'

export function BlogList() {
  return (
    <>
      <SEO
        title="Pediatric Health Blog | Dr. Piyush Pediatric Clinic, Himayatnagar Hyderabad"
        description="Practical pediatric health guidance for parents in Himayatnagar and Hyderabad — fever care, vaccination schedule, and newborn care tips from Dr. Piyush."
        keywords={['pediatric blog Hyderabad', 'child health articles', 'parenting tips Himayatnagar']}
      />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-ink mb-3">Pediatric Health Blog</h1>
          <p className="text-ink/60 max-w-xl mx-auto">
            Practical guidance for parents in Himayatnagar and across Hyderabad, written by Dr. Piyush.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="bg-white border border-cream rounded-card overflow-hidden hover:shadow-md transition-shadow group focus-visible:outline-none"
            >
              <div className="aspect-video bg-primary/10 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <p className="text-xs text-ink/50 mb-2">
                  {new Date(post.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <h2 className="font-heading font-medium text-ink mb-2 leading-snug">{post.title}</h2>
                <p className="text-sm text-ink/60 leading-relaxed line-clamp-3">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
