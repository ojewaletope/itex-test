import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import {PostsComponent} from "./posts.component";
import {NgxPaginationModule} from "ngx-pagination";
import { PostComponent } from './post/post.component';
import { NewPostComponent } from './new-post/new-post.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [PostsComponent, PostComponent, NewPostComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class PostsModule { }
