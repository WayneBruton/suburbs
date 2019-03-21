

$(function(){



    $('#contactBtn').click(function (e) {
        e.preventDefault();
        let subscribeInfo = {
          Cemail: $('#contactEmail').val(),
          Cname: $('#contactName').val(),
          Cphone: $('#contactPhone').val(),
          Cmessage: $('#contactMessage').val()
        }
    
        console.log(subscribeInfo);
        let url = '/send-email';
        $.ajax({
          type: 'POST',
          url: url,
          data: {
            subscribeInfo
          },
    
          dataType: 'json'
        }).done(function (response) {
          console.log(response);
          $('#contactSuccess').css('display', 'block').fadeIn(750);
          $('#contactEmail').val('');
          $('#contactName').val('');
          $('#contactPhone').val('');
          $('#contactMessage').val('');
          $('#contactBtn').blur();
          setTimeout(function () {
            $('#contactSuccess').css('display', 'none').fadeOut(750);
          }, 1500);
    
        }).fail(function (response) {
          console.log(response);
          // $('#mailingFailure').css('display', 'block').fadeIn(750);
          $('#contactFailure').css('display', 'block').fadeIn(750);
          $('#contactEmail').val('');
          $('#contactName').val('');
          $('#contactPhone').val('');
          $('#contactMessage').val('');
          $('#contactBtn').blur();
          setTimeout(function () {
            $('#contactFailure').css('display', '').fadeOut(750);
          }, 1500);
    
        });
      })
    
    
})