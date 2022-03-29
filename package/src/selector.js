const obInstitutionSbAnchor = document.createElement("a");
const obInstitutionSbModalContent = document.getElementById("institution-modal-content");
const obInstitutionSbHeading = document.getElementsByTagName('head')[0];
const obInstitutionModalHeader = document.getElementsByClassName("institution-modal-header")[0];
const obStyleEnum = {
    FontSize: 'FontSize',
    TextColor: 'TextColor'
};
includeCssFile("https://unpkg.com/flag-icons@6.1.1/css/flag-icons.min.css");

const _obInstitutionSbcreateHTMLNode = (element, className, node) => {
    // check if node exists before creating it
    const nodeElement = document.querySelector(`.${className}`);
    if(nodeElement) return nodeElement;

    const htmlEntity = document.createElement(element);
    htmlEntity.classList.add(className);
    document.body.appendChild(htmlEntity);
    return document.querySelector(`.${className}`);
}

const _obInstitutionSbcreateImgNode = ({url, className}) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "search image";
    img.className = className;
    return img;
}

const _createInstitutionContainer = () => {
    const institutionContainer = _obInstitutionSbcreateHTMLNode(
        'div',
		'institution-container',
		obInstitutionSbModalContent
    );
    institutionContainer.classList.add('institution-search-bx-body');
    return institutionContainer;
}

function _institutionSbSetSearchBox(searchBox, config) {
    let input = document.createElement("input");
    let search = obInstitutionSbAnchor.cloneNode(true);

    const searchImg = _obInstitutionSbcreateImgNode({
        url: "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgMzAgMzAiIHdpZHRoPSIzMHB4IiBoZWlnaHQ9IjMwcHgiPjxwYXRoIGQ9Ik0gMTMgMyBDIDcuNDg4OTk3MSAzIDMgNy40ODg5OTcxIDMgMTMgQyAzIDE4LjUxMTAwMyA3LjQ4ODk5NzEgMjMgMTMgMjMgQyAxNS4zOTY1MDggMjMgMTcuNTk3Mzg1IDIyLjE0ODk4NiAxOS4zMjIyNjYgMjAuNzM2MzI4IEwgMjUuMjkyOTY5IDI2LjcwNzAzMSBBIDEuMDAwMSAxLjAwMDEgMCAxIDAgMjYuNzA3MDMxIDI1LjI5Mjk2OSBMIDIwLjczNjMyOCAxOS4zMjIyNjYgQyAyMi4xNDg5ODYgMTcuNTk3Mzg1IDIzIDE1LjM5NjUwOCAyMyAxMyBDIDIzIDcuNDg4OTk3MSAxOC41MTEwMDMgMyAxMyAzIHogTSAxMyA1IEMgMTcuNDMwMTIzIDUgMjEgOC41Njk4Nzc0IDIxIDEzIEMgMjEgMTcuNDMwMTIzIDE3LjQzMDEyMyAyMSAxMyAyMSBDIDguNTY5ODc3NCAyMSA1IDE3LjQzMDEyMyA1IDEzIEMgNSA4LjU2OTg3NzQgOC41Njk4Nzc0IDUgMTMgNSB6Ii8+PC9zdmc+",
        className: "institution-search-icon"
    });

    searchBox.className += "institution-search-container";
    input.className += "institution-search-input";

    // Set attributes
    search.href = "#";
    input.setAttribute("placeholder", "Search...");
    input.setAttribute("onkeyup", "_institutionSbSearchAspsp(config)");

    searchBox.appendChild(searchImg);
    searchBox.appendChild(input);
    return searchBox;
};



function includeCssFile(filename) {
    const style = document.createElement('link');
    style.href = filename;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    obInstitutionSbHeading.append(style);
}

function includeFont(url) {
    // Google fonts hrefs
    const font = new URL(url).searchParams.get('family');
    const hrefs = ["https://fonts.googleapis.com", "https://fonts.gstatic.com", url]
    hrefs.forEach((href) => {
        const link = document.createElement('link');
        link.rel = "preconnect";
        link.href = href;
        obInstitutionSbHeading.append(link);
    });
    const body = document.getElementsByTagName("body")[0];
    body.style.fontFamily = `${font}, sans-serif`;
}

