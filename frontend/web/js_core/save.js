(function() {
    const saveAsPng = () => {
        var container = document.querySelector('.main-svg');
        html2canvas(container, {
            useCORS: true
        }).then(function(canvas) {
            if (navigator.msSaveBlob) {
                console.log('this is IE');
                var URL = window.URL;
                var BlobBuilder = window.MSBlobBuilder;
                navigator.saveBlob = navigator.msSaveBlob;
                var imgBlob = canvas.msToBlob();
                if (BlobBuilder && navigator.saveBlob) {
                    var showSave = function(data, name, mimetype) {
                        var builder = new BlobBuilder();
                        builder.append(data);
                        var blob = builder.getBlob(mimetype || "application/octet-stream");
                        if (!name)
                            name = "Download.bin";
                        navigator.saveBlob(blob, name);
                    };
                    showSave(imgBlob, 'barchart.png', "image/png");
                }
            } else {
                if ($('#export-image-container').length == 0)
                    $('body').append('<a id="export-image-container" download="barchart.png">')
                img = canvas.toDataURL("image/png")
                img = img.replace('data:image/png;base64,', '')
                finalImageSrc = 'data:image/png;base64,' + img

                $('#export-image-container').attr('href', finalImageSrc)
                $('#export-image-container')[0].click()
                $('#export-image-container').remove()
            }
        });
    };

    const saveAsJpeg = () => {
        var container = document.querySelector('.main-svg');
        html2canvas(container, {
            useCORS: true
        }).then(function(canvas) {
            if (navigator.msSaveBlob) {
                console.log('this is IE');
                var URL = window.URL;
                var BlobBuilder = window.MSBlobBuilder;
                navigator.saveBlob = navigator.msSaveBlob;
                var imgBlob = canvas.msToBlob();
                if (BlobBuilder && navigator.saveBlob) {
                    var showSave = function(data, name, mimetype) {
                        var builder = new BlobBuilder();
                        builder.append(data);
                        var blob = builder.getBlob(mimetype || "application/octet-stream");
                        if (!name)
                            name = "Download.bin";
                        navigator.saveBlob(blob, name);
                    };
                    showSave(imgBlob, 'barchart.jpeg', "image/jpeg");
                }
            } else {
                if ($('#export-image-container').length == 0)
                    $('body').append('<a id="export-image-container" download="barchart.jpeg">')
                img = canvas.toDataURL("image/jpeg")
                img = img.replace('data:image/jpeg;base64,', '')
                finalImageSrc = 'data:image/jpeg;base64,' + img

                $('#export-image-container').attr('href', finalImageSrc)
                $('#export-image-container')[0].click()
                $('#export-image-container').remove()
            }
        });
    }

    $('.format-save-item').click((event) => {
        let format = $(event.target).val();

        if (format == 'png') saveAsPng();
        if (format == 'jpeg') saveAsJpeg();
    })
})();