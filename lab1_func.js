'use strict';

//const dayjs = require("dayjs");

//import dayjs from 'dayjs';
// require removed, we cant use it now
//import isToday from 'node_modules/dayjs/plugin/'



function Task(id, description, isUrgent = false, isPrivate = true, deadline = '') {
  this.id = id;
  this.description = description;
  this.urgent = isUrgent;
  this.private = isPrivate;
  // saved as dayjs object
  this.deadline = deadline && dayjs(deadline);

  this.toString = () => {
    return `Id: ${this.id}, ` +
    `Description: ${this.description}, Urgent: ${this.urgent}, Private: ${this.private}, ` +
    `Deadline: ${this._formatDeadline(deadline)}`; // deadline instead "LLL"
  }

  this._formatDeadline = (format) => {
    console.log("got here");
    return this.deadline ? this.deadline.format(format) : '<not defined>';
  }
  this.isToday = ()=>{
    if(this.deadline === '')
      return false
    let today = dayjs()
    if(this.deadline.isSame(today, 'day'))
      return true;
    else
      return false;
  }
  this.isNextWeek = () =>{
    if(this.deadline === '')
    return false
    let today = dayjs();
    let nextWeek = today.add(7, 'day');
    if(this.deadline.isBefore(nextWeek) && this.deadline.isAfter(today))
      return true;
    else
      return false;
  }
}

function TaskList() {
  this.list = [];

  this.add = (task) => {
    if(!this.list.some(t => t.id == task.id))
      this.list = [...this.list, task];
    else throw new Error('Duplicate id');
  };

  this.sortByDeadline = () => {
    return [...this.list]
      .sort((a, b) => {
        const t1 = a.deadline, t2 = b.deadline;
        if(t1 === t2) return 0; // works also for null === null
        else if(t1 === null || t1 === '') return 1;    // null/empty deadline is the lower value
        else if(t2 === null || t2 === '') return -1;
        else return t1.diff(t2)
      });
  };

  this.filterByUrgent = () => {
    return this.list
      .filter( (task) => task.urgent );
  }

  this.filterToday = ()=>{
    return this.list.filter((task)=>task.isToday());
  }
  this.filterNextWeek = ()=>{
    return this.list.filter((task)=>task.isNextWeek());
  }

  this.filterByPrivate = () =>{
    return this.list.filter((task)=>task.private == true);
  }

}

// check current time is ok
// console.log('Current date and time: ' + dayjs().format('LLL'));

function sortAndPrint(taskList){
  console.log("****** Tasks sorted by deadline (most recent first): ******");
  // use sort function
  taskList.sortByDeadline()
    .forEach( (task) => console.log(task.toString()) );
}

function filterAndPrint(taskList){
  console.log("****** Tasks filtered, only (urgent == true): ******");
  // use filter function
  taskList.filterByUrgent()
  .forEach( (task) => console.log(task.toString()) );
}

/*
function main(data) {
  // create some dummy tasks
  const t1 = new Task(1, "laundry", 0, 1)
  const t2 = new Task(2, "monday lab", 0, 0, "2021-03-16T09:00:00.000Z")
  const t3 = new Task(3, "phone call", 1, 0, "2021-03-08T15:20:00.000Z")

  // create the task list and add the dummy tasks
  const taskList = new TaskList();
  taskList.add(t1);
  taskList.add(t2);
  taskList.add(t3);

  //sort by deadline and print the taskList
  sortAndPrint(taskList);

  //filter urgent tasks and print the taskList
  filterAndPrint(taskList);

  debugger;
}

main()
*/
