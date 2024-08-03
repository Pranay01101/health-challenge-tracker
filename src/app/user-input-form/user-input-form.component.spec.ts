import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInputFormComponent } from './user-input-form.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { By } from '@angular/platform-browser';

describe('UserInputFormComponent', () => {
  let component: UserInputFormComponent;
  let fixture: ComponentFixture<UserInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        UserInputFormComponent 
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add a workout when the form is submitted', () => {
    spyOn(component.userWorkoutAdded, 'emit'); // Spy on the emit method

    // Set form values and submit
    component.workouts = [{ type: 'Running', minutes: 30 }];
    fixture.detectChanges();

    // Trigger form submission
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    submitButton.triggerEventHandler('click', null);

    // Verify that emit was called with correct parameters
    expect(component.userWorkoutAdded.emit).toHaveBeenCalledWith(jasmine.objectContaining({
      type: 'Running',
      minutes: 30
    }));
  });
});
