import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  persons ? : Person[];
  currentPerson ? : Person ; 
  currentIndex = -1;
  title = ''

  constructor(private personService : PersonService) { }

  ngOnInit(): void {
    this.retrievePerson();
  }

  refreshList(): void {
    this.currentPerson = undefined;
    this.currentIndex = -1;
    this.retrievePerson();
  }


  retrievePerson(): void {
    this.personService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.persons = data;
    });
  }


  setActivePerson(person: Person, index: number): void {
    this.currentPerson = person;
    this.currentIndex = index;
  }

  removeAllPersons(): void {
    this.personService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

}
