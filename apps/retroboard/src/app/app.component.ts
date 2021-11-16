import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@retro-board/api-interfaces';

@Component({
  selector: 'retro-board-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public appTitle!: string;
  hello$ = this.http.get<Message>('/api/hello');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.hello$.subscribe((data) => {
      this.appTitle = data.message;
    });
  }
}
