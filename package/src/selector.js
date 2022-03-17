const obInstitutionSbAnchor = document.createElement("a");
const obInstitutionSbModalContent = document.getElementById("institution-modal-content");

const _obInstitutionSbcreateHTMLNode = (element, className, node) => {
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

function _institutionSbSetSearchBox(searchBox){
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


function _createInstitutionBankList(body, institutionLogos) {

	const institutionContainer = _obInstitutionSbcreateHTMLNode(
		'div',
		'institution-container',
		obInstitutionSbModalContent
	);
	institutionContainer.classList.add('institution-search-bx-body');

	// Set logos
	institutionLogos.forEach((el) => {
		const institutionList = document.createElement('div');
		institutionList.className = 'list-institution';

		let institutionRow = obInstitutionSbAnchor.cloneNode(true);
        let institutionImg = document.createElement("img");
        let instituionSpan = document.createElement("span");
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
	});

    const targetNode = document.getElementById(body);
	targetNode.appendChild(institutionContainer);
};

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
        var fontObj = new FontFace(font, `url(./fonts/${font}.ttf)`);

        fontObj.load().then((fnt) => {
            document.fonts.add(fnt);
            document.body.style.fontFamily = font;

        }).catch((error) => {
            throw new Error(error);
        });
    }

    if(styleConfig.textColor) {
        institutionList.map((el) => {
            el.getElementsByTagName("span")[0].style.color = styleConfig.textColor;
        })
    }

    if(styleConfig.fontSize) {
        institutionList.map((el) => {
            el.getElementsByTagName("span")[0].style.fontSize = styleConfig.fontSize;
        })
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

    const instituionsLogos = institutions;
    const root = document.getElementById(targetNode);

    // create search
    const searchDiv = document.createElement("div");
    const searchNode = _institutionSbSetSearchBox(searchDiv);
    root.appendChild(searchNode);

    _createInstitutionBankList(targetNode, instituionsLogos);

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
