import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinsListComponent } from './bins-list.component';

describe('BinsListComponent', () => {
  let component: BinsListComponent;
  let fixture: ComponentFixture<BinsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BinsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BinsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
