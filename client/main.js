// Client entry point, imports all client code

import '../imports/startup/accounts-config.js';
import '/imports/startup/client';
import '/imports/startup/both';

 Meteor.subscribe("users");

Template.registerHelper('formatDate', function(date) {
	if(date){
  		return moment(date).format('DD/MM/YYYY HH:mm:ss');
  	}
  	return '';
});