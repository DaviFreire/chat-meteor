import { Meteor } from 'meteor/meteor';
import './navbar.html';
import '../listuser/listuser.js';
import '../chathist/chathist.js';
import '../chat/chat.js';

//Inicializando
Template.navbar.rendered = function(){
    console.log(1);
    if(Meteor.userId()){
        $('ul.tabs').tabs({active:1});
        Meteor.subscribe('chats');
    }
}

//Ativando as abas e direncionando o template
Template.navbar.events({
  'click .tabs li': function(e, t){
    var href = e.target.id;     
    var index = $('#'+href).parent().index();
    $('ul.tabs').tabs({active:index});
    Router.go(href);
  }  
});