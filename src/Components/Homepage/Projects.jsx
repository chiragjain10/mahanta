import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import './Projects.css';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Ruler, Users, ArrowRight } from 'lucide-react';

// Helper function from old component
const formatLocationSummary = (location) => {
    if (!location) return '';
    if (typeof location === 'string') return location;
    return location.summary || location.address || '';
};

// Check for mobile layout
const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentCard, setCurrentCard] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const trackRef = useRef(null);
    const cardsRef = useRef([]);
    const autoPlayRef = useRef(null);
    
    // --- UTILITY FUNCTIONS ---

    const centerCard = useCallback((index) => {
        if (!trackRef.current || !cardsRef.current[index]) return;

        const card = cardsRef.current[index];
        const wrap = trackRef.current.parentElement;

        if (isMobile()) {
            wrap.scrollTo({
                top: card.offsetTop - (wrap.clientHeight / 2 - card.clientHeight / 2),
                behavior: "smooth"
            });
        } else {
            wrap.scrollTo({
                left: card.offsetLeft - (wrap.clientWidth / 2 - card.clientWidth / 2),
                behavior: "smooth"
            });
        }
    }, []);

    const activateCard = useCallback((index, shouldCenter = true) => {
        const i = Math.min(Math.max(index, 0), projects.length - 1);
        if (i === currentCard) {
            if (shouldCenter) centerCard(i);
            return;
        }

        setCurrentCard(i);
        if (shouldCenter) centerCard(i);
    }, [projects.length, currentCard, centerCard]);

    const go = (step) => {
        activateCard(currentCard + step, true);
    };
    
    // Auto-play functionality
    useEffect(() => {
        if (projects.length <= 1 || isHovering) return;

        autoPlayRef.current = setInterval(() => {
            setCurrentCard(prev => {
                const next = prev >= projects.length - 1 ? 0 : prev + 1;
                centerCard(next);
                return next;
            });
        }, 5000);

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [projects.length, isHovering, centerCard]);

    // --- FETCH PROJECTS ---

    useEffect(() => {
        const projectsRef = collection(db, 'projects');

        const unsubscribe = onSnapshot(
            projectsRef,
            (snapshot) => {
                const projectData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const runningProjects = projectData.filter(
                    (project) => (project.status || 'running') === 'running'
                );

                setProjects(runningProjects);
                setLoading(false);

                if (runningProjects.length > 0) {
                    setCurrentCard(0);
                }
            },
            (err) => {
                console.error('Unable to load projects', err);
                setError('Unable to load running projects.');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    // --- EFFECT: Center active card & handle resize ---
    useEffect(() => {
        if (projects.length > 0) {
            const timer = setTimeout(() => {
                centerCard(currentCard);
            }, 100);
            
            const handleResize = () => centerCard(currentCard);
            window.addEventListener('resize', handleResize);
            
            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', handleResize);
            }
        }
    }, [projects, currentCard, centerCard]);

    // --- INTERACTION HANDLERS ---

    const handleMouseEnter = (index) => {
        if (window.matchMedia("(hover: hover)").matches) {
            setIsHovering(true);
            activateCard(index, true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const handleCardClick = (index) => {
        activateCard(index, true);
    };

    // --- RENDER ---
    const stateMessage = (() => {
        if (loading) return (
            <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading projects...</p>
            </div>
        );
        if (error) return (
            <div className="error-state">
                <div className="error-icon">⚠️</div>
                <p>{error}</p>
                <button className="retry-btn" onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
        if (projects.length === 0) return (
            <div className="empty-state">
                <div className="empty-icon">🏗️</div>
                <p>Projects will appear here once added.</p>
                <p className="empty-subtext">Check back soon for our latest developments.</p>
            </div>
        );
        return '';
    })();

    if (stateMessage) {
        return (
            <section className="slider-section">
                <div className="head container">
                    <div className="head-content">
                        <div className="section-label">OUR PORTFOLIO</div>
                        <h2>Running Projects</h2>
                        <p className="section-subtitle">Explore our current developments and ongoing construction initiatives</p>
                    </div>
                </div>
                <div className="projects-state container">
                    {stateMessage}
                </div>
            </section>
        );
    }

    return (
        <section 
            className="slider-section"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="head container">
                <div className="head-content">
                    <div className="section-label">OUR PORTFOLIO</div>
                    <h2>Running Projects</h2>
                    <p className="section-subtitle">Explore our current developments and ongoing construction initiatives</p>
                </div>
                <div className="controls">
                    <div className="control-counter">
                        <span className="current-count">{String(currentCard + 1).padStart(2, '0')}</span>
                        <span className="total-count">/{String(projects.length).padStart(2, '0')}</span>
                    </div>
                    <div className="nav-buttons">
                        <button 
                            id="prev" 
                            className="nav-btn" 
                            aria-label="Previous Project" 
                            onClick={() => go(-1)} 
                            disabled={currentCard === 0}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button 
                            id="next" 
                            className="nav-btn" 
                            aria-label="Next Project" 
                            onClick={() => go(1)} 
                            disabled={currentCard === projects.length - 1}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="slider">
                <div className="track" id="track" ref={trackRef}>
                    {projects.map((project, index) => (
                        <article
                            key={project.id}
                            className={`project-card ${index === currentCard ? 'active' : ''}`}
                            data-index={index}
                            ref={(el) => (cardsRef.current[index] = el)}
                            onClick={() => handleCardClick(index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="card-gradient-overlay"></div>
                            <img 
                                className="project-card__bg" 
                                src={project.image || '/images/home/house-1.jpg'} 
                                alt={project.title}
                                loading="lazy"
                            />
                            
                            {/* Project Stats Badge */}
                            <div className="project-stats">
                                {project.size && (
                                    <div className="stat-item">
                                        <Ruler size={14} />
                                        <span>{project.size}</span>
                                    </div>
                                )}
                                {project.units && (
                                    <div className="stat-item">
                                        <Users size={14} />
                                        <span>{project.units} units</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="project-card__content">
                                <div className="project-card__header">
                                    <div className="project-meta">
                                        <span className="project-status">
                                            <div className="status-indicator"></div>
                                            {project.status || 'running'}
                                        </span>
                                        {project.completionDate && (
                                            <span className="project-deadline">
                                                <Calendar size={14} />
                                                Target: {project.completionDate}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="project-card__title">{project.title}</h3>
                                    <div className="project-location">
                                        <MapPin size={16} />
                                        <span>{formatLocationSummary(project.location)}</span>
                                    </div>
                                </div>
                                
                                <div className="project-card__details">
                                    <p className="project-card__desc">
                                        {project.description || 'A premium development project with modern amenities and superior craftsmanship.'}
                                    </p>
                                    
                                    <div className="card-actions">
                                        <Link
                                            to={`/projects/${project.id}`}
                                            className="project-card__btn"
                                        >
                                            View Full Details
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="slider-footer">
                <div className="dots" id="dots">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentCard ? 'active' : ''}`}
                            onClick={() => activateCard(index, true)}
                            aria-label={`Go to project ${index + 1}`}
                        >
                            <div className="dot-inner"></div>
                        </button>
                    ))}
                </div>
                <div className="view-all">
                    <Link to="/projects" className="view-all-link">
                        View All Projects
                        <ChevronRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Projects;