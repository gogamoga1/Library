/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var form = document.getElementById('form');
var myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
var container = document.querySelector('.card-container');
var closePopUp = document.getElementsByTagName('span')[0];
closePopUp.addEventListener('click', function () {
  document.querySelector('.bg-container').style.display = 'none';
  form.reset();
});
var btnBook = document.querySelector('.add-book');
btnBook.addEventListener('click', function () {
  document.querySelector('.bg-container').style.display = 'flex';
});
var btnAdd = document.querySelector('#addbook');
btnAdd.addEventListener('click', function () {
  if (form.title.validity.valid && form.author.validity.valid && form.pages.validity.valid) {
    document.querySelector('.bg-container').style.display = 'none';
    new Book().addBookToLibrary();
    form.reset();
  }
});

var Book = /*#__PURE__*/function () {
  function Book() {
    _classCallCheck(this, Book);

    this.title = form.title.value;
    this.author = form.author.value;
    this.pages = form.pages.value;
    this.read = form.isread.checked;
  }

  _createClass(Book, [{
    key: "addBookToLibrary",
    value: function addBookToLibrary() {
      myLibrary.push(this);
      console.log(this);
      Book.saveToStorage();
      Book.addOneBook();
    }
  }], [{
    key: "saveToStorage",
    value: function saveToStorage() {
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    }
  }, {
    key: "isRead",
    value: function isRead(el, index) {
      console.log(el);
      el.read = !el.read;
      document.querySelector("[data-book=\"".concat(index, "\"]")).children[3].textContent;
      this.saveToStorage();
    }
  }, {
    key: "displayBooks",
    value: function displayBooks() {
      while (container.childElementCount > 1) {
        container.removeChild(container.lastChild);
      }

      myLibrary.forEach(this.addOneBook);
    }
  }, {
    key: "addOneBook",
    value: function addOneBook(lastItem, index) {
      if (lastItem == null) {
        lastItem = myLibrary[myLibrary.length - 1];
        index = myLibrary.length - 1;
      }

      var div = document.createElement('div');
      var h2 = document.createElement('h2');
      var p1 = document.createElement('p');
      var p2 = document.createElement('p');
      var p3 = document.createElement('p');
      var newCheckBox = document.createElement('input');
      var newCheckBox1 = document.createElement('button');
      div.classList.add("card-box");
      div.setAttribute('data-book', "".concat(index));
      container.appendChild(div);
      h2.textContent = "".concat(lastItem.title, ", [").concat(index, "]");
      div.appendChild(h2);
      p1.textContent = "Author: ".concat(lastItem.author);
      div.appendChild(p1);
      p2.textContent = "Pages: ".concat(lastItem.pages);
      div.appendChild(p2);
      p3.textContent = "".concat(lastItem.read ? 'Read' : 'Not read');
      div.appendChild(p3);
      newCheckBox.type = 'checkbox';
      newCheckBox.checked = lastItem.read;
      newCheckBox.setAttribute('id', "".concat(index));

      newCheckBox.onclick = function () {
        lastItem.read = !lastItem.read;
        document.querySelector("[data-book=\"".concat(index, "\"]")).children[3].textContent = "".concat(document.querySelector("[data-book=\"".concat(index, "\"]")).children[4].checked ? 'Read' : 'Not read');
        Book.saveToStorage();
      };

      div.appendChild(newCheckBox);
      newCheckBox1.textContent = 'Remove';
      newCheckBox1.classList.add("remove-btn");
      newCheckBox1.setAttribute('id', "".concat(index));
      div.appendChild(newCheckBox1);
    }
  }]);

  return Book;
}();

document.body.addEventListener('click', function (e) {
  if (e.target.className === 'remove-btn') {
    myLibrary.splice(e.target.id, 1);
    Book.saveToStorage();
    var el = document.querySelector("[data-book=\"".concat(e.target.id, "\"]"));
    el.remove();
    Book.displayBooks();
  }
});
Book.displayBooks();
/******/ })()
;