// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

Router.configure({
  layoutTemplate: 'App_home',  
});

Router.route('/');

Router.route('/listuser', function () {  
  this.render('listuser');  
},{
  name: 'listuser'
});

Router.route('/chathist', function () {
  this.render('chathist');
},{
  name: 'chathist'
});

Router.route('/chat/:_id?', function () {
  this.render('chat');
},{
  name: 'chat'
});
