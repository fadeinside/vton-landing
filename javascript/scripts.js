// Инициировать каждую функцию после загрузки DOM контента
document.addEventListener("DOMContentLoaded", function () {
	updateHeaderBorder()
});

function updateHeaderBorder() {
	$(document).scroll(function () {
		var deadline = 80;
		var headerKey = "#ID_GLOBAL_HEADER_MENU"
		var setClass = "bor-b-1px-col009";
		
		if (document.body.scrollTop > deadline || document.documentElement.scrollTop > deadline) {
			$(headerKey).addClass(setClass);
		} else {
			$(headerKey).removeClass(setClass);
		};
	});
};