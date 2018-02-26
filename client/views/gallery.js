import '../styles/gallery.scss'

$(function() {
  $('#newSubmit').click(function(e){
    const name = $('#contactName').val()
    const content = $('#contactContent').val()
    const orderId = $('#order').val()
    $.post("/order-contact", { orderId, name, content }, function( resp ) {
      $('#contactForm').fadeOut(400, function(){
        $('#contactFormResult').fadeIn()
      })
    })
  })
})
