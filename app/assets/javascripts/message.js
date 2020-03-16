$(function(){

    function buildHTML(message){
      if (message.image){
        var html =
          `<div class="main__content__message" data-main__content__message-id=${message.id}>
            <div class="main__content__message__upper">
              <div class="main__content__message__upper__name">
                ${message.user_name}
              </div>
              <div class="main__content__message__upper__time">
                ${message.created_at}
              </div>
            </div>
            <div class="main__content__message__text">
              <p class="lower-message__content">
                ${message.content}
              </p>  
            </div>
            <img src=${message.image} >
          </div>`
        return html;  
      } else {
        var html =
          `<div class="main__content__message" data-main__content__message-id=${message.id}>
            <div class="main__content__message__upper">
              <div class="main__content__message__upper__name">
                ${message.user_name}
              </div>
              <div class="main__content__message__upper__time">
                ${message.created_at}
              </div>
            </div>
            <div class="main__content__message__text">
              <p class="lower-message__content">
                ${message.content}
              </p>  
            </div>
          </div>`
        return html;  
      };
    }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
      var formdata = new FormData(this);
      var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formdata,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__content').append(html);
      $('form')[0].reset();
      $('.main__content').animate({ scrollTop: $('.main__content')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);
    });
  })


  var reloadMessages = function() {
    var last_message_id = $('.main__content__message:last').data("main__content__message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
          $('.main__content').append(insertHTML);
          $('.main__content').animate({ scrollTop: $('.main__content')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  } 
});