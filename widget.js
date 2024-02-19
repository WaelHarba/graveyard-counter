command = "{{counterCommand}}";
editing = { editing };
window.addEventListener("onWidgetLoad", function (obj) {
	if (editing == true) {
		$("#main-container").removeClass("main-container-animated");
		$("#widget-container").removeClass("widget-container-animated");
		$("#command-div").removeClass("command-div-animated");
	}
	SE_API.counters.get(command).then((counter) => {
		$("#counter-value").html(counter.value);
	});
});

window.addEventListener("onEventReceived", function (obj) {
	const listener = obj.detail.listener;
	const data = obj.detail.event;
	if (listener === "bot:counter" && data.counter === command && editing != true) {
		$("#audioCustomWidget").get(0).play();
		$("#widget-container")
			.animate({ top: "0%" }, "slow", function () {
				$("#command-div").fadeIn().delay(3000);
				$("#counter-value").html(data.value);
				$("#command-div").fadeOut();
			})
			.delay(4500);
		$("#widget-container").animate({ top: "100%" }, "slow");
	}
});
