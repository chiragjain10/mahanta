import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import AddPropertyModal from './AddPropertyModal';
import './AdminPanel.css';

const AdminPanel = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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

    useEffect(() => {
        fetchProperties();
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
                )}
            </div>

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

