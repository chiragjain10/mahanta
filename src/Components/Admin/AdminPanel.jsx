import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import AddPropertyModal from './AddPropertyModal';
import './AdminPanel.css';

const AdminPanel = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Project management state
    const [projectItems, setProjectItems] = useState([]);
    const [projectLoading, setProjectLoading] = useState(true);
    const [projectSaving, setProjectSaving] = useState(false);
    const [projectUploadProgress, setProjectUploadProgress] = useState(0);
    const [projectImagePreview, setProjectImagePreview] = useState('');
    const [projectFile, setProjectFile] = useState(null);
    const [projectForm, setProjectForm] = useState({
        title: '',
        location: '',
        ctaUrl: '',
        ctaLabel: 'Read More'
    });

    // Blog management state
    const [blogItems, setBlogItems] = useState([]);
    const [blogLoading, setBlogLoading] = useState(true);
    const [blogSaving, setBlogSaving] = useState(false);
    const [blogUploadProgress, setBlogUploadProgress] = useState(0);
    const [blogImagePreview, setBlogImagePreview] = useState('');
    const [blogFile, setBlogFile] = useState(null);
    const [blogForm, setBlogForm] = useState({
        title: '',
        author: '',
        category: '',
        date: '',
        excerpt: '',
        ctaUrl: ''
    });

    // Gallery management state
    const [galleryItems, setGalleryItems] = useState([]);
    const [galleryLoading, setGalleryLoading] = useState(true);
    const [gallerySaving, setGallerySaving] = useState(false);
    const [galleryUploadProgress, setGalleryUploadProgress] = useState(0);
    const [galleryImagePreview, setGalleryImagePreview] = useState('');
    const [galleryFile, setGalleryFile] = useState(null);

    // Fetch properties from Firebase
    const fetchProperties = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'properties'));
            const propertiesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProperties(propertiesData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setLoading(false);
        }
    };

    // Gallery handlers
    const fetchGallery = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'gallery'));
            const gallery = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
            setGalleryItems(gallery);
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setGalleryLoading(false);
        }
    };

    // No additional metadata required for gallery images

    const handleGalleryImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setGalleryFile(file);
        setGalleryImagePreview(URL.createObjectURL(file));
    };

    const resetGalleryForm = () => {
        setGalleryFile(null);
        setGalleryImagePreview('');
        setGalleryUploadProgress(0);
    };

    const handleGallerySubmit = async (e) => {
        e.preventDefault();
        if (!galleryFile) {
            alert('Please select an image to upload.');
            return;
        }
        try {
            setGallerySaving(true);
            const imageUrl = await uploadMediaToCloudinary(galleryFile, setGalleryUploadProgress);
            await addDoc(collection(db, 'gallery'), {
                image: imageUrl,
                createdAt: new Date().toISOString()
            });
            resetGalleryForm();
            fetchGallery();
            alert('Image added to gallery!');
        } catch (error) {
            console.error('Error adding gallery image:', error);
            alert('Error adding image. Please try again.');
        } finally {
            setGallerySaving(false);
        }
    };

    const handleGalleryDelete = async (id) => {
        if (!window.confirm('Delete this gallery image?')) return;
        try {
            await deleteDoc(doc(db, 'gallery', id));
            fetchGallery();
        } catch (error) {
            console.error('Error deleting gallery image:', error);
            alert('Unable to delete image.');
        }
    };

    const fetchProjects = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'projects'));
            const projectsData = snapshot.docs.map(projectDoc => ({
                id: projectDoc.id,
                ...projectDoc.data()
            }));
            setProjectItems(projectsData);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setProjectLoading(false);
        }
    };

    const fetchBlogs = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'blogs'));
            const blogsData = snapshot.docs.map(blogDoc => ({
                id: blogDoc.id,
                ...blogDoc.data()
            }));
            setBlogItems(blogsData);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setBlogLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
        fetchProjects();
        fetchBlogs();
        fetchGallery();
    }, []);

    // Delete property
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                await deleteDoc(doc(db, 'properties', id));
                fetchProperties();
            } catch (error) {
                console.error('Error deleting property:', error);
                alert('Error deleting property');
            }
        }
    };

    const uploadMediaToCloudinary = async (file, onProgress) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'Mahirash');

        const response = await axios.post(
            'https://api.cloudinary.com/v1_1/djmfxpemz/image/upload',
            data,
            {
                onUploadProgress: (event) => {
                    if (event.total && onProgress) {
                        onProgress(Math.round((event.loaded / event.total) * 100));
                    }
                }
            }
        );

        return response.data.secure_url;
    };

    const handleProjectInputChange = (e) => {
        const { name, value } = e.target;
        setProjectForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProjectImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setProjectFile(file);
        const previewUrl = URL.createObjectURL(file);
        setProjectImagePreview(previewUrl);
    };

    const resetProjectForm = () => {
        setProjectForm({
            title: '',
            location: '',
            ctaUrl: '',
            ctaLabel: 'Read More'
        });
        setProjectFile(null);
        setProjectImagePreview('');
        setProjectUploadProgress(0);
    };

    const handleProjectSubmit = async (e) => {
        e.preventDefault();

        if (!projectForm.title || !projectForm.location) {
            alert('Please provide a project title and location.');
            return;
        }

        if (!projectFile) {
            alert('Please upload a project cover image.');
            return;
        }

        try {
            setProjectSaving(true);
            const imageUrl = await uploadMediaToCloudinary(projectFile, setProjectUploadProgress);

            await addDoc(collection(db, 'projects'), {
                title: projectForm.title,
                location: projectForm.location,
                ctaUrl: projectForm.ctaUrl,
                ctaLabel: projectForm.ctaLabel || 'Read More',
                image: imageUrl,
                createdAt: new Date().toISOString()
            });

            resetProjectForm();
            fetchProjects();
            alert('Project added successfully!');
        } catch (error) {
            console.error('Error adding project:', error);
            alert('Error adding project. Please try again.');
        } finally {
            setProjectSaving(false);
        }
    };

    const handleProjectDelete = async (id) => {
        if (!window.confirm('Delete this project?')) {
            return;
        }

        try {
            await deleteDoc(doc(db, 'projects', id));
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Unable to delete project. Please try again.');
        }
    };

    const handleBlogInputChange = (e) => {
        const { name, value } = e.target;
        setBlogForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBlogImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setBlogFile(file);
        setBlogImagePreview(URL.createObjectURL(file));
    };

    const resetBlogForm = () => {
        setBlogForm({
            title: '',
            author: '',
            category: '',
            date: '',
            excerpt: '',
            ctaUrl: ''
        });
        setBlogFile(null);
        setBlogImagePreview('');
        setBlogUploadProgress(0);
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();

        if (!blogForm.title || !blogForm.author || !blogForm.excerpt) {
            alert('Please fill in the required blog fields.');
            return;
        }

        if (!blogFile) {
            alert('Please upload a blog cover image.');
            return;
        }

        try {
            setBlogSaving(true);
            const imageUrl = await uploadMediaToCloudinary(blogFile, setBlogUploadProgress);
            await addDoc(collection(db, 'blogs'), {
                ...blogForm,
                image: imageUrl,
                createdAt: new Date().toISOString()
            });
            resetBlogForm();
            fetchBlogs();
            alert('Blog added successfully!');
        } catch (error) {
            console.error('Error adding blog:', error);
            alert('Error adding blog. Please try again.');
        } finally {
            setBlogSaving(false);
        }
    };

    const handleBlogDelete = async (id) => {
        if (!window.confirm('Delete this blog post?')) {
            return;
        }

        try {
            await deleteDoc(doc(db, 'blogs', id));
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('Unable to delete blog. Please try again.');
        }
    };

    // Filter properties based on search
    const filteredProperties = properties.filter(property =>
        property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.agent?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-panel">
            <div className="admin-container">
                {/* Header */}
                <div className="admin-header">
                    <div className="admin-header-content">
                        <h1 className="admin-title">
                            <span className="admin-icon">🏢</span>
                            Property Management
                        </h1>
                        <p className="admin-subtitle">Manage all your properties from one place</p>
                    </div>
                    <button 
                        className="admin-add-btn"
                        onClick={() => setShowModal(true)}
                    >
                        <span className="btn-icon">+</span>
                        Add New Property
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="admin-stats">
                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-content">
                            <h3>{properties.length}</h3>
                            <p>Total Properties</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⭐</div>
                        <div className="stat-content">
                            <h3>{properties.filter(p => p.featured).length}</h3>
                            <p>Featured</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">💰</div>
                        <div className="stat-content">
                            <h3>{properties.filter(p => p.forSale).length}</h3>
                            <p>For Sale</p>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="admin-search">
                    <input
                        type="text"
                        placeholder="Search properties by title, location, or agent..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="admin-search-input"
                    />
                </div>

                {/* Properties Table */}
                {loading ? (
                    <div className="admin-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading properties...</p>
                    </div>
                ) : (
                    <>
                        <div className="admin-table-container">
                            {filteredProperties.length === 0 ? (
                                <div className="admin-empty">
                                    <div className="empty-icon">📭</div>
                                    <h3>No properties found</h3>
                                    <p>{searchTerm ? 'Try a different search term' : 'Add your first property to get started'}</p>
                                    {!searchTerm && (
                                        <button 
                                            className="admin-add-btn"
                                            onClick={() => setShowModal(true)}
                                        >
                                            Add Property
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="admin-properties-grid">
                                    {filteredProperties.map(property => (
                                        <div key={property.id} className="admin-property-card">
                                            <div className="admin-card-image">
                                                <img 
                                                    src={property.images?.[0] || property.image || '/images/home/house-1.jpg'} 
                                                    alt={property.title}
                                                />
                                                <div className="admin-card-badges">
                                                    {property.featured && <span className="badge-featured">Featured</span>}
                                                    <span className={`badge-type ${property.forSale ? 'sale' : 'rent'}`}>
                                                        {property.forSale ? 'For Sale' : 'For Rent'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="admin-card-content">
                                                <h3 className="admin-card-title">{property.title}</h3>
                                                <p className="admin-card-location">📍 {property.location}</p>
                                                <div className="admin-card-details">
                                                    <span>🛏️ {property.beds} Beds</span>
                                                    <span>🚿 {property.baths} Baths</span>
                                                    <span>📐 {property.sqft} Sqft</span>
                                                </div>
                                                <div className="admin-card-footer">
                                                    <div className="admin-card-agent">
                                                        <img 
                                                            src={property.avatar || '/images/avatar/avt-png1.png'} 
                                                            alt={property.agent}
                                                            className="admin-agent-avatar"
                                                        />
                                                        <span>{property.agent}</span>
                                                    </div>
                                                    <div className="admin-card-price">{property.price}</div>
                                                </div>
                                                <div className="admin-card-actions">
                                                    <button 
                                                        className="admin-btn-delete"
                                                        onClick={() => handleDelete(property.id)}
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="admin-projects-title">
                                <span className="admin-icon">🚧</span>
                                Project Showcase
                            </h2>
                            <p className="admin-subtitle">Add and curate the projects that appear on the website.</p>
                        </div>
                    </>
                )}
                
                {/* Projects Grid */}
                <div className="admin-projects-grid">
                    <form className="project-form-card" onSubmit={handleProjectSubmit}>
                        <h3>Upload new project</h3>
                        <div className="form-group">
                            <label>Project Title *</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g., Rudraaksh Aangan"
                                value={projectForm.title}
                                onChange={handleProjectInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Location / Short Description *</label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Located at Sanwer, Ujjain Road"
                                value={projectForm.location}
                                onChange={handleProjectInputChange}
                            />
                        </div>

                        {/* <div className="form-row">
                            <div className="form-group">
                                <label>Read More URL</label>
                                <input
                                    type="url"
                                    name="ctaUrl"
                                    placeholder="https://example.com/project"
                                    value={projectForm.ctaUrl}
                                    onChange={handleProjectInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>CTA Label</label>
                                <input
                                    type="text"
                                    name="ctaLabel"
                                    placeholder="Read More"
                                    value={projectForm.ctaLabel}
                                    onChange={handleProjectInputChange}
                                />
                            </div>
                        </div> */}

                        <div className="form-group">
                            <label>Cover Image *</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProjectImageChange}
                            />
                        </div>

                        {projectImagePreview && (
                            <div className="project-preview">
                                <img src={projectImagePreview} alt="Project preview" />
                            </div>
                        )}

                        {projectSaving && (
                            <div className="project-upload-progress">
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${projectUploadProgress}%` }}
                                    ></div>
                                </div>
                                <p>Uploading image... {projectUploadProgress}%</p>
                            </div>
                        )}

                        <div className="project-form-actions">
                            <button type="button" className="btn-cancel" onClick={resetProjectForm} disabled={projectSaving}>
                                Reset
                            </button>
                            <button type="submit" className="btn-submit" disabled={projectSaving}>
                                {projectSaving ? 'Saving...' : 'Add Project'}
                            </button>
                        </div>
                    </form>

                    <div className="project-list-card">
                        <div className="project-list-header">
                            <h3>Live cards</h3>
                            <span>{projectItems.length} project(s)</span>
                        </div>

                        {projectLoading ? (
                            <div className="admin-loading project-loading">
                                <div className="loading-spinner"></div>
                                <p>Loading projects...</p>
                            </div>
                        ) : projectItems.length === 0 ? (
                            <div className="admin-empty">
                                <div className="empty-icon">🧱</div>
                                <h3>No projects yet</h3>
                                <p>Add your first project to showcase it on the homepage.</p>
                            </div>
                        ) : (
                            <div className="project-card-grid">
                                {projectItems.map((project) => (
                                    <div key={project.id} className="project-card">
                                        <div className="project-card-image">
                                            <img
                                                src={project.image || '/images/home/house-1.jpg'}
                                                alt={project.title}
                                            />
                                        </div>
                                        <div className="project-card-body">
                                            <h4>{project.title}</h4>
                                            <p>{project.location}</p>
                                            {project.ctaUrl && (
                                                <a
                                                    href={project.ctaUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="project-link"
                                                >
                                                    {project.ctaLabel || 'Read More'}
                                                </a>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            className="admin-btn-delete"
                                            onClick={() => handleProjectDelete(project.id)}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <section className="admin-projects-section">
                <div className="admin-projects-header">
                    <div>
                        <h2 className="admin-projects-title">
                            <span className="admin-icon">🖼️</span>
                            Gallery Manager
                        </h2>
                        <p className="admin-subtitle">Upload images to appear on the Gallery page.</p>
                    </div>
                </div>

                <div className="admin-projects-grid">
                    <form className="project-form-card" onSubmit={handleGallerySubmit}>
                        <h3>Upload new image</h3>
                        {/* Only image input required */}
                        <div className="form-group">
                            <label>Image *</label>
                            <input type="file" accept="image/*" onChange={handleGalleryImageChange} />
                        </div>

                        {galleryImagePreview && (
                            <div className="project-preview">
                                <img src={galleryImagePreview} alt="Preview" />
                            </div>
                        )}

                        {gallerySaving && (
                            <div className="project-upload-progress">
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${galleryUploadProgress}%` }}></div>
                                </div>
                                <p>Uploading... {galleryUploadProgress}%</p>
                            </div>
                        )}

                        <button type="submit" className="admin-add-btn" disabled={gallerySaving}>
                            {gallerySaving ? 'Saving...' : 'Add to Gallery'}
                        </button>
                    </form>

                    <div className="project-list-card">
                        <h3>Gallery Images</h3>
                        {galleryLoading ? (
                            <div className="admin-loading"><div className="loading-spinner"></div><p>Loading...</p></div>
                        ) : galleryItems.length === 0 ? (
                            <div className="admin-empty"><p>No images yet. Upload one to get started.</p></div>
                        ) : (
                            <div className="admin-properties-grid">
                                {galleryItems.map(item => (
                                    <div key={item.id} className="admin-property-card">
                                        <div className="admin-card-image">
                                            <img src={item.image} alt={'Gallery image'} />
                                        </div>
                                        <div className="admin-card-content">
                                            <div className="admin-card-actions">
                                                <button className="admin-btn-delete" onClick={() => handleGalleryDelete(item.id)}>
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Blogs Section */}
            <section className="admin-blogs-section">
                <div className="admin-blogs-header">
                    <div>
                        <h2 className="admin-blogs-title">
                            <span className="admin-icon">📝</span>
                            Blog Publisher
                        </h2>
                        <p className="admin-subtitle">Publish insights that appear instantly on the website blog pages.</p>
                    </div>
                </div>

                <div className="admin-blogs-grid">
                    <form className="blog-form-card" onSubmit={handleBlogSubmit}>
                        <h3>Write a new article</h3>
                        <div className="form-group">
                            <label>Title *</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Headline for the blog"
                                value={blogForm.title}
                                onChange={handleBlogInputChange}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Author *</label>
                                <input
                                    type="text"
                                    name="author"
                                    placeholder="Author name"
                                    value={blogForm.author}
                                    onChange={handleBlogInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    placeholder="e.g., Investment"
                                    value={blogForm.category}
                                    onChange={handleBlogInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Publish Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={blogForm.date}
                                    onChange={handleBlogInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Read More URL</label>
                                <input
                                    type="url"
                                    name="ctaUrl"
                                    placeholder="Optional external link"
                                    value={blogForm.ctaUrl}
                                    onChange={handleBlogInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Excerpt *</label>
                            <textarea
                                name="excerpt"
                                rows="4"
                                placeholder="Short summary that appears on the cards"
                                value={blogForm.excerpt}
                                onChange={handleBlogInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Cover Image *</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleBlogImageChange}
                            />
                        </div>

                        {blogImagePreview && (
                            <div className="blog-preview">
                                <img src={blogImagePreview} alt="Blog preview" />
                            </div>
                        )}

                        {blogSaving && (
                            <div className="blog-upload-progress">
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${blogUploadProgress}%` }}
                                    ></div>
                                </div>
                                <p>Uploading image... {blogUploadProgress}%</p>
                            </div>
                        )}

                        <div className="blog-form-actions">
                            <button type="button" className="btn-cancel" onClick={resetBlogForm} disabled={blogSaving}>
                                Reset
                            </button>
                            <button type="submit" className="btn-submit" disabled={blogSaving}>
                                {blogSaving ? 'Publishing...' : 'Publish Blog'}
                            </button>
                        </div>
                    </form>

                    <div className="blog-list-card">
                        <div className="blog-list-header">
                            <h3>Published posts</h3>
                            <span>{blogItems.length} blog(s)</span>
                        </div>

                        {blogLoading ? (
                            <div className="admin-loading project-loading">
                                <div className="loading-spinner"></div>
                                <p>Loading blogs...</p>
                            </div>
                        ) : blogItems.length === 0 ? (
                            <div className="admin-empty">
                                <div className="empty-icon">📰</div>
                                <h3>No blog posts</h3>
                                <p>Use the form to publish your first article.</p>
                            </div>
                        ) : (
                            <div className="blog-card-grid">
                                {blogItems.map((blog) => (
                                    <div key={blog.id} className="blog-card-admin">
                                        <div className="blog-card-image">
                                            <img src={blog.image || '/images/blog/blog-1.jpg'} alt={blog.title} />
                                        </div>
                                        <div className="blog-card-body">
                                            <p className="blog-meta">
                                                <span>{blog.author}</span>
                                                <span>{blog.category}</span>
                                            </p>
                                            <h4>{blog.title}</h4>
                                            <p className="blog-excerpt">{blog.excerpt}</p>
                                            {blog.date && <span className="blog-date-tag">{blog.date}</span>}
                                        </div>
                                        <button
                                            type="button"
                                            className="admin-btn-delete"
                                            onClick={() => handleBlogDelete(blog.id)}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Add Property Modal */}
            {showModal && (
                <AddPropertyModal
                    onClose={() => setShowModal(false)}
                    onSuccess={() => {
                        setShowModal(false);
                        fetchProperties();
                    }}
                />
            )}
        </div>
    );
};

export default AdminPanel;