function _createInstitutionBankListView(body, institutionLogos, config) {
    if(config.countryFilter) _addBackArrow({visible: true});
    _changeHeading();
    _clearSearchFormInput();
    const institutionContainer = _createInstitutionContainer();

	institutionLogos.forEach((el) => {
		const institutionList = document.createElement('div');
		institutionList.className = "ob-institution ";
        institutionList.className += "ob-list-institution";

		let institutionRow = obInstitutionSbAnchor.cloneNode(true);
        let institutionImg = document.createElement("img");
        let instituionSpan = document.createElement("span");
        instituionSpan.className = "ob-span-text";
        instituionSpan.innerText = el.name;
		institutionList.appendChild(institutionRow);

		institutionImg.src = el.logo;
		institutionImg.className = "ob-institution-logo";
		institutionRow.className += `institution-${el.id}`;
		institutionRow.href = el.id;

		institutionRow.dataset.institution = el.id;
		institutionRow.appendChild(institutionImg);
        institutionRow.appendChild(instituionSpan);

        institutionContainer.appendChild(institutionList);
		institutionList.appendChild(institutionRow);
	});

    setOBModalStyles(config);
    const targetNode = document.getElementById(body);
	targetNode.appendChild(institutionContainer);

};

function createCountryListView(body, institutionLogos, config) {
    _changeHeading("Select your country");
    const arrow = _addBackArrow({visible: false});
    const countries = _getAllUniqueCountries(institutionLogos);
    const institutionContainer = _createInstitutionContainer();

    countries.forEach((country) => {
        const institutionList = document.createElement("div");
        institutionList.className = "ob-institution";
        institutionList.className += " ob-country-list"

        let institutionRow = obInstitutionSbAnchor.cloneNode(true);
        let institutionImg = document.createElement("span");
        let instituionSpan = document.createElement("span");
        instituionSpan.className = "ob-span-text";
        instituionSpan.innerText = _getCountryFromISO(country);
        institutionList.appendChild(institutionRow);

        institutionImg.className = `fi fi-${country.toLowerCase()}`;
        institutionRow.href = "#";
        institutionRow.setAttribute("data-country", country)
        institutionRow.appendChild(institutionImg);
        institutionRow.appendChild(instituionSpan);

        institutionContainer.appendChild(institutionList);
        institutionList.appendChild(institutionRow);
    });

    setOBModalStyles(config);

    const targetNode = document.getElementById(body);
	targetNode.appendChild(institutionContainer);

    const institutionList = document.querySelectorAll(".ob-institution > a");

    Array.from(institutionList).forEach((el) => el.addEventListener("click", (e) => {
        const country = e.currentTarget.getAttribute("data-country");
        const institutions = _filterByCountry(institutionLogos ,country);
        _clearAllInnerNodes();
        _createInstitutionBankListView(body, institutions, config);
    }))

    arrow.addEventListener("click", () => {
        _clearAllInnerNodes();
        createCountryListView(body, institutionLogos, config);
        arrow.style.display = "none";
        _clearSearchFormInput();
    })
}

function _institutionSbSearchAspsp(config) {
    const isCountryFilterActive = config.countryFilter;
    const input = document.querySelector(".institution-search-input");
    const filter = input.value.toUpperCase();
    const institutionList = document.querySelectorAll(".ob-institution");
    const countryList = document.querySelectorAll(".ob-country-list > a");

    if(isCountryFilterActive && countryList.length > 0) {
        institutionList.forEach((cn) => {
            const country = cn.textContent.toUpperCase();
            const countryIso = cn.getElementsByTagName("a")[0].getAttribute("data-country");
            if (country.indexOf(filter) > -1 || countryIso.toUpperCase().indexOf(filter) > -1) {
                cn.style.display = "";
            } else {
                cn.style.display = "none";
            }
        })

    } else {
        institutionList.forEach((inst) => {
            const institution = inst.textContent;
            if (institution.toUpperCase().indexOf(filter) > -1) {
                inst.style.display = "";
            } else {
                inst.style.display = "none";
            }
        })
    }
}


function setOBModalStyles(config) {
    const styleConfig = config.styles;
    const institutionList = Array.from(document.querySelectorAll(".ob-institution > a"));

    if(styleConfig?.backgroundColor) {
        obInstitutionSbModalContent.style.backgroundColor = config.backgroundColor;
    }

    if(styleConfig?.fontFamily) {
        includeFont(styleConfig.fontFamily);
    }

    if(styleConfig?.textColor) {
        changeTextStyles(obStyleEnum.TextColor, styleConfig.textColor, institutionList);
    }

    if(styleConfig?.fontSize) {
        changeTextStyles(obStyleEnum.FontSize, styleConfig.fontSize, institutionList);
    }

    if(styleConfig?.hoverColor) {
        _setOBHoverColor(styleConfig);
    }
}

function _institutionSbSetConfig(config){
    const redirect = config.redirectUrl;
    const close = _createCloseIcon();
    close.addEventListener("click", () => {
        window.location.href = (!redirect) ? document.URL : redirect;
    });
}

/**
 *
 * @param {Object} institutions
 * @param {HTMLNode} targetNode
 * @param {Object} config
 * @returns
 */
