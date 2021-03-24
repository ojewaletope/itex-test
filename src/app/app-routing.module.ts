import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LandingComponent} from "./core/landing/landing.component";
import {PostsComponent} from "./blogs/posts.component";

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'blogs',
    loadChildren: () => import('./blogs/posts.module').then(m => m.PostsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
