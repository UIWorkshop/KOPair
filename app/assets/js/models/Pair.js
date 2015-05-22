'use strict';

/* global define:true*/
define(['jquery',
    'knockout',
    ], function ($, ko) {
  return function (memberA, memberB) {
    var self = this;
    self.a = memberA;
    self.b = memberB;
    self.name = ko.computed(function () {
      var aName = self.a && ko.unwrap(self.a.fullName);
      var bName = self.b && ko.unwrap(self.b.fullName);
      
      return bName ? (aName + ' - ' + bName) : aName;
    });
  };
});
