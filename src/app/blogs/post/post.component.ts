import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {Subscription} from "rxjs";
import {Post} from "../../interfaces/post";
import {Comment} from "../../interfaces/comment";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post | undefined;
  comments: Comment[] = []
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      const id = param.id;
      this.getPost(id)
      this.getComment(id)
    })
  }

  getPost(id: number): Subscription {
    return this.blogService.getPost(id).subscribe(data => {
      this.post = data;
    }, err => {
      console.log(err)
    })
  }
  getComment(id: number): Subscription {
    return this.blogService.getComments(id).subscribe(data => {
      this.comments = data
    }, err => {
      console.log(err)
    })
  }
}
