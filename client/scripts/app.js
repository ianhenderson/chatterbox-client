// YOUR CODE HERE:
var app;
$(document).ready(function(){
  app = {
  };

  app.friends = [];
  app.init = function(){};

  app.send = function(message){
    $.ajax({
      'type': 'POST',
      'url': 'https://api.parse.com/1/classes/chatterbox',
      'data': JSON.stringify(message)
    });
  };

  app.fetch = function(){
    $.ajax();
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
    // debugger;
    app.friends.push(friendName);
  };

  app.handleSubmit = function(text){
    // var message = $('#inputBox').val();
    // debugger;
    app.send(text);

  };

  $('form').submit( function(){
    var text = $(this).val();
    app.handleSubmit(text);
  } );



});
