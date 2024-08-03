import { Injectable } from '@angular/core';

interface Workout {
  type: string;
  minutes: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workouts: Workout[] = [];

  saveWorkout(workout: Workout): void {
    this.workouts.push(workout);
  }

  getWorkouts(): Workout[] {
    return this.workouts;
  }

  clearWorkouts(): void {
    this.workouts = [];
  }
}
