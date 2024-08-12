let taskList = [];
const allocatedHoursPerWeek = 24 * 7;
const handleSubmit = (e) => {
  // alert("Hello you just clicked me");
  const formData = new FormData(e);
  const task = formData.get("task");
  const hr = +formData.get("hr");
  if (hr > allocatedHoursPerWeek) {
    alert(
      `Sorry, total allocated hours per week is ${allocatedHoursPerWeek} hours`
    );
    return;
  }
  const obj = {
    task,
    hr,
    uniqueId: randomIdGenerator(4),
    type: "entry",
  };
  const totalExistinghours = calculateTotalhours();
  if (totalExistinghours + hr > allocatedHoursPerWeek) {
    alert(
      `Sorry, total allocated hours per week is ${allocatedHoursPerWeek} hrs`
    );
    return;
  }
  taskList.push(obj);
  displayList();
  calculateTotalhours();
};
const displayList = () => {
  const entryList = taskList.filter((item) => item.type === "entry");
  let strList = "";
  const entryElm = document.getElementById("taskList");
  entryList.map((item, i) => {
    strList += `<tr>
      <td scope="row">${i + 1}</td>
      <td>${item.task}</td>
      <td>${item.hr}hrs</td>
      <td class="text-end">
        <button onclick="deleteAction('${
          item.uniqueId
        }')" class="btn btn-danger">
          <i class="fa-solid fa-trash"></i>
        </button>
        <button onclick="switchAction('${
          item.uniqueId
        }','bad')" class="btn btn-success">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </td>
    </tr>`;
  });
  entryElm.innerHTML = strList;
};

const randomIdGenerator = (length) => {
  const randomString = "1234567890qwertyuiopasdfghjklzxcvbnm";
  let uniqueId = "Task-";
  for (let i = 0; i < length; i++) {
    const randomNumIndex = Math.floor(Math.random() * randomString.length);
    uniqueId += randomString[randomNumIndex];
  }
  return uniqueId;
};
const deleteAction = (id) => {
  if (window.confirm("Are you sure, you wanna remove this task?")) {
    const filteredEntryList = taskList.filter((item) => item.uniqueId != id);
    // console.log(filteredEntryList);
    taskList = filteredEntryList;
    displayList();
    displayBadList();
  }
};
const switchAction = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.uniqueId === id) {
      item.type = type;
    }
    return item;
  });
  displayList();
  displayBadList();
  calculateSavedhours();
};
let NotToDoList = [];
const displayBadList = () => {
  const badList = taskList.filter((item) => item.type === "bad");
  let strList = "";
  const badEntryElm = document.getElementById("badList");
  badList.map((item, i) => {
    strList += `<tr>
      <td scope="row">${i + 1}</td>
      <td>${item.task}</td>
      <td>${item.hr}hrs</td>
      <td class="text-end">
        <button <button onclick="switchAction('${
          item.uniqueId
        }','entry')" class="btn btn-warning">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button onclick="deleteAction('${
          item.uniqueId
        }')"class="btn btn-danger">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>`;
  });
  badEntryElm.innerHTML = strList;
};
const calculateTotalhours = () => {
  const totalhours = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  document.getElementById("totalhours").innerHTML = totalhours;
  return totalhours;
};

const calculateSavedhours = () => {
  const badList = taskList.filter((item) => item.type === "bad");
  const savedHours = badList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  document.getElementById("savedhours").innerHTML = savedHours;
};
