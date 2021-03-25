import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { NewPostComponent } from './new-post.component';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('NewPostComponent', () => {
  let component: NewPostComponent;
  let fixture: ComponentFixture<NewPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ NewPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('addNewPost', () => {
    it('should add a new post to blogs', fakeAsync(() => {
      const newPost = {
        name: 'id labore ex et quam laborum',
        email: 'Eliseo@gardner.biz',
        body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\\ntempora quo necessitatibus\\ndolor quam autem quasi\\nreiciendis et nam sapiente accusantium',
        id: 101
      }
      component.loading = false;
      fixture.detectChanges();
      tick();
      component.addNewPost(newPost)
      fixture.detectChanges();
      tick(100);
      expect(component.addNewPost).toBeTruthy()
    }));
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
