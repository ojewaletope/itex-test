import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BlogService } from '../services/blog.service';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
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
    getPosts: async function ()  {
      component.blogs = this.blog;
      return this.blog
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'blogs', component: PostsComponent },
        ]),
        HttpClientTestingModule,
      ],
      declarations: [PostsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: BlogService, useValue: blogStubService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement
  });
  describe('getPosts', () => {
    it('should load posts', fakeAsync( () => {
      component.getPosts();
      fixture.detectChanges();
      tick();
      expect(component.blogs).toEqual([])
    }));
  })
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
