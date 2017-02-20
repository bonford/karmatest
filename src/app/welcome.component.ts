import { Component, OnInit } from '@angular/core';
import { UserService } from './model';

@Component({
    selector: 'app-welcome',
    template: '<h3 class="welcome"><i>{{welcome}}</i></h3>' ,
    providers: [UserService]  

})

export class WelcomeComponent implements OnInit {
    welcome = '-- not initialized yet --';
    constructor(private userService: UserService){}
    ngOnInit(): void {
        this.welcome = this.userService.isLoggedIn ? 
        'welcome, ' + this.userService.user.name : 
        'Please log in.';
        console.log(this.userService.isLoggedIn);
    }

}