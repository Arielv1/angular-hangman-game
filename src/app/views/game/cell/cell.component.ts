import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss'
})
export class CellComponent {
  
  letterToGuess = input.required<string>();
  isLetterToShow = input.required<boolean>();
}
