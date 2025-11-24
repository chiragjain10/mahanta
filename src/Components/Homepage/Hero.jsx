import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';

const HeroSlider = () => {
    const [activeTab, setActiveTab] = useState('forRent');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default');
    const cursorRef = useRef(null);

    const slides = [
        {
            image: "images/home/house-1.jpg",
            title: "Luxury Living Awaits",
            subtitle: "Discover premium properties tailored to your dreams"
        },
        {
            image: "images/home/house-2.jpg",
            title: "Your Dream Home",
            subtitle: "Exceptional residences in prime locations"
        },
        {
            image: "images/home/house-3.jpg",
            title: "Premium Real Estate",
            subtitle: "Where quality meets sophistication"
        }
    ];

    const [searchForm, setSearchForm] = useState({
        type: 'All',
        location: '',
        keyword: '',
        rooms: '2',
        bathrooms: '2',
        bedrooms: '2',
        propertyType: '2',
        amenities: {
            airCondition: true,
            cableTV: false,
            ceilingHeight: false,
            fireplace: false,
            disabledAccess: false,
            elevator: true,
            fence: false,
            garden: false,
            floor: true,
            furnishing: false,
            garage: true,
            petFriendly: false,
            heating: false,
            intercom: false,
            parking: false,
            wifi: false,
            renovation: false,
            security: false,
            swimmingPool: false,
            windowType: false,
            searchProperty: false,
            constructionYear: false
        }
    });

    // Text animation effect
    const [currentText, setCurrentText] = useState(0);
    const texts = ['Possible', 'Beautiful', 'Exceptional'];

    // Mouse movement effect
    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener('mousemove', mouseMove);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
        };
    }, []);

    // Slide rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    // Text animation
    useEffect(() => {
        const textInterval = setInterval(() => {
            setCurrentText((prev) => (prev + 1) % texts.length);
        }, 3000);
        return () => clearInterval(textInterval);
    }, [texts.length]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (field, value) => {
        setSearchForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAmenityChange = (amenity) => {
        setSearchForm(prev => ({
            ...prev,
            amenities: {
                ...prev.amenities,
                [amenity]: !prev.amenities[amenity]
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Search form submitted:', searchForm);
    };

    const toggleAdvanced = () => {
        setShowAdvanced(!showAdvanced);
    };

    const cursorEnter = () => setCursorVariant('hover');
    const cursorLeave = () => setCursorVariant('default');

    return (
        <>
            {/* Custom Cursor */}
            <div
                ref={cursorRef}
                className={`custom-cursor ${cursorVariant}`}
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`
                }}
            />

            {/* Hero Section */}
            <section className="hero-slider">
                {/* Background Slides */}
                <div className="slides-container">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`slide-bg ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${slide.image})` }}
                        />
                    ))}
                </div>

                {/* Overlay */}
                <div className="hero-overlay"></div>

                {/* Animated Shapes */}
                <div className="hero-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>

                <div className="container relative">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="hero-content">
                                {/* Heading Section */}
                                <div className="heading text-center">
                                    <div className="premium-badge">
                                        <span>Premium Real Estate</span>
                                    </div>
                                    <h1 className="title-large text-white hero-animated-heading">
                                        We Make Dreams <br />
                                        <span className="hero-word-switch">
                                            <span className={`hero-word ${currentText === 0 ? "visible" : ""}`}>
                                                {texts[0]}
                                            </span>
                                            <span className={`hero-word ${currentText === 1 ? "visible" : ""}`}>
                                                {texts[1]}
                                            </span>
                                            <span className={`hero-word ${currentText === 2 ? "visible" : ""}`}>
                                                {texts[2]}
                                            </span>
                                        </span>
                                    </h1>

                                    <p className="subtitle text-white body-2 wow fadeInUp">
                                        We are a real estate agency that will help you find the best residence you dream of,
                                        let's discuss for your dream project?
                                    </p>
                                </div>

                                {/* Search Form Tabs */}
                                <div className="flat-tab flat-tab-form premium-search">
                                    <ul className="hero-tabs" role="tablist">
                                        <li className="hero-tab-item" role="presentation">
                                            <button
                                                className={`hero-tab-btn ${activeTab === "forRent" ? "active" : ""}`}
                                                onClick={() => setActiveTab("forRent")}
                                                onMouseEnter={cursorEnter}
                                                onMouseLeave={cursorLeave}
                                            >
                                                For Rent
                                            </button>
                                        </li>

                                        <li className="hero-tab-item" role="presentation">
                                            <button
                                                className={`hero-tab-btn ${activeTab === "forSale" ? "active" : ""}`}
                                                onClick={() => setActiveTab("forSale")}
                                                onMouseEnter={cursorEnter}
                                                onMouseLeave={cursorLeave}
                                            >
                                                For Sale
                                            </button>
                                        </li>
                                    </ul>


                                    <div className="tab-content">
                                        <div className={`tab-pane fade ${activeTab === 'forRent' ? 'active show' : ''}`} role="tabpanel">
                                            <SearchForm
                                                searchForm={searchForm}
                                                handleInputChange={handleInputChange}
                                                handleSelectChange={handleSelectChange}
                                                handleAmenityChange={handleAmenityChange}
                                                handleSubmit={handleSubmit}
                                                showAdvanced={showAdvanced}
                                                toggleAdvanced={toggleAdvanced}
                                                cursorEnter={cursorEnter}
                                                cursorLeave={cursorLeave}
                                            />
                                        </div>
                                        <div className={`tab-pane fade ${activeTab === 'forSale' ? 'active show' : ''}`} role="tabpanel">
                                            <SearchForm
                                                searchForm={searchForm}
                                                handleInputChange={handleInputChange}
                                                handleSelectChange={handleSelectChange}
                                                handleAmenityChange={handleAmenityChange}
                                                handleSubmit={handleSubmit}
                                                showAdvanced={showAdvanced}
                                                toggleAdvanced={toggleAdvanced}
                                                cursorEnter={cursorEnter}
                                                cursorLeave={cursorLeave}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Scroll Indicator */}
                                <div className="scroll-indicator">
                                    <div className="scroll-line"></div>
                                    <span>Scroll Down</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

           

            {/* Welcome Section */}
            {/* <div className="welcome-section py-5">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <h2 className="fw-bold welcome-title mb-4">
                                WELCOME <span style={{ color: "#1174d6" }}>Mahanta Group</span>
                            </h2>

                            <p className="welcome-text mb-3">
                                Welcome to Mahanta Group — where trust meets exceptional real estate expertise.
                                Since 2019, we've been committed to helping you discover properties that elevate both
                                your lifestyle and long-term financial vision. We specialize in Residential, Commercial,
                                and Industrial land, offering well-curated investment and resale opportunities tailored
                                to your goals.
                            </p>

                            <p className="welcome-text">
                                Explore our portfolio and experience a refined selection of properties designed for value,
                                security, and growth. With our guidance and dedication, your property search becomes seamless
                                and rewarding. Thank you for choosing Mahanta Group as your trusted partner in real estate excellence.
                            </p>
                        </div>

                        <div className="col-lg-6 text-center">
                            <img
                                src="images/home/house-1.jpg"
                                alt="Mahanta Group"
                                className="img-fluid welcome-logo rounded-3"
                            />
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

// Search Form Component
const SearchForm = ({
    searchForm,
    handleInputChange,
    handleSelectChange,
    handleAmenityChange,
    handleSubmit,
    showAdvanced,
    toggleAdvanced,
    cursorEnter,
    cursorLeave
}) => {
    const propertyTypes = ['All', 'Villa', 'Studio', 'Office', 'House', 'Apartment', 'Penthouse'];
    const numberOptions = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="form-sl premium-form">
            <form onSubmit={handleSubmit}>
                {/* Basic Search Fields */}
                <div className="wd-find-select">
                    <div className="inner-group">
                        {/* Property Type */}
                        <div className="form-group-1 search-form form-style">
                            <label>Type</label>
                            <div className="group-select">
                                <select
                                    className="form-control"
                                    value={searchForm.type}
                                    onChange={(e) => handleSelectChange('type', e.target.value)}
                                    onMouseEnter={cursorEnter}
                                    onMouseLeave={cursorLeave}
                                >
                                    {propertyTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="form-group-2 form-style">
                            <label>Location</label>
                            <div className="group-ip">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Location"
                                    value={searchForm.location}
                                    name="location"
                                    onChange={handleInputChange}
                                    required
                                    onMouseEnter={cursorEnter}
                                    onMouseLeave={cursorLeave}
                                />
                                <span className="icon icon-location"></span>
                            </div>
                        </div>

                        {/* Keyword */}
                        <div className="form-group-3 form-style">
                            <label>Keyword</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Keyword"
                                value={searchForm.keyword}
                                name="keyword"
                                onChange={handleInputChange}
                                required
                                onMouseEnter={cursorEnter}
                                onMouseLeave={cursorLeave}
                            />
                        </div>
                    </div>

                    {/* Search Buttons */}
                    <div className="box-btn-advanced">
                        <div className="form-group-4 box-filter">
                            <button
                                type="button"
                                className="tf-btn btn-line filter-advanced pull-right"
                                onClick={toggleAdvanced}
                                onMouseEnter={cursorEnter}
                                onMouseLeave={cursorLeave}
                            >
                                <span className="text-1">Search advanced</span>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.5 12.375V3.4375M5.5 12.375C5.86467 12.375 6.21441 12.5199 6.47227 12.7777C6.73013 13.0356 6.875 13.3853 6.875 13.75C6.875 14.1147 6.73013 14.4644 6.47227 14.7223C6.21441 14.9801 5.86467 15.125 5.5 15.125M5.5 12.375C5.13533 12.375 4.78559 12.5199 4.52773 12.7777C4.26987 13.0356 4.125 13.3853 4.125 13.75C4.125 14.1147 4.26987 14.4644 4.52773 14.7223C4.78559 14.9801 5.13533 15.125 5.5 15.125M5.5 15.125V18.5625M16.5 12.375V3.4375M16.5 12.375C16.8647 12.375 17.2144 12.5199 17.4723 12.7777C17.7301 13.0356 17.875 13.3853 17.875 13.75C17.875 14.1147 17.7301 14.4644 17.4723 14.7223C17.2144 14.9801 16.8647 15.125 16.5 15.125M16.5 12.375C16.1353 12.375 15.7856 12.5199 15.5277 12.7777C15.2699 13.0356 15.125 13.3853 15.125 13.75C15.125 14.1147 15.2699 14.4644 15.5277 14.7223C15.7856 14.9801 16.1353 15.125 16.5 15.125M16.5 15.125V18.5625M11 6.875V3.4375M11 6.875C11.3647 6.875 11.7144 7.01987 11.9723 7.27773C12.2301 7.53559 12.375 7.88533 12.375 8.25C12.375 8.61467 12.2301 8.96441 11.9723 9.22227C11.7144 9.48013 11.3647 9.625 11 9.625M11 6.875C10.6353 6.875 10.2856 7.01987 10.0277 7.27773C9.76987 7.53559 9.625 7.88533 9.625 8.25C9.625 8.61467 9.76987 8.96441 10.0277 9.22227C10.2856 9.48013 10.6353 9.625 11 9.625M11 9.625V18.5625"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="tf-btn btn-search primary premium-search-btn"
                            onMouseEnter={cursorEnter}
                            onMouseLeave={cursorLeave}
                        >
                            Search <i className="icon icon-search"></i>
                        </button>
                    </div>
                </div>

                {/* Advanced Search Options */}
                {showAdvanced && (
                    <div className="wd-search-form advanced-search-expanded">
                        {/* Price and Size Sliders */}
                        <div className="grid-2 group-box group-price">
                            <div className="widget-price">
                                <div className="box-title-price">
                                    <span className="title-price fw-6">Price:</span>
                                    <div className="caption-price">
                                        <span id="slider-range-value1" className="fw-6">$0</span>
                                        <span>-</span>
                                        <span id="slider-range-value2" className="fw-6">$10,000</span>
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    className="form-range premium-slider"
                                    min="0"
                                    max="10000"
                                    step="100"
                                />
                            </div>

                            <div className="widget-price">
                                <div className="box-title-price">
                                    <span className="title-price fw-6">Size:</span>
                                    <div className="caption-price">
                                        <span id="slider-range-value01" className="fw-7">0 sqft</span>
                                        <span>-</span>
                                        <span id="slider-range-value02" className="fw-7">5000 sqft</span>
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    className="form-range premium-slider"
                                    min="0"
                                    max="5000"
                                    step="100"
                                />
                            </div>
                        </div>

                        {/* Rooms and Bathrooms */}
                        <div className="grid-2 group-box">
                            <div className="group-select grid-2">
                                <div className="box-select">
                                    <label className="title-select fw-6">Rooms</label>
                                    <select
                                        className="form-control"
                                        value={searchForm.rooms}
                                        onChange={(e) => handleSelectChange('rooms', e.target.value)}
                                    >
                                        {numberOptions.map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="box-select">
                                    <label className="title-select fw-6">Bathrooms</label>
                                    <select
                                        className="form-control"
                                        value={searchForm.bathrooms}
                                        onChange={(e) => handleSelectChange('bathrooms', e.target.value)}
                                    >
                                        {numberOptions.map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="group-select grid-2">
                                <div className="box-select">
                                    <label className="title-select fw-6">Bedrooms</label>
                                    <select
                                        className="form-control"
                                        value={searchForm.bedrooms}
                                        onChange={(e) => handleSelectChange('bedrooms', e.target.value)}
                                    >
                                        {numberOptions.map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="box-select">
                                    <label className="title-select fw-6">Type</label>
                                    <select
                                        className="form-control"
                                        value={searchForm.propertyType}
                                        onChange={(e) => handleSelectChange('propertyType', e.target.value)}
                                    >
                                        {numberOptions.map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="group-checkbox">
                            <div className="text-1 text-black-2">Amenities:</div>
                            <div className="group-amenities grid-6">
                                {/* Column 1 */}
                                <div className="box-amenities">
                                    {[
                                        { id: 'cb1', label: 'Air Condition', key: 'airCondition' },
                                        { id: 'cb2', label: 'Cable TV', key: 'cableTV' },
                                        { id: 'cb3', label: 'Ceiling Height', key: 'ceilingHeight' },
                                        { id: 'cb4', label: 'Fireplace', key: 'fireplace' }
                                    ].map(amenity => (
                                        <fieldset key={amenity.id} className="amenities-item">
                                            <input
                                                type="checkbox"
                                                className="tf-checkbox style-1 premium-checkbox"
                                                id={amenity.id}
                                                checked={searchForm.amenities[amenity.key]}
                                                onChange={() => handleAmenityChange(amenity.key)}
                                            />
                                            <label htmlFor={amenity.id} className="text-cb-amenities">
                                                {amenity.label}
                                            </label>
                                        </fieldset>
                                    ))}
                                </div>

                                {/* Column 2 */}
                                <div className="box-amenities">
                                    {[
                                        { id: 'cb5', label: 'Disabled Access', key: 'disabledAccess' },
                                        { id: 'cb6', label: 'Elevator', key: 'elevator' },
                                        { id: 'cb7', label: 'Fence', key: 'fence' },
                                        { id: 'cb8', label: 'Garden', key: 'garden' }
                                    ].map(amenity => (
                                        <fieldset key={amenity.id} className="amenities-item">
                                            <input
                                                type="checkbox"
                                                className="tf-checkbox style-1 premium-checkbox"
                                                id={amenity.id}
                                                checked={searchForm.amenities[amenity.key]}
                                                onChange={() => handleAmenityChange(amenity.key)}
                                            />
                                            <label htmlFor={amenity.id} className="text-cb-amenities">
                                                {amenity.label}
                                            </label>
                                        </fieldset>
                                    ))}
                                </div>

                                {/* Column 3 */}
                                <div className="box-amenities">
                                    {[
                                        { id: 'cb9', label: 'Floor', key: 'floor' },
                                        { id: 'cb10', label: 'Furnishing', key: 'furnishing' },
                                        { id: 'cb11', label: 'Garage', key: 'garage' },
                                        { id: 'cb12', label: 'Pet Friendly', key: 'petFriendly' }
                                    ].map(amenity => (
                                        <fieldset key={amenity.id} className="amenities-item">
                                            <input
                                                type="checkbox"
                                                className="tf-checkbox style-1 premium-checkbox"
                                                id={amenity.id}
                                                checked={searchForm.amenities[amenity.key]}
                                                onChange={() => handleAmenityChange(amenity.key)}
                                            />
                                            <label htmlFor={amenity.id} className="text-cb-amenities">
                                                {amenity.label}
                                            </label>
                                        </fieldset>
                                    ))}
                                </div>

                                {/* Column 4 */}
                                <div className="box-amenities">
                                    {[
                                        { id: 'cb13', label: 'Heating', key: 'heating' },
                                        { id: 'cb14', label: 'Intercom', key: 'intercom' },
                                        { id: 'cb15', label: 'Parking', key: 'parking' },
                                        { id: 'cb16', label: 'WiFi', key: 'wifi' }
                                    ].map(amenity => (
                                        <fieldset key={amenity.id} className="amenities-item">
                                            <input
                                                type="checkbox"
                                                className="tf-checkbox style-1 premium-checkbox"
                                                id={amenity.id}
                                                checked={searchForm.amenities[amenity.key]}
                                                onChange={() => handleAmenityChange(amenity.key)}
                                            />
                                            <label htmlFor={amenity.id} className="text-cb-amenities">
                                                {amenity.label}
                                            </label>
                                        </fieldset>
                                    ))}
                                </div>

                                {/* Column 5 */}
                                <div className="box-amenities">
                                    {[
                                        { id: 'cb17', label: 'Renovation', key: 'renovation' },
                                        { id: 'cb18', label: 'Security', key: 'security' },
                                        { id: 'cb19', label: 'Swimming Pool', key: 'swimmingPool' }
                                    ].map(amenity => (
                                        <fieldset key={amenity.id} className="amenities-item">
                                            <input
                                                type="checkbox"
                                                className="tf-checkbox style-1 premium-checkbox"
                                                id={amenity.id}
                                                checked={searchForm.amenities[amenity.key]}
                                                onChange={() => handleAmenityChange(amenity.key)}
                                            />
                                            <label htmlFor={amenity.id} className="text-cb-amenities">
                                                {amenity.label}
                                            </label>
                                        </fieldset>
                                    ))}
                                </div>

                                {/* Column 6 */}
                                <div className="box-amenities">
                                    {[
                                        { id: 'cb20', label: 'Window Type', key: 'windowType' },
                                        { id: 'cb21', label: 'Search property', key: 'searchProperty' },
                                        { id: 'cb22', label: 'Construction Year', key: 'constructionYear' }
                                    ].map(amenity => (
                                        <fieldset key={amenity.id} className="amenities-item">
                                            <input
                                                type="checkbox"
                                                className="tf-checkbox style-1 premium-checkbox"
                                                id={amenity.id}
                                                checked={searchForm.amenities[amenity.key]}
                                                onChange={() => handleAmenityChange(amenity.key)}
                                            />
                                            <label htmlFor={amenity.id} className="text-cb-amenities">
                                                {amenity.label}
                                            </label>
                                        </fieldset>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default HeroSlider;