function institutionSelector(institutions, targetNode, config={}) {
    const institutionContentWrapper = document.querySelector(".institution-content-wrapper");

    _institutionSbSetConfig(config);

    const root = document.getElementById(targetNode);
    // create search
    const searchDiv = document.createElement("div");
    const searchNode = _institutionSbSetSearchBox(searchDiv, config);
    root.appendChild(searchNode);

    if (config.countryFilter) {
        createCountryListView(targetNode, institutions, config);
    } else {
        _createInstitutionBankListView(targetNode, institutions, config);
    }

    // create logo
    if (config.logoUrl) {
        const logoImage = _obInstitutionSbcreateImgNode({
            url: config.logoUrl,
            className: "institution-company-logo"
        })
        institutionContentWrapper.appendChild(logoImage);
    }

    setOBModalStyles(config);
};

const _setOBHoverColor = (config) => {
    const instList = Array.from(document.querySelectorAll(".ob-institution"));
    const hoverState = {
        hover: (event) => {
            event.currentTarget.style.backgroundColor = config.hoverColor;
        },
        out: (event) => {
          event.currentTarget.style.backgroundColor = "transparent";
        }
    }

    instList.map((el) => {
        el.addEventListener("mouseover", hoverState.hover, false);
        el.addEventListener("mouseout", hoverState.out, false);
    })
}

const changeTextStyles = (styleEnum, styleConfig, institutionList) => {
    institutionList.map((el) => {
        const spanElement = el.getElementsByTagName("span");
        Array.from(spanElement).map((spanEl) => {
            if(spanEl.classList.contains("ob-span-text")) {
                if(styleEnum == "FontSize") {
                    spanEl.style.fontSize = styleConfig;
                } else if(styleEnum == "TextColor") {
                    spanEl.style.color = styleConfig;
                }
            }
        })
    })
}


const _changeHeading = (text = "Select your bank") => {
    document.querySelector(
        ".institution-modal-header h2"
    ).innerHTML = text;
}


const _clearSearchFormInput = () => {
    const input = document.querySelector(".institution-search-input");
    if(input.value.length > 0) {
        input.value = "";
    }
}

const _addBackArrow = ({visible}) => {
    const arrow = document.querySelector(".institution-arrow-block ");
    if(arrow) {
        arrow.style.display = "flex";
        return arrow;
    }

    const arrowDiv = document.createElement("div");
    arrowDiv.className = "institution-arrow-block ";

    const img = document.createElement("img");
    img.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjAgNTEyIj48IS0tIEZvbnQgQXdlc29tZSBQcm8gNS4xNS40IGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIC0tPjxwYXRoIGQ9Ik0zNC41MiAyMzkuMDNMMjI4Ljg3IDQ0LjY5YzkuMzctOS4zNyAyNC41Ny05LjM3IDMzLjk0IDBsMjIuNjcgMjIuNjdjOS4zNiA5LjM2IDkuMzcgMjQuNTIuMDQgMzMuOUwxMzEuNDkgMjU2bDE1NC4wMiAxNTQuNzVjOS4zNCA5LjM4IDkuMzIgMjQuNTQtLjA0IDMzLjlsLTIyLjY3IDIyLjY3Yy05LjM3IDkuMzctMjQuNTcgOS4zNy0zMy45NCAwTDM0LjUyIDI3Mi45N2MtOS4zNy05LjM3LTkuMzctMjQuNTcgMC0zMy45NHoiLz48L3N2Zz4=";
    img.className = "ob-left-arrow";
    img.alt = "left arrow image";
    arrowDiv.appendChild(img);

    const link = document.createElement('a');
    link.href = "#";
    link.innerText = "Back"
    arrowDiv.appendChild(link);

    if(!visible) arrowDiv.style.display = "none";

    obInstitutionModalHeader.prepend(arrowDiv);
    return arrowDiv;
}

const _createCloseIcon = () => {
    const span = document.createElement("span");
    span.className = "institution-modal-close";
    span.innerHTML = "&times;";
    obInstitutionModalHeader.prepend(span);
    return span;
}

/** Utils **/

const _getAllUniqueCountries = (institutions) => {
    let arrCountries = [];
    institutions.forEach((aspsp) => {
        arrCountries.push(...aspsp.countries)
    });
    let uniqueCountries = [...new Set(arrCountries)];
    return uniqueCountries.sort((a, b) => a.localeCompare(b));
}

const _filterByCountry = (institutions, country) => {
    return institutions.filter((inst) => inst.countries.includes(country));
}

const _clearAllInnerNodes = () => {
    const node = document.querySelectorAll(".ob-institution");
    if(!node) return;
    Array.from(node).forEach((el) => {
        el.remove();
    });
}

const _getCountryFromISO = (country) => {
    let languageNames = new Intl.DisplayNames(['en'], {type: 'region'});
    return languageNames.of(country);
}
