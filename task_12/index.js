class User {
    constructor(id, name, email, address, phone) {
        this.data = {id, name, email, address, phone}
    }
    get userInfo() {
        return this.data
    }

    set userInfo(data) {
        this.data = data
    }
}

let user = new User()

class Contacts {
    constructor() {
        this.data = []
        
    }
    
    add(name, email, address, phone) {
        let newUser = new User(this.data.length ? this.data[this.data.length - 1].user.data.id + 1 : 0, name, email, address, phone); 
        this.data.push({user: newUser});
        
    }

    remove(id) {
        this.data = this.data.filter(item => item.user.data.id !== id)
    }

    get contactsInfo() {
        return this.data
    }
}

class ContactsApp extends Contacts {
    constructor(data) {
        super(data)
            
    }
    
    display() {
        
        document.querySelector(".contact_container").innerHTML = "";
        this.data.forEach((person, index) => {
            
            const cont = document.createElement("div");
            cont.classList.add("contact_card");
            cont.setAttribute("index", index);
            cont.innerHTML = '';
            cont.innerHTML = `
                <p>Name: ${person.user.data.name}</p>
                <p>Email: ${person.user.data.email}</p>
                <p>Address: ${person.user.data.address}</p>
                <p>Phone: ${person.user.data.phone}</p>
            `; 
            
            const cart = document.createElement('div')
            cart.innerHTML = '<i class="fas fa-trash delete_btn" index=${index}></i>'
            cart.addEventListener('click', deleteHandler)
            cont.appendChild(cart)
                
                    // Добавляется атрибут index, чтобы индекс, связанный с соответствующим элементом массива, был значением, помещенным в атрибут index значка корзины.
            document.querySelector(".contact_container").append(cont);
        });
    }

    deleteAt(index) {
        this.data.splice(index, 1);
        
        this.display();
    }
}
if (localStorage.ContactsApp) ContactsApp = JSON.parse(localStorage.getItem('addressBook'))
// let date = new Date(Date.now() + (86400 * 1000));
//     date = date.toUTCString();

let addressBook = new ContactsApp(); 

addressBook.display();

function handleSubmit(event) {
    let date = new Date(Date.now() + 30000);
    date = date.toUTCString();
     
    event.preventDefault();
    
    addressBook.add(event.target[0].value, event.target[1].value, event.target[2].value, event.target[3].value, event.target[4].value );
    localStorage.setItem('addressBook', JSON.stringify(addressBook))
    form.reset();   
    addressBook.display();
}

function deleteHandler(event) {
        const index = event.target.getAttribute("index");
            // возвращает значение атрибута index
        addressBook.deleteAt(index);
            // это передает индексную переменную (которая выбирает значение атрибута индекса для элемента, на который нацелено событие) - таким образом, этот индекс является тем, который удаляется
        addressBook.display();
}    
    

const form = document.querySelector("form");
const contactContainer = document.querySelector(".contact_container");

form.addEventListener("submit", handleSubmit);
