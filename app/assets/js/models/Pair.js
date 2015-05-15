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
      var aName = self.a && self.a.fullName;
      var bName = self.b && self.b.fullName;
      return ko.unwrap(aName) + ' - ' + ko.unwrap(bName);
    });
  };
});
