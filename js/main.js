let nameInput = document.getElementById("BookmarkName");
let urlInput = document.getElementById("WebsiteURL");
let addBtn = document.getElementById("addBtn");
let tableBody = document.getElementById("tableBody");

let BookMarks;
let mainIndex=0;

if (localStorage.getItem("BookMarks") == null) {
  BookMarks = [];
} else {
  BookMarks = JSON.parse(localStorage.getItem("BookMarks"));
  displayBook(BookMarks);
}



let nameRagex=/^[A-Za-z_]{1,}$/

function isNameValid()
{
  if(nameRagex.test(nameInput.value))
    {
      return true
    }
    else
    {
      return false
    }
}

let urlRagex=/(https:\/\/)?(www\.)?[A-Za-z0-9_\.]\.com$/
function isUrlValid()
{
  if(urlRagex.test(urlInput.value))
    {
      return true
    }
    else
    {
      return false
    }
}

nameInput.onkeyup=function()
{
  if(isUrlValid()&&isNameValid())
    {
      addBtn.removeAttribute("disabled");
    }
    else
    {
      addBtn.disabled="true";
    }
}
urlInput.onkeyup=function()
{
  if(isUrlValid()&&isNameValid())
    {
      addBtn.removeAttribute("disabled");
    }
    else
    {
      addBtn.disabled="true";
    }
}



addBtn.addEventListener("click", function () {
  if (addBtn.innerHTML == "Update") {
    addBtn.innerHTML = "Submit";
    let BookMark = {
      name: nameInput.value,
      url: urlInput.value,
    };
    BookMarks.splice(mainIndex,1,BookMark);
  } 
  else
  {
    let BookMark = {
      name: nameInput.value,
      url: urlInput.value,
    };
    BookMarks.push(BookMark);
  }

  localStorage.setItem("BookMarks", JSON.stringify(BookMarks));
  displayBook(BookMarks);
  clearData();
});

function displayBook(anyArray) {
  let marks = ``;
  for (let i = 0; i < anyArray.length; i++) {
    marks += `
        
        <tr class="line">
    <td class=" fw-bold">Index</td>
    <td class=" fw-bold">Website Name</td>
    <td class=" fw-bold">update</td>
    <td class=" fw-bold">delete</td>
</tr>

        <tr class="secondLine">
    <td>${anyArray[i].name}</td>
    <td><button class='btn btn-warning'>visit</button></td>
    <td><button onclick="updateBook(${i})" class="btn btn-danger">update</button></td>
    <td><button onclick="deleteBook(${i})" class="btn btn-info">delete</button></td>
</tr>
        
        `;
  }

  tableBody.innerHTML = marks;
}

function clearData() {
  nameInput.value = "";
  urlInput.value = "";
}

function deleteBook(index) {
  BookMarks.splice(index, 1);
  localStorage.setItem("BookMarks", JSON.stringify(BookMarks));
  displayBook(BookMarks);
}

function updateBook(index) {
  nameInput.value = BookMarks[index].name;
  urlInput.value = BookMarks[index].url;
  addBtn.innerHTML = "Update";
  mainIndex=index;
}

function search(term)
{
let wantedBook=[];
for(let i=0;i<BookMarks.length;i++)
  {
if(BookMarks[i].name.toLowerCase().includes(term))
  {
    wantedBook.push(BookMarks[i]);
  }

  }
displayBook(wantedBook);

}
