import { TestBed } from '@angular/core/testing';

import { BlogService } from './blog.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClientModule} from '@angular/common/http';
import {environment} from "../../environments/environment";

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService]
    });
    service = TestBed.inject(BlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getPosts', () => {
    let blogService: BlogService;
    let httpTestingController: HttpTestingController
    let mockPost: any;

    beforeEach(() => {
      blogService =TestBed.inject(BlogService);
      httpTestingController = TestBed.inject(HttpTestingController);
      mockPost ={
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }
    });
    it('should get a list of posts',  () => {
      blogService.getPosts().subscribe(post => {
        expect(post).toBeTruthy()
      })
      const request = httpTestingController.expectOne(`${environment.api_url}posts`);
      request.flush(mockPost);
      httpTestingController.verify()
    });
  })
  describe('getPost', () => {
    let blogService: BlogService;
    let httpTestingController: HttpTestingController;
    let id: number;
    let mockPost: any;

    beforeEach(() => {
      blogService = TestBed.inject(BlogService);
      httpTestingController = TestBed.inject(HttpTestingController);
      id = 1
      mockPost ={
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }
    })

    it('should return post by id',  () => {
      blogService.getPost(id).subscribe(data => {
        expect(data).toEqual(mockPost)
      })
      const request = httpTestingController.expectOne(`${environment.api_url}posts/${id}`);
      request.flush(mockPost);
      httpTestingController.verify()
    });
  })

  describe('getComments', () => {
    let blogService: BlogService;
    let httpTestingController: HttpTestingController;
    let id: number;
    let comment: any;
    beforeEach(() => {
      blogService = TestBed.inject(BlogService);
      httpTestingController = TestBed.inject(HttpTestingController);
      id = 1;
      comment =   {
        "postId": 1,
        "id": 1,
        "name": "id labore ex et quam laborum",
        "email": "Eliseo@gardner.biz",
        "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
      }
    })
    it('should return comments on each post', () => {
      blogService.getComments(id).subscribe(comment => {
        expect(comment).toBeTruthy()
      })
      const request = httpTestingController.expectOne(`${environment.api_url}posts/${id}/comments`);
      request.flush(comment);
      httpTestingController.verify()
    });

  })
  describe('addPost', () => {
    let blogService: BlogService;
    let httpTestingController: HttpTestingController;
    let post: any;

    beforeEach(() => {
      blogService = TestBed.inject(BlogService);
      httpTestingController = TestBed.inject(HttpTestingController);
      post = {
        id: 100,
        name: 'test',
        body: 'lorem ipsum dolom, un bu hi kuti nba'
      }
    })
    it('should add post to blog post',  () =>  {
      blogService.addNewPost(post).subscribe(res => {
        expect(res).toEqual(post)
      })
      const request = httpTestingController.expectOne(`${environment.api_url}posts`);
      request.flush(post);
      httpTestingController.verify()
    });
  })
});
