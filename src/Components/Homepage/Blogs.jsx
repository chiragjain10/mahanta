import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, limit } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import './Blogs.css';
import { Link } from 'react-router-dom';

const BlogsSpotlight = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const blogRef = collection(db, 'blogs');
        const blogQuery = query(blogRef, orderBy('createdAt', 'desc'), limit(3));

        const unsubscribe = onSnapshot(
            blogQuery,
            (snapshot) => {
                const records = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBlogs(records);
                setLoading(false);
            },
            () => setLoading(false)
        );

        return () => unsubscribe();
    }, []);

    return (
        <section className="homepage-blogs" data-aos="fade-up">
            <div className="container">
                <div className="box-title text-center wow fadeInUp">
                    <div className="text-subtitle text-primary">Insights from Mahanta</div>
                    <h3 className="mt-4 title">Latest blog highlights</h3>
                </div>

                {loading ? (
                    <div className="blogs-state">
                        <p>Loading featured blogs...</p>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="blogs-state">
                        <p>Publish your first blog from the Admin panel to showcase it here.</p>
                    </div>
                ) : (
                    <div className="blogs-grid" data-aos="fade-up" data-aos-delay="150">
                        {blogs.map((blog, idx) => (
                            <article
                                key={blog.id}
                                className="blogs-card"
                                data-aos="fade-up"
                                data-aos-delay={200 + idx * 100}
                            >
                                <div className="blogs-card-image">
                                    <img src={blog.image || '/images/blog/blog-1.jpg'} alt={blog.title} />
                                    {blog.category && <span>{blog.category}</span>}
                                </div>
                                <div className="blogs-card-body">
                                    <p className="blogs-meta">
                                        {blog.author || 'Mahanta Group'} · {blog.date || 'Fresh update'}
                                    </p>
                                    <h3>{blog.title}</h3>
                                    <p>{blog.excerpt}</p>
                                    <Link
                                        to={blog.ctaUrl || '/blog'}
                                        target={blog.ctaUrl ? '_blank' : '_self'}
                                        rel={blog.ctaUrl ? 'noreferrer' : undefined}
                                        className="blogs-card-link"
                                    >
                                        Continue reading
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogsSpotlight;

