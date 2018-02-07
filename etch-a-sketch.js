/* create references to buttons */
const defaultButton = document.getElementById('default');
const pencilButton = document.getElementById('pencil');
const rainbowButton = document.getElementById('rainbow');

let color = 'default';

function selectDefault() {
	color = 'default';
}

function selectRainbow() {
	color = 'rainbow';
}

function selectPencil() {
	color = 'pencil';
}

defaultButton.addEventListener('click', selectDefault);
rainbowButton.addEventListener('click', selectRainbow);
pencilButton.addEventListener('click', selectPencil);

let hue = 0;
let lightness = [];

function mouseEnterFunc(e, i) {
	if (color === 'rainbow') {
		e.classList.remove('default');
		e.classList.remove('pencil');
		e.classList.add('rainbow');
		hue++;
		if (hue >= 360) {
    		hue = 0;
 		 }
 		 
 		e.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
	} else if (color === 'pencil') {
	  	if (e.style.backgroundColor) {
				e.style.backgroundColor = '';
			} 
    
    	if (!e.classList.contains('pencil')) {
    		lightness[i] = 100;
    	}
    	
		e.classList.remove('default');
		e.classList.remove('rainbow');
		e.classList.add('pencil');
		lightness[i] = lightness[i] - 10;

		if (lightness[i] <= 0) {
			lightness[i] = 0;
		}

		e.style.backgroundColor = `hsl(0,0%,${lightness[i]}%)`;
	} else {
		if (e.style.backgroundColor) {
			e.style.backgroundColor = '';
		} 

		e.classList.remove('pencil');
		e.classList.remove('rainbow');
		e.classList.add('default')
	}
}

function mouseLeaveFunc(e) {
	e.target.classList.remove('default');
}

const container = document.querySelector('#container');

function draw(cnvWidth,cnvHeight,num) {
  for (let i = 0; i < num * num; i++) {
      const square = document.createElement('div');
      square.style.width = `${cnvWidth / num}px`;
      square.style.height = `${cnvHeight / num}px`;
      square.classList.add('square')
      square.onmouseenter = mouseEnterFunc.bind(this, square, i);
      lightness.push(90);
      container.appendChild(square);
  };
};

/* set default grid dimensions */
container.style.width = '500px';
container.style.height = '500px';
draw(parseInt(container.style.width),parseInt(container.style.height),16);

/* reset button and function */
function resetGrid() {
	while(container.firstChild) {
		container.removeChild(container.firstChild)
	}

	let num = input.value || 16
	draw(parseInt(container.style.width),parseInt(container.style.height),num);
}

const resetbutton = document.querySelector('#reset');
resetbutton.addEventListener('click', resetGrid);