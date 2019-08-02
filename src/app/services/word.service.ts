import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Word } from '../models/word.model';

@Injectable()
export class WordService {
  private dbPath = '/words';
  wordsRef: AngularFireList<any> = null;
  selectedWord: Word;

  constructor(private db: AngularFireDatabase) {
    this.wordsRef = db.list(this.dbPath);
  }

  createWord(word: Word): void {
    this.wordsRef.push(
      {
        word: word.word,
        translation: word.translation
      }
      );
  }

  updateWord(word: Word): void {
    this.wordsRef.update(word.key, {
      word: word.word,
      translation: word.translation
    }).catch(error => this.handleError(error));
  }

  deleteWord($key: string): void {
    this.wordsRef.remove($key).catch(error => this.handleError(error));
  }
  getWordsList(): AngularFireList<Word> {
    return this.wordsRef;
  }

  private handleError(error) {
    console.log(error);
  }
}
