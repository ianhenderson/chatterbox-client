// YOUR CODE HERE:
var app;
$(document).ready(function(){
  app = {};
  app.server = 'https://api.parse.com/1/classes/chatterbox';
  app.friends = [];
  app.init = function(){};
  app.tweets = [];
  app.send = function(message){
    $.ajax({
      'type': 'POST',
      'url': 'https://api.parse.com/1/classes/chatterbox',
      'data': JSON.stringify(message)
    });
  };

  app.fetch = function(){
    $.ajax({
      'url': 'https://api.parse.com/1/classes/chatterbox',
      'data': 'application/json',
      'success': function(data){
        app.tweets = [];
          for (var i = 0; i< data.results.length; i++){
            app.tweets.push(data.results[i]);
          }
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
    debugger;
    app.send(text);
  };

  $('#button').click( function(){
    var message = $('#inputBox').val();
    app.handleSubmit(message);
  } );

app.refreshDisplay = function(){
  d3.select('#chats').selectAll('div')
                     .data(app.tweets)
                     .append('div')
                     .text(function(d){return d.username + ': ' + d.text;})

  d3.select('#chats').selectAll('div')
                     .data(app.tweets)
                     .enter()
                     .append('div')
                     .text(function(d){return d.username + ': ' + d.text;})

};



});
