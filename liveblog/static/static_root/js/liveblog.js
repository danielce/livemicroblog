function convert_to_readable_date(date_time_string) {
    var newDate = moment(date_time_string).format('YYYY-MM-DD hh:mm:ss')
    return newDate
    }

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
    }
});

function update() {
    holder = $("#list");
    recent = holder.find("tr:first");
    $.getJSON("/api/v1/update/" + recent.attr('id') + "/?format=json", 
      function(data){
        cycle_class = recent.hasClass("active") ? "info": "active";
        jQuery.each(data.results, function() {
          timestamp = convert_to_readable_date(this.timestamp);
          tr = jQuery( '<tr />', {
            id: this.pk,
            "class": cycle_class + " animated bounceIn",
          });
          td1 = jQuery('<td />', {
            "class": "col-md-3",
            text: timestamp,
          });
          mess1 = jQuery('<span />', {
            text: ": " + this.message,
          });
          bold = jQuery('<b />', {
            text: this.nick,
          });
          parg = jQuery('<p />');
          parg.append(bold).append(mess1);
          td2 = jQuery('<td />', {
            "class": "col-md-9",
          });
          td2.append(bold).append(mess1);
          tr.append(td1).append(td2);
          recent.before(tr);
        });
        
      }

    );
 };

 <!-- validation -->

$(document).ready(function(){
    setInterval("update()", 5000);
$( "#textformdiv" ).hide();
$( "#nickformdiv" ).hide();

if ( $.cookie('nick') == null ) {
    $( "#nickformdiv" ).show();
} else {
    $( "#textformdiv" ).show();
}

$("#nickform").validate({
    rules:{
     textinput: {
       required: true
     }
    },
    submitHandler: function(form) {
      nick = $("#nick").val();
      $.cookie('nick', nick);
      $( "#textformdiv" ).show();
      $( "#nickformdiv" ).hide();
    },
    invalidHandler: function(event, validator) {
    }

  });


message_input = $("#textform").find("input[name='textinput']");
$("#textform").validate({
    rules:{
     messageinput: {
       required: true
     }
    },
    submitHandler: function(form) {
      name = $.cookie('nick');
      msg = $("#messageinput")
      $.post('/api/v1/create/', {message: msg.val(), nick: name});
      msg.val('');
    },
    invalidHandler: function(event, validator) {
      alert('ooops!');
    }

  });


    });