import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BlogService} from "../services/blog.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {NewPostComponent} from "./new-post/new-post.component";

@Component({
  selector: 'app-blogs',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  blogs: any[] = [];
  p: number = 1;
  @ViewChild('myModal', {static: false})
  modal!: ElementRef;
  @ViewChild('responseModal', {static: false})
  responseModal!: ElementRef;
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
  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close(res: any) {
    if (res.closeModal) {
      this.responseModal.nativeElement.style.display = 'block'
    }
    this.modal.nativeElement.style.display = 'none';
  }

  closeModal($event: MouseEvent) {
    this.responseModal.nativeElement.style.display = 'none'
  }
}
