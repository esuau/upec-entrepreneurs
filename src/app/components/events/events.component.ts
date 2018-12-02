import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  title: string;

  events: Event[];

  rows: number[];

  constructor( private _router: Router, private _service: EventService ) {
    this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.title = this.getTitle(this._router.url);
        }
    });
  }

  ngOnInit() {
    this._service.getEvents().subscribe((data: Event[]) => {
      this.events = data;
      this.rows = this.getRows(this.events.length);
    });
  }

  private getTitle(url: string): string {
    let title = 'Évènements ';
    switch (url) {
      case '/events/upcoming':
        return title += 'à venir';
      case '/events/past':
        return title += 'passés';
      default:
        return title;
    }
  }

  private getRows(collectionLength: number): number[] {
    return Array.from(Array(Math.ceil(collectionLength / 2)).keys());
  }

}
