/**
 * Скрипт для редактирования изображения
 */

/**
 * Атрибут редактируемого элемента
 */
const CURRENT_EDIT = 'currentEditable';

/**
 * Атрибут для получения текущего редактируемого элемента
 */
const CURRENT_EDIT_ELEMENT = `[${CURRENT_EDIT}="true"]`;

const EMPTY = '';

/**
 * Обновление панели инструментов
 * @param {object} event 
 */
const updateTools = (event) => {
    const attrs = {
        'data-style-italic': '#style',
        'data-style-underline': '#underline',
        'data-style-weight': '#weight'
    };
    let currentEditable = $(CURRENT_EDIT_ELEMENT);

    for (attr in attrs) {
        if (currentEditable.attr(attr)) {
            $(attrs[attr]).addClass('active-style-button');
        } else {
            $(attrs[attr]).removeClass('active-style-button');
        }
    }

    let fontSize = currentEditable.css('font-size').replace('px', '');
    $('.quantity').attr('value', fontSize);
};

/**
 * События начала редактирования текста
 */
const editableHandler = (event) => {
    //Убираем атрибут редактирования с прошлого редактируемого элемента
    $(CURRENT_EDIT_ELEMENT).attr(CURRENT_EDIT, 'false');
    //Указываем, что данный элемент редактируется
    $(event.target).attr(CURRENT_EDIT, 'true');
    updateTools();
    console.log('Update editable element');
};

/**
 * Получение выделенного текста
 */
const getSelection = () => {
    return window.getSelection().toString();
};

/**
 * Обернуть текст в span
 * TODO: доработать
 */
const wrapText = () => {
    if (getSelection() == EMPTY) return false;


    let range = window.getSelection().getRangeAt(0);
    let selectionContents = range.extractContents();
    let span = document.createElement('span');
    span.appendChild(selectionContents);

    //Убираем атрибут редактирования с прошлого редактируемого элемента
    $(CURRENT_EDIT_ELEMENT).attr(CURRENT_EDIT, 'false');
    //Указываем, что данный элемент редактируется
    $(span).attr(CURRENT_EDIT, 'true');

    range.insertNode(span);
};

const toggleCss = (attrPointer, cssProperty, cssValueOn, cssValueOff, item = null) => {
    let editableElement = $(CURRENT_EDIT_ELEMENT);

    if (editableElement.attr(attrPointer)) {
        editableElement.css(cssProperty, cssValueOff);
        editableElement.removeAttr(attrPointer);
        $(item).removeClass('active-style-button');
        return;
    }

    editableElement.attr(attrPointer, 'true');
    editableElement.css(cssProperty, cssValueOn);
    $(item).addClass('active-style-button');
}

/**
 * Добавления к тексту жирного
 * @param {object} event 
 */
const editWeightText = (event) => {
    wrapText();
    toggleCss('data-style-weight', 'font-weight', 'bold', 'normal', '#weight');
}

/**
 * Курсив для текста
 * @param {object} event 
 */
const editItalicText = (event) => {
    toggleCss('data-style-italic', 'font-style', 'italic', 'normal', '#style');
}

const editUnderlineText = (event) => {
    toggleCss('data-style-underline', 'text-decoration', 'underline', 'none', '#underline');
}

const editSizeText = (event) => {
    $(CURRENT_EDIT_ELEMENT).css('font-size', $('.quantity').val() + 'px');
}

/**
 * Изменение цвета
 * 
 * @param {object} event 
 */
const editColor = (event) => {
    $('[data-edit-item="true"]').attr('stroke', $('.pcr-result').val());
    $(CURRENT_EDIT_ELEMENT).css('color', $('.pcr-result').val());
};

/**
 * Масштаба
 * @param {object} event 
 */
const scaleCanvas = (event) => {
    let scale = +$('.scale').val();
    $('.main-svg').css('transform', `scale(${scale / 100})`);
}

/**
 * 
 * 
 * @param {object} event 
 */
const getToolsPanel = (event) => {
    let type = $(event.target).attr('data-type');
    $('.tools-panel').hide();

    if (type == 'text') $('.tools-panel-text').show();
    if (type == 'element') $('.tools-panel-text').show();
    if (type == 'img') $('.tools-panel-file').show();
}

const removeNode = (event) => {
    $(CURRENT_EDIT_ELEMENT).remove();
}

/**
 * Загрузка файлов
 */
$('[type="file"]').change((event) => {
    let img = $('[type="file"]')[0].files[0];
    let reader = new FileReader();
    reader.readAsDataURL(img);

    reader.onloadend = () => {
        $(CURRENT_EDIT_ELEMENT).attr('src', reader.result);
    }
});

$('#weight').click(editWeightText);
$('#style').click(editItalicText);
$('#underline').click(editUnderlineText);
$('.quantity').keyup(editSizeText);
$('.size-tool').click(editSizeText);
$('.pcr-save').click(editColor);
$('.scale').keyup(scaleCanvas);
$('.pcr-picker').mousemove(editColor);
$('.delete-button').click(removeNode);

$('.size-tool-button').click((event) => {
    let isPlus = $(event.target).hasClass('plus');
    let currentScale = +$('.scale').val();

    if (isPlus) {
        currentScale += 10;
    } else if (currentScale > 10) {
        currentScale -= 10;
    }

    $('.scale').val(currentScale);
    $('.main-svg').css('transform', `scale(${currentScale / 100})`);
})