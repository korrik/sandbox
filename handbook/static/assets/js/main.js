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

function greeter(person) {
    return "Hello, " + person;
}
var user = "Jane User";
console.log(greeter(user));
