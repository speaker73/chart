
function drawOne(graphics, chart, color, name, stage){
	graphics.lineStyle(2, color);
	const xColumn = chart.columns.find(arr=> arr[0] === 'x').slice(1);
	const yColumn = chart.columns.find(arr=> arr[0] === name).slice(1);
	const startX = xColumn[0];
	graphics.moveTo(0, yColumn[0]);
	
	const maxX = Math.max.apply(null, xColumn);
	const maxY = Math.max.apply(null, yColumn);
	const kx = stage.width/maxX;
	const ky = (stage.height/2)/maxY;
	const yZero = stage.height/2;
	xColumn.slice(1).forEach((xSrc, id) =>{
		const y = yZero + (yColumn[id + 1] * ky);
		const x = (xSrc - startX) * kx;
	
		graphics.lineTo(x, y)
	})
}
function colorToHex(color){
	return Number("0x" +  String(color).slice(1))
}

export default function drawChart(graphics, data, stage){
	const chart = data;
	Object.keys(chart.names).forEach(name=>{
		const color = colorToHex(chart.colors[name]);
		drawOne(graphics, chart, color, name, stage);
	})
}