import { Application, Graphics } from 'pixi.js';
import chartData from './chart_data.json';
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

let startDot = 100,
	endDot = width*0.2;

app.stage.chartBig = new Chart({width, height:height*0.7,lineHeight:3, data:chartData[0], startDot, endDot});
app.stage.chart = new Chart({width, height:height* 0.1,lineHeight:1.6, data:chartData[0]});

app.stage.rect = new Graphics();
app.stage.rect.beginFill(0xFFFFFF, 0.5);
app.stage.rect.drawRect (startDot, height * 0.8, endDot-startDot, height* 0.1);
app.stage.rect.endFill();
app.stage.rect.interactive = true;
app.stage.rect.buttonMode = true; 
app.stage.rect
// events for drag start
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        // events for drag end
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        // events for drag move
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove)


app.stage.chart.y = height * 0.8;
app.stage.addChild(app.stage.chart);
app.stage.addChild(app.stage.chartBig);
app.stage.addChild(app.stage.rect);

function render(){
	const width = window.innerWidth;
	const height = window.innerHeight;

	app.stage.chartBig.render({startDot, endDot, width, height:height*0.7});
	app.stage.chart.render({width, height:height* 0.1});
	app.stage.chart.y = height * 0.8;

	app.stage.rect.clear();
	app.stage.rect.beginFill(0xFFFFFF, 0.5);
	app.stage.rect.drawRect (startDot, height * 0.8, endDot-startDot, height* 0.1);
	app.stage.rect.endFill();
}

window.addEventListener("resize", ()=>{
	app.renderer.resize(window.innerWidth, window.innerHeight)
	render();
	console.log(app)
}, false)

window.addEventListener("keydown", event=>{
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
}, false)

function onDragStart(event){
	this.startX = event.data.global.x;
    this.alpha = 0.5;
    this.dragging = true;
}
function onDragEnd(event){
	this.alpha = 1;
	this.startX = null;
    this.dragging = false;
}

function onDragMove(event)
{
    if (this.dragging)
    {
       
        const width = endDot - startDot;
        const deltaX = event.data.global.x - this.startX;
  		let x = startDot + deltaX;
		if(x < 0 ){
			x = 0;
		}
		if((x + width) > window.innerWidth){
			x = window.innerWidth - width;
		}
		this.startX = event.data.global.x;
		startDot = x;
		endDot = x + width;
		render();
    }
}


