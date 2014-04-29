// YOUR CODE HERE:
var app;
$(document).ready(function(){
  app = {};
  app.server = 'https://api.parse.com/1/classes/chatterbox';
  app.username = 'joe';
  app.tweets = [];
  app.rooms = [];
  app.currentRoom = 'lobby';
  app.friends = [];
  app.lastMessage = '2013';

  app.username = prompt("Please enter your name:", "visitor") || "visitor";
  // app.currentRoom = prompt("Please enter your name:", "visitor") || "visitor";



  app.init = function(){};
  app.send = function(text){
    var message = {
      'username':  app.username,
      'text': text,
      'roomname': app.currentRoom
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
    // app.clearMessages();
    $.ajax(app.server, {
      'url': 'https://api.parse.com/1/classes/chatterbox',
      'data': {'order': '-createdAt'},
      'success': function(data){
          for (var i = 0; i< data.results.length; i++){
            // console.log(data.results[i].createdAt);
            // console.log( "LASTTWEET IS:" + app.lastMessage );
            if (data.results[i].createdAt > app.lastMessage){
              app.addMessage(data.results[i]);
              app.lastMessage = data.results[i].createdAt;
            }
            // app.tweets.push(data.results[i]);
          }
          // console.log(data);
        }
    });
    // app.refreshDisplay();

    // for (var i = 0; i < app.tweets.length; i++){
    //   if (app.tweets[i].createdAt > app.lastMessage){
    //     app.addMessage(app.tweets[i]);
    //   }
    // }

  };

  app.clearMessages = function(){
    $("#chats").empty();
  };

  app.addMessage = function(message){
    console.log(message);
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

    if (app.rooms.indexOf(message.roomname) === -1){
      $('#roomSelector').append($('<option/>', {
        value: message.roomname,
        text: message.roomname
      }));
      app.rooms.push(message.roomname);
    }
  };

  // app.refreshDisplay = function(){
  //   var tweet = d3.select('#chats')
  //                 .selectAll('div')
  //                 .data(app.tweets)

  //   tweet.append('div')
  //        .style('class', function(d){return d.roomname;})
  //        .each(function(d) {
  //         // d3.select(this)
  //         //   .append('div')
  //         //   .attr('class', 'username')
  //         //   .text(d.username)
  //         d3.select(this)
  //           .append('div')
  //           .attr('class', 'tweetText')
  //           .text(d.username + ': ' + d.text)
  //        } )

  //   tweet.enter()
  //        .append('div')
  //        .style('class', function(d){return d.roomname;})
  //        .each(function(d) {
  //         // d3.select(this)
  //         //   .append('div')
  //         //   .attr('class', 'username')
  //         //   .text(d.username)
  //         d3.select(this)
  //           .append('div')
  //           .attr('class', 'tweetText')
  //           .text(d.username + ': ' + d.text)
  //        } )

  //   tweet.exit().remove();
  // };

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
}, 4000);

});
