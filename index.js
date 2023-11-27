//CLASSES

class Book {
    constructor(name, author, pages=0, status=true) {
        this.name = name,
        this.author = author,
        this.pages = pages,
        this.status = status
    }
}

class Library {
    constructor() {
        this.library = []
    }

    createBook(name, author, pages, status) {
        const book = new Book(name, author, pages, status)
        this.library.push(book)
    }

    updateBook(position, name, author , pages, status) {
        
        this.library[position] = {
            name,
            author,
            pages,
            status
        }
    }

    deleteBook(position) {
        const book = this.library.splice(position, 1)
        return book
    }

    searchBook(position) {
        return this.library[position]
    }

    drawLibrary(grid) {
        const fragment = document.createDocumentFragment()
    

        this.library.forEach((element, index) => {
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
        
        grid.innerHTML = "";
        grid.append(fragment);
    }
}

//MAIN PROGRAM
const buttonAddBook = document.querySelector(".navbar button")
const gridBooks = document.querySelector(".grid-books")
const modal = document.querySelector(".modal-container")
const form = document.querySelector("form")
const submit = form.querySelector("button")

const inputs = form.querySelectorAll("input")

//temporary, to know if it's create new book or update
let typeOperation = 0

//when we click a book element, we have to store the position clicked
let positionUpdate

//new library
const myLibrary = new Library()

//EVENT LISTENERS

//BUTTON ADD BOOK LISTENER
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

//CREATE EVENT PARTICULAR FOR THE BUTTON UPDATE BOOK
function buttonUpdateBook(event) {
    const element = event.currentTarget
    positionUpdate = element.dataset.position
    typeOperation = 1;

    modal.classList.toggle("visible")

    inputs.forEach(element => {

        if (element.value == "on") {
            element.checked = myLibrary.searchBook(positionUpdate).status
        }
        else {
            switch (element.name) {
                case "name" : element.value = myLibrary.searchBook(positionUpdate).name; break;
                case "author": element.value = myLibrary.searchBook(positionUpdate).author; break;
                case "pages": element.value = myLibrary.searchBook(positionUpdate).pages; break;
            }
        }        
    })
}


//CREATE EVENT PARTICULAR FOR BUTTON DELETE BOOK
function deleteBook(event) {
    const element = event.currentTarget
    const position = element.dataset.position

    myLibrary.deleteBook(position)
    myLibrary.drawLibrary(gridBooks)
}


//SUBMIT LISTENERS
//after clicking 'submit' in the form, we create a new book or update a book from
//the library. After that we redraw the cards in the DOM
form.addEventListener('submit', (e) => {
    e.preventDefault()

    let name, author, pages, status;

    inputs.forEach(element => {
        if (element.value == "on") {
            status = element.checked
        }
        else {
            switch (element.name) {
                case "name" : name = element.value; break;
                case "author": author = element.value; break;
                case "pages": pages = element.value; break;
            }
        }        
    })
    
    if (typeOperation == 0) {
        myLibrary.createBook(name, author, pages, status)
    } 
    else {
        myLibrary.updateBook(positionUpdate, name, author, pages, status)
    }

    myLibrary.drawLibrary(gridBooks)

    form.reset()
    modal.classList.toggle("visible")
})