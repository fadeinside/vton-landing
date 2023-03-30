toLoadTheme();
toLoadLanguage();

function toLoadLanguage() {
	// Load local data
	const key = "data-lang";
	var loaded = localStorage.getItem(key);

	// If the lang was not loaded, then the default value was assigned
	if (loaded == null) {
		loaded = 0;
		localStorage.setItem(key, loaded);
	};

	// Now set the lang to the site
	$("html").attr(key, loaded);
	if (loaded != 0) {
		$("html").attr("lang", loaded);
	};
};

function toLoadTheme() {
	const targets = "#ID_THEME_SWITCHER, #ID_THEME_SWITCHER_HEADER";
	// Load local data
	const key = "data-theme";
	var loaded = localStorage.getItem(key);

	// Returns:
	// - null	->	Not loaded/Not saved
	// - "0"	->	Light theme
	// - "1"	->	Dark theme

	// If the theme was not loaded, then the default value was assigned
	if (loaded == null) {
		loaded = 1; // Dark theme by default
		localStorage.setItem(key, loaded);
	};

	// Now set the theme to the site
	$("html").attr(key, loaded);

	// Perform further only after full loading DOM content
	document.addEventListener("DOMContentLoaded", function () {
		// Setup the toggle in the right position
		if (loaded == 1) {
			$(targets).prop("checked", true);
		};

		// Change the value when pressed to the togl toggle
		$(targets).click(function () {
			var swithTo = (document.documentElement.getAttribute(key) == 0) ? 1 : 0;
			document.documentElement.setAttribute(key, swithTo);
			localStorage.setItem(key, swithTo);
			
			var current = (localStorage.getItem(key) == 0) ? false : true;
			$(targets).prop("checked", current);
			
			// Функция для принудительного обновления обьектов, зависимые от статичных значений темы
			updateForceThemedElements();
		});
	});
};

function updateForceThemedElements() {};