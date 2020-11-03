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


class Contacts {
    constructor() {
        this.data = JSON.parse(localStorage.getItem('addressBook')) || []
    }

    set addData(dataArray) {
        this.data = dataArray
    }

    add(name, email, address, phone) {
        let newUser = new User(this.data.length ? this.data[this.data.length - 1].id + 1 : 0, name, email, address, phone); 
        this.addData = [newUser.userInfo, ...this.data]
    }

    remove(id) {
        this.data = this.data.filter(item => item.id !== id)
    }

    set contactsInfo(data) {
        return this.data = data

        
    }
    

    get contactsInfo() {
        return this.data
    }
}

class ContactsApp extends Contacts {
    constructor(data) {
        super(data)
        this.setDefaultData()
    }

    setDefaultData() {
        if(!JSON.parse(localStorage.getItem('addressBook'))) {
            this.getData()
        }
    }

    async getData() {
        const result = await fetch ('https://jsonplaceholder.typicode.com/users').then(response => response.json())
        this.contactsInfo = result
        await this.display()
    }
    

    display() {
        document.querySelector(".contact_container").innerHTML = "";
        this.data.forEach((person, index) => {

            const cont = document.createElement("div");
            cont.classList.add("contact_card");
            cont.setAttribute("index", index);
            cont.innerHTML = `
                <p>Name: ${person.name}</p>
                <p>Email: ${person.email}</p>
                <p>Address: ${person.address}</p>
                <p>Phone: ${person.phone}</p>
                
                
            `; 

            const cart = document.createElement('div')
            cart.innerHTML = '<i class="fas fa-trash delete_btn" index=${index}></i>'
            cart.addEventListener('click', deleteHandler)
            cont.appendChild(cart)
            
            document.querySelector(".contact_container").append(cont);
        });
    }

    deleteAt(index) {
        this.data.splice(index, 1);
        this.display();
    }

    get storage() {
        return localStorage.getItem('addressBook')
    }

    set storage(data) {
        localStorage.setItem('addressBook', JSON.stringify(data))
        document.cookie = "user=" + "David" + ";max-age=" + (3600 * 34 * 10)
    }
}

let addressBook = new ContactsApp(); 

addressBook.display();

function handleSubmit(event) {
    event.preventDefault();
    addressBook.add(event.target[0].value, event.target[1].value, event.target[2].value, event.target[3].value, event.target[4].value)
    addressBook.storage = addressBook.contactsInfo
    form.reset();
    addressBook.display();
}

function deleteHandler(event) {
    const index = event.target.getAttribute("index");
    addressBook.deleteAt(index);
    addressBook.storage = addressBook.contactsInfo;
    addressBook.display();
    
}

const form = document.querySelector("form");
const contactContainer = document.querySelector(".contact_container");

form.addEventListener("submit", handleSubmit);
