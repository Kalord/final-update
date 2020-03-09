(function() {
    /**
     * Атрибут редактируемого элемента
     */
    const CURRENT_EDIT = 'currentEditable';

    /**
     * Атрибут для получения текущего редактируемого элемента
     */
    const CURRENT_EDIT_ELEMENT = `[${CURRENT_EDIT}="true"]`;


    $('.content-block').click((event) => {
        let element = $(event.target);


        while (element.prop('tagName') != 'DIV') {
            element = element.parent();
        }

        $.ajax({
            type: 'GET',
            url: 'img/html',
            data: {
                id: element.attr('data-id')
            },
            success: (html) => {
                html = JSON.parse(html);
                $('.main-svg').empty();
                $('.main-svg').append(html);

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

                $('[data-type="text"]').dblclick((event) => {
                    $(event.target).removeClass('draggable');
                });

                $('[data-type="text"]').blur((event) => {
                    $(event.target).addClass('draggable');
                });

                $('aside').removeClass('sidebar--is-visible');
            }
        })
    });

    $('.fonts').click((event) => {
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
                });
            }
        })
    });

    $('.format-button').click((event) => {
        $('.font-container').addClass('collapse');
        $('.font-container').removeClass('show');
    })
})();

$('.update-html').click((event) => {
    $.ajax({
        type: 'POST',
        url: '/admin/update',
        data: {
            id: $('.html-id').html(),
            content: $('.html-content').html()
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
    $('.category-section').show();
    $('.fonts-list').empty();
});