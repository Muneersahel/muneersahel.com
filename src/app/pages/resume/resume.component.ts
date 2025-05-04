import { CvService, MetaTagsService } from "@/shared/services";
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
  styles: `
    li::marker {
      @apply text-accent font-semibold;
      content: "[" counter(list-item) "]" " ";
      &:before {
        content: "• ";
      }
    }
  `,
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
              [href]="cvService.downloadUrl()"
              target="_blank"
              rel="noopener noreferrer"
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
  protected cvService = inject(CvService);

  workExperience = [
    {
      position: "CTO & Lead Engineer",
      company: "Medikea Healthcare App.",
      location: "Dar es Salaam, Tanzania",
      period: "2023 - Present",
      description:
        "Lead the development of a healthcare application, overseeing a team of 8 developers.",
      achievements: [
        "Designed and implemented a microservices architecture for the backend, improving scalability and maintainability",
        "Integrated third-party APIs for real-time health monitoring and telemedicine features",
        "Conducted code reviews and established best practices for the development team",
        "Implemented security measures to protect sensitive health data, ensuring compliance with HIPAA regulations",
        "Led the migration of the application to a cloud-based infrastructure, reducing costs by 30%",
        "Developed a comprehensive testing strategy, including unit tests, integration tests, and end-to-end tests",
        "Participated in Agile ceremonies, including sprint planning, daily stand-ups, and retrospectives",
        "Authomated the deployment process using Docker, reducing deployment time by 40%",
        "Provided technical guidance and mentorship to junior developers, fostering a culture of continuous learning",
        "Contributed to the open-source community by sharing knowledge and best practices through blog posts and talks",
        "Implemented performance monitoring and logging solutions to identify and resolve issues proactively",
        "Collaborated with cross-functional teams to gather requirements and deliver high-quality software solutions",
        "Developed and maintained technical documentation for the application architecture, APIs, and deployment processes",
        "Conducted training sessions for the development team on new technologies and best practices",
      ],
    },
    {
      position: "Frontend Engineer",
      company: "Medikea Healthcare App.",
      location: "Dar es Salaam, Tanzania",
      period: "2022 - Present",
      description:
        "Developed and maintained the frontend of a healthcare application using Angular.",
      achievements: [
        "Conducted code reviews and provided constructive feedback to team members",
        "Optimized application performance by implementing lazy loading and code splitting techniques",
        "Participated in Agile ceremonies, including sprint planning, daily stand-ups, and retrospectives",
        "Developed and maintained technical documentation for the front-end architecture and components",
        "Structured the application using a modular approach, improving maintainability and scalability",
        "Implemented state management using signalStore from NgRx, improving data flow and reducing complexity",
        "Mastered the use of RxJS for handling asynchronous data streams and managing side effects",
        "Mastered the use of Angular Material for building responsive and accessible user interfaces",
        "Implemented unit tests and end-to-end tests using Jasmine and Protractor, ensuring high code quality",
      ],
    },
    {
      position: "Full Stack Developer",
      company: "Zanzibar Multiplex Company",
      location: "Zanzibar, Tanzania",
      period: "July 2021 - Oct 2021",
      description:
        "Developed a web application for the company using Angular and Laravel.",
      achievements: [
        "Designed and implemented a RESTful API using Laravel for the backend",
        "Developed a responsive frontend using Angular, ensuring cross-browser compatibility",
        "Implemented authentication and authorization features to secure sensitive data",
        "Conducted performance testing and optimization to ensure fast loading times",
        "Learned about multiplexing and its impact on the journalism and film industry",
      ],
    },
    {
      position: "Student Coordinator",
      company: "University of Dar es Salaam",
      location: "Dar es Salaam, Tanzania",
      period: "2020 - 2021",
      description:
        "Coordinated student activities and events for IET(Institute of Engineers Tanzania) at University of Dar es Salaam.",
      achievements: [
        "Organized workshops and seminars on various engineering topics",
        "Collaborated with faculty and industry professionals to provide students with networking opportunities",
        "Led a team of volunteers to plan and execute events, ensuring smooth operations",
        "Developed marketing materials and promoted events through social media and campus channels",
        "Gathered feedback from participants to improve future events and activities",
      ],
    },
  ];

  education = [
    {
      degree: "Bachelor of Science in Telecommunication Engineering",
      institution: "University of Dar es Salaam",
      location: "Dar es Salaam, Tanzania",
      period: "2018 - 2022",
      description: "Graduated with, GPA 4.0/5.0",
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
        "NgRx",
        "Tailwind CSS",
        "Material Design",
        "Bootstrap",
        "Responsive Design",
        "RESTful APIs",
        "WebSockets",
        "Progressive Web Apps (PWAs)",
        "Single Page Applications (SPAs)",
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
        "Django",
        "FastAPI",
        "Swagger",
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
        "Postman",
        "Bruno",
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
      level: 90,
    },
    {
      language: "Swahili",
      proficiency: "Native",
      level: 100,
    },
    {
      language: "Arabic",
      proficiency: "Basic",
      level: 20,
    },
  ];
}
