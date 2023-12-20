import { Component } from '@angular/core';

interface Counter {
  value: number;
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  counters: Counter[] = [{ value: 1 }];

  addCounter() {
    this.counters.push({ value: 1 });
  }

  resetCounters() {
    // Clear all counters
    this.counters = [{ value: 1 }];
  }

  incrementCounter(index: number) {
    this.counters[index].value++;
  }

  decrementCounter(index: number) {
    this.counters[index].value--;
  }

  removeCounter(index: number) {
    this.counters.splice(index, 1);
  }

}
