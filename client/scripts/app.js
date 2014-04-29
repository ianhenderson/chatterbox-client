// YOUR CODE HERE:
var app;
$(document).ready(function(){
  app = {};
  app.server = 'https://api.parse.com/1/classes/chatterbox';
  app.username = 'joe';
  app.friends = [];
  app.init = function(){};
  app.send = function(text){
    var message = {
      'username':  'username',
      'text': text,
      'roomname': 'lobby'
    };

    $.ajax({
      'data': JSON.stringify(message),
      'type': 'POST',
      'url': 'https://api.parse.com/1/classes/chatterbox',
      'contentType': 'application/json',
      'success': function(response){
        console.log(response);
      }
    });
  };

  app.fetch = function(){
    app.clearMessages();
    $.ajax(app.server, {
      'url': 'https://api.parse.com/1/classes/chatterbox',
      'data': {'order': '-createdAt'},
      'success': function(data){
          for (var i = 0; i< data.results.length; i++){
            app.addMessage(data.results[i]);
          }
          console.log(data);
        }
    });
  };

  app.clearMessages = function(){
    $("#chats").empty();
  };

  app.addMessage = function(message){
    $('<div/>', {
      id: 'tweet'
    }).appendTo("#chats");

    $('<div/>',{
      class: 'username',
      text: message.username,
      data: message.username
    }).appendTo('#tweet');
    $('<div/>',{
      class: 'tweetText',
      text: ": " + message.text
    }).appendTo('#tweet');

    $('.username').on('click', function(e){
      var friend = $(e.target).text();
      app.addFriend(friend);
    });
  };

  app.addRoom = function(roomName){
    $('<div/>', {
      room: roomName
    }).appendTo("#roomSelect");
  };

  app.addFriend = function(friendName){
    app.friends.push(friendName);
  };

  app.handleSubmit = function(text){
    app.send(text);
  };

  $('#button').click( function(){
    var message = $('#inputBox').val();
    app.handleSubmit(message);
  } );

setInterval( function(){
  app.fetch();
}, 2000);

});
