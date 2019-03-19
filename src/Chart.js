import { Container, Graphics } from 'pixi.js';

function colorToHex(color){
	return Number("0x" +  String(color).slice(1))
}


export default class Chart extends Container {
	constructor({width, height, data, lineHeight, startDot, endDot}){
		super();
		this.cWidth = width;
		this.cHeight = height;
		this.chartData = data;
		this.lineHeight = lineHeight || 2;
		this.graphics = new Graphics();
		this.startDot = startDot;
		this.endDot = endDot;
		this.drawChart();
		this.addChild(this.graphics);
	}
	drawChart(){
		const chart = this.chartData;
		Object.keys(chart.names).forEach(name=>{
			const color = colorToHex(chart.colors[name]);
			this.drawOne(chart, color, name);
		})
	}
	drawOne(chart, color, name){
		const graphics = this.graphics;
		graphics.lineStyle(this.lineHeight, color);
		const xColumn = chart.columns.find(arr=> arr[0] === 'x').slice(1);
		const yColumn = chart.columns.find(arr=> arr[0] === name).slice(1);
		
		const startX = xColumn[0];
		const maxX = Math.max.apply(null, xColumn) - startX;
		const maxY = Math.max.apply(null, yColumn);
		const kx = this.cWidth/maxX;
		this.kx = kx;
		const ky = this.cHeight/maxY;
		const yZero = this.cHeight;
		graphics.moveTo(0, yColumn[0]*ky);
		xColumn.slice(1).forEach((xSrc, id) =>{
			
			const y = yZero - (yColumn[id+1] * ky);
			const x = (xSrc - startX) * kx;
	
			graphics.lineTo(x, y)
		})
	}
	render({startDot, endDot, width, height}){
		if(typeof startDot === 'number' && typeof endDot === 'number'){
			this.x =-((this.width/window.innerWidth) * startDot); 
		}
		if(typeof startDot === 'number')
			this.startDot = startDot;
		if(typeof endDot === 'number')
			this.endDot = endDot;
		if(typeof width === 'number')
			this.cWidth = width;
		if(typeof height === 'number')
			this.cHeight = height;
		
		this.graphics.clear();
		this.drawChart();
	}
}