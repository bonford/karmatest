/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { UserService } from './model';

//note: createComponent calls have to be in the "it" blocks, not the beforeEach as in the tutorial
//      createComponent calls in the beforeEach will fail
describe('WelcomeComponent', () => {

    let userService: UserService;
    let de: DebugElement;
    let el: HTMLElement;




    beforeEach(() => {

        let userServiceStub = {
            isLoggedIn: true,
            user: { name: 'Test User;' }
        };

        TestBed.configureTestingModule({
            declarations: [WelcomeComponent],
            providers: [{ provide: UserService, useValue: userServiceStub }]
        });
        TestBed.compileComponents();
    });





    it('should welcome the user', () => {
        const fixture = TestBed.createComponent(WelcomeComponent);
        const app = fixture.debugElement.componentInstance;
        // userService = TestBed.get(UserService);
        userService = fixture.debugElement.injector.get(UserService);

        de = fixture.debugElement.query(By.css('.welcome'));
        el = de.nativeElement;


        fixture.detectChanges();
        const content = el.textContent;
        console.log(content);
        expect(content).toContain('welcome', '"Welcome ..."');
        expect(content).toContain('Test User', 'expected name');

    });
/*
    it('should welcome "Bubba"', () => {
        const fixture = TestBed.createComponent(WelcomeComponent);
        userService = fixture.debugElement.injector.get(UserService);
        de = fixture.debugElement.query(By.css('.welcome'));
        el = de.nativeElement;
        userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
        fixture.detectChanges();
        expect(el.textContent).toContain('Bubba');
        console.log('should welcome Bubba:', el.textContent);
    });

*/

    it('should request login if not logged in', () => {
        const fixture = TestBed.createComponent(WelcomeComponent);
        userService = fixture.debugElement.injector.get(UserService);
        de = fixture.debugElement.query(By.css('.welcome'));
        el = de.nativeElement;
        userService.isLoggedIn = false; // welcome message hasn't been shown yet
        fixture.detectChanges();
        const content = el.textContent;
        expect(content).not.toContain('Welcome', 'not welcomed');
        expect(content).toMatch(/log in/i, '"log in"');
    });


});
