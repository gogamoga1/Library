let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
const container = document.querySelector(".card-container");

const closePopUp = document.getElementsByTagName('span')[0];
closePopUp.addEventListener('click', () => document.querySelector(".bg-container").style.display = "none");

const btnBook = document.querySelector(".add-book");
btnBook.addEventListener("click", () => {
  document.querySelector(".bg-container").style.display = "flex";
});

const btnAdd = document.querySelector("#addbook");
btnAdd.addEventListener("click", () => {
  document.querySelector(".bg-container").style.display = "none";
  new Book().addBookToLibrary()
  //addBookToLibrary(new Book());
  form.reset();
});

class Book {
  constructor() {
    this.title = form.title.value;
    this.author = form.author.value;
    this.pages = form.pages.value;
    this.read = form.isread.checked;
  }

  addBookToLibrary () {
    myLibrary.push(this);
    console.log(this)
    Book.saveToStorage();
    Book.addOneBook();
  }

  static saveToStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
  }

  static isRead(el) {
    myLibrary[el.id].read = !myLibrary[el.id].read;
    el.previousElementSibling.textContent = `${el.checked ? "Read" : "Not read"}`
    this.saveToStorage();
  }

  static displayBooks() {
    while (container.childElementCount > 1) {
    container.removeChild(container.lastChild)
  }
  myLibrary.forEach(this.addOneBook);
}

static addOneBook(lastItem, index) {
  if (lastItem == null) {
    lastItem = myLibrary[myLibrary.length - 1]
    index = myLibrary.length - 1
  }

  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const newCheckBox = document.createElement("input");
  const newCheckBox1 = document.createElement("button");

    div.classList.add(`card-box`);
    div.setAttribute("data-book", `${index}`);
    container.appendChild(div);

    h2.textContent = `${lastItem.title}, [${index}]`;
    div.appendChild(h2);

    p1.textContent = `Author: ${lastItem.author}`;
    div.appendChild(p1);

    p2.textContent = `Pages: ${lastItem.pages}`;
    div.appendChild(p2);
    
    p3.textContent = `${lastItem.read ? "Read" : "Not read"}`;
    div.appendChild(p3);
    
    newCheckBox.type = "checkbox";
    newCheckBox.checked = lastItem.read;
    newCheckBox.setAttribute("onclick", `Book.isRead(this)`);
    newCheckBox.setAttribute("id", `${index}`);
    div.appendChild(newCheckBox);

    newCheckBox1.textContent = "Remove";
    newCheckBox1.classList.add(`remove-btn`);
    newCheckBox1.setAttribute("id", `${index}`);
    div.appendChild(newCheckBox1);
  }


}



document.body.addEventListener( 'click', e => {
  if (e.target.className === 'remove-btn') {
    myLibrary.splice(e.target.id, 1);
    Book.saveToStorage();
    let el = document.querySelector(`[data-book="${e.target.id}"]`);
    el.remove();
    Book.displayBooks();
  }
} );

Book.displayBooks();