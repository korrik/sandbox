$(document).ready(function () {

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var csrftoken = getCookie('csrftoken');

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!(/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type)) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });


    //progress bar
    $('.progress div').each(function () {
        let m = this.getAttribute('aria-valuenow');

        if (m > 50 && m <= 75) {
            $(this).addClass('bg-warning');
        }

        else if (m > 75) {
            $(this).addClass('bg-success');
        }

        else {
            $(this).addClass('bg-danger')
        }
    });



    // ajax submit
    $('#doit').on('submit', function (event) {
        event.preventDefault();
        create_person();
    });

    function create_person() {
        $.ajax({
            url : "create_person/",
            type : "POST",
            data : {
                fname: $('#id_fname').val(),
                lname: $('#id_lname').val(),
                course: $('#id_course').val(),
                progress: $('#id_progress').val(),
                date_of_birth: $('#id_date_of_birth').val()
            },

            // handle a successful response
            success : function(json) {


                console.log(json); // log the returned json to the console
                // $("#talk").prepend("<li><strong>"+json.text+"</strong> - <em> "+json.author+"</em> - <span> "+json.created+
                //     "</span> - <a id='delete-post-"+json.postpk+"'>delete me</a></li>");
                // console.log("success"); // another sanity check
            },
            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        })
    }

    $('#sn').click(function () {
        $('#doit').each(function () {
        this.reset;
    });

    })



    // $('#button').click(function () {
    //     $.ajax({
    //         url: '/test/',
    //         success: function (result) {
    //             $('#target').text(result['name']);
    //         }
    //     });
    // })
});

function greeter(person) {
    return "Hello, " + person;
}
var user = "Jane User";
console.log(greeter(user));
