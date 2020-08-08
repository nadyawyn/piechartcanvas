window.addEventListener('DOMContentLoaded', function () {

	let myCanvas = document.getElementById("myCanvas");
	myCanvas.width = 300;
	myCanvas.height = 300;

	let ctx = myCanvas.getContext("2d");

	function drawLine(ctx, startX, startY, endX, endY) {
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		ctx.stroke();
	}

	function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle) {
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
		ctx.stroke();
	}

	function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
		ctx.closePath();
		ctx.fill();
	}

	let Piechart = function (options) {
		this.options = options;
		this.canvas = options.canvas;
		this.ctx = this.canvas.getContext("2d");
		this.colors = options.colors;

		this.draw = function () {
			let totalValue = 0;
			let colorIndex = 0;
			for (let categ in this.options.data) {
				let val = this.options.data[categ];
				totalValue += val;
			}

			let startAngle = 0;
			for (let categ in this.options.data) {
				let val = this.options.data[categ];
				let sliceAngle = 2 * Math.PI * val / totalValue;

				drawPieSlice(
					this.ctx,
					this.canvas.width / 2,
					this.canvas.height / 2,
					Math.min(this.canvas.width / 2, this.canvas.height / 2),
					startAngle,
					startAngle + sliceAngle,
					this.colors[colorIndex % this.colors.length]
				);

				startAngle += sliceAngle;
				colorIndex++;
			}

		};
	};


	let myVinyls = {
		"Classical music": 2,
		"Alternative rock": 14,
		"Pop": 4,
		"Jazz": 12
	};


	let myPiechart = new Piechart({
		canvas: myCanvas,
		data: myVinyls,
		colors: ["#fde23e", "#f16e23", "#57d9ff", "teal"]
	});
	myPiechart.draw();

});