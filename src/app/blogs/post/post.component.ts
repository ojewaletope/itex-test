import {
  Component,
  ElementRef,
  EventEmitter, OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Subscription } from 'rxjs';
import { Post } from '../../interfaces/post';
import { Comment } from '../../interfaces/comment';

interface IResponse {
  type: string;
  message: string;
  data: null
}
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy {
  post: Post;
  comments: Comment[] = [];
  @ViewChild('myModal', { static: false })
  modal!: ElementRef;
  @ViewChild('responseModal', { static: false })
  responseModal!: ElementRef;
  postId: number
 response: IResponse
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.postId = param.id;
      this.getPost(this.postId);
      this.getComment(this.postId);
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
    this.response = res.value
    if (res.closeModal) {
      if (res.value.data != null) {
        this.comments.unshift(res.value.data);
        this.responseModal.nativeElement.style.display = 'none';
      } else {
        this.responseModal.nativeElement.style.display = 'block';
      }
    }
    if (res.type === 'click') {
      this.modal.nativeElement.style.display = 'none';
    }
    if (res.value?.data != null) {
      this.modal.nativeElement.style.display = 'none';
    }
  }

  closeModal($event: MouseEvent) {
    this.responseModal.nativeElement.style.display = 'none';
  }
  ngOnDestroy(): void {
    this.getPost(this.postId).unsubscribe()
  }
}
