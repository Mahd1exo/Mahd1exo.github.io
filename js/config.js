/* =============================================================
   Portfolio content config
   Single source of truth for the few strings main.js reads at
   runtime (hero roles, contact email) plus a structured copy of
   the résumé data that index.html renders.
   Keep this in sync with Mehdi_Ebrahimzadeh_Resume.pdf.
   ============================================================= */

const portfolioConfig = {
    name: "Mehdi Ebrahimzadeh",
    shortName: "ME",
    title: "Performance & Software Engineer",
    location: "Waterloo, ON, Canada",
    resume: "Mehdi_Ebrahimzadeh_Resume.pdf",

    contact: {
        email: "mehdi.ebr.work@gmail.com",
        phone: "+1 514-550-5492",
        github: "https://github.com/Mahd1exo",
        linkedin: "https://linkedin.com/in/mehdi-ebr",
        website: "https://mahd1exo.github.io"
    },

    // Rotating line under the name in the hero (read by main.js).
    hero: {
        roles: [
            "Performance Engineer @ SOTI",
            "AI & developer tooling",
            "Backend & distributed systems",
            "Co-Founder @ Eyval · Velocity"
        ]
    },

    education: {
        school: "Conestoga College",
        program: "Advanced Diploma, Software Engineering Technology (Co-op)",
        dates: "Sep 2024 – Apr 2028 (expected)",
        location: "Waterloo, ON",
        notes: [
            "GPA 4.0 / 4.0 — 97% average across all courses",
            "Ranked 1st in the program cohort by term GPA (Fall 2025, Winter 2026)"
        ]
    },

    metrics: [
        { value: "80%",    label: "manual test effort removed with in-house automation at SOTI" },
        { value: "30–70%", label: "lower Copilot credit spend, ledger-tracked, via an MCP server + CLI" },
        { value: "95%",    label: "research data-prep time saved by automating dataset pipelines" },
        { value: "4.0",    label: "GPA at Conestoga — ranked 1st in cohort by term GPA" }
    ],

    experience: [
        {
            company: "SOTI",
            location: "Mississauga, ON",
            dates: "May 2026 – Present",
            current: true,
            roles: [
                {
                    title: "Performance Engineer Intern (Co-op)",
                    points: [
                        "Cut manual test effort 80% by building in-house automation tooling for MobiControl performance test runs.",
                        "Accelerated MobiControl staging sanity and health checks 84% at equal accuracy by optimizing scenario runs.",
                        "Isolated CPU, memory and SQL hotspots per release with JMeter and dotTrace; tracked KPIs in Grafana."
                    ]
                },
                {
                    title: "AI Initiative — AI Engineering & Developer Tooling (concurrent)",
                    points: [
                        "Built a Copilot-style JMeter agent that writes and checks JMX, taking load-test authoring from hours to minutes.",
                        "Lowered Copilot credit spend 30–70% (ledger-tracked) via an MCP server and CLI in TypeScript with 13 tools.",
                        "Lifted agent accuracy on large repos 40% via tree-sitter ASTs across 27 languages and a local GraphRAG code graph."
                    ]
                }
            ],
            tags: ["JMeter", "dotTrace", "Grafana", "C#", "TypeScript", "MCP", "tree-sitter", "GraphRAG"]
        },
        {
            company: "Eyval",
            note: "Velocity Summer 2026 Accelerator · University of Waterloo",
            location: "Waterloo, ON",
            dates: "May 2026 – Sep 2026",
            roles: [
                {
                    title: "Co-Founder & Software Engineer",
                    points: [
                        "Built a governance layer and shared infrastructure enforcing 12 policy and audit checks across 50+ AI agents.",
                        "Shipped the MVP in 6 weeks to 3 pilot design partners by leading the Go/TypeScript control-plane build."
                    ]
                }
            ],
            tags: ["Go", "TypeScript", "AI agents", "Policy & audit", "Control plane"]
        },
        {
            company: "Conestoga Health & Science Research Lab",
            location: "Cambridge, ON",
            dates: "Sep 2025 – Apr 2026",
            roles: [
                {
                    title: "Research Assistant II — Data Analysis",
                    points: [
                        "Saved 95% of research data-prep time by automating lab study dataset pipelines in Python (Pandas/NumPy).",
                        "Delivered 6 interactive dashboards for 8 researchers, turning days of manual reporting into same-day results."
                    ]
                }
            ],
            tags: ["Python", "Pandas", "NumPy", "Dashboards", "Data pipelines"]
        },
        {
            company: "Oktav",
            note: "Velocity Deep Tech · Top 10 Finalist",
            location: "Waterloo, ON",
            dates: "May 2025 – Sep 2025",
            roles: [
                {
                    title: "Co-Founder & Software Engineer",
                    points: [
                        "Designed 8 services and 24 gRPC APIs in Go/.NET, secured with OAuth2/OIDC and JWT-based auth."
                    ]
                }
            ],
            tags: ["Go", ".NET", "gRPC", "OAuth2 / OIDC", "Docker"]
        },
        {
            company: "Versall",
            location: "Toronto, ON",
            dates: "Sep 2024 – May 2025",
            roles: [
                {
                    title: "Co-Founder & Software Engineer",
                    points: [
                        "Shipped 5 Node.js backend modules — auth, billing, scheduling and payments — plus autoscaled WebSocket services.",
                        "Wired Kafka eventing and distributed tracing across all services, giving end-to-end visibility for incident triage."
                    ]
                }
            ],
            tags: ["Node.js", "WebSockets", "Kafka", "Distributed tracing", "AWS"]
        },
        {
            company: "Intelligent Innovations Lab",
            location: "Peterborough, ON",
            dates: "Jan 2025 – Apr 2025",
            roles: [
                {
                    title: "Software Engineer",
                    points: [
                        "Halved deployment time with automated GitHub Actions pipelines for 12 Docker services; cut tech debt 30%."
                    ]
                }
            ],
            tags: ["GitHub Actions", "Docker", "CI/CD", "Flutter"]
        },
        {
            company: "Douran Co.",
            location: "Remote",
            dates: "Sep 2022 – Apr 2023",
            roles: [
                {
                    title: "Software Engineer",
                    points: [
                        "Raised .NET backend throughput 30% through async I/O; tuned SQL Server for over 100k daily transactions."
                    ]
                }
            ],
            tags: [".NET", "Async I/O", "SQL Server", "PostgreSQL"]
        }
    ],

    projects: [
        {
            name: "BioCheck AI",
            url: "https://github.com/Mahd1exo/Health_System",
            blurb: "A privacy-first pipeline running on local APIs that turns raw lab results into clinician-ready reports in under 5 seconds.",
            stack: ["React", "ASP.NET Core", "PostgreSQL", "Docker"]
        },
        {
            name: "Health Monitoring System",
            url: "https://github.com/Mahd1exo/Health-Monitoring-System",
            blurb: "Flags abnormal temperature, pulse and SpO₂ at 95% accuracy across 1,000+ readings using fuzzy logic and GenAI.",
            stack: ["Python", "Go", "Rust", "NumPy / Pandas", "OpenAI API"]
        },
        {
            name: "Data Structures Visualizer",
            url: "https://github.com/Mahd1exo/Data-Structures-Demo",
            blurb: "A full-stack teaching platform with interactive, step-by-step animations of 12 data structures and algorithms.",
            stack: ["React", "C", "CivetWeb"]
        },
        {
            name: "AI-Enhanced App Generator",
            url: "https://github.com/Mahd1exo/App-Generator",
            blurb: "An LLM-driven GUI generator with a machine-learning feedback loop and automated logging.",
            stack: ["Python", "PyTorch", "scikit-learn", "SQLite"]
        }
    ],

    skills: {
        "Languages": ["C#", "Python", "C / C++", "Java", "TypeScript", "Go", "Rust", "Groovy", "SQL"],
        "AI / ML": ["RAG", "GraphRAG", "MCP", "LangChain", "LangGraph", "MLflow", "PyTorch", "scikit-learn"],
        "Performance & Testing": ["JMeter", "k6", "dotTrace", "PerfView", "Grafana", "Prometheus", "Playwright", "Load testing", "Profiling"],
        "Frameworks": [".NET Core", "SignalR", "gRPC", "WebSockets", "Kafka", "Django", "Node.js", "React", "Next.js", "NumPy", "Pandas"],
        "Infra & Data": ["Docker", "Kubernetes", "AWS", "Azure", "Jenkins", "GitHub Actions", "SQL Server", "PostgreSQL", "Redis", "MongoDB"]
    },

    recognition: [
        "Velocity Summer 2026 Accelerator — University of Waterloo, for Eyval",
        "Top 10 Finalist, Velocity Deep Tech — University of Waterloo, for Oktav",
        "2nd Place of 40+ teams, ConHacks 2025 — AI-powered incident triage tool in 48 hours"
    ],

    certifications: [
        "Certified Ethical Hacker (CEH)",
        "SANS SEC 504",
        "LPIC-1 & LPIC-2 (Linux)"
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioConfig;
}
