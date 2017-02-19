import { Component, OnInit } from '@angular/core';
import { UserServiceStub } from './model';

@Component({
    selector: 'app-welcome',
    template: '<h3 class="wlecome"><i>{{welcome}}</i></h3>'

})

export class WelcomeComponent implements OnInit {
    welcome = '-- not initialized yet --';
    constructor(private userService: UserServiceStub){}
    ngOnInit(): void {
        this.welcome = this.userService.isLoggedIn ? 
        'welcome, ' + this.userService.user.name : 
        'Please log in.';
    }

}