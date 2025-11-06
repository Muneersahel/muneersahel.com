import { SocialsComponent } from "@/shared/components";
import { MetaTagsService } from "@/shared/services";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
  lucideArrowRight,
  lucideCode,
  lucideExternalLink,
  lucideGithub,
  lucideLayers,
  lucideStar,
  lucideUsers,
} from "@ng-icons/lucide";
import { HlmBadge } from "@spartan-ng/helm/badge";
import { HlmButton } from "@spartan-ng/helm/button";
import { HlmCardImports } from "@spartan-ng/helm/card";

@Component({
  selector: "app-works",
  standalone: true,
  imports: [HlmButton, NgIcon, HlmCardImports, HlmBadge, SocialsComponent],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideExternalLink,
      lucideGithub,
      lucideCode,
      lucideLayers,
      lucideStar,
      lucideUsers,
    }),
  ],
  template: `
    <section class="py-12 min-h-[80dvh]">
      <div class="container">
        <!-- Header Section -->
        <div
          class="mb-10 flex flex-col lg:flex-row justify-between items-center"
        >
          <div>
            <h1 class="text-4xl font-bold mb-4">My Works</h1>
            <p class="text-white/60 max-w-2xl">
              A showcase of my projects, coding activities, and the technologies
              I work with. I'm passionate about creating clean, efficient, and
              user-friendly solutions.
            </p>
          </div>
          <div class="mt-6 lg:mt-0">
            <a
              href="https://github.com/muneersahel"
              target="_blank"
              hlmBtn
              variant="outline"
              size="lg"
              class="uppercase flex items-center gap-2"
            >
              View GitHub
              <ng-icon hlm size="20px" name="lucideGithub"></ng-icon>
            </a>
          </div>
        </div>

        <!-- Featured Projects Section -->
        <section id="featured-projects" class="mb-16">
          <div class="flex items-center gap-2 mb-6">
            <ng-icon
              hlm
              size="base"
              name="lucideStar"
              class="text-accent"
            ></ng-icon>
            <h2 class="text-2xl font-bold">Featured Projects</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (project of featuredProjects; track project.title) {
              <div
                hlmCard
                class="group overflow-hidden bg-white/5 border-white/10 transition-all duration-300 hover:border-accent/50"
              >
                <div class="relative overflow-hidden h-52">
                  <img
                    [src]="project.image"
                    [alt]="project.title"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div class="absolute top-3 right-3 flex gap-2">
                    @for (tag of project.tags; track tag) {
                      <span
                        hlmBadge
                        variant="outline"
                        class="bg-black/50 backdrop-blur-xs text-white/80 text-xs px-2 py-1 rounded-full transition-colors duration-300 group-hover:bg-accent group-hover:text-primary group-hover:border-accent"
                      >
                        {{ tag }}
                      </span>
                    }
                  </div>
                </div>

                <div class="p-5">
                  <h3
                    class="text-xl font-bold mb-2 group-hover:text-accent transition-colors text-white/90"
                  >
                    {{ project.title }}
                  </h3>
                  <p class="text-white/70 mb-4 text-sm">
                    {{ project.description }}
                  </p>

                  <div class="flex justify-between items-center">
                    <div class="flex gap-2">
                      @if (project.githubUrl) {
                        <a
                          [href]="project.githubUrl"
                          target="_blank"
                          hlmBtn
                          variant="outline"
                          class="px-3"
                        >
                          <ng-icon hlm name="lucideGithub"></ng-icon>
                        </a>
                      }
                      @if (project.liveUrl) {
                        <a
                          [href]="project.liveUrl"
                          target="_blank"
                          hlmBtn
                          variant="outline"
                          class="px-3"
                        >
                          <ng-icon hlm name="lucideExternalLink"></ng-icon>
                        </a>
                      }
                    </div>
                    <a
                      [href]="project.detailsUrl || '#'"
                      hlmBtn
                      variant="primary"
                      class="text-accent group-hover:underline flex items-center gap-1"
                    >
                      Learn more
                      <ng-icon hlm name="lucideArrowRight"></ng-icon>
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>
        </section>

        <!-- Coding Activity Section -->
        <section id="coding-activity" class="mb-16">
          <div class="flex items-center gap-2 mb-6">
            <ng-icon
              hlm
              size="base"
              name="lucideCode"
              class="text-accent"
            ></ng-icon>
            <h2 class="text-2xl font-bold">Coding Activity</h2>
          </div>

          <div hlmCard class="p-8 bg-white/5 border-white/10">
            <div class="mb-6">
              <h3 class="text-xl font-semibold mb-2">Weekly Statistics</h3>
              <p class="text-white/60">
                A snapshot of my coding habits and language preferences
              </p>
            </div>

            <figure class="overflow-hidden rounded-lg">
              <embed
                src="https://wakatime.com/share/@390f0169-fdef-4ba0-9714-5d39640b0420/0f7d8a72-851f-4722-a2ba-5e7c411049d0.svg"
                class="w-full"
              />
            </figure>
          </div>
        </section>

        <!-- Technologies Section -->
        <section id="technologies" class="mb-16">
          <div class="flex items-center gap-2 mb-6">
            <ng-icon hlm name="lucideLayers" class="text-accent"></ng-icon>
            <h2 class="text-2xl font-bold">Technologies & Tools</h2>
          </div>

          <div hlmCard class="p-8 bg-white/5 border-white/10">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              @for (category of technologies; track category.category) {
                <div>
                  <h3 class="text-xl font-semibold mb-4 text-accent">
                    {{ category.category }}
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    @for (tech of category.items; track tech) {
                      <span
                        class="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-accent hover:text-primary transition-colors duration-300 text-white/80 cursor-pointer"
                      >
                        {{ tech }}
                      </span>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Testimonials Section -->
        <section id="testimonials">
          <div class="flex items-center gap-2 mb-6">
            <ng-icon
              hlm
              size="base"
              name="lucideUsers"
              class="text-accent"
            ></ng-icon>
            <h2 class="text-2xl font-bold">Testimonials</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            @for (testimonial of testimonials; track testimonial.name) {
              <div
                hlmCard
                class="p-6 bg-white/5 border-white/10 transition-all duration-300 hover:border-accent/50"
              >
                <div class="flex items-center gap-4 mb-4">
                  <div
                    class="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center text-xl font-bold text-accent"
                  >
                    {{ testimonial.name.charAt(0) }}
                  </div>
                  <div>
                    <h3 class="font-semibold text-white/80">
                      {{ testimonial.name }}
                    </h3>
                    <p class="text-white/60 text-sm">
                      {{ testimonial.position }}
                    </p>
                  </div>
                </div>
                <p class="text-white/80 italic">{{ testimonial.text }}</p>
              </div>
            }
          </div>
        </section>

        <!-- Connect Section -->
        <div class="mt-16 text-center">
          <h2 class="text-2xl font-bold mb-4">Let's Connect</h2>
          <p class="text-white/60 max-w-2xl mx-auto mb-6">
            Interested in working together? Feel free to reach out through
            social media or contact me directly.
          </p>
          <app-socials
            containerStyles="flex justify-center gap-6"
            iconStyles="w-10 h-10 border border-accent rounded-full flex justify-center items-center text-accent hover:bg-accent hover:text-primary transition-all duration-300"
          />
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WorksComponent {
  private metaTags = inject(MetaTagsService);

  constructor() {
    this.metaTags.updateMetaTags({
      title: "Works & Projects | Munir Issa",
      description:
        "Portfolio of Munir Issa's software projects, coding activities, and technical expertise.",
    });
  }

  featuredProjects = [
    {
      title: "Personal Portfolio",
      description:
        "A modern portfolio website built with Angular and Spartan UI components, featuring a clean design and responsive layout.",
      image:
        "https://placehold.co/600x400/1c1c22/00ff99?text=Portfolio&font=roboto",
      tags: ["Angular", "Tailwind"],
      githubUrl: "https://github.com/muneersahel/portfolio",
      liveUrl: "https://muneersahel.com",
      detailsUrl: "/works/portfolio",
    },
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with product management, cart functionality, and secure payment integration.",
      image:
        "https://placehold.co/600x400/1c1c22/00ff99?text=E-Commerce&font=roboto",
      tags: ["Angular", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/muneersahel/ecommerce",
      detailsUrl: "/works/ecommerce",
    },
    {
      title: "Health Tracker App",
      description:
        "Mobile application for tracking health metrics, setting goals, and monitoring progress over time.",
      image:
        "https://placehold.co/600x400/1c1c22/00ff99?text=Health+App&font=roboto",
      tags: ["Ionic", "Angular", "Firebase"],
      liveUrl: "https://health-tracker-app.com",
      detailsUrl: "/works/health-tracker",
    },
    {
      title: "Content Management System",
      description:
        "Custom CMS built for content creators with rich text editing, media management, and scheduling features.",
      image: "https://placehold.co/600x400/1c1c22/00ff99?text=CMS&font=roboto",
      tags: ["Angular", "Express", "PostgreSQL"],
      githubUrl: "https://github.com/muneersahel/cms",
      detailsUrl: "/works/cms",
    },
    {
      title: "Weather Dashboard",
      description:
        "Interactive dashboard displaying weather data with charts, maps, and forecasts from multiple APIs.",
      image:
        "https://placehold.co/600x400/1c1c22/00ff99?text=Weather&font=roboto",
      tags: ["TypeScript", "D3.js", "APIs"],
      githubUrl: "https://github.com/muneersahel/weather-dashboard",
      liveUrl: "https://weather-dash.app",
      detailsUrl: "/works/weather-dashboard",
    },
    {
      title: "Task Management Tool",
      description:
        "Collaborative project management tool with real-time updates, task assignment, and progress tracking.",
      image:
        "https://placehold.co/600x400/1c1c22/00ff99?text=Task+Manager&font=roboto",
      tags: ["Angular", "Firebase", "RxJS"],
      githubUrl: "https://github.com/muneersahel/task-manager",
      detailsUrl: "/works/task-manager",
    },
  ];

  technologies = [
    {
      category: "Frontend",
      items: [
        "Angular",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "SCSS",
        "Tailwind CSS",
        "RxJS",
        "NgRx",
        "Material UI",
        "Spartan UI",
        "Bootstrap",
        "Ionic",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express",
        "NestJS",
        "Python",
        "Django",
        "Java",
        "Spring Boot",
        "RESTful APIs",
        "GraphQL",
        "WebSockets",
      ],
    },
    {
      category: "Databases",
      items: [
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "Firebase",
        "Redis",
        "Elasticsearch",
      ],
    },
    {
      category: "DevOps & Cloud",
      items: [
        "Docker",
        "Kubernetes",
        "AWS",
        "Azure",
        "Google Cloud",
        "CI/CD",
        "GitHub Actions",
        "Terraform",
        "Prometheus",
        "Grafana",
      ],
    },
    {
      category: "Tools & Others",
      items: [
        "Git",
        "GitHub",
        "VS Code",
        "Jira",
        "Figma",
        "Postman",
        "Swagger",
        "npm",
        "yarn",
        "Webpack",
        "Vite",
        "Jest",
        "Cypress",
      ],
    },
  ];

  testimonials = [
    {
      name: "Sarah Johnson",
      position: "Product Manager at TechCorp",
      text: "Working with Munir was a fantastic experience. His attention to detail and problem-solving skills made our project a success. I particularly appreciated his ability to communicate complex technical concepts in an accessible way.",
    },
    {
      name: "David Chen",
      position: "CTO at StartupHub",
      text: "Munir delivered an exceptional solution that exceeded our expectations. His technical expertise and proactive approach to challenges made him a valuable asset to our team. We look forward to working with him again.",
    },
    {
      name: "Ana Martinez",
      position: "Frontend Lead at WebSolutions",
      text: "I had the pleasure of collaborating with Munir on a complex web application. His code quality, documentation, and commitment to best practices were impressive. He's not just a great developer but also a team player.",
    },
    {
      name: "Michael Okonjo",
      position: "Founder of HealthTech",
      text: "Munir transformed our idea into a polished, user-friendly application. His expertise in Angular and mobile development was crucial to our product's success. Highly recommended for any challenging project.",
    },
  ];
}
