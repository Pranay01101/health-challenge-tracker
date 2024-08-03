import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserInputFormComponent } from './user-input-form/user-input-form.component';

interface Workout {
  type: string;
  minutes: number;
}

interface UserWorkout {
  username: string;
  workouts: Workout[];
}

interface AggregatedWorkout {
  username: string;
  types: string[];
  numberOfWorkouts: number;
  totalMinutes: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, UserInputFormComponent]
})
export class AppComponent implements OnInit {
  title = 'my-angular-app';
  userWorkouts: UserWorkout[] = [];
  displayedColumns: string[] = ['username', 'types', 'numberOfWorkouts', 'totalMinutes'];
  currentPage = 1;
  itemsPerPage = 5;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadWorkoutsFromLocalStorage();
    }
  }

  onUserWorkoutAdded(userWorkout: UserWorkout) {
    if (userWorkout.workouts.some(workout => workout.minutes <= 0)) {
      alert('Workout time must be a positive number.');
      return;
    }

    this.userWorkouts = [...this.userWorkouts, userWorkout];
    if (isPlatformBrowser(this.platformId)) {
      this.saveWorkoutsToLocalStorage();
    }
    this.currentPage = 1; // Reset to first page when new data is added
  }

  saveWorkoutsToLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userWorkouts', JSON.stringify(this.userWorkouts));
    }
  }

  loadWorkoutsFromLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('userWorkouts');
      if (data) {
        this.userWorkouts = JSON.parse(data);
      }
    }
  }

  get aggregatedWorkouts(): AggregatedWorkout[] {
    const aggregated: { [key: string]: AggregatedWorkout } = {};

    this.userWorkouts.forEach(userWorkout => {
      if (!aggregated[userWorkout.username]) {
        aggregated[userWorkout.username] = {
          username: userWorkout.username,
          types: [],
          numberOfWorkouts: 0,
          totalMinutes: 0
        };
      }
      userWorkout.workouts.forEach(workout => {
        aggregated[userWorkout.username].types.push(workout.type);
        aggregated[userWorkout.username].numberOfWorkouts += 1;
        aggregated[userWorkout.username].totalMinutes += workout.minutes;
      });
    });

    const aggregatedArray = Object.values(aggregated).map(agg => ({
      ...agg,
      types: Array.from(new Set(agg.types)) // Remove duplicate types
    }));

    return aggregatedArray.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.userWorkouts.length / this.itemsPerPage);
  }

  get canNavigatePrevious(): boolean {
    return this.userWorkouts.length >= 6 && this.currentPage > 1;
  }

  get canNavigateNext(): boolean {
    return this.userWorkouts.length >= 6 && this.currentPage < this.totalPages;
  }

  previousPage() {
    if (this.canNavigatePrevious) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.canNavigateNext) {
      this.currentPage++;
    }
  }
}
