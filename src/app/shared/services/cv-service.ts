import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CvService {
  readonly downloadUrl = signal(
    "https://drive.google.com/file/d/100qbVNvjZSSs8S-rhb8OOdT9FCmPIYba/view?usp=sharing",
  );
}
