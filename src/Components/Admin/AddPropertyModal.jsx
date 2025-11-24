import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import axios from 'axios';
import './AddPropertyModal.css';

const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'Mahirash');
    const res = await axios.post('https://api.cloudinary.com/v1_1/djmfxpemz/image/upload', data);
    return res.data.secure_url;
};

const AddPropertyModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        beds: '',
        baths: '',
        sqft: '',
        agent: '',
        description: '',
        propertyType: 'apartment',
        featured: false,
        forSale: true,
        // Apartment specific
        floorNumber: '',
        buildingName: '',
        hasElevator: false,
        parkingSpaces: '',
        // Villa specific
        plotSize: '',
        numberOfFloors: '',
        gardenArea: '',
        hasSwimmingPool: false,
        // Studio specific
        studioType: '',
        isFurnished: false,
        kitchenType: '',
        // House specific
        hasGarden: false,
        hasGarage: false,
        // Office specific
        officeSpaceType: '',
        workstations: '',
        meetingRooms: ''
    });

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle image selection
    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
        
        // Create previews
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    // Remove image
    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title || !formData.location || !formData.price) {
            alert('Please fill in all required fields');
            return;
        }

        if (images.length === 0) {
            alert('Please upload at least one image');
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        try {
            // Upload all images to Cloudinary
            const uploadedImages = [];
            const totalImages = images.length;

            for (let i = 0; i < images.length; i++) {
                const url = await uploadToCloudinary(images[i]);
                uploadedImages.push(url);
                setUploadProgress(((i + 1) / totalImages) * 100);
            }

            // Prepare property data
            const propertyData = {
                ...formData,
                images: uploadedImages,
                image: uploadedImages[0], // Main image for backward compatibility
                avatar: uploadedImages[0] || '/images/avatar/avt-png1.png', // Default avatar
                beds: formData.propertyType !== 'office' ? parseInt(formData.beds) || 0 : 0,
                baths: formData.propertyType !== 'office' ? parseInt(formData.baths) || 0 : 0,
                sqft: parseInt(formData.sqft),
                floorNumber: formData.floorNumber ? parseInt(formData.floorNumber) : null,
                parkingSpaces: formData.parkingSpaces ? parseInt(formData.parkingSpaces) : null,
                plotSize: formData.plotSize ? parseInt(formData.plotSize) : null,
                numberOfFloors: formData.numberOfFloors ? parseInt(formData.numberOfFloors) : null,
                gardenArea: formData.gardenArea ? parseInt(formData.gardenArea) : null,
                workstations: formData.workstations ? parseInt(formData.workstations) : null,
                meetingRooms: formData.meetingRooms ? parseInt(formData.meetingRooms) : null,
                createdAt: new Date().toISOString()
            };

            // Save to Firebase
            await addDoc(collection(db, 'properties'), propertyData);
            
            alert('Property added successfully!');
            onSuccess();
        } catch (error) {
            console.error('Error adding property:', error);
            alert('Error adding property. Please try again.');
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Add New Property</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit} className="property-form">
                    <div className="form-grid">
                        {/* Basic Information */}
                        <div className="form-section">
                            <h3 className="form-section-title">Basic Information</h3>
                            
                            <div className="form-group">
                                <label>Property Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g., Munim Ji State"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Location *</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g., Indore, Madhya Pradesh, India"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Price *</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="e.g., ₹35,00,000"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Property Type *</label>
                                    <select
                                        name="propertyType"
                                        value={formData.propertyType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Property Type</option>
                                        <option value="apartment">Apartment</option>
                                        <option value="villa">Villa</option>
                                        <option value="studio">Studio</option>
                                        <option value="house">House</option>
                                        <option value="office">Office</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Property Details - Common Fields */}
                        <div className="form-section">
                            <h3 className="form-section-title">Property Details</h3>
                            
                            {/* Common fields for all types */}
                            <div className="form-row">
                                {formData.propertyType !== 'office' && (
                                    <div className="form-group">
                                        <label>Bedrooms *</label>
                                        <input
                                            type="number"
                                            name="beds"
                                            value={formData.beds}
                                            onChange={handleChange}
                                            min="1"
                                            required={formData.propertyType !== 'office'}
                                        />
                                    </div>
                                )}

                                {formData.propertyType !== 'office' && (
                                    <div className="form-group">
                                        <label>Bathrooms *</label>
                                        <input
                                            type="number"
                                            name="baths"
                                            value={formData.baths}
                                            onChange={handleChange}
                                            min="1"
                                            required={formData.propertyType !== 'office'}
                                        />
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>Square Feet *</label>
                                    <input
                                        type="number"
                                        name="sqft"
                                        value={formData.sqft}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Apartment Specific Fields */}
                            {formData.propertyType === 'apartment' && (
                                <>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Floor Number</label>
                                            <input
                                                type="number"
                                                name="floorNumber"
                                                value={formData.floorNumber}
                                                onChange={handleChange}
                                                placeholder="e.g., 5"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Building Name</label>
                                            <input
                                                type="text"
                                                name="buildingName"
                                                value={formData.buildingName}
                                                onChange={handleChange}
                                                placeholder="e.g., Sky Tower"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Parking Spaces</label>
                                            <input
                                                type="number"
                                                name="parkingSpaces"
                                                value={formData.parkingSpaces}
                                                onChange={handleChange}
                                                min="0"
                                                placeholder="e.g., 2"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-checkboxes">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                name="hasElevator"
                                                checked={formData.hasElevator}
                                                onChange={handleChange}
                                            />
                                            <span>Has Elevator</span>
                                        </label>
                                    </div>
                                </>
                            )}

                            {/* Villa Specific Fields */}
                            {formData.propertyType === 'villa' && (
                                <>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Plot Size (sqft)</label>
                                            <input
                                                type="number"
                                                name="plotSize"
                                                value={formData.plotSize}
                                                onChange={handleChange}
                                                min="1"
                                                placeholder="e.g., 5000"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Number of Floors</label>
                                            <input
                                                type="number"
                                                name="numberOfFloors"
                                                value={formData.numberOfFloors}
                                                onChange={handleChange}
                                                min="1"
                                                placeholder="e.g., 2"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Garden Area (sqft)</label>
                                            <input
                                                type="number"
                                                name="gardenArea"
                                                value={formData.gardenArea}
                                                onChange={handleChange}
                                                min="0"
                                                placeholder="e.g., 2000"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-checkboxes">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                name="hasSwimmingPool"
                                                checked={formData.hasSwimmingPool}
                                                onChange={handleChange}
                                            />
                                            <span>Has Swimming Pool</span>
                                        </label>
                                    </div>
                                </>
                            )}

                            {/* Studio Specific Fields */}
                            {formData.propertyType === 'studio' && (
                                <>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Studio Type</label>
                                            <select
                                                name="studioType"
                                                value={formData.studioType}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Type</option>
                                                <option value="efficiency">Efficiency</option>
                                                <option value="loft">Loft</option>
                                                <option value="micro">Micro</option>
                                                <option value="convertible">Convertible</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Kitchen Type</label>
                                            <select
                                                name="kitchenType"
                                                value={formData.kitchenType}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Type</option>
                                                <option value="full">Full Kitchen</option>
                                                <option value="kitchenette">Kitchenette</option>
                                                <option value="none">No Kitchen</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-checkboxes">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                name="isFurnished"
                                                checked={formData.isFurnished}
                                                onChange={handleChange}
                                            />
                                            <span>Furnished</span>
                                        </label>
                                    </div>
                                </>
                            )}

                            {/* House Specific Fields */}
                            {formData.propertyType === 'house' && (
                                <>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Plot Size (sqft)</label>
                                            <input
                                                type="number"
                                                name="plotSize"
                                                value={formData.plotSize}
                                                onChange={handleChange}
                                                min="1"
                                                placeholder="e.g., 3000"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Number of Floors</label>
                                            <input
                                                type="number"
                                                name="numberOfFloors"
                                                value={formData.numberOfFloors}
                                                onChange={handleChange}
                                                min="1"
                                                placeholder="e.g., 2"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-checkboxes">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                name="hasGarden"
                                                checked={formData.hasGarden}
                                                onChange={handleChange}
                                            />
                                            <span>Has Garden</span>
                                        </label>
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                name="hasGarage"
                                                checked={formData.hasGarage}
                                                onChange={handleChange}
                                            />
                                            <span>Has Garage</span>
                                        </label>
                                    </div>
                                </>
                            )}

                            {/* Office Specific Fields */}
                            {formData.propertyType === 'office' && (
                                <>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Office Space Type</label>
                                            <select
                                                name="officeSpaceType"
                                                value={formData.officeSpaceType}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Type</option>
                                                <option value="private">Private Office</option>
                                                <option value="shared">Shared Office</option>
                                                <option value="coworking">Co-working Space</option>
                                                <option value="executive">Executive Suite</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Number of Workstations</label>
                                            <input
                                                type="number"
                                                name="workstations"
                                                value={formData.workstations}
                                                onChange={handleChange}
                                                min="1"
                                                placeholder="e.g., 10"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Meeting Rooms</label>
                                            <input
                                                type="number"
                                                name="meetingRooms"
                                                value={formData.meetingRooms}
                                                onChange={handleChange}
                                                min="0"
                                                placeholder="e.g., 2"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Parking Spaces</label>
                                            <input
                                                type="number"
                                                name="parkingSpaces"
                                                value={formData.parkingSpaces}
                                                onChange={handleChange}
                                                min="0"
                                                placeholder="e.g., 5"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label>Agent Name *</label>
                                <input
                                    type="text"
                                    name="agent"
                                    value={formData.agent}
                                    onChange={handleChange}
                                    placeholder="e.g., Rajesh Sharma"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Enter property description..."
                                />
                            </div>
                        </div>

                        {/* Images Upload */}
                        <div className="form-section">
                            <h3 className="form-section-title">Property Images *</h3>
                            
                            <div className="image-upload-area">
                                <input
                                    type="file"
                                    id="image-upload"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    className="image-input"
                                />
                                <label htmlFor="image-upload" className="image-upload-label">
                                    <span className="upload-icon">📷</span>
                                    <span>Click to upload images</span>
                                    <span className="upload-hint">You can select multiple images</span>
                                </label>
                            </div>

                            {imagePreviews.length > 0 && (
                                <div className="image-previews">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="image-preview-item">
                                            <img src={preview} alt={`Preview ${index + 1}`} />
                                            <button
                                                type="button"
                                                className="remove-image-btn"
                                                onClick={() => removeImage(index)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Options */}
                        <div className="form-section">
                            <h3 className="form-section-title">Options</h3>
                            
                            <div className="form-checkboxes">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                    />
                                    <span>Featured Property</span>
                                </label>

                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="forSale"
                                        checked={formData.forSale}
                                        onChange={handleChange}
                                    />
                                    <span>For Sale (uncheck for Rent)</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Upload Progress */}
                    {uploading && (
                        <div className="upload-progress">
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                            <p>Uploading images... {Math.round(uploadProgress)}%</p>
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={onClose}
                            disabled={uploading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : 'Add Property'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPropertyModal;

