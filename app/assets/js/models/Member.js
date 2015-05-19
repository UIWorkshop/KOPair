'use strict';

/* global define:true*/
define(['jquery',
    'knockout',
    ], function ($, ko) {
  return function (name, tyro, id) {
    var self = this;
    self.id = ko.observable(id || '');
    self.name = ko.observable(name || '').extend({
      required: true
    });
    self.tyro = ko.observable(tyro || false);
    self.fullName = ko.computed(function () {
      var tyro = '';
      if (ko.unwrap(self.tyro)) {
        tyro = ' (Tyro)';
      }
      return ko.unwrap(self.name) + tyro;
    });
  };
});
