import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsIdComponent } from './news-id.component';

describe('NewsIdComponent', () => {
  let component: NewsIdComponent;
  let fixture: ComponentFixture<NewsIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
