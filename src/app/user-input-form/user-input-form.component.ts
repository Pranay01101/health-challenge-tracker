import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

interface Workout {
  type: string;
  minutes: number;
}

interface UserWorkout {
  username: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-user-input-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule],
  templateUrl: './user-input-form.component.html',
  styleUrls: ['./user-input-form.component.css']
})
export class UserInputFormComponent {
  username: string = '';
  workouts: Workout[] = [{ type: '', minutes: 0 }];

  workoutTypes = ['Running', 'Cycling', 'Swimming'];

  @Output() userWorkoutAdded = new EventEmitter<UserWorkout>();

  addWorkout() {
    this.workouts.push({ type: '', minutes: 0 });
  }

  onSubmit() {
    if (this.username && this.workouts.every(workout => workout.type && workout.minutes > 0)) {
      this.userWorkoutAdded.emit({ username: this.username, workouts: this.workouts });
      this.username = '';
      this.workouts = [{ type: '', minutes: 0 }];
    }
  }
}
