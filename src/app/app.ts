import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from './header/header';
import { RouterOutlet } from '@angular/router';
import { Processing } from './processing/processing';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Header, RouterOutlet, Processing],
})
export class App {

}
