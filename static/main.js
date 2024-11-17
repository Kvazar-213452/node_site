$("#file_input_qfEASD").on("change", function () {
    let fileName = this.files[0]?.name || "Файл не обрано";

    $("#file_name").text(fileName);
});

function get_file_render() {
    $(".fwewsdwq32r").html(null);

    $.ajax({
        url: '/file',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(null),
        success: function (response) {
            let data = response['files'];

            if (data.length === 0) {
                let text = `<p class="qe289123d">null</p> <br>`;

                $(".fwewsdwq32r").append(text);
            } else {
                for (let i = 0; i < data.length; i++) {
                    let text = `<a class="qe289123d" download href="static/file/${data[i]}">${data[i]}</a> <br>`;
    
                    $(".fwewsdwq32r").append(text);
                }
            }
        },
        error: function (xhr, status, error) {
            console.log("Error: " + error);
            console.log("Response text:", xhr.responseText);
        }
    });
}


function file_send() {
    var fileInput = $('#file_input_qfEASD')[0];

    var file = fileInput.files[0];
    if (!file) {
        alert('Будь ласка, виберіть файл!');
        return;
    }

    var formData = new FormData();
    formData.append('file', file);

    $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            if (data.success) {
                alert('Файл успішно завантажено!');
            } else {
                alert('Сталася помилка при завантаженні файлу!');
            }
        },
        error: function(error) {
            console.error('Помилка:', error);
            alert('Сталася помилка при завантаженні файлу!');
        }
    });
}
