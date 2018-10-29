// Server entry point, imports all server code
import { Meteor } from 'meteor/meteor';
import { Chats } from '/imports/api/chats/chats.js';

import '/imports/startup/server';
import '/imports/startup/both';

Meteor.publish("users",function(){
    return Meteor.users.find();
});


Meteor.methods({
  	'chats.insert'(user1, nameuser1) {
	    return Chats.insert({
	      user1: user1,
	      nameuser1: nameuser1,
	      user2: Meteor.userId(),
	      nameuser2: Meteor.user().username,
	      msgs:[],
	      createdAt: new Date(),
    	});
  	},

  	'chats.addmsg'(new_msg,id) {
	  	var chat = Chats.find({_id: id}).fetch(); 
	  	var msgs = chat[0]['msgs'];

	  	var arr_msg = {msg: new_msg, user: Meteor.userId(), createdAt:new Date()};
	  	msgs.push(arr_msg);
	    return Chats.update(id, {
	    	$set: {msgs:msgs},
	    });
  	},

  	'chats.close'(id) {
	    return Chats.update(id, {
	    	$set: {stoppedAt:new Date()},
	    });
  	},
});
