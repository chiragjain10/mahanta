import React from "react";
import "./property.css";
import { FaSearch, FaMapMarkerAlt, FaBath, FaBed, FaRulerCombined } from "react-icons/fa";
import { FiTarget, FiSliders } from "react-icons/fi";

// DYNAMIC DATA
const propertyData = [
  {
    id: 1,
    title: "Casa Lomas De Machalí Machas",
    address: "145 Brooklyn Ave, California, New York",
    beds: 3,
    baths: 2,
    sqft: 1150,
    featured: true,
    forSale: true,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200"
  },
  {
    id: 2,
    title: "Luxury Villa With Private Pool",
    address: "21 Sunset Drive, Los Angeles, California",
    beds: 4,
    baths: 3,
    sqft: 1850,
    featured: true,
    forSale: false,
    image: "https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=1200"
  },
  {
    id: 3,
    title: "Modern Family House",
    address: "87 Lincoln Street, Boston",
    beds: 3,
    baths: 2,
    sqft: 1400,
    featured: false,
    forSale: true,
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200"
  }
];


export default function PropertyPage() {
  return (
    <>
      {/* TOP BAR */}
      <div className="container-fluid bg-white shadow-sm py-3 sticky-top topbar">
        <div className="container d-flex flex-wrap align-items-center gap-3 justify-content-between">

          {/* Rent / Sale Toggle */}
          <div className="btn-group">
            <button className="btn top-toggle active">For Rent</button>
            <button className="btn top-toggle">For Sale</button>
          </div>

          {/* Search Controls */}
          <div className="d-flex flex-wrap gap-3 search-set">

            <div className="top-input">
              <FaSearch />
              <input type="text" placeholder="Search Keyword." />
            </div>

            <div className="top-input">
              <FiTarget />
              <input type="text" placeholder="Search Location" />
            </div>

            <div className="top-input dropdown-box">
              <select>
                <option>All</option>
                <option>Apartment</option>
                <option>Villa</option>
              </select>
            </div>

            <button className="btn adv-btn">
              Search advanced <FiSliders className="ms-2" />
            </button>

            <button className="btn search-btn">
              Search <FaSearch className="ms-2" />
            </button>

          </div>
        </div>
      </div>

      {/* MAIN PAGE */}
      <div className="container-fluid mt-4">
        <div className="row">

          {/* PROPERTY LIST */}
          <div className="col-lg-6 px-4">
            <h2 className="fw-bold mb-4">Property Listing</h2>

            <div className="row g-4">
              {propertyData.map((item) => (
                <div className="col-md-6" key={item.id}>
                  <div className="property-card premium-card">

                    <div className="property-img">
                      <img src={item.image} alt="house" />

                      <div className="badges">
                        {item.featured && <span className="badge premium-badge">Featured</span>}
                        {item.forSale
                          ? <span className="badge sale-badge">For Sale</span>
                          : <span className="badge rent-badge">For Rent</span>}
                      </div>
                    </div>

                    <div className="p-3">
                      <h5 className="fw-bold mb-2">{item.title}</h5>
                      <p className="text-muted small">
                        <FaMapMarkerAlt className="me-1" />
                        {item.address}
                      </p>

                      <div className="d-flex justify-content-between pt-2 small text-center">
                        <span><FaBed /> {item.beds} Beds</span>
                        <span><FaBath /> {item.baths} Baths</span>
                        <span><FaRulerCombined /> {item.sqft} Sqft</span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MAP SECTION */}
          <div className="col-lg-6 p-0">
            <div className="map-box">
              <iframe
                title="map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=New York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
