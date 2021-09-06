const institutionSbAnchor = document.createElement("a");
const modalContent = document.getElementById("institution-modal-content");

const _createHTMLNode = (element, className, node) => {
    const htmlEntity = document.createElement(element);
    htmlEntity.classList.add(className);
    document.body.appendChild(htmlEntity);
    return document.querySelector(`.${className}`);
}

const _insertAfter = (newNode, existingNode) => {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}


function _institutionSbSetSearchBox(searchBox){
    let input = document.createElement("input");
    let search = institutionSbAnchor.cloneNode(true);
    let searchImg = document.createElement("img");
    searchImg.src = "../dist/assets/images/search.svg";
    searchImg.className = "institution-search-icon";

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
    
	const institutionContainer = _createHTMLNode(
		'div',
		'institution-container',
		modalContent
	);
	institutionContainer.classList.add('institution-search-bx-body');

	// Set logos
	institutionLogos.forEach((el) => {
		const institutionList = document.createElement('div');
		institutionList.className = 'list-institution';

		let institutionRow = institutionSbAnchor.cloneNode(true);
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
    
    let input, filter,txtValue;
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


function _institutionSbSetConfig(config){    
    const close = document.querySelector(".institution-modal-close");
    close.addEventListener("click", () => {
        window.location.href = (!config.redirect_url) ? document.URL : config.redirect_url;
    });
}    

function institutionSelector(institutions, targetNode, config={}) {

    _institutionSbSetConfig(config);

    this.instituionsLogos = institutions;
    this.root = document.getElementById(targetNode);
    this.root.className += "institution-search-bx";

    // create search
    const searchDiv = document.createElement("div");
    const searchNode = _institutionSbSetSearchBox(searchDiv);

    this.root.appendChild(searchNode);

    _createInstitutionBankList(targetNode, this.instituionsLogos);

};
