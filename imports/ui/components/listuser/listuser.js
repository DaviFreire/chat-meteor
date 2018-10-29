import { Meteor } from 'meteor/meteor';
import './listuser.html';


//Listando os usuários
Template.listuser.helpers({
    users:function(){
        return Meteor.users.find({_id: {$ne: Meteor.userId()}}, {sort: {username: 1}}).fetch();       
    }
});

//Criando um chat
Template.listuser.events({
    'click .new-chat': function() {
        const user1 = this._id;
        const username = this.username;
        Meteor.call('chats.insert', user1, username, (error,result) => {
            if (error) {
                alert(error.error);
            } else {
                Router.go('/chat/'+result);
            }
        });
    },
});