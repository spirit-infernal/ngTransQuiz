import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WordService } from '../../services/word.service';
import { Word } from '../../models/word.model';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss'],
  providers: [WordService]
})
export class VocabularyComponent implements OnInit {
  @ViewChild('wordForm', {static: true}) wForm: NgForm;
  @Input() word: Word;
  words: Word[];
  submitted = false;
  selectedWord: Word = {
    key: null,
    word: '',
    translation: ''
  };
  constructor(private wordService: WordService) {
  }

  ngOnInit() {
    this.resetForm();
    this.wordService.getWordsList().snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    }).subscribe(words => {
      this.words = words;
    });
  }
  onSubmit() {
    console.log(this.wForm);
    if (this.wForm.value.key === null || this.wForm.value.key === undefined ) {
      this.wordService.createWord(this.wForm.value);
      this.resetForm();
    } else {
      this.wordService.updateWord(this.wForm.value);
      this.resetForm();
    }
  }
  editWord(wrd: Word) {
    this.wordService.selectedWord = Object.assign({}, wrd);
    this.selectedWord = this.wordService.selectedWord;
    console.log(this.selectedWord);
  }
  deleteWord(key: string) {
    this.wordService.deleteWord(key);
  }
  resetForm() {
    if (this.wForm != null) {
      this.wForm.reset();
    }
  }
}
