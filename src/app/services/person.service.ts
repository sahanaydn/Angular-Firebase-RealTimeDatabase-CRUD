import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {Person} from '../models/person.model'

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private dbPath ='/persons';
  personsRef : AngularFireList<Person>;

  constructor(private db :  AngularFireDatabase) {
    this.personsRef= db.list(this.dbPath);
   }


   getAll (): AngularFireList<Person>{


    return this.personsRef;
   }

   create (person : Person) :  any{

    return this.personsRef.push(person);
   }

   update (key :string , value :  any ) : Promise<void>{

    return this.personsRef.update(key,value);
   }

   delete (key:string) : Promise<void> {

    return this.personsRef.remove(key)
   }

   deleteAll():Promise<void> {

    return this.personsRef.remove()
   }
}
