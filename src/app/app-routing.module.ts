import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VocabularyComponent } from './components/vocabulary/vocabulary.component';
import { QuizComponent } from './components/quiz/quiz.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vocabulary', component: VocabularyComponent },
  { path: 'quiz', component: QuizComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
