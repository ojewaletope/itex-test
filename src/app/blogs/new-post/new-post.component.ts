import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BlogService} from "../../services/blog.service";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  newPost: FormGroup;
  loading: boolean = false;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>()
  constructor(private formBuilder: FormBuilder, private blogService: BlogService) {

  }

  ngOnInit(): void {
    this.initialiseForm()
  }

initialiseForm() {
  this.newPost = this.formBuilder.group({
    name: [''],
    email: [''],
    body: ['']
  })
}
  addNewPost(newPost: FormGroup) {
    const payload = newPost.value;
    this.loading = true
    return this.blogService.addNewPost(payload).subscribe(res => {
      this.loading = false
     this.closeModal.emit({closeModal: true, value: res});
      this.initialiseForm()
    }, err => {
      this.loading = false
      console.log(err)
    })
  }
}
