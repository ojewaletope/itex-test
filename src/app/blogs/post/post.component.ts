import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Subscription } from 'rxjs';
import { Post } from '../../interfaces/post';
import { Comment } from '../../interfaces/comment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post: Post;
  comments: Comment[] = [];
  @ViewChild('myModal', { static: false })
  modal!: ElementRef;
  @ViewChild('responseModal', { static: false })
  responseModal!: ElementRef;
  getNewPost: EventEmitter<any> = new EventEmitter();
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      const id = param.id;
      this.getPost(id);
      this.getComment(id);
    });
  }

  getPost(id: number): Subscription {
    return this.blogService.getPost(id).subscribe(
      (data) => {
        this.post = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getComment(id: number): Subscription {
    return this.blogService.getComments(id).subscribe(
      (data) => {
        this.comments = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close(res: any) {
    console.log(res);
    if (res.closeModal) {
      this.comments.push(res.value);
      console.log(this.comments);
      this.responseModal.nativeElement.style.display = 'block';
    }
    this.modal.nativeElement.style.display = 'none';
  }

  closeModal($event: MouseEvent) {
    this.responseModal.nativeElement.style.display = 'none';
  }
}
