import { Application, Graphics } from 'pixi.js';
import chartData from './chart_data.json';
import drawChart from './drawChart';
import Chart from './Chart';


const width = window.innerWidth;
const height = window.innerHeight;
const options = {
            autoResize: true,
            transparent: false,
            antialias: false,
            preserveDrawingBuffer: false,
            resolution: window.devicePixelRatio || 1,
            clearBeforeRender: true,
            // powerPreference: "high-performance"
            legacy: true
};



const app = new Application(width, height, options);
document.body.appendChild(app.view);

let startDot = 0,
	endDot = width;

function render(){
	app.stage.children.forEach(child=>{
		app.stage.removeChild(child);
	})
	setTimeout(()=>{
		const width = window.innerWidth;
		const height = window.innerHeight;
		app.stage.chartBig = new Chart({width, height:height*0.7,lineHeight:3, data:chartData[0], startDot, endDot});

		app.stage.chart = new Chart({width, height:height* 0.1,lineHeight:1.6, data:chartData[0]});
		app.stage.rect = new Graphics();
		app.stage.rect.beginFill(0xFFFFFF, 0.5);
		app.stage.rect.drawRect (startDot, height * 0.8, endDot-startDot, height* 0.1);
		app.stage.rect.endFill();
		app.stage.chart.y = height * 0.8;
		app.stage.addChild(app.stage.chart);
		app.stage.addChild(app.stage.chartBig);
		app.stage.addChild(app.stage.rect);
	}, 32)

}

render();

window.addEventListener("resize", ()=>{
	app.renderer.resize(window.innerWidth, window.innerHeight)
	render();
	console.log(app)
}, false)

window.addEventListener("keydown", event=>{
	console.log(event);
	switch(event.keyCode){
		case 65:
			if(startDot > 0){
				startDot--;
			}
			break;
		case 68:
			if(startDot < window.innerWidth){
				startDot++;
			}
			break;
		case 68:
			if(startDot < window.innerWidth){
				startDot++;
			}
			break;
		case 37:
			if(endDot > 0){
				endDot--;
			}
			break;
		case 39:
			if(endDot < window.innerWidth){
				endDot++;
			}
			break;			
	}
	render();
	console.log(app)
}, false)