import {
  Component,
  ElementRef,
  EventEmitter, Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BlogService } from '../../services/blog.service';

interface IResponse {
  type: string;
  message: string;
  data: null
}

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  newPost: FormGroup;
  loading: boolean = false;

  response!: IResponse;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService
  ) {
    this.newPost = this.formBuilder.group({
      name: [''],
      email: [''],
      body: [''],
    });
  }

  ngOnInit(): void {}

  addNewPost(newPost: any) {
    const payload = newPost.value;
    if (!payload.name) {
       this.response = {
        type: 'error',
        message: 'Name is required',
         data: null
      }
      return this.closeModal.emit({closeModal: true, value: this.response})
    }
    if (!payload.email) {
      this.response = {
        type: 'error',
        message: 'Email is required',
        data: null
      }
      return this.closeModal.emit({closeModal: true, value: this.response})
    }
    if (!payload.body) {
      this.response = {
        type: 'error',
        message: 'Comment is required',
        data: null
      }
      return this.closeModal.emit({closeModal: true, value: this.response})
    }
    this.loading = true;
    return this.blogService.addNewPost(payload).subscribe(
      (res) => {
        this.loading = false;
        this.response = {
          type: 'Success',
          message: 'Post added successfully',
          data: res
        }
        this.closeModal.emit({ closeModal: true, value: this.response });
        newPost.reset();
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );
  }
}
