import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private dataBaseStore : AngularFirestore) { }

  getAllUsers(){
    return this.dataBaseStore.collection('users', user=>user.orderBy('name')).valueChanges({idField: 'firebaseId'}) as Observable <any[]>
  }


 
  addUser(user: User) {
    const userWithTimestamp = {
      ...user,
      createdAt: Timestamp.now() 
    };

    return this.dataBaseStore.collection('users').add(userWithTimestamp);
  }

  update(userId:string, user: User){
    return this.dataBaseStore.collection('users').doc(userId).update(user)
  }

  deleteUser(userId: string){
    return this.dataBaseStore.collection('users').doc(userId).delete()
  }

  getUsersCount(): Observable<number> {
    return this.dataBaseStore.collection('users').valueChanges().pipe(
      map(users => users.length) 
    );
  }

  getPlansCount(): Observable<number> {
    return this.dataBaseStore.collection<User>('users').valueChanges().pipe(
      map((users: User[]) => users.filter(user => user.healthPlan || user.dentalPlan).length)
    );
  }

  getLastUser() {
    return this.dataBaseStore.collection('users', ref => 
      ref.orderBy('createdAt', 'desc').limit(5)
    ).snapshotChanges();
  }
  
  
  
}
