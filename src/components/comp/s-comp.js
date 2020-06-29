let selectText = function () {
    if (window.getSelection().isCollapsed) {
        return false
    }
    return true
}
let selectTextParamsAdd = function () {
    let SText = window.getSelection();

    let params;
    let indexOfStartSelect = SText.baseNode.parentElement.getAttribute("index");
    let indexOfEndSelect = SText.focusNode.parentElement.getAttribute("index");

    if (indexOfStartSelect == indexOfEndSelect) {
        params = {
            firstSumblIndex: Math.min(SText.anchorOffset, SText.extentOffset),
            lastSumblIndex: Math.max(SText.anchorOffset, SText.extentOffset) - 1,
            firstNodeSelect: SText.baseNode.parentElement,
            lastNodeSelect: SText.focusNode.parentElement
        }
    } else if (indexOfStartSelect < indexOfEndSelect) {
        params = {
            firstSumblIndex: SText.anchorOffset,
            lastSumblIndex: SText.extentOffset - 1,
            firstNodeSelect: SText.baseNode.parentElement,
            lastNodeSelect: SText.focusNode.parentElement
        }
    } else {
        params = {
            firstSumblIndex: SText.extentOffset,
            lastSumblIndex: SText.anchorOffset - 1,
            firstNodeSelect: SText.focusNode.parentElement,
            lastNodeSelect: SText.baseNode.parentElement
        }
    }
    params.string = SText.toString();
    return params;
}

function changeData(params, elem, propsButtons) {
    let indexFirstSelectElement = params.firstNodeSelect.getAttribute('index');
    let indexLastSelectElement = params.lastNodeSelect.getAttribute('index');
    if (params.lastNodeSelect == params.firstNodeSelect) {
        let newElements = [];
        console.log(11);
        if (params.firstSumblIndex) {
            let BeforeNewElementText = params.firstNodeSelect.innerText.substring(0, params.firstSumblIndex);
            let before = Object.assign({}, elem[indexFirstSelectElement]);
            before.text = BeforeNewElementText;
            newElements.push(before);
        }

        let newElementText = params.firstNodeSelect.innerText.substring(params.firstSumblIndex, params.lastSumblIndex + 1);
        let newElement = {
            text: newElementText,
            fontSize: propsButtons.fontSize,
            color: propsButtons.color,
            BGColor: propsButtons.BGColor
        }
        newElements.push(newElement);

        if (1 + params.lastSumblIndex != params.firstNodeSelect.innerText.length) {
            let afterNewElementText = params.firstNodeSelect.innerText.substring(params.lastSumblIndex + 1);
            let after = Object.assign({}, elem[indexFirstSelectElement]);
            after.text = afterNewElementText;
            newElements.push(after);
        }

        elem.splice(indexFirstSelectElement, 1, ...newElements);
    }
    if (params.lastNodeSelect != params.firstNodeSelect) {
        let newElements = [];
        if (params.firstSumblIndex) {
            let BeforeNewElementText = params.firstNodeSelect.innerText.substring(0, params.firstSumblIndex);
            let before = Object.assign({}, elem[indexFirstSelectElement]);
            before.text = BeforeNewElementText;
            newElements.push(before);
        }

        {
            let newElement = {
                text: params.string,
                fontSize: propsButtons.fontSize,
                color: propsButtons.color,
                BGColor: propsButtons.BGColor
            }
            newElements.push(newElement);
        }

        if (1 + params.lastSumblIndex < params.lastNodeSelect.innerText.length) {
            let afterNewElementText = params.lastNodeSelect.innerText.substring(params.lastSumblIndex + 1);
            let after = Object.assign({}, elem[indexLastSelectElement]);
            after.text = afterNewElementText;
            newElements.push(after);
        }
        let countDeliteElements = 1 + +indexLastSelectElement - indexFirstSelectElement;

        elem.splice(+indexFirstSelectElement, countDeliteElements, ...newElements);

    }

    return null;
};

let changetext = function (iLast, elem, element, ) {
    let childrens = element.target.children;

    if (iLast != null) {
        let previosChangeElement = childrens[iLast];
        if (previosChangeElement) {
            let indexPrevios = +previosChangeElement.getAttribute("index");
            if (indexPrevios > iLast) {
                elem.splice(iLast, 1);
            }
        } else if (!previosChangeElement) {
            elem.splice(iLast, 1);
        }

    }

    let sel = window.getSelection();
    let range = sel.getRangeAt(0);
    let pointedLiTag = range.startContainer.parentNode;
    let indexTag = +pointedLiTag.getAttribute('index');
    elem[indexTag].text = pointedLiTag.textContent;

    return [indexTag];
}


export default {
    methods: {

        changetext: function (e) {
            this.indexlastEditElement = changetext(this.indexlastEditElement, this.elem, e, this.indexCaret);
        },
        textWrappMouseUp: function (e) {

            this.selectIsText = selectText();
            if (this.selectIsText) {
                this.params = selectTextParamsAdd();
            }
        },
        moverСhangeData: function () {
            if (this.params) {
                // console.log(this.params);
                this.params = changeData(this.params, this.elem, this.propsButtons);
            }
        },
        fontSizeChange: function (e) {
            this.propsButtons.fontSize = e;
            this.moverСhangeData();
        },
        colorChange: function (e) {
            this.propsButtons.color = e;
            this.moverСhangeData();
        },
        backgroundColorChange: function (e) {
            this.propsButtons.BGColor = e;
            this.moverСhangeData();
        },

    },
    props: ["dataA"],
    data() {
        return {
            elem: [{
                text: 'Enter text',
                fontSize: '18',
                color: '#000000',
                BGColor: "#ffffff"
            }, ],
            propsButtons: {
                fontSize: 18,
                color: "#000000",
                BGColor: "#ffffff",
            },
            selectIsText: false,
            params: null,
            indexlastEditElement: null,
            indexCaret: null,
            caretData: null

        }
    }
};