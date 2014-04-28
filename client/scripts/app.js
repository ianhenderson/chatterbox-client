// YOUR CODE HERE:

var app = {
};

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
    username: message.username,
    text: message.username + ": " + message.text
  }).appendTo("#chats");
};
app.addRoom = function(roomName){
  // $("#roomSelect").append( "<div>" + roomName + "</div>");
  $('<div/>', {
    room: roomName
  }).appendTo("#roomSelect");

};
app.addFriend = function(){};
