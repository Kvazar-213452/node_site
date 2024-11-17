$("#file_input_qfEASD").on("change", function () {
    let fileName = this.files[0]?.name || "Файл не обрано";

    $("#file_name").text(fileName);
});
