import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const token_key = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);


  constructor(private storag: Storage, private plt: Platform) {
    this.plt.ready().then(()=> {
      this.checkToken();
    });
   }

  
  login(){

    return this.storag.set(token_key, 'what1234').then(res => {
      this.authenticationState.next(true);
    });

  }

  logout(){
    return this.storag.remove(token_key).then(res => {
      this.authenticationState.next(false);
    });


  }

  isAuthenticated(){

    return this.authenticationState.value;

  }
  

  checkToken(){

    return this.storag.set(token_key, 'what1234').then(res => {
      if(res){
        this.authenticationState.next(true);
      }
    });

  }
}
