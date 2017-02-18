import { BannerComponent } from './banner.component';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

describe('BannerComponent (inline template)', () => {
    let comp: BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;
    let de: DebugElement;
    let el: HTMLElement;

beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ BannerComponent ],
    })
    .compileComponents();
}));

   beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    comp = fixture.componentInstance;
})

});