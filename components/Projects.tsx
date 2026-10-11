import { ArrowUpRight, Coffee, Shirt } from "lucide-react";
import profile from "@/data/profile.json";
export function Projects() {
  return (
    <section className="section-block" aria-labelledby="projects-heading">
      <div className="section-heading">
        <h2 id="projects-heading">Featured projects</h2>
        <span>SELECTED WORK / 02</span>
      </div>
      <div className="project-grid">
        {profile.projects.map((project) => (
          <a
            key={project.id}
            className={"project-card " + project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="project-art" aria-hidden="true">
              <span className="project-category">{project.category}</span>
              <div className="project-wordmark">
                {project.id === "coffee" ? (
                  <>
                    <Coffee size={28} strokeWidth={1.2} />
                    <span>
                      konjo<span className="wordmark-sub">B U N A</span>
                    </span>
                  </>
                ) : (
                  <>
                    <Shirt size={28} strokeWidth={1.2} />
                    <span>
                      OMEGA<span className="wordmark-sub">G A R M E N T</span>
                    </span>
                  </>
                )}
              </div>
              <span className="project-art-footer">
                DIGITAL EXPERIENCE <ArrowUpRight size={14} />
              </span>
            </div>
            <div className="project-info">
              <div>
                <h3>{project.name}</h3>
                <ArrowUpRight size={17} />
              </div>
              <p>{project.description}</p>
              <span>{project.domain}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
