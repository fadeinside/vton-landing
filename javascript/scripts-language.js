// Загрузить языковые файлы
import ru from "../locales/ru.json" assert { type: "json" };
import en from "../locales/en.json" assert { type: "json" };

// Инициировать каждую функцию после загрузки DOM контента
document.addEventListener("DOMContentLoaded", function () {
	updateAllLangObjects();
	updateLanguageOnChanged();
});

function updateLanguageOnChanged() {
	const currentLang = localStorage.getItem("data-lang");

	$("[switchLangTo]").each(function () {
		const switchLangTo = $(this).attr("switchLangTo");
		if (switchLangTo == currentLang) {
			$(this).addClass("col-bg-001");
		};
	});

	$("[switchLangTo]").on("click", function () {
		if ($(this).hasClass("col-bg-001")) return;
		const switchLangTo = String($(this).attr("switchLangTo"));

		$("[switchLangTo]").each(function () {
			$(this).removeClass("col-bg-001");
		});

		$(this).addClass("col-bg-001");
		localStorage.setItem("data-lang", switchLangTo);

		updateAllLangObjects();
		toLoadLanguage();
	});
};

function updateAllLangObjects() {
	const getLang = getCurrentLang();
	const getLangData = getCurrentLangData();

	console.groupCollapsed("Обновление языка...");
	$("span[lang], [placeholder-lang]").each(function () {
		const isPlaceholder = $(this).attr("placeholder-lang") != undefined;

		var getObjLangKey = $(this).attr("lang");
		if (isPlaceholder) { getObjLangKey = $(this).attr("placeholder-lang"); };
		var getObjLangString = getLangData[getObjLangKey];

		if (!getObjLangKey) {
			console.error(`Недопустимое или несуществующее значение "${getObjLangKey}" в`);
			console.error($(this)[0]); return;
		};
		
		// Строка языка определенная системой не найдета, попытка загрузить EN
		if (getObjLangString == undefined) {
			getObjLangString = en[getObjLangKey];
			// Строка EN не найдета, попытка загрузить RU
			if (getObjLangString == undefined) {
				getObjLangString = ru[getObjLangKey];
				// Строка не имеет значения или не существует, завершить работу со строкой
				if (getObjLangString == undefined) {
					console.error(`Отсутствует значение для "${getObjLangKey}"`);
					return;
				// RU определен, загружаем
				} else {
					console.warn(`Отсутствует [${getLang}] для ${getObjLangKey}. Унаследован [ru].`);
				};
			// EN определен, загружаем
			} else {
				console.warn(`Отсутствует [${getLang}] для ${getObjLangKey}. Унаследован [en].`);
			};
		} else {
			console.log(`[${getLang}] Строка получена: "${getObjLangString}"`);
		};

		var hasReplace = (getObjLangString.match(/\$replace\d/g) || []).length;
		if (hasReplace) {
			for (var i = 0; i <= hasReplace; i++) {
				var reg = new RegExp(`\\$replace${i}`, "g");
				var temp = getObjLangString.replace(reg, $(this).attr("replace" + i));
				getObjLangString = temp;
			};
		};

		if (isPlaceholder) {
			$(this).attr("placeholder", getObjLangString);
		} else {
			$(this).html(getObjLangString);
		};
	});
	console.groupEnd();
	$("html").attr("lang", getLang);
	console.log(`Текущий язык [${getLang}]`);
};

function getCurrentLocale() {
	var getLang = getCurrentLang();
	var getLangData2 = getCurrentLangData();
	var ruTemp = JSON.parse(JSON.stringify(ru));
	var enTemp = JSON.parse(JSON.stringify(en));
	
	var tempObject = Object.assign(ruTemp, getLangData2);
	if (!getLang.startsWith("ru"))
		tempObject = Object.assign(ruTemp, enTemp);

	return Object.assign(tempObject, getLangData2);
};

function getCurrentLangData() {
	const lang = getCurrentLang();

	if (lang.startsWith("ru") || lang.startsWith("by") || lang.startsWith("uk") || lang.startsWith("kz"))
		return ru;

	return en;
};

function getCurrentLang() {
	const loaded = localStorage.getItem("data-lang");

	if (loaded == 0 || loaded == null)
		return window.navigator.language;

	return loaded;
};

window.getCurrentLocale = getCurrentLocale;
// Credits; fadeinside, furkkinov