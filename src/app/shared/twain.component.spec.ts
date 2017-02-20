import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { TwainComponent } from './twain.component';
import { TwainService } from './twain.service';

//note: createComponent calls have to be in the "it" blocks, not the beforeEach as in the tutorial
//      createComponent calls in the beforeEach will fail
describe('TwainComponent', () => {

    let twainService: TwainService;
    let de: DebugElement;
    let el: HTMLElement;
    let spy: jasmine.Spy;
    const testQuote = 'Test Quote';




    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TwainComponent],
            providers: [TwainService]
        });
        TestBed.compileComponents();

        
    });





    it('should not show quote before OnInit', () => {
        const fixture = TestBed.createComponent(TwainComponent);
        const app = fixture.debugElement.componentInstance;
        twainService = fixture.debugElement.injector.get(TwainService);
        de = fixture.debugElement.query(By.css('.twain'));
        el = de.nativeElement;
        spy = spyOn(twainService, 'getQuote')
            .and.returnValue(Promise.resolve(testQuote));

        expect(el.textContent).toBe('', 'nothing displayed');
        expect(spy.calls.any()).toBe(false, 'getQuote not yet called');

    });

    it('should still not show quote after component initialized', () => {
        const fixture = TestBed.createComponent(TwainComponent);
        const app = fixture.debugElement.componentInstance;
        twainService = fixture.debugElement.injector.get(TwainService);
        de = fixture.debugElement.query(By.css('.twain'));
        el = de.nativeElement;
        spy = spyOn(twainService, 'getQuote')
            .and.returnValue(Promise.resolve(testQuote));

        fixture.detectChanges();
        // getQuote service is async => still has not returned with quote
        expect(el.textContent).toBe('...', 'no quote yet');
        expect(spy.calls.any()).toBe(true, 'getQuote called');
    });


    it('should show quote after getQuote promise (async)', async(() => {
        const fixture = TestBed.createComponent(TwainComponent);
        const app = fixture.debugElement.componentInstance;
        twainService = fixture.debugElement.injector.get(TwainService);
        de = fixture.debugElement.query(By.css('.twain'));
        el = de.nativeElement;
        spy = spyOn(twainService, 'getQuote')
            .and.returnValue(Promise.resolve(testQuote));

        fixture.detectChanges();
        fixture.whenStable().then(() => { // wait for async getQuote
            fixture.detectChanges();        // update view with quote
            expect(el.textContent).toBe(testQuote);
        });
    }));

    it('should show quote after getQuote promise (fakeAsync)', fakeAsync(() => {
        const fixture = TestBed.createComponent(TwainComponent);
        const app = fixture.debugElement.componentInstance;
        twainService = fixture.debugElement.injector.get(TwainService);
        de = fixture.debugElement.query(By.css('.twain'));
        el = de.nativeElement;
        spy = spyOn(twainService, 'getQuote')
            .and.returnValue(Promise.resolve(testQuote));

        fixture.detectChanges();
        tick();                  // wait for async getQuote
        fixture.detectChanges(); // update view with quote
        expect(el.textContent).toBe(testQuote);
    }));



});
