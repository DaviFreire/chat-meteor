import { Meteor } from 'meteor/meteor';
import { Chats } from '/imports/api/chats/chats.js';
import './chathist.html';

Template.chathist.helpers({
    //listando chats
    chatuser:function(){
        return Chats.find();       
    },
    //Mostrando apenas o outro usuario
    formatUser:function(dados){        
        if(dados.user1 == Meteor.userId()){
            return dados.nameuser2;
        }
        return dados.nameuser1;
    }
});

//Abrindo um chat
Template.chathist.events({
    'click .open-chat': function(e) {
        e.preventDefault();
        const chat_id = e.currentTarget.id;
        Router.go('/chat/'+chat_id);
    },
});