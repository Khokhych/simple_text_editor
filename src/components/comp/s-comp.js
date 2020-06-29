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

let getCaretPosition = function (el) {
    let caretOffset = 0,
        sel;
    if (typeof window.getSelection !== "undefined") {
        let range = window.getSelection().getRangeAt(0);
        let selected = range.toString().length;
        let preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(el);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length - selected;
    }

    function setCaret() {
        var el = document.getElementById("sss");
        console.log(el.childNodes[0]);
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(el.childNodes[0], 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        el.focus();
    }
    // setCaret();

    // setSelection(el, caretOffset, caretOffset);
    // el.setSelectionRange(caretOffset, caretOffset);
}

export default {
    methods: {

        changetext: function (e) {
            // getCaretPosition(e.target);
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
    props: [
        "elem",
        "propsButtons",
        "selectIsText"
    ],
    data() {
        return {}
    },
    watch: {
        elem: function (elem, oldVal) {
            try {
                for (let index = 0; index < elem.length; index++) {
                    let item = elem[index];
                    if (+item.fontSize === +elem[index + 1].fontSize) {
                        if (item.color === elem[index + 1].color) {
                            if (item.BGColor === elem[index + 1].BGColor) {
                                elem[index + 1].text = elem[index].text + elem[index + 1].text;
                                elem.splice(index, 1);
                            }
                        }
                    }
                }
            } catch (error) {

            }
        }
    }
};