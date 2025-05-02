import { MetaTagsService } from "@/shared/services";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  lucideArrowRight,
  lucideCalendar,
  lucideDownload,
  lucideGraduationCap,
  lucideLaptop,
  lucideMapPin,
} from "@ng-icons/lucide";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmCardModule } from "@spartan-ng/ui-card-helm";
import { HlmIconComponent, provideIcons } from "@spartan-ng/ui-icon-helm";

@Component({
  selector: "app-resume",
  standalone: true,
  imports: [HlmButtonDirective, HlmIconComponent, HlmCardModule],
  providers: [
    provideIcons({
      lucideDownload,
      lucideGraduationCap,
      lucideLaptop,
      lucideCalendar,
      lucideMapPin,
      lucideArrowRight,
    }),
  ],
  template: `
    <section class="py-12 min-h-[80dvh]">
      <div class="container ">
        <!-- Header Section -->
        <div
          class="mb-10 flex flex-col lg:flex-row justify-between items-center"
        >
          <div>
            <h1 class="text-4xl font-bold mb-4">My Resume</h1>
            <p class="text-white/60 max-w-2xl">
              Experienced software engineer with a passion for building engaging
              web applications. Specialized in Angular and full-stack
              development.
            </p>
          </div>
          <div class="mt-6 lg:mt-0">
            <a
              hlmBtn
              variant="outline"
              size="lg"
              class="uppercase flex items-center gap-2"
            >
              Download CV
              <hlm-icon name="lucideDownload" class="h-5 w-5"></hlm-icon>
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <!-- Left Column -->
          <div class="lg:col-span-2">
            <!-- Experience Section -->
            <div class="mb-12">
              <div class="flex items-center gap-2 mb-6">
                <hlm-icon
                  name="lucideLaptop"
                  class="h-6 w-6 text-accent"
                ></hlm-icon>
                <h2 class="text-2xl font-bold">Work Experience</h2>
              </div>

              @for (job of workExperience; track job.company) {
                <div class="mb-8 group">
                  <div
                    class="flex flex-col sm:flex-row sm:items-center justify-between mb-2"
                  >
                    <h3
                      class="text-xl font-semibold group-hover:text-accent transition-colors duration-300"
                    >
                      {{ job.position }}
                    </h3>
                    <div class="text-white/60 flex items-center gap-2">
                      <hlm-icon
                        name="lucideCalendar"
                        class="h-4 w-4"
                      ></hlm-icon>
                      <span>{{ job.period }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 mb-3 text-accent">
                    <span class="font-medium">{{ job.company }}</span>
                    @if (job.location) {
                      <div class="flex items-center text-white/60">
                        <span>•</span>
                        <hlm-icon
                          name="lucideMapPin"
                          class="h-4 w-4 ml-2 mr-1"
                        ></hlm-icon>
                        <span>{{ job.location }}</span>
                      </div>
                    }
                  </div>
                  <p class="text-white/70 mb-4">{{ job.description }}</p>
                  @if (job.achievements && job.achievements.length > 0) {
                    <ul class="list-disc list-inside text-white/70 ml-1">
                      @for (
                        achievement of job.achievements;
                        track achievement
                      ) {
                        <li class="mb-1">{{ achievement }}</li>
                      }
                    </ul>
                  }
                  <div class="border-b border-white/10 w-full mt-6"></div>
                </div>
              }
            </div>

            <!-- Education Section -->
            <div>
              <div class="flex items-center gap-2 mb-6">
                <hlm-icon
                  name="lucideGraduationCap"
                  class="h-6 w-6 text-accent"
                ></hlm-icon>
                <h2 class="text-2xl font-bold">Education</h2>
              </div>

              @for (edu of education; track edu.degree) {
                <div class="mb-8 group">
                  <div
                    class="flex flex-col sm:flex-row sm:items-center justify-between mb-2"
                  >
                    <h3
                      class="text-xl font-semibold group-hover:text-accent transition-colors duration-300"
                    >
                      {{ edu.degree }}
                    </h3>
                    <div class="text-white/60 flex items-center gap-2">
                      <hlm-icon
                        name="lucideCalendar"
                        class="h-4 w-4"
                      ></hlm-icon>
                      <span>{{ edu.period }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 mb-3 text-accent">
                    <span class="font-medium">{{ edu.institution }}</span>
                    @if (edu.location) {
                      <div class="flex items-center text-white/60">
                        <span>•</span>
                        <hlm-icon
                          name="lucideMapPin"
                          class="h-4 w-4 ml-2 mr-1"
                        ></hlm-icon>
                        <span>{{ edu.location }}</span>
                      </div>
                    }
                  </div>
                  @if (edu.description) {
                    <p class="text-white/70">{{ edu.description }}</p>
                  }
                  <div class="border-b border-white/10 w-full mt-6"></div>
                </div>
              }
            </div>
          </div>

          <!-- Right Column -->
          <div>
            <!-- Skills Section -->
            <div class="mb-12">
              <h2 class="text-2xl font-bold mb-6">Skills</h2>
              <div class="space-y-6">
                @for (category of skills; track category.category) {
                  <div>
                    <h3 class="text-lg font-medium mb-3 text-accent">
                      {{ category.category }}
                    </h3>
                    <div class="flex flex-wrap gap-2">
                      @for (skill of category.items; track skill) {
                        <span
                          class="px-3 py-1 bg-white/5 rounded-full text-sm hover:bg-accent hover:text-primary transition-colors duration-300"
                          >{{ skill }}</span
                        >
                      }
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Certifications -->
            <div class="mb-12">
              <h2 class="text-2xl font-bold mb-6">Certifications</h2>
              <div class="space-y-4">
                @for (cert of certifications; track cert.name) {
                  <div
                    class="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300"
                  >
                    <h3 class="font-medium text-accent">{{ cert.name }}</h3>
                    <p class="text-white/60 text-sm">
                      {{ cert.issuer }} • {{ cert.date }}
                    </p>
                  </div>
                }
              </div>
            </div>

            <!-- Languages -->
            <div>
              <h2 class="text-2xl font-bold mb-6">Languages</h2>
              <div class="space-y-4">
                @for (lang of languages; track lang.language) {
                  <div class="mb-2">
                    <div class="flex justify-between mb-1">
                      <span>{{ lang.language }}</span>
                      <span class="text-accent">{{ lang.proficiency }}</span>
                    </div>
                    <div class="w-full bg-white/10 rounded-full h-1.5">
                      <div
                        class="bg-accent h-1.5 rounded-full"
                        [style.width]="lang.level + '%'"
                      ></div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ResumeComponent {
  private metaTags = inject(MetaTagsService);

  constructor() {
    this.metaTags.updateMetaTags({
      title: "Resume | Munir Issa",
      description:
        "Professional resume of Munir Issa, showcasing work experience, education, and skills.",
    });
  }

  workExperience = [
    {
      position: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      period: "2021 - Present",
      description:
        "Lead developer for enterprise web applications using Angular and Node.js.",
      achievements: [
        "Architected and implemented a scalable front-end solution that improved load times by 40%",
        "Mentored junior developers and established coding standards across the team",
        "Implemented CI/CD pipeline, reducing deployment time by 60%",
      ],
    },
    {
      position: "Full Stack Developer",
      company: "Digital Innovations",
      location: "New York, USA",
      period: "2018 - 2021",
      description:
        "Developed responsive web applications using modern JavaScript frameworks.",
      achievements: [
        "Built RESTful APIs and microservices using Node.js and Express",
        "Implemented authentication and authorization using JWT",
        "Collaborated with UI/UX designers to create intuitive user interfaces",
      ],
    },
    {
      position: "Frontend Developer",
      company: "WebSphere Solutions",
      location: "Berlin, Germany",
      period: "2016 - 2018",
      description: "Created responsive user interfaces for client projects.",
      achievements: [
        "Developed mobile-first web applications using Angular",
        "Collaborated with a team of 5 developers to deliver projects on time",
        "Reduced page load times by 35% through optimization techniques",
      ],
    },
  ];

  education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "Stanford University",
      location: "Stanford, CA",
      period: "2014 - 2016",
      description:
        "Specialized in Software Engineering and Distributed Systems",
    },
    {
      degree: "Bachelor of Engineering in Telecommunications",
      institution: "Technical University",
      location: "Munich, Germany",
      period: "2010 - 2014",
      description: "Graduated with honors, GPA 3.8/4.0",
    },
  ];

  skills = [
    {
      category: "Frontend",
      items: [
        "Angular",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "SCSS",
        "RxJS",
        "Redux",
        "Jest",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express",
        "NestJS",
        "MongoDB",
        "PostgreSQL",
        "RESTful APIs",
        "GraphQL",
      ],
    },
    {
      category: "DevOps & Tools",
      items: [
        "Git",
        "GitHub",
        "Docker",
        "CI/CD",
        "AWS",
        "Firebase",
        "Jira",
        "Figma",
      ],
    },
  ];

  certifications = [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2022",
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google",
      date: "2021",
    },
    {
      name: "Angular Certified Developer",
      issuer: "OpenJS Foundation",
      date: "2020",
    },
  ];

  languages = [
    {
      language: "English",
      proficiency: "Fluent",
      level: 95,
    },
    {
      language: "German",
      proficiency: "Professional",
      level: 80,
    },
    {
      language: "Arabic",
      proficiency: "Native",
      level: 100,
    },
  ];
}
