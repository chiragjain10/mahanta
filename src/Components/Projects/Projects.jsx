import React from "react";

export default function RunningProjects() {
  const projects = [
    {
      id: 1,
      title: "RUDRAAKSH AANGAN",
      location: "Located at Sanwer, Ujjain Road",
      image: "/mnt/data/23addd9b-bc4d-4162-9c8d-d79f387713c8.png",
    },
    {
      id: 2,
      title: "RUDRAAKSH PRIME",
      location: "Located at Indore–Ujjain 4 Lane to Palia Road",
      image: "/mnt/data/23addd9b-bc4d-4162-9c8d-d79f387713c8.png",
    },
    {
      id: 3,
      title: "RUDRAAKSH PRIDE",
      location: "Located at Indore–Ujjain 4 Lane to Palia Road",
      image: "/mnt/data/23addd9b-bc4d-4162-9c8d-d79f387713c8.png",
    },
  ];

  return (
    <div className="projects-section py-5">
      <div className="container">
        <div className="box-title text-center wow fadeInUp">
          <div className="text-subtitle text-primary">Running Projects</div>
          <h3 className="mt-4 title">RUNNING PROJECTS</h3>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          {projects.map((p) => (
            <div className="col-md-4" key={p.id}>
              <div className="project-card shadow-sm border-0 h-100">
                <img src={p.image} alt={p.title} className="project-image" />
                <div className="p-4">
                  <h4 className="fw-bold project-title">{p.title}</h4>
                  <p className="text-muted">{p.location}</p>
                  <a href="#" className="read-more">READ MORE</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}