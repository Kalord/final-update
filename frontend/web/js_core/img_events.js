(function() {
    /**
     * Атрибут редактируемого элемента
     */
    const CURRENT_EDIT = 'currentEditable';

    /**
     * Атрибут для получения текущего редактируемого элемента
     */
    const CURRENT_EDIT_ELEMENT = `[${CURRENT_EDIT}="true"]`;

    const renderHtml = (html) => {
        html = JSON.parse(html);
        $('.main-svg').empty();
        $('.main-svg').append(html);
        if (draggable) draggable.target = ""

        let imgWidth = parseInt($('.main-svg').css('width'));
        let canvasWidth = parseInt($('.container .h-100').css('width'));

        console.log("Img width: " + imgWidth);
        console.log("Canvas width: " + canvasWidth);

        if (imgWidth > canvasWidth) {
            let scale = Math.round(canvasWidth * 90 / imgWidth);
            $('.scale').val(scale);
            $('.main-svg').css('transform', `scale(${scale / 100})`);
        } else {
            $('.scale').val(70);
            $('.main-svg').css('transform', `scale(0.7)`);
        }

        $('[data-set="true"]').click(editableHandler);
        $('[data-set="true"]').click(getToolsPanel);

        $('[data-type="text"]').css('line-height', 'normal');

        $('[data-type="text"]').dblclick((event) => {
            draggable.draggable = false;
            draggable.snappable = false;
        });

        $('[data-type="text"]').blur((event) => {
            draggable.draggable = true;
            draggable.snappable = true;
        });

        $('.main-svg').contextmenu((event) => {
            $('.contextmenu').css('display', 'inline-block');
            $('.contextmenu').css('left', event.pageX);
            $('.contextmenu').css('top', event.pageY);
            return false;
        });

        $(window).click((event) => {
            $('.contextmenu').hide();
        })
    }

    $('.content-block').click((event) => {
        if (!event) return;

        let element = $(event.target);

        while (element.prop('tagName') != 'DIV') {
            element = element.parent();
        }

        if (element.attr('data-list') == '1') {
            $.ajax({
                type: 'GET',
                url: 'img/list',
                data: {
                    id: element.attr('data-id')
                },
                success: (html) => {
                    html = JSON.parse(html);
                    $('.category-section').hide();
                    $('.html-list-container').empty();
                    $('.html-list-section').show();

                    $('.html-list-container').append(`
                        <img src="${element.find('img').attr('src')}" class="node" data-node="${element.attr('data-id')}" style="maring-top: 10px; cursor: pointer;">
                    `);

                    html.forEach(img => {
                        $('.html-list-container').append(`
                            <img src="${img.src}" class="node" data-node="${img.node}" style="maring-top: 10px; cursor: pointer;">
                        `)
                    });

                    $('.node').click((event) => {
                        $.ajax({
                            type: 'GET',
                            url: 'img/html',
                            data: {
                                id: $(event.target).attr('data-node')
                            },
                            success: (html) => {
                                renderHtml(html);
                            }
                        })
                    })
                }
            });
        }

        $.ajax({
            type: 'GET',
            url: 'img/html',
            data: {
                id: element.attr('data-id')
            },
            success: (html) => {
                renderHtml(html);

                if (element.attr('data-list') == '0') {
                    $('aside').removeClass('sidebar--is-visible');
                }
            }
        })
    });

    $('.fonts').click((event) => {
        if ($('.font-section:visible').get(0)) {
            $('.font-section').hide();
            $('.category-section').show();
            return;
        }

        $('.category-section').hide();
        $('.font-section').show();

        $.ajax({
            type: 'GET',
            url: '/img/font',
            data: {
                pivot: 0
            },
            success: (html) => {
                html = JSON.parse(html);

                html.filter((font) => {
                    $('.fonts-list').append(`
                    <button data-src="${font.src}" type="button" class="list-group-item list-group-item-action">${font.title}</button>
                    `);
                })

                $('.fonts-list').click((event) => {
                    if (event.target.tagName != 'BUTTON') return;

                    let pathToFont = $(event.target).attr('data-src');
                    let title = $(event.target).html();

                    $('head').append(`
                        <style class="fonts-style">
                            @font-face {
                                font-family: ${title};
                                src: url(${pathToFont});
                            }
                        </style>
                    `);

                    $(CURRENT_EDIT_ELEMENT).css('font-family', title);
                    updateCurrentFont();
                    draggable.updateRect();
                    draggable.updateTarget();
                });
            }
        });

    });

    $('.format-button').click((event) => {
        $('.font-container').addClass('collapse');
        $('.font-container').removeClass('show');
    });
})();

$('.update-html').click((event) => {
    $.ajax({
        type: 'POST',
        url: '/admin/update',
        data: {
            id: $('.html-id').html(),
            content: editor.getValue()
        },
        success: (html) => {
            html = JSON.parse(html);

            if (html.status == 'success') {
                $('.alert-update').fadeIn(300);
            }
        }
    })
})

$('.delete-template').click((event) => {
    $(event.target).next().fadeIn(300);
});

$('.delete-true').click((event) => {
    $.ajax({
        type: 'POST',
        url: '/admin/delete',
        data: {
            id: $(event.target).attr('data-id')
        },
        success: (html) => {
            $(event.target).parent().parent().parent().parent().fadeOut(300);
        }
    })
})

$('.delete-false').click((event) => {
    $(event.target).parent().fadeOut(300);
});

$('.category-button').click((event) => {
    $('.font-section').hide();
    $('.html-list-section').hide();
    $('.category-section').show();
    $('.fonts-list').empty();
    $('.html-list-container').empty();
});

jQuery.fn.swapWith = function(to) {
    return this.each(function() {
        var copy_to = $(to).clone(true);
        var copy_from = $(this).clone(true);
        $(to).replaceWith(copy_from);
        $(this).replaceWith(copy_to);
    });
};

$('.to-top').click((event) => {
    let showOne = $(event.target).parent().parent().parent();
    let showTwo = $(event.target).parent().parent().parent().prev();

    if (!showTwo.get(0)) return;

    $.ajax({
        type: 'GET',
        url: '/admin/swap',
        data: {
            'show_one': showOne.attr('data-id'),
            'show_two': showTwo.attr('data-id')
        },
        success: (html) => {
            showTwo.swapWith(showOne);
        }
    });
});

$('.to-bottom').click((event) => {
    let showOne = $(event.target).parent().parent().parent();
    let showTwo = $(event.target).parent().parent().parent().next();

    if (!showTwo.get(0)) return;

    $.ajax({
        type: 'GET',
        url: '/admin/swap',
        data: {
            'show_one': showOne.attr('data-id'),
            'show_two': showTwo.attr('data-id')
        },
        success: (html) => {
            showTwo.swapWith(showOne);
        }
    });
});