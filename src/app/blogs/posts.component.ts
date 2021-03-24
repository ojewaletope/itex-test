import { Component, OnInit } from '@angular/core';
import {BlogService} from "../services/blog.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-blogs',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  blogs: any[] = [];
  p: number = 1;
  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.getPosts()
  }
  getPosts():Subscription {
    return this.blogService.getPosts().subscribe(data => {
      this.blogs = data;
    }, err => {
      console.log(err)
    })
  }

  openPost(id: number) {
    this.router.navigate(['/blogs/post'], {
      queryParams: {
        id: id
      }
    })
  }
}
