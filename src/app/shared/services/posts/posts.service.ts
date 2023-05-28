import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "./posts.model";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  http = inject(HttpClient);
  private postsObservable = new Subject<any>();
  private checkedValuesObservable = new Subject<any>();
  posts: any;
  checkedValues: number[] = [];
  getPosts() {
    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    this.http.get(url).subscribe((data) => {
      this.posts = data;
      this.postsObservable.next(this.posts);
    });
    return this.postsObservable.asObservable();
  }
  deletePost(postId: any): void {
    this.posts = this.posts
      .filter((post: any) => post.id !== postId)
      .sort((a: any, b: any) => a.id - b.id);
    this.postsObservable.next(this.posts);
  }

  editPost(newPost: any) {
    this.posts = this.posts.filter((post: any) => post.id !== newPost.id);
    const editedPosts = [...this.posts, newPost].sort(
      (a: any, b: any) => a.id - b.id
    );
    this.postsObservable.next(editedPosts);
  }

  deletePosts() {
    const filteredPosts = this.posts.filter(
      (post: any) =>
        post.id !== this.checkedValues.find((value) => value === post.id)
    );
    const sortedPosts = filteredPosts.sort((a: any, b: any) => a.id - b.id);
    this.posts = sortedPosts;
    this.clearCheckedValues();
    this.postsObservable.next(this.posts);
  }
  onChecked(value: number) {
    let i = this.checkedValues.indexOf(value);
    if (i > -1) this.checkedValues.splice(i, 1);
    else this.checkedValues.push(value);
    this.checkedValuesObservable.next(this.checkedValues);
  }

  getCheckedValues() {
    return this.checkedValuesObservable.asObservable();
  }
  clearCheckedValues() {
    this.checkedValues = [];
  }
}
