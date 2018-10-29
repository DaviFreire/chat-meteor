import './home.html';
import '../../components/navbar/navbar.js';

Template.App_home.rendered = function(){
	//$("#"+Router.current().route.getName()).addClass('active');
    console.log('home');
}
