import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/services/word.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Word } from 'src/app/models/word.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [WordService]
})
export class QuizComponent implements OnInit {
  words: Word[];
  quizForm: FormGroup;
  quizArray: FormArray;
  showLoad = false;
  resultsShow = false;
  results = [];
  selectedAnswerKey: string;
  resultsArray = [];

  constructor(private wordService: WordService) {
  }

  ngOnInit() {
    this.quizArray = new FormArray([]);
    this.quizForm = new FormGroup({
      'key': new FormControl(null),
      'currentWord': new FormControl(null),
      'translations': new FormArray([])
    });
    this.showLoad = true;
    this.getWords();
  }

  getWords() {
    this.wordService.getWordsList().snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(words => {
      this.words = words;
      while(this.quizArray.length < 6) {
        const randomNum = Math.floor(Math.random() * (this.words.length));
        let tmp = this.words[randomNum];
        let tmpArray = [];
        if ( this.quizArray.controls.find( x => x.value.key === tmp.key) ) { continue; }
        tmpArray.push(tmp);
        let tmpArrayCp = Array.from(this.words);
        tmpArrayCp.splice(randomNum, 1);
        tmpArray = tmpArray.concat(
          tmpArrayCp.sort(this.rand).slice(0, 5)
        );
        this.quizArray.push(this.createForm(tmp.key, tmp.word, tmpArray.sort(this.rand)) as FormGroup);
      }
    });
    this.showLoad = false;
  }

  rand() {
    return Math.random() - 0.5;
  }

  createForm(curKey: string, curWord: string, translationWords: any) {
    const quizFormTranslations = new FormArray([]);
    for (const tr of translationWords) {
      quizFormTranslations.push(
        new FormGroup({
          trKey: new FormControl(tr.key),
          trTranslation: new FormControl(tr.translation)
        })
      );
    }
    return new FormGroup(
      {
        'key': new FormControl(curKey),
        'currentWord': new FormControl(curWord),
        'translations': quizFormTranslations
      }
    );
  }

  patchResult(value) {
    this.selectedAnswerKey = value;
  }

  getWordObjectByKey(key: string) {
    return this.words.find(k => k.key === key);
  }

  stepNext(form: FormGroup) {
    if (this.selectedAnswerKey !== null) {
      this.results.push({
        currentWordKey: form.get('key').value,
        currentAnswerKey: this.selectedAnswerKey
      });
    }
  }

  checkResults() {
    this.resultsShow = true;
    this.results.map(result => {
      this.resultsArray.push(
        {
          questionWord: this.getWordObjectByKey(result.currentWordKey).word,
          questionWordTranslation: this.getWordObjectByKey(result.currentWordKey).translation,
          answerWord: this.getWordObjectByKey(result.currentAnswerKey).word,
          answerWordTranslation: this.getWordObjectByKey(result.currentAnswerKey).translation
        }
        );
    });
  }
}
