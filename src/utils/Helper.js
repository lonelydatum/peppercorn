import Rect from './Rect.js'

function getRectFromContext(ctx) {
	return new Rect(0, 0, ctx.canvas.width, ctx.canvas.height)
}


function getNonTransparentPixels(context, rect=getRectFromContext(context)) {
	const data = context.getImageData(rect.x, rect.y, rect.w, rect.h).data
	// const data = imageData.data
	let indexForPos = 0
	// let index = 0
	let y = -1
	let list = []

	for(let i=0; i<data.length; i += 4) {
		const r = data[i]
		const g = data[i+1]
		const b = data[i+2]
		const a = data[i+3]
		const rgba = {r, g, b, a:a/255}

		const x = indexForPos%rect.w
		y = (indexForPos%rect.w===0) ? y+1 : y


		if(rgba.a > 0) {
			const item = {rgba, x, y}
			list.push(item);
		}

		indexForPos++
	}

	return list

}




function range(min, max) {
	const diff = max - min
	const r = diff * Math.random()
	return r + min
}

var determineFontHeight = function(fontStyle) {
  var body = document.getElementById('dummy-font');
  var dummy = document.createElement("div");
  var dummyText = document.createTextNode("M");
  dummy.appendChild(dummyText);
  dummy.setAttribute("style", fontStyle);
  body.appendChild(dummy);
  var result = dummy.offsetHeight;
  body.removeChild(dummy);
  return result;
};

var determineFontWidth = function(fontStyle, text) {
  var body = document.getElementsByTagName("body")[0];
  var dummy = document.createElement("div");
  var dummyText = document.createTextNode(text);
  dummy.appendChild(dummyText);
  dummy.setAttribute("style", fontStyle);
  body.appendChild(dummy);
  var result = dummy.offsetWidth;
  body.removeChild(dummy);
  return result;
};

// var canvas = document.getElementById('canvas');
// var context = canvas.getContext("2d");
// var canvasFont = " ... ";
// var fontHeight = determineFontHeight("font: " + canvasFont + ";");
// context.font = canvasFont;

// var exampleFamilies = ["Helvetica", "Verdana", "Times New Roman", "Courier New"];
// var exampleSizes = [8, 10, 12, 16, 24, 36, 48, 96];
// for(var i = 0; i < exampleFamilies.length; i++) {
//   var family = exampleFamilies[i];
//   for(var j = 0; j < exampleSizes.length; j++) {
//     var size = exampleSizes[j] + "pt";
//     var style = "font-family: " + family + "; font-size: " + size + ";";
//     var pixelHeight = determineFontHeight(style);
//     console.log(family + " " + size + " ==> " + pixelHeight + " pixels high.");
//   }
// }



// //A little test...
// var exampleFamilies = ["Helvetica", "Verdana", "Times New Roman", "Courier New"];
// var exampleSizes = [8, 10, 12, 16, 24, 36, 48, 96];
// for(var i = 0; i < exampleFamilies.length; i++) {
//   var family = exampleFamilies[i];
//   for(var j = 0; j < exampleSizes.length; j++) {
//     var size = exampleSizes[j] + "pt";
//     var style = "font-family: " + family + "; font-size: " + size + ";";
//     var pixelHeight = determineFontHeight(style);
//     console.log(family + " " + size + " ==> " + pixelHeight + " pixels high.");
//   }
// }









export {range, getRectFromContext, getNonTransparentPixels, determineFontHeight, determineFontWidth}