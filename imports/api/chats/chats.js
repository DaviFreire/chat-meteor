import { Mongo } from 'meteor/mongo';

export const Chats = new Mongo.Collection('chats');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('chats', function() {
    return Chats.find();
  });
}