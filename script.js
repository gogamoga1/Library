const container = document.querySelector(".card-container");
const btnBook = document.querySelector(".add-book");
const btnAdd = document.querySelector("#addbook");
let myLibrary = [];
//addBookToLibrary(new Book("Monte Cristo", "Duma", 1600, true))
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(obj) {
  myLibrary.push(obj);
  addOneBook();
}

function isRead(el) {
  el.previousElementSibling.textContent = myLibrary[el.id-1].read = `${el.checked ? "Read" : "Not read"}`
}

function createBooks() {
  // while (container.firstChild) {
  //   container.removeChild(container.firstChild)
  // }
  myLibrary.forEach(addOneBook);
}
createBooks();
function addOneBook(lastItem, index) {
  // while (container.firstChild) {
  //   container.removeChild(container.firstChild)
  // }
  if (lastItem == null) {
    lastItem = myLibrary[myLibrary.length - 1]
    index = myLibrary.length
  }

    const div = document.createElement("div");
    div.classList.add(`card-box`);
    div.setAttribute("data-book", `${index}`);
    container.appendChild(div);

    const h2 = document.createElement("h2");
    h2.textContent = `${lastItem.title}`;
    div.appendChild(h2);

    const p1 = document.createElement("p");
    p1.textContent = `Author: ${lastItem.author}`;
    div.appendChild(p1);

    const p2 = document.createElement("p");
    p2.textContent = `Pages: ${lastItem.pages}`;
    div.appendChild(p2);

    const p3 = document.createElement("p");
    p3.textContent = `${lastItem.read ? "Read" : "Not read"}`;
    div.appendChild(p3);

    const newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.checked = lastItem.read;
    newCheckBox.setAttribute("onclick", `isRead(this)`);
    newCheckBox.setAttribute("id", `${index}`);
    div.appendChild(newCheckBox);

    const newCheckBox1 = document.createElement("button");
    newCheckBox1.textContent = "Remove";
    newCheckBox1.classList.add(`remove-btn`);
    newCheckBox1.setAttribute("id", `${index}`);
    div.appendChild(newCheckBox1);
  }



btnBook.addEventListener("click", (e) => {
  document.querySelector(".bg-container").style.display = "flex";
});

btnAdd.addEventListener("click", (e) => {
  let title = document.querySelector("input#title").value;
  let author = document.querySelector("input#author").value;
  let pages = document.querySelector("input#pages").value;
  let isread = document.querySelector("input#isread").checked;
  addBookToLibrary(new Book(title, author, pages, isread))
  document.querySelector(".bg-container").style.display = "none";
});

document.body.addEventListener( 'click', e => {
  if (e.target.className === 'remove-btn') {
    myLibrary.splice(e.target.id - 1, 1)
    var el = document.querySelector(`[data-book="${e.target.id}"]`);
    el.remove(); 
  }
} );


