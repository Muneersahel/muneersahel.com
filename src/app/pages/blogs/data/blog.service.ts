import { Blog } from "@/core/blog-interface";
import { inject, Injectable } from "@angular/core";
import {
  collection,
  collectionData,
  Firestore,
  orderBy,
  query,
  where,
} from "@angular/fire/firestore";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BlogService {
  private firestore = inject(Firestore);

  getBlogs(): Observable<Blog[]> {
    const blogsCol = collection(this.firestore, "blogs");
    const blogsQuery = query(blogsCol, orderBy("num", "asc"));

    return collectionData(blogsQuery).pipe(map((blogs) => blogs as Blog[]));
  }

  getBlog(slug: string): Observable<Blog | null> {
    const blogsCol = collection(this.firestore, "blogs");
    const blogQuery = query(blogsCol, where("slug", "==", slug));

    return collectionData(blogQuery).pipe(
      map((blogs) => {
        const blogList = blogs as Blog[];
        return blogList.length > 0 ? blogList[0] : null;
      }),
    );
  }

  getMarkdown(slug: string): Observable<string> {
    return this.getBlog(slug).pipe(map((blog) => blog?.content || ""));
  }
}
