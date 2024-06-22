import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-works',
  standalone: true,
  template: `
    <div class="container pb-10">
      <h1 class="text-4xl font-bold text-center mt-10">
        My Works & Coding Activities
      </h1>
      <p class="text-xl text-white/80 text-center mt-4">
        Welcome to my portfolio page! Here, you'll find a showcase of my
        projects, coding activities, and the technologies I work with.
      </p>

      <section id="portfolio" class="mt-12">
        <h2 class="text-3xl font-bold">Portfolio Gallery</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          <!-- Example of a portfolio item -->
          <div class="portfolio-item shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Project Thumbnail"
              class="w-full h-48 object-cover"
            />
            <div class="py-4">
              <h3 class="text-xl font-semibold">Project Title</h3>
              <p class="text-white/60 mt-2">
                Short description of the project.
              </p>
              <a
                href="project-link.html"
                class="inline-block mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
              >
                Learn More
              </a>
            </div>
          </div>
          <!-- Add more portfolio items here -->
        </div>
      </section>

      <section id="coding-activity" class="mt-12">
        <h2 class="text-3xl font-bold">Coding Activity</h2>
        <figure class="mt-6">
          <embed
            src="https://wakatime.com/share/@390f0169-fdef-4ba0-9714-5d39640b0420/0f7d8a72-851f-4722-a2ba-5e7c411049d0.svg"
            class="w-full"
          />
        </figure>
      </section>

      <section id="technologies" class="mt-12">
        <h2 class="text-3xl font-bold">Technologies & Tools</h2>
        <p class="text-white/60 mt-4">List of technologies and tools...</p>
      </section>

      <section id="recent-projects" class="mt-12">
        <h2 class="text-3xl font-bold">Recent Projects</h2>
        <p class="text-white/60 mt-4">
          Overview of recent projects or contributions...
        </p>
      </section>

      <section id="testimonials" class="mt-12">
        <h2 class="text-3xl font-bold">Testimonials</h2>
        <p class="text-white/60 mt-4">What people are saying...</p>
      </section>

      <section id="contact" class="mt-12 mb-10">
        <h2 class="text-3xl font-bold">Contact Me</h2>
        <p class="text-white/60 mt-4">
          If you're interested in collaborating or have any questions, feel free
          to reach out!
        </p>
        <!-- Contact form or email link -->
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WorksComponent {}
