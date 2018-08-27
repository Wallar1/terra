// App.messages = App.cable.subscriptions.create('MessagesChannel', {
//     received: function (data) {
//       append_message($('.messages_for_site_'+data.site_id), data.message_partial)
//     }
//   })

// function append_message(container, message_partial){
//   container.append(message_partial);
//   container.children().last().addClass('bounce');
//   container.animate({scrollTop: container.prop("scrollHeight")}, 1000);
// }