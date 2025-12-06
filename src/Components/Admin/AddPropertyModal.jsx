import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import axios from 'axios';
import './AddPropertyModal.css';

const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'Mahanta_group');
    const res = await axios.post('https://api.cloudinary.com/v1_1/dlsbj8nug/image/upload', data);
    return res.data.secure_url;
};

const AddPropertyModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        plotCategory: 'residential' // residential | commercial | investment
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            setImageFile(null);
            setImagePreview('');
            return;
        }
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.location || !formData.contactName || !formData.contactPhone) {
            alert('Please fill in plot name, contact name, contact phone, and location.');
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        try {
            let uploadedImageUrl = null;
            if (imageFile) {
                uploadedImageUrl = await uploadToCloudinary(imageFile);
                setUploadProgress(100);
            }

            // Prepare simplified plot data
            const propertyData = {
                title: formData.title,
                location: formData.location,
                contact_name: formData.contactName,
                contact_phone: formData.contactPhone,
                contact_email: formData.contactEmail || '',
                plot_category: formData.plotCategory,
                type: 'plot',
                propertyType: 'plot',
                createdAt: new Date().toISOString()
            };

            if (uploadedImageUrl) {
                propertyData.images = [uploadedImageUrl];
                propertyData.image = uploadedImageUrl;
                propertyData.avatar = uploadedImageUrl || '/images/avatar/avt-png1.png';
            }

            await addDoc(collection(db, 'properties'), propertyData);

            alert('Plot added successfully!');
            onSuccess();
        } catch (error) {
            console.error('Error adding property:', error);
            alert('Error adding plot. Please try again.');
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
                        {/* Plot details */}
                        <div className="form-section">
                            <h3 className="form-section-title">Plot details</h3>

                            <div className="form-group">
                                <label>Plot name *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g., Rudraksh Investment Plot"
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
                                    placeholder="e.g., Sanwer Road, Indore"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Plot type *</label>
                                    <select
                                        name="plotCategory"
                                        value={formData.plotCategory}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="residential">Residential plot</option>
                                        <option value="commercial">Commercial plot</option>
                                        <option value="investment">Investment plot</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Contact details */}
                        <div className="form-section">
                            <h3 className="form-section-title">Contact details</h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Name *</label>
                                    <input
                                        type="text"
                                        name="contactName"
                                        value={formData.contactName}
                                        onChange={handleChange}
                                        placeholder="Contact person name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone *</label>
                                    <input
                                        type="tel"
                                        name="contactPhone"
                                        value={formData.contactPhone}
                                        onChange={handleChange}
                                        placeholder="Contact number"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleChange}
                                    placeholder="Optional email"
                                />
                            </div>
                        </div>

                        {/* Image (optional) */}
                        <div className="form-section">
                            <h3 className="form-section-title">Image (optional)</h3>

                            <div className="image-upload-area">
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="image-input"
                                />
                                <label htmlFor="image-upload" className="image-upload-label">
                                    <span className="upload-icon">📷</span>
                                    <span>Click to upload image</span>
                                    <span className="upload-hint">Image is optional</span>
                                </label>
                            </div>

                            {imagePreview && (
                                <div className="image-previews">
                                    <div className="image-preview-item">
                                        <img src={imagePreview} alt="Preview" />
                                        <button
                                            type="button"
                                            className="remove-image-btn"
                                            onClick={() => {
                                                setImageFile(null);
                                                setImagePreview('');
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            )}
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

