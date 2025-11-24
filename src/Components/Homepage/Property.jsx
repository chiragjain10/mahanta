import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import './Property.css';

/* -----------------------------------------
   FIXED PROPERTY DATA (6 items) - Fallback
------------------------------------------ */

const fixedProperties = [
    {
        id: 1,
        title: "Munim Ji State",
        image: "images/home/house-1.jpg",
        avatar: "images/avatar/avt-png1.png",
        agent: "Rajesh Sharma",
        price: "₹35,00,000",
        location: "Indore, Madhya Pradesh, India",
        beds: 3,
        baths: 2,
        sqft: 1100,
        featured: true,
        forSale: true
    },
    {
        id: 2,
        title: "Shashwat Corridor",
        image: "images/home/house-2.jpg",
        avatar: "images/avatar/avt-png2.png",
        agent: "Anita Desai",
        price: "₹38,50,000",
        location: "Indore, Madhya Pradesh, India",
        beds: 3,
        baths: 2,
        sqft: 1200,
        featured: false,
        forSale: true
    },
    {
        id: 3,
        title: "Rudraksh Home",
        image: "images/home/house-3.jpg",
        avatar: "images/avatar/avt-png3.png",
        agent: "Vikas Singh",
        price: "₹41,00,000",
        location: "Indore, Madhya Pradesh, India",
        beds: 4,
        baths: 3,
        sqft: 1400,
        featured: true,
        forSale: true
    },
    {
        id: 4,
        title: "Tulip Park",
        image: "images/home/house-4.jpg",
        avatar: "images/avatar/avt-png4.png",
        agent: "Neha Kapoor",
        price: "₹45,20,000",
        location: "Indore, Madhya Pradesh, India",
        beds: 2,
        baths: 2,
        sqft: 900,
        featured: false,
        forSale: true
    },
    {
        id: 5,
        title: "Suryodaya Enclave",
        image: "images/home/house-5.jpg",
        avatar: "images/avatar/avt-png5.png",
        agent: "Amit Verma",
        price: "₹52,00,000",
        location: "Indore, Madhya Pradesh, India",
        beds: 4,
        baths: 3,
        sqft: 1500,
        featured: true,
        forSale: true
    },
    {
        id: 6,
        title: "Manglam Meadows",
        image: "images/home/house-6.jpg",
        avatar: "images/avatar/avt-png6.png",
        agent: "Pooja Tiwari",
        price: "₹56,75,000",
        location: "Indore, Madhya Pradesh, India",
        beds: 3,
        baths: 2,
        sqft: 1300,
        featured: false,
        forSale: true
    }
];

/* -----------------------------------------
   MAIN COMPONENT
------------------------------------------ */

