import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { PostComponent } from './post.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DebugElement} from "@angular/core";

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let rootElement: DebugElement;
  const blogStubService = {
    blog: {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body:
        'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    },

    getPost: async function() {
      component.post = this.post;
      return this.post
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ PostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('getPost', () => {
    it('should load a single post', fakeAsync(() => {
      component.getPost(1);
      fixture.detectChanges();
      tick()
      expect(component.post).toBeNull()
    }));
  });
  describe('getComment', () => {
    it('should load comments for a post', fakeAsync(() =>{
      component.getComment(1);
      fixture.detectChanges();
      tick();
      expect(component.comments).toEqual([])
    }));
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
