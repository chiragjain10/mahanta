import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import './Projects.css';

const ProjectsSection = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const projectsRef = collection(db, 'projects');

        const unsubscribe = onSnapshot(
            projectsRef,
            (snapshot) => {
                const projectData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProjects(projectData);
                setLoading(false);
            },
            (err) => {
                console.error('Unable to load projects', err);
                setError('Unable to load running projects.');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const stateMessage = (() => {
        if (loading) return 'Loading projects...';
        if (error) return error;
        if (projects.length === 0) return 'Projects will appear here once added.';
        return '';
    })();

    return (
        <section className="homepage-projects">
            <div className="container">
                <div className="box-title text-center wow fadeInUp">
                    <div className="text-subtitle text-primary">Running Projects</div>
                    <h3 className="mt-4 title">Inspired by SOS Infrabulls</h3>
                </div>
            </div>

            {stateMessage ? (
                <div className="projects-state">
                    <p>{stateMessage}</p>
                </div>
            ) : (
                <div className="projects-grid container">
                    {projects.map((project) => (
                        <article key={project.id} className="projects-card">
                            <div className="projects-card-image">
                                <img
                                    src={project.image || '/images/home/house-1.jpg'}
                                    alt={project.title}
                                    loading="lazy"
                                />
                                <span className="projects-card-badge">Ongoing</span>
                            </div>
                            <div className="projects-card-body">
                                <h3>{project.title}</h3>
                                <p>{project.location}</p>
                                {project.ctaUrl ? (
                                    <a
                                        href={project.ctaUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="projects-card-link"
                                    >
                                        {project.ctaLabel || 'Read More'}
                                    </a>
                                ) : (
                                    <span className="projects-card-muted">Details coming soon</span>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProjectsSection;