const PropertyListings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('viewAll');
    const [loading, setLoading] = useState(true);
    const [firebaseProperties, setFirebaseProperties] = useState([]);

    // Fetch properties from Firebase
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'properties'));
                const propertiesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFirebaseProperties(propertiesData);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    // Filter properties by type
    const filterPropertiesByType = (propertiesList, type) => {
        if (type === 'viewAll') return propertiesList;
        return propertiesList.filter(p => 
            (p.propertyType || 'apartment').toLowerCase() === type.toLowerCase()
        );
    };

    // Combine Firebase properties with fixed properties (Firebase takes priority)
    const allProperties = firebaseProperties.length > 0 
        ? firebaseProperties 
        : fixedProperties;

    const [properties, setProperties] = useState({
        viewAll: allProperties,
        apartment: filterPropertiesByType(allProperties, 'apartment'),
        villa: filterPropertiesByType(allProperties, 'villa'),
        studio: filterPropertiesByType(allProperties, 'studio'),
        house: filterPropertiesByType(allProperties, 'house'),
        office: filterPropertiesByType(allProperties, 'office')
    });

    // Update properties when Firebase data changes
    useEffect(() => {
        const updatedAllProperties = firebaseProperties.length > 0 
            ? firebaseProperties 
            : fixedProperties;

        setProperties({
            viewAll: updatedAllProperties,
            apartment: filterPropertiesByType(updatedAllProperties, 'apartment'),
            villa: filterPropertiesByType(updatedAllProperties, 'villa'),
            studio: filterPropertiesByType(updatedAllProperties, 'studio'),
            house: filterPropertiesByType(updatedAllProperties, 'house'),
            office: filterPropertiesByType(updatedAllProperties, 'office')
        });
    }, [firebaseProperties]);

    const propertyTypes = [
        { id: 'viewAll', label: 'View All' },
        { id: 'apartment', label: 'Apartment' },
        { id: 'villa', label: 'Villa' },
        { id: 'studio', label: 'Studio' },
        { id: 'house', label: 'House' },
        { id: 'office', label: 'Office' }
    ];

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const toggleFavorite = (propertyType, propertyId) => {
        setProperties(prev => ({
            ...prev,
            [propertyType]: (prev[propertyType] || []).map(property =>
                property.id === propertyId
                    ? { ...property, isFavorite: !property.isFavorite }
                    : property
            )
        }));
    };

    return (
        <section className="flat-section flat-recommended">
            <div className="container">
                <div className="box-title text-center wow fadeInUp">
                    <div className="text-subtitle text-primary">Featured Properties</div>
                    <h3 className="mt-4 title">Recommended For You</h3>
                </div>

                {loading ? (
                    <div className="text-center" style={{ padding: '3rem' }}>
                        <div className="loading-spinner" style={{
                            width: '50px',
                            height: '50px',
                            border: '4px solid #e2e8f0',
                            borderTopColor: '#667eea',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto'
                        }}></div>
                        <p style={{ marginTop: '1rem', color: '#64748b' }}>Loading properties...</p>
                    </div>
                ) : (
                    <>
                        {/* Tabs */}
                        <div className="flat-tab-recommended wow fadeInUp" data-wow-delay=".2s">
                            <ul className="nav-tab-recommended justify-content-md-center" role="tablist">
                                {propertyTypes.map(type => (
                                    <li key={type.id} className="nav-tab-item" role="presentation">
                                        <button
                                            className={`nav-link-item ${activeTab === type.id ? 'active' : ''}`}
                                            onClick={() => handleTabClick(type.id)}
                                        >
                                            {type.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {/* Tab Content */}
                            <div className="tab-content">
                                {propertyTypes.map(type => (
                                    <div
                                        key={type.id}
                                        className={`tab-pane ${activeTab === type.id ? 'active show' : ''}`}
                                        id={type.id}
                                        role="tabpanel"
                                    >
                                        <PropertyGrid
                                            properties={properties[type.id] || []}
                                            onToggleFavorite={(pid) => toggleFavorite(type.id, pid)}
                                        />

                                        <div className="text-center">
                                            <a className="tf-btn btn-view primary size-1 hover-btn-view">
                                                View All Properties <span className="icon icon-arrow-right2"></span>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

/* -----------------------------------------
   PROPERTY GRID
------------------------------------------ */

const PropertyGrid = ({ properties, onToggleFavorite }) => {
    if (properties.length === 0) {
        return (
            <div className="text-center" style={{ padding: '3rem' }}>
                <p style={{ fontSize: '1.2rem', color: '#64748b' }}>No properties found in this category.</p>
            </div>
        );
    }

    return (
        <div className="row">
            {properties.map(property => (
                <div key={property.id} className="col-xl-4 col-lg-6 col-md-6">
                    <PropertyCard property={property} onToggleFavorite={onToggleFavorite} />
                </div>
            ))}
        </div>
    );
};

/* -----------------------------------------
   PROPERTY CARD
------------------------------------------ */

const PropertyCard = ({ property, onToggleFavorite }) => {
    const navigate = useNavigate();
    const {
        id, title, image, images, avatar, price,
        location, agent, beds, baths, sqft,
        featured, forSale, isFavorite
    } = property;

    // Use first image from images array or fallback to image
    const mainImage = (images && images[0]) || image || 'images/home/house-1.jpg';
    const agentAvatar = avatar || 'images/avatar/avt-png1.png';

    const handleCardClick = () => {
        // Only navigate if property has Firebase ID (starts with alphanumeric)
        if (id && typeof id === 'string' && id.length > 10) {
            navigate(`/property/${id}`);
        } else {
            // For fixed properties, you might want to handle differently
            console.log('Fixed property clicked:', id);
        }
    };

    return (
        <div className="homelengo-box" style={{ cursor: 'pointer' }} onClick={handleCardClick}>

            {/* Image Section */}
            <div className="archive-top">
                <a className="images-group" onClick={(e) => e.preventDefault()}>
                    <div className="images-style">
                        <img src={mainImage} alt={title} />
                    </div>

                    <div className="top">
                        <ul className="d-flex gap-6">
                            {featured && <li className="flag-tag primary">Featured</li>}
                            <li className={`flag-tag ${forSale ? "style-1" : "style-2"}`}>
                                {forSale ? "For Sale" : "For Rent"}
                            </li>
                        </ul>
                    </div>

                    <div className="bottom">
                        <LocationIcon /> {location}
                    </div>
                </a>

                <button
                    className={`${isFavorite ? "active" : ""}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(id);
                    }}
                >
                    <HeartIcon filled={isFavorite} />
                </button>
            </div>

            {/* Details */}
            <div className="archive-bottom">
                <div className="content-top">
                    <h6><a className="link" onClick={(e) => e.preventDefault()}>{title}</a></h6>
                    <ul className="meta-list">
                        <PropertyMetaItem icon="bed" label="Beds" value={beds} />
                        <PropertyMetaItem icon="bath" label="Baths" value={baths} />
                        <PropertyMetaItem icon="sqft" label="Sqft" value={sqft} />
                    </ul>
                </div>

                <div className="content-bottom">
                    <div className="d-flex gap-8 align-items-center">
                        <div className="avatar avt-40 round">
                            <img src={agentAvatar} alt={agent} />
                        </div>
                        <span>{agent}</span>
                    </div>
                    <h6 className="price">{price}</h6>
                </div>
            </div>
        </div>
    );
};

/* -----------------------------------------
   META ITEM
------------------------------------------ */

const PropertyMetaItem = ({ icon, label, value }) => (
    <li className="item">
        <i className={`icon icon-${icon}`}></i>
        <span className="text-variant-1">{label}:</span>
        <span className="fw-6">{value}</span>
    </li>
);

/* -----------------------------------------
   SVG ICONS
------------------------------------------ */

const LocationIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 7C10 7.5304 9.7893 8.0391 9.4142 8.4142C9.0391 8.7893 8.5304 9 8 9C7.4696 9 6.9609 8.7893 6.5858 8.4142C6.2107 8.0391 6 7.5304 6 7C6 6.4696 6.2107 5.9609 6.5858 5.5858C6.9609 5.2107 7.4696 5 8 5C8.5304 5 9.0391 5.2107 9.4142 5.5858C9.7893 5.9609 10 6.4696 10 7Z" stroke="white" strokeWidth="1.5"/>
        <path d="M13 7C13 11.761 8 14.5 8 14.5C8 14.5 3 11.761 3 7C3 5.6739 3.5268 4.4021 4.4645 3.4645C5.4021 2.5268 6.6739 2 8 2C9.3261 2 10.5979 2.5268 11.5355 3.4645C12.4732 4.4021 13 5.6739 13 7Z" stroke="white" strokeWidth="1.5"/>
    </svg>
);

const HeartIcon = ({ filled }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill={filled ? "#ff4757" : "none"}>
        <path
            d="M17.5 6.66667C17.5 4.89856 16.2014 3.5 14.5833 3.5..."
            stroke={filled ? "#ff4757" : "#64748b"}
            strokeWidth="1.5"
        />
    </svg>
);

export default PropertyListings;
