import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BlogService} from "../../services/blog.service";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  @ViewChild('myModal', {static: false})
  modal!: ElementRef;
  newPost: FormGroup;
  loading: boolean = false
  constructor(private formBuilder: FormBuilder, private blogService: BlogService) {
    this.newPost = formBuilder.group({
      name: [''],
      email: [''],
      body: ['']
    })
  }

  ngOnInit(): void {
  }

  open() {
    console.log('open')
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }

  addNewPost(newPost: FormGroup) {
    const payload = newPost.value;
    this.loading = true
    return this.blogService.addNewPost(payload).subscribe(res => {
      this.loading = false
      console.log(res)
    }, err => {
      this.loading = false
      console.log(err)
    })
  }
}
