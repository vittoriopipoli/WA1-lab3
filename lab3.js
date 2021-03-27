"use strict";


// even if it s not the first line of JS code

document.addEventListener("DOMContentLoaded", (event) => {
    //detect divs
    //menu
    const task_list_ul = document.getElementById("task_list_ul")



    //create dummy event and populate HTML
    const t1 = new Task(1, "laundry", 0, 1)
    const t2 = new Task(2, "monday lab", 0, 0, "2021-03-16T09:00:00.000Z")
    const t3 = new Task(3, "phone call", 1, 0, "2021-03-08T15:20:00.000Z")
    const t4 = new Task(4, "kebabbone", 1, 0, "2021-03-27T15:20:00.000Z")
    const t5 = new Task(5, "read the Holy Bible", 1, 1, "2021-03-29T15:20:00.000Z")
    const t6 = new Task(6, "sing a song", 0, 0, "2021-03-31T15:20:00.000Z")

    // create the task list and add the dummy tasks
    const taskList = new TaskList();
    taskList.add(t1);
    taskList.add(t2);
    taskList.add(t3);
    taskList.add(t4);
    taskList.add(t5);
    taskList.add(t6);

   

    //sort by deadline and print the taskList
    //sortAndPrint(taskList);

    //filter urgent tasks and print the taskList
    //filterAndPrint(taskList);

    const populate_task_list_ul = function(tasks){
        for (let p of tasks) {
            //console.log(p);
            //create li
            let li = document.createElement("li");
            li.className = "list-group-item";
            //create wrapperDiv
            let wrapperDiv = document.createElement("div");
            wrapperDiv.className = "d-flex w-100 justify-content-between";
            //create checkDiv
            let checkDiv = document.createElement("div");
            checkDiv.className = "custom-control custom-checkbox";
            //create inputCheck
            let inputCheck = document.createElement("input");
            inputCheck.setAttribute("type", "checkbox");
            inputCheck.className = "custom-control-input";
            inputCheck.setAttribute("id", "check-t1");
            //create label
            let label = document.createElement("label");
            label.className = "custom-control-label";
            label.setAttribute("for", "check-t1");
            label.innerText = p.description; //task description
            //create small (date)
            let small = document.createElement("small");
            small.innerText = p.deadline
            //append child
            checkDiv.appendChild(inputCheck);
            checkDiv.appendChild(label);
            //
            wrapperDiv.appendChild(checkDiv);
            wrapperDiv.appendChild(small);
            //
            li.appendChild(wrapperDiv);
            task_list_ul.appendChild(li);
        }
    }
    populate_task_list_ul(taskList.list);
    //aside
    const filter_list = document.querySelectorAll("aside div a")
    const filter_all = document.getElementById("filter_all")
    const filter_important = document.getElementById("filter_important")
    const filter_today = document.getElementById("filter_today")
    const filter_next = document.getElementById("filter_next")
    const filter_private = document.getElementById("filter_private")

    const switch_all = function (filter) {
        for (let setoff of filter_list) {
            setoff.classList.remove("active")
        }
        filter.classList.toggle("active");
    }


    filter_all.addEventListener("click", (event) => {
        switch_all(filter_all);
        task_list_ul.innerText = "";
        populate_task_list_ul(taskList.list);
    })
    filter_important.addEventListener("click", (event) => {
        switch_all(filter_important);
        task_list_ul.innerText = "";
        populate_task_list_ul(taskList.filterByUrgent());
    })
    filter_today.addEventListener("click", (event) => {
        switch_all(filter_today);
        task_list_ul.innerText = "";
        populate_task_list_ul(taskList.filterToday());
    })
    filter_next.addEventListener("click", (event) => {
        switch_all(filter_next);
        task_list_ul.innerText = "";
        populate_task_list_ul(taskList.filterNextWeek());
    })
    filter_private.addEventListener("click", (event) => {
        switch_all(filter_private);
        task_list_ul.innerText = "";
        populate_task_list_ul(taskList.filterByPrivate());
    })
})
