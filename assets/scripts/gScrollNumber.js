function gScrollNumber(el, option) {
	this.container = $(el);
	this.option = option;
	this.container.css({
		position: "relative",
		padding: "0",
		overflow: "hidden"
	});
	var height = this.container.height();
	this.subWidth = option.width;
	this.subHeight = height;
	this.autoSizeContainerWidth = option.autoSizeContainerWidth;
	this.col = '<span class="g-num-item" style="bottom: 0">' +
		'<i>0</i>' + '<i>9</i>' + '<i>8</i>' +
		'<i>7</i>' + '<i>6</i>' + '<i>5</i>' +
		'<i>4</i>' + '<i>3</i>' + '<i>2</i>' +
		'<i>1</i>' + '<i>0</i>' + '<i> </i>' +
		'</span>';
}

gScrollNumber.prototype.run = function(value) {
	this.currentValue = value;
	var self = this;
	var valueString = value.toString();

	if (self.autoSizeContainerWidth) {
		self.container.css({
			"width": valueString.length * self.subWidth + "px",
			transition: "width 0.5s"
		});
	}

	var oldValue = self.container.innerHTML || 0;
	var oldArray = Array.from(oldValue.toString());

	var oldLength = self.container.children(".g-num-item").length;

	if (valueString.length > oldLength) {
		for (var i = 0; i < valueString.length - oldLength; i++) {
			self.container.append(self.col);
			self.container.children(".g-num-item").eq(oldLength + i).css({
				right: self.subWidth * (oldLength + i) + "px"
			});
		}
	} else if (valueString.length < oldLength) {
		self.container.css({
			"width": valueString.length * self.subWidth + "px",
			transition: "width 1s"
		});
		for (var i = 0; i < oldLength - valueString.length; i++) {
			setTimeout(function() {
				self.container.children(".g-num-item:last").remove()
			}, 750);
		}
	}

	$(".g-num-item").css({
		position: "absolute",
		width: self.subWidth + "px",
		height: 12 * self.subHeight + "px"
	});

	$(".g-num-item i").css({
		width: self.subWidth + "px",
		height: self.subHeight + "px",
		lineHeight: self.subHeight + "px",
		textAlign: "center",
		fontSize: self.option.fontSize + "px",
		color: self.option.color,
		display: "block",
		fontStyle: "normal"
	});

	setTimeout(function() {
		for (var i = 0; i < valueString.length; i++) {
			var y = -((parseInt(valueString[i]) + 1) * self.subHeight);

			self.container.children(".g-num-item").eq(valueString.length - i - 1).css({
				bottom: y + "px",
				transition: "bottom 0.7s"
			})
		}
		self.container.innerHTML = value;
	}, 0);
};

gScrollNumber.prototype.getCurrentValue = function() {return this.currentValue;};

var scrollNumber0 = new gScrollNumber(".scroll-number-0", {
	width: 30,
	fontSize: 60,
	autoSizeContainerWidth: true
});

var value0 = 0;

scrollNumber0.run(0);

setTimeout(function() {
	var increment = Math.floor(Math.random() * 90 + 10);
	scrollNumber0.run(15);
}, 1000);