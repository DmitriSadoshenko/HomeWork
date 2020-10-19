
let dataMan = function() {
        this.first_name = '';
        this.last_name = '';
        this.age = function() {
            let a = +prompt('Сколько вам лет?');
            if(a > 0 && a >= 18){
                this.age = a;
            } else {
                this.age = 0;
                alert('Только для лиц 18 и старше');
            }
       }
        this.phone = function() {
            let phone = prompt('Введите ваш номер телефона');
            let regexp = /(^\+375|80)(29|25|44|33)([0-9]{3})([0-9]{2})([0-9]{2})/;
            let myphone = regexp.test(phone);
            if(myphone === true) {
                this.phone = phone;
            } else {
                this.phone = 0;
                alert('Номер телефона введен неправильно!');
            }
        }  
        this.operation = function() {
            if ((this.last_name) && (this.first_name) &&
                (this.age && this.age) && (this.phone) && (this.phone)) {
                    this.result = this.last_name + ' ' + this.first_name + 
                    ' возраст: ' + this.age + ' телефон: ' + this.phone;
                    
                } else {
                    console.log('Ошибка в воде данных');                 
                }
        }
        this.show = function() {
            console.log(this.result)
        }

            this.create = function(tagName) {
               return document.createElement(tagName)
            }

            this.insert = function(to, element, beforeElement) {
                if (!to || !element) return false;

                if (!beforeElement) {to.appendChild(element)}
                else {to.insertBefore(element, beforeElement)};
            }

            this.search = function(selector) {
                document.querySelector(selector)
            }

            this.html = function(element, value) {
               return element.innerHTML = value;
            }

            this.attr = function(element, attrs) {
                attrs.forEach(attr => {
                    element.setAttribute(attr.name, attr.value)  
                });
                
            }

            this.append = function(element, text) {
                let newText = document.createTextNode(text)
                element.appendChild(newText)
            }

            this.addClass = function(element, className) {
                element.classList.add(className)
            }

            this.removeClass = function(element, className) {
                element.classList.remove(element, className)
            }

            this.toggleClass = function(element, className) {
                element.classList.toggle(className)
            }
            
            this.hasClass = function(element, className) {
                let cl = element.classList;
                for(let i = 0; i < classes.length; i++){
                if(cl[i] == className){
                return true}
                else false;
            }
            }

            this.on = function(element, eventName, funcName) {
                element.addEventListener(eventName, funcName)
            }
}

let man = function() {
    
    dataMan.apply(this);
    this.first_name = prompt('Введите имя');
    this.last_name = prompt('Введите фамилию');
    this.age();
    this.phone();
    this.operation();
    this.show();
}
let men = new man();

console.log(men);
