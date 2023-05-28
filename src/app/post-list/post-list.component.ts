import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { PostsService } from "../shared/services/posts/posts.service";

@Component({
  selector: "post-list",
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"],
})
export class PostListComponent {
  @Input() post: any;
  postService = inject(PostsService);
  hidden: boolean = true;
  postForm: FormGroup;
  public isChecked: any;

  constructor() {
    this.postForm = new FormGroup({
      name: new FormControl(this.post?.name),
      email: new FormControl(this.post?.email),
      role: new FormControl(this.post?.role),
    });
  }
  ngOnInit() {
    this.postService.getCheckedValues().subscribe((data) => {
      this.isChecked =
        this.post.id === data.find((o: any) => o === this.post.id);
    });
  }
  onChecked() {
    this.postService.onChecked(this.post.id);
  }

  deletePost(id: any) {
    this.postService.deletePost(id);
  }
  editPost() {
    this.postService.editPost(this.post);
    this.closeModal();
  }
  openModal(id: any) {
    this.hidden = false;
  }
  closeModal() {
    this.hidden = true;
  }
}
