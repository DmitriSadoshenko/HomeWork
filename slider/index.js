class FadeSlider {
	constructor({speed_transition, images}) {
		// options 
		this.images = images;

		this.step = 0;

		// selectors 
		this.slider = document.querySelector('.fade-slider');
		this.mainSlide = null;

		this.start();
	}
	start = () => {
		this.create();

		this.slider.addEventListener('click', this.action);
	}
	action = (event) => {
		const action = event.target.dataset.action;

		if(action) this[action]();
	}
	create = () => {
		this.slider.innerHTML = `
			<div class="arrow prev" data-action="prev">&#10148</div>
	    <img class="main-slide" src="${this.images[this.step]}">
	    <div class="arrow next" data-action="next">&#10148</div>
		`;
		
		// запись селектора после его получения
		this.mainSlide = document.querySelector('.main-slide');
	}
	prev = () => {
		this.step--;

		if(this.step < 0) {
			this.step = this.images.length-1;
		}

		this.mainSlide.src = this.images[this.step];
	}
	next = () => {
		this.step++;

		if(this.step === this.images.length) {
			this.step = 0;
		}

		this.mainSlide.src = this.images[this.step];
	}
}
const fadeSlider = new FadeSlider({
	images: ['images/foto.jpg', 
			'images/foto2.jpg', 
			'images/foto3.jpg', 
			'images/IMG_8286.jpg',
			'images/IMG_8268.jpg', 
			'images/IMG_8335.jpg',
			'images/IMG_8860.jpg',
			'images/port1.jpg',
			'images/port2.jpg',
			'images/port3.jpg',
			'images/port4.jpg',
			'images/port5.jpg',
			'images/port6.jpg',]
});