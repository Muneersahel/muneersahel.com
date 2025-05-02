import { SocialsComponent } from "@/shared/components";
import { MetaTagsService } from "@/shared/services";
import { NgClass } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { Firestore, addDoc, collection } from "@angular/fire/firestore";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  lucideArrowRight,
  lucideMail,
  lucideMapPin,
  lucidePhone,
  lucideSend,
} from "@ng-icons/lucide";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmIconComponent, provideIcons } from "@spartan-ng/ui-icon-helm";
import { HlmInputDirective } from "@spartan-ng/ui-input-helm";
import { HlmLabelDirective } from "@spartan-ng/ui-label-helm";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmIconComponent,
    HlmInputDirective,
    HlmLabelDirective,
    SocialsComponent,
    NgClass,
  ],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideMapPin,
      lucideMail,
      lucidePhone,
      lucideSend,
    }),
  ],
  template: `
    <section class="py-12 min-h-[80dvh]">
      <div class="container">
        <!-- Header Section -->
        <div class="text-center mb-16 max-w-3xl mx-auto">
          <h1 class="text-4xl font-bold mb-4">Get In Touch</h1>
          <p class="text-white/60">
            Have a project in mind or just want to say hello? Feel free to reach
            out. I'm always open to discussing new projects, creative ideas or
            opportunities to be part of your vision.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <!-- Contact Information -->
          <div class="lg:col-span-1">
            <div class="bg-white/5 rounded-lg p-8 h-full">
              <h2 class="text-2xl font-bold mb-6">Contact Information</h2>

              <div class="space-y-6">
                <!-- Location -->
                <div class="flex items-start gap-4">
                  <div class="bg-accent/10 rounded-full p-3 text-accent">
                    <hlm-icon name="lucideMapPin" class="h-6 w-6"></hlm-icon>
                  </div>
                  <div>
                    <h3 class="font-medium mb-1">Location</h3>
                    <p class="text-white/60">Gaza, Palestine</p>
                  </div>
                </div>

                <!-- Email -->
                <div class="flex items-start gap-4">
                  <div class="bg-accent/10 rounded-full p-3 text-accent">
                    <hlm-icon name="lucideMail" class="h-6 w-6"></hlm-icon>
                  </div>
                  <div>
                    <h3 class="font-medium mb-1">Email</h3>
                    <a
                      href="mailto:info@muneersahel.com"
                      class="text-white/60 hover:text-accent transition-colors"
                    >
                      {{ "info@muneersahel.com" }}
                    </a>
                  </div>
                </div>

                <!-- Phone -->
                <div class="flex items-start gap-4">
                  <div class="bg-accent/10 rounded-full p-3 text-accent">
                    <hlm-icon name="lucidePhone" class="h-6 w-6"></hlm-icon>
                  </div>
                  <div>
                    <h3 class="font-medium mb-1">Phone</h3>
                    <a
                      href="tel:+970599123456"
                      class="text-white/60 hover:text-accent transition-colors"
                      >+970 599 123 456</a
                    >
                  </div>
                </div>
              </div>

              <!-- Socials -->
              <div class="mt-10">
                <h3 class="font-medium mb-4">Connect with me</h3>
                <app-socials
                  containerStyles="flex gap-4"
                  iconStyles="w-10 h-10 bg-white/5 rounded-full flex justify-center items-center text-white/60 hover:bg-accent hover:text-primary transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <div class="bg-white/5 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-6">Send me a message</h2>

              <form
                [formGroup]="contactForm"
                (ngSubmit)="onSubmit()"
                class="space-y-6"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Name Field -->
                  <div class="space-y-2">
                    <label hlmLabel for="name">Name</label>
                    <input
                      hlmInput
                      id="name"
                      type="text"
                      formControlName="name"
                      placeholder="Your name"
                      class="w-full"
                      [ngClass]="{
                        'border-red-500': f['name'].touched && f['name'].errors,
                      }"
                    />
                    @if (f["name"].touched && f["name"].errors) {
                      <div class="text-red-500 text-sm mt-1">
                        Name is required
                      </div>
                    }
                  </div>

                  <!-- Email Field -->
                  <div class="space-y-2">
                    <label hlmLabel for="email">Email</label>
                    <input
                      hlmInput
                      id="email"
                      type="email"
                      formControlName="email"
                      placeholder="Your email"
                      class="w-full"
                      [ngClass]="{
                        'border-red-500':
                          f['email'].touched && f['email'].errors,
                      }"
                    />
                    @if (f["email"].touched && f["email"].errors) {
                      <div class="text-red-500 text-sm mt-1">
                        @if (f["email"].errors["required"]) {
                          Email is required
                        } @else if (f["email"].errors["email"]) {
                          Please enter a valid email
                        }
                      </div>
                    }
                  </div>
                </div>

                <!-- Subject Field -->
                <div class="space-y-2">
                  <label hlmLabel for="subject">Subject</label>
                  <input
                    hlmInput
                    id="subject"
                    type="text"
                    formControlName="subject"
                    placeholder="Subject"
                    class="w-full"
                    [ngClass]="{
                      'border-red-500':
                        f['subject'].touched && f['subject'].errors,
                    }"
                  />
                  @if (f["subject"].touched && f["subject"].errors) {
                    <div class="text-red-500 text-sm mt-1">
                      Subject is required
                    </div>
                  }
                </div>

                <!-- Message Field -->
                <div class="space-y-2">
                  <label hlmLabel for="message">Message</label>
                  <textarea
                    hlmInput
                    id="message"
                    formControlName="message"
                    placeholder="Your message"
                    class="w-full min-h-[150px] resize-y"
                    [ngClass]="{
                      'border-red-500':
                        f['message'].touched && f['message'].errors,
                    }"
                  ></textarea>
                  @if (f["message"].touched && f["message"].errors) {
                    <div class="text-red-500 text-sm mt-1">
                      Message is required
                    </div>
                  }
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end">
                  <button
                    hlmBtn
                    type="submit"
                    [disabled]="loading()"
                    class="flex items-center gap-2"
                  >
                    @if (loading()) {
                      <span class="animate-spin mr-2">&#9696;</span>
                      Sending...
                    } @else {
                      Send Message
                      <hlm-icon name="lucideSend" class="h-5 w-5"></hlm-icon>
                    }
                  </button>
                </div>

                @if (submitted() && success()) {
                  <div
                    class="p-4 bg-green-500/20 border border-green-500 rounded-md text-green-300"
                  >
                    Your message has been sent successfully! I'll get back to
                    you soon.
                  </div>
                }

                @if (submitted() && error()) {
                  <div
                    class="p-4 bg-red-500/20 border border-red-500 rounded-md text-red-300"
                  >
                    There was an error sending your message. Please try again
                    later.
                  </div>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactComponent {
  private metaTags = inject(MetaTagsService);
  private fb = inject(NonNullableFormBuilder);
  private firestore = inject(Firestore);

  contactForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    subject: ["", Validators.required],
    message: ["", Validators.required],
  });
  submitted = signal(false);
  loading = signal(false);
  success = signal(false);
  error = signal(false);

  constructor() {
    this.metaTags.updateMetaTags({
      title: "Contact | Munir Issa",
      description:
        "Get in touch with Munir Issa. Contact information and form for project inquiries, questions, or collaboration opportunities.",
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.contactForm.controls;
  }

  async onSubmit() {
    this.contactForm.markAllAsTouched();
    this.submitted.set(true);

    // Stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    this.loading.set(true);

    try {
      // Create a timestamp for the submission
      const submissionData = {
        ...this.contactForm.value,
        timestamp: new Date(),
      };

      // Add the document to the 'contactSubmissions' collection
      const contactCollection = collection(
        this.firestore,
        "contactSubmissions",
      );
      await addDoc(contactCollection, submissionData);

      this.loading.set(false);
      this.success.set(true);
      this.error.set(false);

      // Reset form after successful submission
      this.contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        this.success.set(false);
        this.submitted.set(false);
      }, 5000);
    } catch (err) {
      console.error("Error submitting form:", err);
      this.loading.set(false);
      this.success.set(false);
      this.error.set(true);

      // Hide error message after 5 seconds
      setTimeout(() => {
        this.error.set(false);
      }, 5000);
    }
  }
}
