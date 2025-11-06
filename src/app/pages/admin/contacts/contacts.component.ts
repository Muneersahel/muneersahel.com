import { DatePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from "@angular/core";
import {
  collection,
  collectionData,
  doc,
  Firestore,
  updateDoc,
} from "@angular/fire/firestore";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideCheck, lucideMail } from "@ng-icons/lucide";
import { HlmButton } from "@spartan-ng/helm/button";
import { HlmCard } from "@spartan-ng/helm/card";

interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp?: any;
  is_read?: boolean;
}

@Component({
  selector: "app-admin-contacts",
  standalone: true,
  imports: [DatePipe, HlmCard, HlmButton, NgIcon],
  providers: [provideIcons({ lucideMail, lucideCheck })],
  styles: [
    `
      .enter-animation {
        animation: slide-fade 360ms cubic-bezier(0.2, 0.8, 0.2, 1);
      }

      @keyframes slide-fade {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
  template: `
    <section class="p-6">
      <h2 class="text-2xl font-semibold mb-4">Contact Submissions</h2>

      <div class="space-y-4">
        @for (item of submissions(); track item.id) {
          <div
            hlmCard
            [animate.enter]="'enter-animation'"
            class="p-4 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div class="flex-1">
              <div class="font-semibold flex items-center gap-3">
                <ng-icon hlm name="lucideMail" class="w-5 h-5 text-black/40" />
                {{ item.name }}
                <span class="text-sm text-black/40"> — {{ item.email }} </span>
              </div>
              <div class="text-sm text-black/40">
                {{ item.subject || "No subject" }}
              </div>

              <p class="mt-3 text-sm whitespace-pre-line max-w-xl">
                {{ item.message }}
              </p>
              <div class="text-xs text-black/40 mt-2">
                {{ item.timestamp | date: "medium" }}
              </div>
            </div>

            <div class="mt-4 md:mt-0 md:ml-4 flex items-center gap-2">
              @if (!item.is_read) {
                <button
                  hlmBtn
                  size="default"
                  class="flex items-center gap-2"
                  (click)="markRead(item)"
                >
                  <ng-icon hlm name="lucideCheck" />
                  <span>Mark as read</span>
                </button>
              } @else {
                <div class="text-sm text-black/40">Read</div>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminContactsComponent {
  readonly #firestore = inject(Firestore);
  readonly #destroyRef = inject(DestroyRef);

  submissions = signal<ContactSubmission[]>([]);

  constructor() {
    const col = collection(this.#firestore, "contactSubmissions") as any;
    const sub = collectionData<ContactSubmission, "id">(col, {
      idField: "id",
    }).subscribe((docs) => {
      const normalized = (docs || [])
        .map((d) => ({
          ...d,
          message: d.message ? d.message.replace(/^"+|"+$/g, "") : d.message,
          timestamp:
            d?.timestamp && typeof d?.timestamp?.toDate === "function"
              ? d.timestamp.toDate()
              : d?.timestamp,
        }))
        .sort((a, b) => {
          const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
          const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
          return dateB - dateA;
        });
      this.submissions.set(normalized);
    });

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  async markRead(item: ContactSubmission) {
    if (!item.id) return;
    const d = doc(this.#firestore, `contactSubmissions/${item.id}`);
    await updateDoc(d, { is_read: true });
  }
}
