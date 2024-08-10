let EntryList = [];
const handleSubmit = (e) => {
  // alert("Hello you just clicked me");
  const formData = new FormData(e);
  const task = formData.get("task");
  const hr = formData.get("hr");

  const obj = {
    task,
    hr,
    uniqueId: randomIdGenerator(4),
  };
  EntryList.push(obj);
  displayList();
};
const displayList = () => {
  console.log(EntryList);
  let strList = "";
  const entryElm = document.getElementById("taskList");
  EntryList.map((item, i) => {
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
        <button class="btn btn-success">
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
    const filteredEntryList = EntryList.filter((item) => item.uniqueId != id);
    // console.log(filteredEntryList);
    EntryList = filteredEntryList;
    displayList();
  }
};
