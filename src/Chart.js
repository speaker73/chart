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
		
		const trueStart = xColumn[0];
		const trueEnd = xColumn[xColumn.length-1];
		const maxDelta = trueEnd - trueStart;

		const startX = xColumn.find(x=> {
			if(typeof this.startDot !== 'undefined'){
				const xDelta = x - trueStart;
				return (xDelta/maxDelta) >= (this.startDot/this.cWidth)
			}
			return true
		});
		const endX = xColumn.find((x, id)=>{
			const xDelta = x - trueStart;
			return (xDelta/maxDelta) >= (this.endDot/this.cWidth)
		});
		const maxX = endX? endX - startX : Math.max.apply(null, xColumn) - startX;
		const maxY = Math.max.apply(null, yColumn);
		const kx = this.cWidth/maxX;
		const ky = this.cHeight/maxY;
		const yZero = this.cHeight;

		graphics.moveTo(0, yZero);
		xColumn.slice(1).forEach((xSrc, id) =>{
			const y = yZero - (yColumn[id + 1] * ky);
			const x = (xSrc - startX) * kx;
	
			graphics.lineTo(x, y)
		})
	}
}