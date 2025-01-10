import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NadvarComponent } from '../nadvar/nadvar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NadvarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

}
