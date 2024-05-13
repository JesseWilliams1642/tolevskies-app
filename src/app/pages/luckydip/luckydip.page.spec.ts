import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuckydipPage } from './luckydip.page';

describe('LuckydipPage', () => {
  let component: LuckydipPage;
  let fixture: ComponentFixture<LuckydipPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LuckydipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
