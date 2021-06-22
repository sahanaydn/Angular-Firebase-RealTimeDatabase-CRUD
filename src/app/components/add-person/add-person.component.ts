import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  createPerson = new FormGroup({

  fullName : new FormControl('',[Validators.required,Validators.minLength(6)]),
  email :  new FormControl('',[Validators.required,Validators.email]),
  age :  new FormControl('',[Validators.required,Validators.max(100),Validators.min(18), Validators.pattern("^[0-9]*$")])
  })





  person :Person =new Person();
  submitted : boolean =false;

  constructor( private personService : PersonService) {
   
   }

  ngOnInit(): void {
  }

  savePerson () : void {

    this.personService.create(this.person).then(()=>{
      console.log('yeni item başarılı bir şekilde oluşturuldu');
      this.submitted=true;
      
    });
  }
  newPerson():void {


    this.submitted=false;
    this.person = new Person();
  }

}
