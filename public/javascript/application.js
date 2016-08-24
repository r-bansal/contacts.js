$(document).ready(function() {

  var updateList = function(){
    $.getJSON('/api/contacts', function(data){
      $('#contacts').empty();
      $.each(data, function(index, obj){
        var contact = "<div class=\"row\">\n" +
                      "\t<div class=\"col s8 offset-s2 m6 offset-m3\">\n" +
                      "\t\t<div id=\"" + obj.id +"\" class=\"card-panel\">\n" +
                      "\t\t\t<h5>" + obj.first_name + " " + obj.last_name +
                      "<span class=\"right\"><a href='#' class='edit grey-text' id='" + obj.id + "'><i class='material-icons'>edit</i></a>" +
                      "<a href='#' class='delete grey-text' id='" + obj.id + "'><i class=\"material-icons\">delete</i></a></span></h5>\n" +

                      "\t\t\t<h6>" + obj.email + "</h6>\n" +
                      "\t\t\t<div class=\"info-divider\"></div>\n";

        if(obj.phone_numbers.length !== 0){
          for(var i = 0; i < obj.phone_numbers.length; i++){
            contact += "<h6 id=\"" + obj.phone_numbers[i].id + "\"><b>" + obj.phone_numbers[i].name + " </b>" + obj.phone_numbers[i].number + "</h6>\n";
          }
        }
        contact += "\t\t\t<a href=\"#\" id=\"" + obj.id + "\" class=\"edit-add-phone\"><i class=\"material-icons tiny\">call</i> Add number</a>" +
                   "\t\t</div>\n" +
                   "\t</div>\n" +
                   "</div>";
        $('#contacts').append(contact);
      });
  });
};

  updateList();

  $('#toggle-add').on('click', function(){
    $('.form-box-back#add-back').fadeToggle('hidden');
    if(!$('.form-box-back').hasClass('hidden')){
      $('#first_name').focus();
    }
  });

  $('#create_form').on('submit', function(event){
    event.preventDefault();
    $.post('/api/contacts/create',
     {
       'first_name': $('#first_name').val(),
       'last_name': $('#last_name').val(),
       'email': $('#email').val()
     },
     function(data){
       updateList();
       $('.form-box-back#add-back').fadeToggle('hidden');
       $('#create-numbers').empty();
       $('#first_name').val("");
       $('#last_name').val("");
       $('#email').val("");
    });
  });

  $('#edit_form').on('submit', function(event){
    event.preventDefault();
    $.post('/api/contacts/update',
     {
       'id': $('#edit_form #id').val(),
       'first_name': $('#edit_form #first_name').val(),
       'last_name': $('#edit_form #last_name').val(),
       'email': $('#edit_form #email').val()
     },
     function(data){
       updateList();
       $('.form-box-back#edit-back').fadeToggle('hidden');
       $('#create-numbers').empty();
       $('#first_name').val("");
       $('#last_name').val("");
       $('#email').val("");
    });
  });

  $('#contacts').on('click', '.delete', function(event){
    event.preventDefault();
    var id = $(this).attr('id');
    url = "/api/contacts/delete/" + id;
    $.post(url, function(){
      $('.card-panel#' + id).fadeOut('fast', function(){ $(this).remove();});
    });
  });

  $('#contacts').on('click', '.edit', function(event){
    event.preventDefault();
    var id = $(this).attr('id');
    url = "/api/contacts/edit/" + id;
    $.get(url, function(obj){
      console.log(obj);
      $('.form-box-back#edit-back').fadeToggle('hidden');
      $('#edit_form #id').val(obj.id);
      $('#edit_form #first_name').val(obj.first_name);
      $('#edit_form #last_name').val(obj.last_name);
      $('#edit_form #email').val(obj.email);
      $('#edit_form label').addClass('active');
    });
  });

  $('#add-cancel').on('click', function(event){
    event.preventDefault();
    $('.form-box-back#add-back').fadeToggle('hidden');
  });

  $('#edit-cancel').on('click', function(event){
    event.preventDefault();
    $('.form-box-back#edit-back').fadeToggle('hidden');
  });

  // $('.form-box-back').on('click', function(){
  //   $(this).fadeToggle('hidden');
  // });

});
