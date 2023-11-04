function Book() {
    this.name = "",
    this.author = "",
    this.pages = 0,
    this.status = true
}

const myLibrary = []
let typeOperation = 0
let positionUpdate

const buttonAddBook = document.querySelector(".navbar button")
const gridBooks = document.querySelector(".grid-books")
const modal = document.querySelector(".modal-container")
const form = document.querySelector("form")
const submit = form.querySelector("button")

buttonAddBook.addEventListener('click', () => {
    modal.classList.toggle("visible")
    typeOperation = 0
})


//close the modal if click out of the form box
modal.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.classList.toggle("visible")
        form.reset()
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    if (typeOperation == 0) {
        createBook()
    }

    else {
        updateBook()
    }

    drawBooks();

    form.reset()
    modal.classList.toggle("visible")

})

function buttonUpdateBook(event) {
    const element = event.currentTarget
    positionUpdate = element.dataset.position
    typeOperation = 1;

    modal.classList.toggle("visible")

    const inputs = document.querySelectorAll("input")

    inputs.forEach(element => {

        if (element.value == "on") {
            element.checked = myLibrary[positionUpdate].status
        }
        else {
            switch (element.name) {
                case "name" : element.value = myLibrary[positionUpdate].name; break;
                case "author": element.value = myLibrary[positionUpdate].author; break;
                case "pages": element.value = myLibrary[positionUpdate].pages; break;
            }
        }        
    })
}

function updateBook() {
    const inputs = document.querySelectorAll("input")

    inputs.forEach(element => {

        if (element.value == "on") {
            myLibrary[positionUpdate].status = element.checked
        }
        else {
            switch (element.name) {
                case "name" : myLibrary[positionUpdate].name = element.value; break;
                case "author": myLibrary[positionUpdate].author = element.value; break;
                case "pages": myLibrary[positionUpdate].pages = element.value; break;
            }
        }        
    })
}

function createBook() {
    const inputs = document.querySelectorAll("input")
    const book = new Book

    inputs.forEach(element => {

        if (element.value == "on") {
            book.status = element.checked
        }
        else {
            switch (element.name) {
                case "name" : book.name = element.value; break;
                case "author": book.author = element.value; break;
                case "pages": book.pages = element.value; break;
            }
        }        
    })

    myLibrary.push(book)
}

function changeStatus(event) {
    const element = event.currentTarget
    const data = element.dataset.position

    myLibrary[data].status ? myLibrary[data].status = false :  myLibrary[data].status = true

    drawBooks()
}

function deleteBook(event) {
    const element = event.currentTarget
    const data = element.dataset.position

    console.log(data)

    myLibrary.splice(data, 1)
    drawBooks()

}


function drawBooks() {
    const fragment = document.createDocumentFragment()
    

    myLibrary.forEach((element, index) => {
        const card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            <div class="labels">
                <h4>Title: ${element.name}</h2>
                <p>Author: ${element.author}</p>
                <p>Pages: ${element.pages}</p>
                <p>Status: 
                <span onclick="changeStatus(event)" data-position="${index}" class=${element.status ? "read" : "unread"}>${element.status ? "Read" : "Not read yet"}</span>
                </p>
            </div>
            <div class="icons">
                <div>                      
                    <button onclick="buttonUpdateBook(event)" data-position="${index}"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onclick="deleteBook(event)" data-position="${index}"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `

        fragment.appendChild(card)
    })

    gridBooks.innerHTML = "";
    gridBooks.append(fragment);
}