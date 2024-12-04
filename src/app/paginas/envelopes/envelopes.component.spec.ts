import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvelopesComponent } from './envelopes.component';

describe('EnvelopesComponent', () => {
  let component: EnvelopesComponent;
  let fixture: ComponentFixture<EnvelopesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvelopesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvelopesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
