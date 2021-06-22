import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';
@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit,OnChanges {

@Input() person?: Person;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentPerson: Person = {
    fullName: '',
    email: '',
    age : 0,
  
  };
  message = '';

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentPerson = { ...this.person };
  }

  

  updatePerson(): void {
    const data = {
      fullName: this.currentPerson.fullName,
      email: this.currentPerson.email,
      age : this.currentPerson.age
    };

    if (this.currentPerson.key) {
      this.personService.update(this.currentPerson.key, data)
        .then(() => this.message = 'The tutorial was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deletePerson(): void {
    if (this.currentPerson.key) {
      this.personService.delete(this.currentPerson.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }

}
