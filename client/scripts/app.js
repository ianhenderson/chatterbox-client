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
      'data': JSON.stringify(message),
      'contentType': 'application/json',
      'success': console.log(message)
    });
  };

  app.fetch = function(){
    app.clearMessages();
    $.ajax(app.server, {
      'url': 'https://api.parse.com/1/classes/chatterbox',
      'data': 'application/json',
      'success': function(data){
        app.tweets = [];
          for (var i = 0; i< data.results.length; i++){
            // app.tweets.push(data.results[i]);
            app.addMessage(data.results[i]);
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
    // debugger;
    app.send(text);
  };

  $('#button').click( function(){
    var message = $('#inputBox').val();
    app.handleSubmit(message);
  } );

  app.refreshDisplay = function(){
    var tweet = d3.select('#chats')
                  .selectAll('div')
                  .data(app.tweets);

    tweet.append('div')
         .style('class', function(d){return d.roomname;})
         .each(function(d) {
          d3.select(this)
            .append('div')
            .attr('class', 'username')
            .text(d.username)
          d3.select(this)
            .append('div')
            .attr('class', 'tweetText')
            .text(': ' + d.text)
         } );

    tweet.enter()
         .append('div')
         .style('class', function(d){return d.roomname;})
         .each(function(d) {
          d3.select(this)
            .append('div')
            .attr('class', 'username')
            .text(d.username)
          d3.select(this)
            .append('div')
            .attr('class', 'tweetText')
            .text(': ' + d.text)
         } );
  };



// setInterval( function(){
//   app.fetch();
//   app.refreshDisplay();
// }, 2000);

});
