import { Meteor } from 'meteor/meteor';
import { Chats } from '/imports/api/chats/chats.js';
import './chat.html';

Template.chat.onRendered(function(){
    //$("#"+Router.current().route.getName()).addClass('active');     
    $('ul.tabs').tabs({active:2});

    const $messagesScroll = this.$('.messages-scroll');
    
    TheTemplateInstance = this;

    this.autorun(() => {
        Tracker.afterFlush(function () {
            $messagesScroll.stop().animate({
                scrollTop: $messagesScroll[0].scrollHeight - $messagesScroll[0].clientHeight
            });
        });
    });
    console.log(1);
});

if (Meteor.isClient) {
    Meteor.setInterval(function() {
        var rota = Router.current().route.getName();

        if(rota == 'chat'){
            var id = Router.current().params._id;
            var chat = Chats.find({_id: id}).fetch();

            if(chat[0]['stoppedAt']){
                var now  = chat[0]['stoppedAt'];
            }
            else{
                var now  = new Date();
            }

            var dtinicial = moment(chat[0]['createdAt'])

            var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(dtinicial,"DD/MM/YYYY HH:mm:ss"));
            var d = moment.duration(ms);
            var result = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
            Session.set("duracao", result);
        }
    }, 1000);
}

Template.chat.helpers({
    //listando chats
    messages:function(){
        var id = Router.current().params._id;
        var chat = Chats.find({_id: id}).fetch(); 
        if(chat){
            return chat[0]['msgs'];
        }
        return {};
    },
    timestamp() {
        const sentTime = moment(this.createdAt);
        //if today, just show time, else if some other day, show date and time
        if (sentTime.isSame(new Date(), "day")) {
          return sentTime.format("HH:mm");
        }
        return sentTime.format("DD/MM/YYYY HH:mm a");
    },
    username(){
        const user_id = this.user;
        const usuario = Meteor.users.find({_id:user_id}).fetch();
        return usuario[0]['username'];
    },
    //Alinhamento
    usermsg(){        
        if(this.user == Meteor.userId()){
            return 'right-align';
        }
        return 'left-align';
    },
    //Alinhamento
    usermsgcolor(){        
        if(this.user == Meteor.userId()){
            return 'name-blue';
        }
        return 'name-black';
    },
    duracao(){
        return Session.get('duracao');
    },
    chatativo(){
        var id = Router.current().params._id;
        var chat = Chats.find({_id: id}).fetch(); 
        if(chat[0]['stoppedAt']){
            return false;
        }
        return true;
    }
});

//Salvando mensagem
Template.chat.events({
    'submit form'(event) {
    
        event.preventDefault();
        
        const $el = $(event.currentTarget);
        const $input = $el.find('.message-input');

        const $messagesScroll = TheTemplateInstance.$('.messages-scroll');
        
        const new_msg = $input.val();

        var id = Router.current().params._id;
        
        Meteor.call("chats.addmsg", new_msg, id, (error, result) => {
            if (error) {
                alert(error.reason);
            }
            $input.val("");
            Tracker.afterFlush(function () {
                $messagesScroll.stop().animate({
                    scrollTop: $messagesScroll[0].scrollHeight - $messagesScroll[0].clientHeight
                });
            });
        });            
    },

    'click .close-chat'(event) {
    
        event.preventDefault();
        var id = Router.current().params._id;
        
        Meteor.call("chats.close", id, (error, result) => {
            if (error) {
                alert(error.reason);
            }

            $('ul.tabs').tabs({active:1});
            Router.go('/chathist');
        });
        
    },
});