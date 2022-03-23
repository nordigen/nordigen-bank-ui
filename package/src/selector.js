const obInstitutionSbAnchor = document.createElement("a");
const obInstitutionSbModalContent = document.getElementById("institution-modal-content");
const obInstitutionSbBackArrow = document.querySelector(".left-arrow");
const StyleEnum = {
    FontSize: 'FontSize',
    TextColor: 'TextColor'
};
includeCssFile("../node_modules/flag-icons/css/flag-icons.min.css");


const _obInstitutionSbcreateHTMLNode = (element, className, node) => {
    // check if node exists before creating it
    const nodeElement = document.querySelector(`.${className}`);
    if(nodeElement) {
        return nodeElement;
    }

    const htmlEntity = document.createElement(element);
    htmlEntity.classList.add(className);
    document.body.appendChild(htmlEntity);
    return document.querySelector(`.${className}`);
}

const _obInstitutionSbcreateImgNode = ({url, className}) => {
    const img = document.createElement("img");
    img.src = url;
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

function _institutionSbSetSearchBox(searchBox) {
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
    input.setAttribute("onkeyup", "_institutionSbSearchAspsp()");

    searchBox.appendChild(searchImg);
    searchBox.appendChild(input);

    return searchBox;
};


function includeCssFile(filename) {
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('link');
    style.href = filename;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    head.append(style);
}


function _createInstitutionBankListView(body, institutionLogos, config) {
    _changeHeading();
    const institutionContainer = _createInstitutionContainer();

	// Set logos
	institutionLogos.forEach((el) => {
		const institutionList = document.createElement('div');
		institutionList.className = 'list-institution';

		let institutionRow = obInstitutionSbAnchor.cloneNode(true);
        let institutionImg = document.createElement("img");
        let instituionSpan = document.createElement("span");
        instituionSpan.className = "span-text";
        instituionSpan.innerText = el.name;

		institutionList.appendChild(institutionRow);

		institutionImg.src = el.logo;
		institutionImg.className = 'institution-logo';
		institutionRow.className += 'institution-' + el.id;
		institutionRow.href = '#';

		institutionRow.dataset.institution = el.id;
		institutionRow.appendChild(institutionImg);
        institutionRow.appendChild(instituionSpan);

        institutionContainer.appendChild(institutionList);
		institutionList.appendChild(institutionRow);
        setOBModalStyles(config);
	});

    const targetNode = document.getElementById(body);
	targetNode.appendChild(institutionContainer);
};

function createCountryListView(body, institutionLogos, config) {
    _changeHeading("Select your country");
    const countries = _getAllUniqueCountries(institutionLogos);
    const institutionContainer = _createInstitutionContainer();

    countries.forEach((country) => {
        const institutionList = document.createElement('div');
        institutionList.className = 'list-institution';
        institutionList.className += " country-list"

        let institutionRow = obInstitutionSbAnchor.cloneNode(true);
        let institutionImg = document.createElement("span");
        let instituionSpan = document.createElement("span");
        instituionSpan.className = "span-text";
        instituionSpan.innerText = _getCountryFromISO(country);
        institutionList.appendChild(institutionRow);

        institutionImg.className = `fi fi-${country.toLowerCase()}`;
        institutionRow.href = '#';
        institutionRow.setAttribute("data-country", country)
        institutionRow.appendChild(institutionImg);
        institutionRow.appendChild(instituionSpan);

        institutionContainer.appendChild(institutionList);
        institutionList.appendChild(institutionRow);
        setOBModalStyles(config);
    });

    const targetNode = document.getElementById(body);
	targetNode.appendChild(institutionContainer);

    const institutionList = document.querySelectorAll(".list-institution > a");

    Array.from(institutionList).forEach((el) => el.addEventListener("click", (e) => {
        const country = e.currentTarget.getAttribute("data-country");
        const institutions = _filterByCountry(institutionLogos ,country);
        _clearAllInnerNodes();
        _createInstitutionBankListView(body, institutions, config);
    }))

    obInstitutionSbBackArrow.addEventListener("click", () => {
        _clearAllInnerNodes();
        createCountryListView(body, institutionLogos, config);
    })
}

function _institutionSbSearchAspsp() {
    let input, filter, txtValue;
    input = document.querySelector(".institution-search-input");
    filter = input.value.toUpperCase();
    const institutionList = document.querySelectorAll(".list-institution");

    for (let i = 0; i < institutionList.length; i++) {
        txtValue = institutionList[i].textContent || i.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            institutionList[i].style.display = "";
        } else {
            institutionList[i].style.display = "none";
        }
    }
}

function setOBModalStyles(config) {
    const styleConfig = config.styles;
    const institutionList = Array.from(document.querySelectorAll(".list-institution > a"));

    if(styleConfig.backgroundColor) {
        obInstitutionSbModalContent.style.backgroundColor = styleConfig.backgroundColor;
    }

    if(styleConfig.fontFamily) {
        const font = styleConfig.fontFamily;
        const fontObj = new FontFace(font, `url(./fonts/${font}.ttf)`);

        fontObj.load().then((fnt) => {
            document.fonts.add(fnt);
            document.body.style.fontFamily = font;
        }).catch((error) => {
            throw new Error(error);
        });
    }

    if(styleConfig.textColor) {
        changeTextStyles(StyleEnum.TextColor, styleConfig.textColor, institutionList);
    }

    if(styleConfig.fontSize) {
        changeTextStyles(StyleEnum.FontSize, styleConfig.fontSize, institutionList);
    }

    if(styleConfig.hoverColor) {
        const instList = Array.from(document.querySelectorAll(".list-institution"));
        const hoverState = {
            hover: (event) => {
                if(event.target.tagName === "DIV") {
                    event.target.style.backgroundColor = styleConfig.hoverColor;
                }
            },
            out: (event) => {
              event.target.style.backgroundColor = "transparent";
            }
        }

        instList.map((el) => {
            el.addEventListener("mouseover", hoverState.hover, false);
            el.addEventListener("mouseout", hoverState.out, false);
        })
    }

}

function _institutionSbSetConfig(config){
    const close = document.querySelector(".institution-modal-close");
    close.addEventListener("click", () => {
        window.location.href = (!config.redirectUrl) ? document.URL : config.redirectUrl;
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
    const searchNode = _institutionSbSetSearchBox(searchDiv);
    root.appendChild(searchNode);

    if (config.countryFilter) {
        createCountryListView(targetNode, institutions, config);
    } else {
        obInstitutionSbBackArrow.remove();
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

const changeTextStyles = (styleEnum, styleConfig, institutionList) => {
    institutionList.map((el) => {
        const spanElement = el.getElementsByTagName("span");
        Array.from(spanElement).map((spanEl) => {
            if(spanEl.classList.contains("span-text")) {
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


/** Utils **/

const _getAllUniqueCountries = (institutions) => {
    let arrCountries = [];
    institutions.forEach((aspsp) => {
        arrCountries.push(...aspsp.countries)
    });
    let uniqueCountries = [...new Set(arrCountries)];
    return uniqueCountries;
}

const _filterByCountry = (institutions, country) => {
    return institutions.filter((inst) => inst.countries.includes(country));
}

const _clearAllInnerNodes = () => {
    const node = document.querySelectorAll(".list-institution");
    if(!node) return;
    Array.from(node).forEach((el) => {
        el.remove();
    })
}

const _getCountryFromISO = (country) => {
    let languageNames = new Intl.DisplayNames(['en'], {type: 'region'});
    return languageNames.of(country);
}

