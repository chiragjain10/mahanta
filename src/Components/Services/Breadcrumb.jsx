import React from 'react'
import { Link } from 'react-router-dom'
function Breadcrumb() {
    return (
        <div>
            <section className="flat-title-page" style={{backgroundImage:'url(images/page-title/page-title-5.jpg)'}}>
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul className="breadcrumb">
                            <li><Link to="/" className="text-white">Home</Link></li>
                            <li className="text-white">/ Pages</li>
                            <li className="text-white">/ Our Services</li>
                        </ul>
                        <h1 className="text-center text-white title">Our Services</h1>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Breadcrumb