/*
 *created with ♥ by Gianluca Chiap
 */

export const throwError = ( error, reason, details ) => {
   var meteorError = new Meteor.Error( error, reason, details );
   if (Meteor.isClient) {
      return meteorError;
   } else if (Meteor.isServer) {
      throw meteorError;
   }
};