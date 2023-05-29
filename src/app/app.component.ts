import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { PostListComponent } from "./post-list/post-list.component";
import { SearchBoxComponent } from "./search-box/search-box.component";
import { FilterPipe } from "./shared/pipe/filter.pipe";
import { PostsService } from "./shared/services/posts/posts.service";
import { SearchService } from "./shared/services/search/search.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PostListComponent,
    SearchBoxComponent,
    NgxPaginationModule,
    FilterPipe,
  ],
  templateUrl: "./app.component.html",
  styles: [
    `
      .header {
        margin-block: 16px;
        font-size: 18px;
        padding-block: 16px;
        font-weight: 600;
        box-shadow: var(--box-shadow);
      }
      .my-pagination ::ng-deep .ngx-pagination .current {
        background: black;
        color: white;
        font-size: 18px;
        font-weight: 600;
      }
      .my-pagination ::ng-deep .ngx-pagination .pagination-next {
        font-size: 24px;
        font-weight: 600;
      }
      .my-pagination ::ng-deep .ngx-pagination .pagination-previous {
        font-size: 24px;
        font-weight: 600;
      }
      .my-pagination ::ng-deep .ngx-pagination {
        margin-left: 5.5rem;
      }
      .container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        gap: 0px 0px;
        grid-template-areas: ". . .";
      }
      .select-all {
        margin-block: 0;
        margin-left: 1rem;
      }
    `,
  ],
})
export class AppComponent {
  title = "angularAdminUI";
  postService = inject(PostsService);
  searchService = inject(SearchService);
  cdr = inject(ChangeDetectorRef);
  posts$: any;
  post: any;
  name = "";
  p: number = 1;
  maxSize: number = 3;
  isChecked: boolean = false;

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data: any) => {
      this.posts$ = data;
    });

    this.searchService.getSearchObservable().subscribe((data: any) => {
      this.name = data;
    });
  }
  deletePosts() {
    this.postService.deletePosts();
  }
  onMultipleChecked() {
    const page = this.p - 1;
    for (let i = 0; i < 10; i++) {
      const index = page * 10 + i;
      this.postService.onChecked(this.posts$[index].id);
    }
  }
}
