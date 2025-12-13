import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import AddPropertyModal from './AddPropertyModal';
import './AdminPanel.css';

const AdminPanel = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [showBlogModal, setShowBlogModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Project management state
    const [projectItems, setProjectItems] = useState([]);
    const [projectLoading, setProjectLoading] = useState(true);
    const [projectSaving, setProjectSaving] = useState(false);
    const [projectUploadProgress, setProjectUploadProgress] = useState(0);
    const [projectImagePreview, setProjectImagePreview] = useState('');
    const [projectFile, setProjectFile] = useState(null);
    const [projectLogoFile, setProjectLogoFile] = useState(null);
    const [projectLogoPreview, setProjectLogoPreview] = useState('');
    const [projectForm, setProjectForm] = useState({
        id: '',
        title: '',
        location: '',
        ctaUrl: '',
        ctaLabel: 'Read More',
        status: 'running',
        projectName: '',
        developer: '',
        tagline: '',
        projectLayout: '',
        locationAddress: '',
        locationAdvantages: '',
        amenitiesInput: '',
        configurationsInput: '',
        pricingRateInput: '',
        pricingElectricityInput: '',
        pricingMaintenanceInput: '',
        pricingPrimeInput: '',
        pricingPlotSizeInput: ''
    });
    const [editingProjectId, setEditingProjectId] = useState(null);

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
    const [editingBlogId, setEditingBlogId] = useState(null);

    // Team management state
    const [teamItems, setTeamItems] = useState([]);
    const [teamLoading, setTeamLoading] = useState(true);
    const [teamSaving, setTeamSaving] = useState(false);
    const [teamUploadProgress, setTeamUploadProgress] = useState(0);
    const [teamImagePreview, setTeamImagePreview] = useState('');
    const [teamFile, setTeamFile] = useState(null);
    const [showTeamModal, setShowTeamModal] = useState(false);
    const [teamForm, setTeamForm] = useState({
        id: '',
        name: '',
        role: ''
    });
    const [editingTeamId, setEditingTeamId] = useState(null);
    const [firebaseTeamDocId, setFirebaseTeamDocId] = useState(null);

    // Gallery management state
    const [galleryItems, setGalleryItems] = useState([]);
    const [galleryLoading, setGalleryLoading] = useState(true);
    const [gallerySaving, setGallerySaving] = useState(false);
    const [galleryUploadProgress, setGalleryUploadProgress] = useState(0);
    const [galleryImagePreviews, setGalleryImagePreviews] = useState([]);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [galleryForm, setGalleryForm] = useState({
        id: '',
        type: 'achievements',
        title: ''
    });
    const [primaryImageIndex, setPrimaryImageIndex] = useState(null);
    const [firebaseGalleryDocId, setFirebaseGalleryDocId] = useState(null);
    const [editingGalleryId, setEditingGalleryId] = useState(null);

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
            const gallery = snapshot.docs.map(docSnap => ({ firebaseDocId: docSnap.id, ...docSnap.data() }));
            setGalleryItems(gallery);
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setGalleryLoading(false);
        }
    };

    // Team handlers
    const fetchTeam = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'team'));
            const team = snapshot.docs.map(docSnap => ({ firebaseDocId: docSnap.id, ...docSnap.data() }));
            setTeamItems(team);
        } catch (error) {
            console.error('Error fetching team:', error);
        } finally {
            setTeamLoading(false);
        }
    };

    const handleTeamInputChange = (e) => {
        const { name, value } = e.target;
        setTeamForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleTeamImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setTeamFile(file);
        setTeamImagePreview(URL.createObjectURL(file));
    };

    const resetTeamForm = () => {
        setTeamForm({ id: '', name: '', role: '' });
        setTeamFile(null);
        setTeamImagePreview('');
        setTeamUploadProgress(0);
        setFirebaseTeamDocId(null);
        setEditingTeamId(null);
    };

    const handleTeamSubmit = async (e) => {
        e.preventDefault();
        if (!teamForm.name || !teamForm.role) {
            alert('Please provide name and role.');
            return;
        }
        try {
            setTeamSaving(true);
            let imageUrl = null;
            if (teamFile) {
                imageUrl = await uploadMediaToCloudinary(teamFile, setTeamUploadProgress);
            }

            if (firebaseTeamDocId) {
                const teamRef = doc(db, 'team', firebaseTeamDocId);
                const payload = {
                    id: teamForm.id,
                    name: teamForm.name,
                    role: teamForm.role
                };
                if (imageUrl) {
                    payload.image = imageUrl;
                }
                await updateDoc(teamRef, payload);
                alert('Team member updated!');
            } else {
                if (!imageUrl) {
                    alert('Please provide an image.');
                    return;
                }
                await addDoc(collection(db, 'team'), {
                    id: teamForm.id,
                    name: teamForm.name,
                    role: teamForm.role,
                    image: imageUrl,
                    createdAt: new Date().toISOString()
                });
                alert('Team member added!');
            }
            resetTeamForm();
            setShowTeamModal(false);
            fetchTeam();
        } catch (error) {
            console.error('Error adding team member:', error);
            alert('Unable to save team member. Please try again.');
        } finally {
            setTeamSaving(false);
        }
    };

    const handleTeamDelete = async (id) => {
        if (!window.confirm('Delete this team member?')) return;
        try {
            await deleteDoc(doc(db, 'team', id));
            fetchTeam();
        } catch (error) {
            console.error('Error deleting team member:', error);
            alert('Unable to delete. Please try again.');
        }
    };

    // Gallery form handlers
    const handleGalleryImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        setGalleryFiles(files);
        setGalleryImagePreviews(files.map((f) => URL.createObjectURL(f)));
    };

    const handleGalleryInputChange = (e) => {
        const { name, value } = e.target;
        setGalleryForm((prev) => ({ ...prev, [name]: value }));
    };

    const resetGalleryForm = () => {
        setGalleryFiles([]);
        setGalleryImagePreviews([]);
        setGalleryUploadProgress(0);
        setGalleryForm({ id: '', type: 'achievements', title: '' });
        setPrimaryImageIndex(null);
        setFirebaseGalleryDocId(null);
        setEditingGalleryId(null);
    };

    const handleGallerySubmit = async (e) => {
        e.preventDefault();
        if (!galleryFiles.length && !editingGalleryId) {
            alert('Please select image(s) to upload.');
            return;
        }
        if (!galleryForm.id) {
            alert('Please provide a gallery item ID.');
            return;
        }
        try {
            setGallerySaving(true);
            let urls = [];

            if (galleryFiles.length) {
                for (let i = 0; i < galleryFiles.length; i++) {
                    const file = galleryFiles[i];
                    const url = await uploadMediaToCloudinary(file, setGalleryUploadProgress);
                    urls.push(url);
                }
            }

            if (editingGalleryId) {
                const galleryRef = doc(db, 'gallery', firebaseGalleryDocId);
                const payload = {
                    id: galleryForm.id,
                    type: galleryForm.type,
                    title: galleryForm.title
                };
                if (urls.length) {
                    payload.images = urls;
                }
                if (primaryImageIndex !== null) {
                    payload.primaryImageIndex = primaryImageIndex;
                }
                await updateDoc(galleryRef, payload);
                alert('Gallery item updated!');
            } else {
                await addDoc(collection(db, 'gallery'), {
                    id: galleryForm.id,
                    images: urls,
                    type: galleryForm.type,
                    title: galleryForm.title,
                    primaryImageIndex: primaryImageIndex !== null ? primaryImageIndex : 0,
                    createdAt: new Date().toISOString()
                });
                alert('Images added to gallery!');
            }
            resetGalleryForm();
            fetchGallery();
        } catch (error) {
            console.error('Error adding gallery images:', error);
            alert('Error saving gallery images. Please try again.');
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
        fetchTeam();
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
        data.append('upload_preset', 'Mahanta_group');

        const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dlsbj8nug/image/upload',
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

    const parseListInput = (value = '') => {
        return value
            .split('\n')
            .map(item => item.trim())
            .filter(Boolean);
    };

    const parseKeyValueInput = (value = '', { numeric = true } = {}) => {
        const result = {};
        value.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.includes(':')) return;
            const [key, ...rest] = trimmed.split(':');
            const rawVal = rest.join(':');
            if (!key || !rawVal) return;
            const cleaned = rawVal.trim();
            if (!cleaned) return;
            let finalValue = cleaned;
            if (numeric) {
                const numericValue = Number(cleaned);
                if (!Number.isNaN(numericValue)) {
                    finalValue = numericValue;
                }
            }
            result[key.trim()] = finalValue;
        });
        return result;
    };

    const parseConfigurationsInput = (value = '') => {
        const result = {};
        value.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.includes(':')) return;
            const [type, ...rest] = trimmed.split(':');
            const sizesString = rest.join(':');
            if (!type || !sizesString) return;
            const sizes = sizesString
                .split(',')
                .map(size => size.trim())
                .filter(Boolean)
                .map(size => {
                    const numericValue = Number(size);
                    return Number.isNaN(numericValue) ? size : numericValue;
                });
            if (sizes.length) {
                result[type.trim()] = { sizes_sqft: sizes };
            }
        });
        return result;
    };

    const parsePlotSizeInput = (value = '') => {
        const result = {};
        value.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.includes(':')) return;
            const [type, ...rest] = trimmed.split(':');
            const sizesString = rest.join(':');
            if (!type || !sizesString) return;
            const sizes = sizesString
                .split(',')
                .map(size => size.trim())
                .filter(Boolean)
                .map(size => {
                    const numericValue = Number(size);
                    return Number.isNaN(numericValue) ? size : numericValue;
                });
            if (sizes.length) {
                result[type.trim()] = sizes;
            }
        });
        return result;
    };

    const buildPricingPayload = () => {
        const pricing = {};
        const rate = parseKeyValueInput(projectForm.pricingRateInput, { numeric: true });
        const electricity = parseKeyValueInput(projectForm.pricingElectricityInput, { numeric: true });
        const maintenance = parseKeyValueInput(projectForm.pricingMaintenanceInput, { numeric: true });
        const prime = parseKeyValueInput(projectForm.pricingPrimeInput, { numeric: false });
        const plotSizes = parsePlotSizeInput(projectForm.pricingPlotSizeInput);

        if (Object.keys(rate).length) pricing.rate_per_sqft = rate;
        if (Object.keys(electricity).length) pricing.electricity_charge = electricity;
        if (Object.keys(maintenance).length) pricing.maintenance = maintenance;
        if (Object.keys(prime).length) pricing.prime_location_charges = prime;
        if (Object.keys(plotSizes).length) pricing.plot_size_sqft = plotSizes;

        return Object.keys(pricing).length ? pricing : undefined;
    };

    const extractProjectLocation = (project) => {
        if (!project?.location) return '';
        if (typeof project.location === 'string') return project.location;
        return project.location.summary || project.location.address || '';
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

    const handleProjectLogoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            setProjectLogoFile(null);
            setProjectLogoPreview('');
            return;
        }
        setProjectLogoFile(file);
        const previewUrl = URL.createObjectURL(file);
        setProjectLogoPreview(previewUrl);
    };

    const resetProjectForm = () => {
        setProjectForm({
            id: '',
            title: '',
            location: '',
            ctaUrl: '',
            ctaLabel: 'Read More',
            status: 'running',
            projectName: '',
            developer: '',
            tagline: '',
            projectLayout: '',
            locationAddress: '',
            locationAdvantages: '',
            amenitiesInput: '',
            configurationsInput: '',
            pricingRateInput: '',
            pricingElectricityInput: '',
            pricingMaintenanceInput: '',
            pricingPrimeInput: '',
            pricingPlotSizeInput: ''
        });
        setProjectFile(null);
        setProjectImagePreview('');
        setProjectUploadProgress(0);
        setProjectLogoFile(null);
        setProjectLogoPreview('');
        setEditingProjectId(null);
    };

    const handleProjectSubmit = async (e) => {
        e.preventDefault();

        if (!projectForm.id || !projectForm.title || !projectForm.location) {
            alert('Please provide a project ID, title and short location summary.');
            return;
        }

        try {
            setProjectSaving(true);
            let imageUrl = null;
            if (projectFile) {
                imageUrl = await uploadMediaToCloudinary(projectFile, setProjectUploadProgress);
            }
            let logoUrl = null;
            if (projectLogoFile) {
                // Logo upload is optional; we don't track progress bar for this
                logoUrl = await uploadMediaToCloudinary(projectLogoFile);
            }

            const locationPayload = {
                summary: projectForm.location
            };
            if (projectForm.locationAddress) {
                locationPayload.address = projectForm.locationAddress;
            }
            const locationAdvantages = parseListInput(projectForm.locationAdvantages);
            if (locationAdvantages.length) {
                locationPayload.advantages = locationAdvantages;
            }

            const amenities = parseListInput(projectForm.amenitiesInput);
            const configurations = parseConfigurationsInput(projectForm.configurationsInput);
            const pricing = buildPricingPayload();

            const baseProject = {
                title: projectForm.title,
                project_name: projectForm.projectName || projectForm.title,
                developer: projectForm.developer || '',
                tagline: projectForm.tagline || '',
                project_layout: projectForm.projectLayout || '',
                status: projectForm.status,
                location: locationPayload,
                ctaUrl: projectForm.ctaUrl,
                ctaLabel: projectForm.ctaLabel || 'Read More'
            };

            if (imageUrl) {
                baseProject.image = imageUrl;
            }
            if (logoUrl) {
                baseProject.logo = logoUrl;
            }

            const newProject = {
                ...baseProject,
                createdAt: new Date().toISOString()
            };

            if (amenities.length) {
                newProject.amenities = amenities;
            }

            if (Object.keys(configurations).length) {
                newProject.configurations = configurations;
            }

            if (pricing) {
                if (editingProjectId) {
                    baseProject.pricing = pricing;
                } else {
                    newProject.pricing = pricing;
                }
            }

            if (editingProjectId) {
                const projectRef = doc(db, 'projects', editingProjectId);
                await updateDoc(projectRef, baseProject);
                alert('Project updated successfully!');
            } else {
                await addDoc(collection(db, 'projects'), newProject);
                alert('Project added successfully!');
            }

            resetProjectForm();
            fetchProjects();
        } catch (error) {
            console.error('Error adding project:', error);
            alert('Error saving project. Please try again.');
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
        setEditingBlogId(null);
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();

        // Required fields (image removed)
        if (!blogForm.title || !blogForm.author || !blogForm.excerpt) {
            alert('Please fill in the required blog fields.');
            return;
        }

        try {
            setBlogSaving(true);

            let imageUrl = null;

            // Upload only if user selected a new file
            if (blogFile) {
                imageUrl = await uploadMediaToCloudinary(blogFile, setBlogUploadProgress);
            }

            if (editingBlogId) {
                // UPDATE BLOG
                const blogRef = doc(db, 'blogs', editingBlogId);

                const payload = {
                    ...blogForm
                };

                // Only update image if user uploaded new one
                if (imageUrl) {
                    payload.image = imageUrl;
                }

                await updateDoc(blogRef, payload);
                alert('Blog updated successfully!');
            } else {
                // ADD NEW BLOG
                await addDoc(collection(db, 'blogs'), {
                    ...blogForm,
                    image: imageUrl || null, // Image optional
                    createdAt: new Date().toISOString()
                });

                alert('Blog added successfully!');
            }

            resetBlogForm();
            fetchBlogs();
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('Error saving blog. Please try again.');
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
                                                    {(property.type === 'plot' || property.plot_category) ? (
                                                        <>
                                                            <span>🧱 {(property.plot_category || 'residential').charAt(0).toUpperCase() + (property.plot_category || 'residential').slice(1)} plot</span>
                                                            {property.contact_phone && <span>📞 {property.contact_phone}</span>}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>🛏️ {property.beds} Beds</span>
                                                            <span>🚿 {property.baths} Baths</span>
                                                            <span>📐 {property.sqft} Sqft</span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="admin-card-footer">
                                                    <div className="admin-card-agent">
                                                        <img
                                                            src={property.avatar || '/images/avatar/avt-png1.png'}
                                                            alt={property.agent || property.contact_name}
                                                            className="admin-agent-avatar"
                                                        />
                                                        <span>{property.agent || property.contact_name}</span>
                                                    </div>
                                                    <div className="admin-card-price">
                                                        {property.price || ((property.type === 'plot' || property.plot_category) ? 'Contact for price' : '')}
                                                    </div>
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
                        <div className="admin-projects-header">
                            <div>
                                <h2 className="admin-projects-title">
                                    <span className="admin-icon">🚧</span>
                                    Project Showcase
                                </h2>
                                <p className="admin-subtitle">Add and curate the projects that appear on the website.</p>
                            </div>
                            <button className="admin-add-btn" type="button" onClick={() => setShowProjectModal(true)}>+ Add Project</button>
                        </div>
                    </>
                )}

                {/* Projects Grid */}
                <div className="admin-projects-grid">
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
                            <ul className="admin-list">
                                {projectItems.map((project) => (
                                    <li key={project.id} className="admin-list-item">
                                        <div className="list-media">
                                            <img
                                                src={project.logo || project.image || '/images/home/house-1.jpg'}
                                                alt={project.title}
                                            />
                                        </div>
                                        <div className="list-main">
                                            <div className="list-title">{project.title}</div>
                                            <div className="list-sub">{extractProjectLocation(project)}</div>
                                        </div>
                                        <div className="list-meta">
                                            {project.status && (
                                                <span className={`project-status-tag ${project.status}`}>
                                                    {project.status === 'running' ? 'Running' : 'Completed'}
                                                </span>
                                            )}
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
                                        <div className="list-right">
                                            <button
                                                type="button"
                                                className="admin-btn-secondary"
                                                onClick={() => {
                                                    setEditingProjectId(project.id);
                                                    setProjectForm({
                                                        id: project.id || '',
                                                        title: project.title || '',
                                                        location: extractProjectLocation(project) || '',
                                                        ctaUrl: project.ctaUrl || '',
                                                        ctaLabel: project.ctaLabel || 'Read More',
                                                        status: project.status || 'running',
                                                        projectName: project.project_name || '',
                                                        developer: project.developer || '',
                                                        tagline: project.tagline || '',
                                                        projectLayout: project.project_layout || '',
                                                        locationAddress: project.location?.address || '',
                                                        locationAdvantages: (project.location?.advantages || []).join('\n'),
                                                        amenitiesInput: (project.amenities || []).join('\n'),
                                                        configurationsInput: Object.entries(project.configurations || {})
                                                            .map(([type, cfg]) => `${type}: ${(cfg.sizes_sqft || []).join(', ')}`)
                                                            .join('\n'),
                                                        pricingRateInput: project.pricing?.rate_per_sqft
                                                            ? Object.entries(project.pricing.rate_per_sqft)
                                                                .map(([k, v]) => `${k}: ${v}`)
                                                                .join('\n')
                                                            : '',
                                                        pricingElectricityInput: project.pricing?.electricity_charge
                                                            ? Object.entries(project.pricing.electricity_charge)
                                                                .map(([k, v]) => `${k}: ${v}`)
                                                                .join('\n')
                                                            : '',
                                                        pricingMaintenanceInput: project.pricing?.maintenance
                                                            ? Object.entries(project.pricing.maintenance)
                                                                .map(([k, v]) => `${k}: ${v}`)
                                                                .join('\n')
                                                            : '',
                                                        pricingPrimeInput: project.pricing?.prime_location_charges
                                                            ? Object.entries(project.pricing.prime_location_charges)
                                                                .map(([k, v]) => `${k}: ${v}`)
                                                                .join('\n')
                                                            : '',
                                                        pricingPlotSizeInput: project.pricing?.plot_size_sqft
                                                            ? Object.entries(project.pricing.plot_size_sqft)
                                                                .map(([k, v]) => `${k}: ${v.join(', ')}`)
                                                                .join('\n')
                                                            : ''
                                                    });
                                                    setProjectImagePreview(project.image || '');
                                                    setProjectFile(null);
                                                    setProjectLogoPreview(project.logo || '');
                                                    setProjectLogoFile(null);
                                                    setShowProjectModal(true);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="admin-btn-delete"
                                                onClick={() => handleProjectDelete(project.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
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
                    <div className="project-list-card">
                        <h3>Gallery Images</h3>
                        {galleryLoading ? (
                            <div className="admin-loading"><div className="loading-spinner"></div><p>Loading...</p></div>
                        ) : galleryItems.length === 0 ? (
                            <div className="admin-empty"><p>No images yet. Upload one to get started.</p></div>
                        ) : (
                            <ul className="admin-list">
                                {galleryItems.map(item => (
                                    <li key={item.id} className="admin-list-item">
                                        <div className="list-media">
                                            <img src={(item.images && item.images[item.primaryImageIndex || 0]) || item.image || (item.images && item.images[0])} alt={'Gallery image'} />
                                            {(item.primaryImageIndex || 0) > 0 && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '8px',
                                                    right: '8px',
                                                    backgroundColor: '#3b82f6',
                                                    color: 'white',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '11px',
                                                    fontWeight: 'bold'
                                                }}>
                                                    PRIMARY
                                                </div>
                                            )}
                                        </div>
                                        <div className="list-main">
                                            <div className="list-title">{item.title || 'Gallery Item'}</div>
                                            <div className="list-sub">{(item.type || '').toString().replace('_', ' ')}</div>
                                            <div className="list-sub">{new Date(item.createdAt || Date.now()).toLocaleString()}</div>
                                        </div>
                                        <div className="list-right">
                                            <button
                                                type="button"
                                                className="admin-btn-secondary"
                                                onClick={() => {
                                                    setFirebaseGalleryDocId(item.firebaseDocId);
                                                    setEditingGalleryId(item.id);
                                                    setGalleryForm({
                                                        id: item.id || '',
                                                        type: item.type || 'achievements',
                                                        title: item.title || ''
                                                    });
                                                    setGalleryFiles([]);
                                                    setGalleryImagePreviews(item.images || []);
                                                    setPrimaryImageIndex(item.primaryImageIndex || 0);
                                                    setShowGalleryModal(true);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button className="admin-btn-delete" onClick={() => handleGalleryDelete(item.firebaseDocId)}>Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <button className="admin-add-btn" type="button" onClick={() => setShowGalleryModal(true)}>+ Add Image</button>
            </section>

            {/* Team Section */}
            <section className="admin-projects-section">
                <div className="admin-projects-header">
                    <div>
                        <h2 className="admin-projects-title">
                            <span className="admin-icon">👥</span>
                            Team Manager
                        </h2>
                        <p className="admin-subtitle">Add and manage team members displayed on the About page.</p>
                    </div>
                </div>

                <div className="admin-projects-grid">
                    <div className="project-list-card">
                        <h3>Team Members</h3>
                        {teamLoading ? (
                            <div className="admin-loading"><div className="loading-spinner"></div><p>Loading...</p></div>
                        ) : teamItems.length === 0 ? (
                            <div className="admin-empty"><p>No team members yet. Add one to get started.</p></div>
                        ) : (
                            <ul className="admin-list">
                                {teamItems.map(member => (
                                    <li key={member.id} className="admin-list-item">
                                        <div className="list-media"><img src={member.image || '/images/agents/agent-1.jpg'} alt={member.name} /></div>
                                        <div className="list-main">
                                            <div className="list-title">{member.name}</div>
                                            <div className="list-sub">{member.role}</div>
                                            <div className="list-sub">{new Date(member.createdAt || Date.now()).toLocaleString()}</div>
                                        </div>
                                        <div className="list-right">
                                            <button
                                                type="button"
                                                className="admin-btn-secondary"
                                                onClick={() => {
                                                    setFirebaseTeamDocId(member.firebaseDocId);
                                                    setEditingTeamId(member.id);
                                                    setTeamForm({
                                                        id: member.id || '',
                                                        name: member.name || '',
                                                        role: member.role || ''
                                                    });
                                                    setTeamImagePreview(member.image || '');
                                                    setTeamFile(null);
                                                    setShowTeamModal(true);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button className="admin-btn-delete" onClick={() => handleTeamDelete(member.firebaseDocId)}>Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <button className="admin-add-btn" type="button" onClick={() => setShowTeamModal(true)}>+ Add Team Member</button>
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
                                <p>Use the Add Blog button to publish your first article.</p>
                            </div>
                        ) : (
                            <ul className="admin-list">
                                {blogItems.map((blog) => (
                                    <li key={blog.id} className="admin-list-item">
                                        <div className="list-media"><img src={blog.image || '/images/blog/blog-1.jpg'} alt={blog.title} /></div>
                                        <div className="list-main">
                                            <div className="list-title">{blog.title}</div>
                                            <div className="list-sub">{blog.author} • {blog.category}</div>
                                        </div>
                                        <div className="list-meta">
                                            {blog.date && <span className="tag">{blog.date}</span>}
                                        </div>
                                        <div className="list-right">
                                            <button
                                                type="button"
                                                className="admin-btn-secondary"
                                                onClick={() => {
                                                    setEditingBlogId(blog.id);
                                                    setBlogForm({
                                                        title: blog.title || '',
                                                        author: blog.author || '',
                                                        category: blog.category || '',
                                                        date: blog.date || '',
                                                        excerpt: blog.excerpt || '',
                                                        ctaUrl: blog.ctaUrl || ''
                                                    });
                                                    setBlogImagePreview(blog.image || '');
                                                    setBlogFile(null);
                                                    setShowBlogModal(true);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button type="button" className="admin-btn-delete" onClick={() => handleBlogDelete(blog.id)}>Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <button className="admin-add-btn" type="button" onClick={() => setShowBlogModal(true)}>+ Add Blog</button>
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

            {/* Project Modal */}
            {showProjectModal && (
                <div className="admin-modal-overlay" onClick={() => setShowProjectModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editingProjectId ? 'Edit project' : 'Upload new project'}</h3>
                            <button className="admin-modal-close" onClick={() => setShowProjectModal(false)}>✕</button>
                        </div>
                        <form onSubmit={handleProjectSubmit}>
                            <div className="form-group">
                                <label>Project ID *</label>
                                <input
                                    type="text"
                                    name="id"
                                    placeholder="Unique identifier (e.g., project-001)"
                                    value={projectForm.id}
                                    onChange={handleProjectInputChange}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Project Status *</label>
                                    <select
                                        name="status"
                                        value={projectForm.status}
                                        onChange={handleProjectInputChange}
                                    >
                                        <option value="running">Running</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Project Name / Code</label>
                                    <input
                                        type="text"
                                        name="projectName"
                                        placeholder="Optional internal identifier"
                                        value={projectForm.projectName}
                                        onChange={handleProjectInputChange}
                                    />
                                </div>
                            </div>

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

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Developer</label>
                                    <input
                                        type="text"
                                        name="developer"
                                        placeholder="e.g., Triveni Construction"
                                        value={projectForm.developer}
                                        onChange={handleProjectInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Project Layout / Plan</label>
                                    <input
                                        type="text"
                                        name="projectLayout"
                                        placeholder="e.g., Indore-Ujjain 4 Lane..."
                                        value={projectForm.projectLayout}
                                        onChange={handleProjectInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Tagline</label>
                                <textarea
                                    name="tagline"
                                    rows="2"
                                    placeholder="Short marketing statement"
                                    value={projectForm.tagline}
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

                            <div className="form-group">
                                <label>Location Address</label>
                                <input
                                    type="text"
                                    name="locationAddress"
                                    placeholder="Full address used on detail page"
                                    value={projectForm.locationAddress}
                                    onChange={handleProjectInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Location Advantages (one per line)</label>
                                <textarea
                                    name="locationAdvantages"
                                    rows="3"
                                    placeholder="e.g., 5 mins from Aurobindo Hospital"
                                    value={projectForm.locationAdvantages}
                                    onChange={handleProjectInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Amenities (one per line)</label>
                                <textarea
                                    name="amenitiesInput"
                                    rows="3"
                                    placeholder="Club House&#10;Kids Play Zone"
                                    value={projectForm.amenitiesInput}
                                    onChange={handleProjectInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Configurations</label>
                                <textarea
                                    name="configurationsInput"
                                    rows="3"
                                    placeholder="1BHK: 620, 626&#10;2BHK: 950, 1019"
                                    value={projectForm.configurationsInput}
                                    onChange={handleProjectInputChange}
                                />
                                <small>Format: TYPE: size1, size2 ...</small>
                            </div>

                            <div className="form-group">
                                <label>Pricing - Rate per sqft</label>
                                <textarea
                                    name="pricingRateInput"
                                    rows="2"
                                    placeholder="1BHK: 2691&#10;2BHK: 2691"
                                    value={projectForm.pricingRateInput}
                                    onChange={handleProjectInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Pricing - Electricity charge</label>
                                <textarea
                                    name="pricingElectricityInput"
                                    rows="2"
                                    placeholder="1BHK: 50000"
                                    value={projectForm.pricingElectricityInput}
                                    onChange={handleProjectInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Pricing - Maintenance</label>
                                <textarea
                                    name="pricingMaintenanceInput"
                                    rows="2"
                                    placeholder="1BHK: 1.5"
                                    value={projectForm.pricingMaintenanceInput}
                                    onChange={handleProjectInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Pricing - Prime location charges</label>
                                <textarea
                                    name="pricingPrimeInput"
                                    rows="2"
                                    placeholder="1BHK: Yes&#10;2BHK: No"
                                    value={projectForm.pricingPrimeInput}
                                    onChange={handleProjectInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Pricing - Plot sizes (one line per type)</label>
                                <textarea
                                    name="pricingPlotSizeInput"
                                    rows="2"
                                    placeholder="residential_plots: 600, 750, 1000"
                                    value={projectForm.pricingPlotSizeInput}
                                    onChange={handleProjectInputChange}
                                />
                                <small>Format: TYPE: size1, size2 ...</small>
                            </div>

                            <div className="form-group">
                                <label>Cover Image (optional)</label>
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

                            <div className="form-group">
                                <label>Logo image (optional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProjectLogoChange}
                                />
                            </div>

                            {projectLogoPreview && (
                                <div className="project-preview" style={{ maxWidth: '220px' }}>
                                    <img src={projectLogoPreview} alt="Logo preview" />
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
                                    {projectSaving ? 'Saving...' : editingProjectId ? 'Save Changes' : 'Add Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Team Modal */}
            {showTeamModal && (
                <div className="admin-modal-overlay" onClick={() => setShowTeamModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{firebaseTeamDocId ? 'Edit team member' : 'Add team member'}</h3>
                            <button className="admin-modal-close" onClick={() => setShowTeamModal(false)}>✕</button>
                        </div>
                        <form onSubmit={handleTeamSubmit}>
                            <div className="form-group">
                                <label>Team Member ID (Optional)</label>
                                <input 
                                    type="text" 
                                    name="id" 
                                    value={teamForm.id} 
                                    onChange={handleTeamInputChange} 
                                    placeholder="Unique identifier (e.g., tm-001)"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Name *</label>
                                    <input type="text" name="name" value={teamForm.name} onChange={handleTeamInputChange} placeholder="Full name" />
                                </div>
                                <div className="form-group">
                                    <label>Role *</label>
                                    <input type="text" name="role" value={teamForm.role} onChange={handleTeamInputChange} placeholder="e.g., Administrative Staff" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Photo {editingTeamId ? '(leave empty to keep existing)' : '*'}</label>
                                <input type="file" accept="image/*" onChange={handleTeamImageChange} />
                            </div>

                            {teamImagePreview && (
                                <div className="project-preview">
                                    <img src={teamImagePreview} alt="Preview" />
                                    {firebaseTeamDocId && !teamFile && <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', color: '#666' }}>Current image (no changes)</p>}
                                </div>
                            )}

                            {teamSaving && (
                                <div className="project-upload-progress">
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${teamUploadProgress}%` }}></div>
                                    </div>
                                    <p>Uploading... {teamUploadProgress}%</p>
                                </div>
                            )}

                            <div className="project-form-actions">
                                <button type="button" className="btn-cancel" onClick={resetTeamForm} disabled={teamSaving}>Reset</button>
                                <button type="submit" className="btn-submit" disabled={teamSaving}>{teamSaving ? 'Saving...' : firebaseTeamDocId ? 'Save Changes' : 'Add Member'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Gallery Modal */}
            {showGalleryModal && (
                <div className="admin-modal-overlay" onClick={() => setShowGalleryModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editingGalleryId ? 'Edit gallery item' : 'Upload gallery images'}</h3>
                            <button className="admin-modal-close" onClick={() => setShowGalleryModal(false)}>✕</button>
                        </div>
                        <form onSubmit={handleGallerySubmit}>
                            <div className="form-group">
                                <label>Gallery Item ID *</label>
                                <input 
                                    type="text" 
                                    name="id" 
                                    value={galleryForm.id} 
                                    onChange={handleGalleryInputChange} 
                                    placeholder="Unique identifier (e.g., gallery-001)"
                                />
                            </div>

                            <div className="form-group">
                                <label>Images {editingGalleryId ? '(optional)' : '*'}</label>
                                <input type="file" accept="image/*" multiple onChange={handleGalleryImageChange} />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Type *</label>
                                    <select name="type" value={galleryForm.type} onChange={handleGalleryInputChange}>
                                        <option value="achievements">Achievements</option>
                                        <option value="anniversaries">Anniversaries</option>
                                        <option value="corporate_meetings">Corporate Meetings</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" name="title" placeholder="Optional title" value={galleryForm.title} onChange={handleGalleryInputChange} />
                                </div>
                            </div>

                            {galleryImagePreviews && galleryImagePreviews.length > 0 && (
                                <>
                                    <div className="form-group">
                                        <label>Select Primary Image (appears first) *</label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px', marginBottom: '10px' }}>
                                            {galleryImagePreviews.map((src, i) => (
                                                <div 
                                                    key={i} 
                                                    onClick={() => setPrimaryImageIndex(i)}
                                                    style={{
                                                        position: 'relative',
                                                        cursor: 'pointer',
                                                        border: primaryImageIndex === i ? '3px solid #3b82f6' : '2px solid #e2e8f0',
                                                        borderRadius: '6px',
                                                        overflow: 'hidden',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <img 
                                                        src={src} 
                                                        alt={`Image ${i + 1}`} 
                                                        style={{ width: '100%', height: '80px', objectFit: 'cover' }} 
                                                    />
                                                    {primaryImageIndex === i && (
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                            color: 'white',
                                                            padding: '5px 10px',
                                                            borderRadius: '4px',
                                                            fontSize: '12px',
                                                            fontWeight: 'bold'
                                                        }}>
                                                            PRIMARY
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="project-preview" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px', opacity: '0.6' }}>
                                        {galleryImagePreviews.map((src, i) => (
                                            <img key={i} src={src} alt={`Preview ${i + 1}`} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                                        ))}
                                    </div>
                                </>
                            )}

                            {gallerySaving && (
                                <div className="project-upload-progress">
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${galleryUploadProgress}%` }}></div>
                                    </div>
                                    <p>Uploading... {galleryUploadProgress}%</p>
                                </div>
                            )}

                            <div className="blog-form-actions">
                                <button type="button" className="btn-cancel" onClick={resetGalleryForm} disabled={gallerySaving}>Reset</button>
                                <button type="submit" className="btn-submit" disabled={gallerySaving}>
                                    {gallerySaving ? 'Saving...' : editingGalleryId ? 'Save Changes' : 'Add to Gallery'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Blog Modal */}
            {showBlogModal && (
                <div className="admin-modal-overlay" onClick={() => setShowBlogModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editingBlogId ? 'Edit article' : 'Write a new article'}</h3>
                            <button className="admin-modal-close" onClick={() => setShowBlogModal(false)}>✕</button>
                        </div>
                        <form className="blog-form-card" onSubmit={handleBlogSubmit}>
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
                                <label>Cover Image {editingBlogId ? '(leave empty to keep existing)' : '*'}</label>
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
                                    {blogSaving ? 'Publishing...' : editingBlogId ? 'Save Changes' : 'Publish Blog'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
