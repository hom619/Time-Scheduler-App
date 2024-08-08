let EntryList = [];
const handleSubmit = (e) => {
  // alert("Hello you just clicked me");
  const formData = new FormData(e);
  const task = formData.get("task");
  const hr = formData.get("hr");

  const obj = {
    task,
    hr,
  };
  EntryList.push(obj);
  displayList();
};
const displayList = () => {
  let strList = "";
  const entryElm = document.getElementById("taskList");
  EntryList.map((item, i) => {
    strList += `<tr>
      <td scope="row">${i + 1}</td>
      <td>${item.task}</td>
      <td>${item.hr}hrs</td>
      <td class="text-end">
        <button class="btn btn-danger">
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
