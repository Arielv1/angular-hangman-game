import { Component, computed, ElementRef, OnInit, signal, Signal, viewChild, WritableSignal } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';
import GameWords from '../../constants/words.json'
import { CellComponent } from "./cell/cell.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MaterialModule, CellComponent, FormsModule, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  
  readonly isGameOver = computed(() => this.hitCounter() === this.wordToGuess().length || this.remainingGuesses() === 0);
  readonly hasPlayerWon = computed(() => this.isGameOver() && this.remainingGuesses() !== 0)
  readonly wordToGuess = signal<string>('');
  readonly userGuesses = signal<string[]>([]);
  readonly hitCounter = signal(0);
  readonly remainingGuesses = signal(10);
  private readonly acceptedLetter = new RegExp('[A-Z]');
  letterGuess = '';
  constructor() {

  }

  ngOnInit(): void {
    this.newGame();
    console.log();
    
  }

  newGame() {
    this.generateNewWordToGuess();
  }

  generateNewWordToGuess() {
    let index: number = Math.floor(Math.random() * GameWords.words.length);
    let selectedWord: string = GameWords.words[index].toUpperCase();
    this.wordToGuess.set(selectedWord);
    this.userGuesses.set([]);
    this.hitCounter.set(0);
    this.remainingGuesses.set(10);
  }

  enterUserGuess(guess: string) {
    this.letterGuess = ''
    if(!this.acceptedLetter.test(guess)) {
      return;
    }
    if(this.userGuesses().includes(guess)) {
      return;
    }
    this.remainingGuesses.update(remainingGuesses => remainingGuesses - 1);
    this.userGuesses.update(guesses => [...guesses, guess]);
    this.hitCounter.update(counter => {
      let incrementAmount = this.howManyCharsOccurInString(guess);
      return counter + incrementAmount;
    });
  }

  private howManyCharsOccurInString(char: string): number {
    let counter = 0;
    for(let ch of this.wordToGuess()) {
      if(ch === char) counter++;
    }
    return counter;
  }

  getUserGuesses() {
    return this.userGuesses().join(', ')
  }

}
