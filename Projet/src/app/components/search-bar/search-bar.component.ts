import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  search = input<string>('Initial');
  searchChange = output<string>();

  searchButtonClicked = output();

    searchClick(){
      this.searchButtonClicked.emit();
    }


    updateSearch(value: string){
      this.searchChange.emit(value);
    }
}
