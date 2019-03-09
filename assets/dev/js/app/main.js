$(document).ready(function () {
    $('#button').click(function () {
        $.ajax({
            url: '/test/',
            success: function (result) {
                $('#target').text(result['name']);
            }
        });
    })
});
