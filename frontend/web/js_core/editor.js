/**
 * Скрипт для редактирования изображения
 */
let draggable;

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

    if (currentEditable.prop('tagName') == 'svg') {
        if (currentEditable.find('[data-edit-item="true"]').attr('stroke')) {
            $('.pcr-button').css('color', currentEditable.find('[data-edit-item="true"]').attr('stroke'));
        } else {
            $('.pcr-button').css('color', currentEditable.find('[data-edit-item="true"]').attr('fill'));
        }
    } else {
        $('.pcr-button').css('color', currentEditable.css('color'));
    }

    if ($(CURRENT_EDIT_ELEMENT).attr('data-type') == 'background-color') {
        $('.pcr-button').css('color', currentEditable.css('background'));
        return;
    }

    let fontSize = currentEditable.css('font-size').replace('px', '');
    $('.quantity').attr('value', fontSize);
};

/**
 * События начала редактирования текста
 */
const editableHandler = (event) => {
    let target = $(event.target);
    let svg = ['path', 'g', 'svg'];

    for (let i = 0; i < svg.length; i++) {
        if (target.prop('tagName') == svg[i]) {
            while (target.prop('tagName') != 'svg') {
                target = target.parent();
            }
            continue;
        }
    }

    console.log(target.prop('tagName'));

    event.stopPropagation();

    if (!draggable) {
        draggable = new Moveable(document.body, {
            draggable: true,
            throttleDrag: 0,
            resizable: true,
            throttleResize: 0,
            scalable: true,
            throttleScale: 0,
            keepRatio: false,
            snappable: true,
            snapThreshold: 5,
            snapCenter: true,
            verticalGuidelines: [100, 200, 300],
            horizontalGuidelines: [0, 100, 200],
            elementGuidelines: [document.querySelector('.main-svg')],
            rotatable: true,
            throttleRotate: 0,
            rotationPosition: "top",
        }).on("drag", ({ target, left, top, beforeDelta }) => {
            target.style.left = left + "px";
            target.style.top = top + "px";
        }).on("resize", ({
            target,
            width,
            height,
            dist
        }) => {
            target.style.width = width + "px";
            target.style.height = height + "px";
        });

        const frame = {
            translate: [0, 0],
            rotate: 0
        };
        draggable.on("resizeStart", ({ target, set, setOrigin, dragStart }) => {
            // Set origin if transform-orgin use %.
            setOrigin(["%", "%"]);

            // If cssSize and offsetSize are different, set cssSize. (no box-sizing)
            const style = window.getComputedStyle(target);
            const cssWidth = parseFloat(style.width);
            const cssHeight = parseFloat(style.height);
            set([cssWidth, cssHeight]);

            // If a drag event has already occurred, there is no dragStart.
            dragStart && dragStart.set(frame.translate);
        }).on("resize", ({ target, width, height, drag }) => {
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;

            // get drag event
            frame.translate = drag.beforeTranslate;
            target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)`;
        }).on("resizeEnd", ({ target, isDrag, clientX, clientY }) => {
            console.log("onResizeEnd", target, isDrag);
        });
        draggable.on("rotateStart", ({set }) => {
            set(frame.rotate);
        }).on("rotate", ({ target, beforeRotate }) => {
            frame.rotate = beforeRotate;
            target.style.transform = `rotate(${beforeRotate}deg)`;
            $('.rotate-input').val(Math.round(beforeRotate));
        }).on("rotateEnd", ({ target, isDrag, clientX, clientY }) => {
            console.log("onRotateEnd", target, isDrag);
        });
    }

    //Убираем атрибут редактирования с прошлого редактируемого элемента
    $(CURRENT_EDIT_ELEMENT).attr(CURRENT_EDIT, 'false');
    //Указываем, что данный элемент редактируется
    target.attr(CURRENT_EDIT, 'true');
    draggable.target = $(CURRENT_EDIT_ELEMENT).get(0);

    updateTools();
    $(CURRENT_EDIT_ELEMENT).keyup((event) => {
        draggable.updateRect();
    });
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
    if ($(CURRENT_EDIT_ELEMENT).prop('tagName') == 'svg') {
        $(CURRENT_EDIT_ELEMENT).find('[data-edit-item="true"]').attr('stroke', $('.pcr-result').val());
        $(CURRENT_EDIT_ELEMENT).find('[data-edit-item="true"]').attr('fill', $('.pcr-result').val());
        return;
    }
    if ($(CURRENT_EDIT_ELEMENT).attr('data-type') == 'background-color') {
        $(CURRENT_EDIT_ELEMENT).css('background', $('.pcr-result').val());
        return;
    }
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
    let type = $(CURRENT_EDIT_ELEMENT).attr('data-type');
    $('.tools-panel-default').hide();
    $('.tools-panel-text').show();
    $('.tool-item').hide();

    console.log("Type tools panel: " + type);

    if (type == 'text') {
        console.log('In text');
        $('.font-tool').show();
        $('.color-tool').show();
        $('.size-tool').show();
        $('.style-tool').show();
        $('.delete-tool').show();
        $('.rotate-input').show();
        return;
    }
    if (type == 'element') {
        console.log('In element');
        $('.color-tool').show();
        $('.delete-tool').show();
        $('.rotate-input').show();
        return;
    }
    if (type == 'img') {
        console.log('In img');
        $('.file-tool').show();
        $('.delete-tool').show();
        $('.rotate-input').show();
        return;
    }
    if (type == 'background-color') {
        $('.color-tool').show();
        $('.rotate-input').show();
        return;
    }

    $('.tools-panel-text').hide();
    $('.tool-item').hide();
    $('.tools-panel-default').show();
}

const removeNode = (event) => {
    $(CURRENT_EDIT_ELEMENT).remove();
}

const addTextNode = (event) => {
    let width = (parseInt($('.main-svg').css('width')) / 2) + 'px';
    let height = (parseInt($('.main-svg').css('height')) / 2) + 'px';
    const defaultText = 'Ваш текст';

    console.log(width);
    console.log(height);

    $('.main-svg').prepend(`
    <div style="
            position: absolute;
            margin-left: ${width};
            margin-top: ${height};
            z-index: 10;
            font-size: 25px;
            color: #000;
        "

         contenteditable="true" 
         class="draggable" 
         data-set="true" 
         data-type="text"
         >
         
         ${defaultText}
         
    </div>
    `);

    $('[data-set="true"]').click(editableHandler);
    $('[data-set="true"]').click(getToolsPanel);

    $('[data-type="text"]').dblclick((event) => {
        $(event.target).removeClass('draggable');
    });

    $('[data-type="text"]').blur((event) => {
        $(event.target).addClass('draggable');
    });

    $('aside').removeClass('sidebar--is-visible');
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
    draggable.updateRect();
});

$('.pcr-swatches').click((event) => {
    if (event.target.tagName != 'BUTTON') return;

    let color = $(event.target).css('color');

    if ($(CURRENT_EDIT_ELEMENT).prop('tagName') == 'svg') {
        $(CURRENT_EDIT_ELEMENT).find('[data-edit-item="true"]').attr('stroke', color);
        return;
    }
    if ($(CURRENT_EDIT_ELEMENT).attr('data-type') == 'background-color') {
        $(CURRENT_EDIT_ELEMENT).css('background', $('.pcr-result').val());
        return;
    }
    $(CURRENT_EDIT_ELEMENT).css('color', color);
});

$('.add-item').click((event) => {
    if ($(event.target).attr('value') == 'text') {
        addTextNode();
    }
})

$('.main-svg').click((event) => {
    let element = $(event.target);

    if (element.attr('data-set')) return;
    $('.tools-panel-text').hide();
    $('.tool-item').hide();
    $('.tools-panel-default').show();
    $('.font-section').hide();
    $('.category-section').show();
    $('.fonts-list').empty();
})

$('.save-button-menu').click((event) => {
    $('.dropdown-menu-save').toggleClass('show-block');
});

$('.rotate-input').keyup((event) => {
    let rotate = $('.rotate-input').val();
    $(CURRENT_EDIT_ELEMENT).css('transform', `rotate(${rotate}deg)`);
    draggable.updateRect();
})