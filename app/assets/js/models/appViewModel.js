'use strict';

/* global define:true*/
define(['jquery',
    'underscore',
    'knockout',
    '../../../assets/js/models/sammyViewModel.js',
    '../../../assets/js/models/Member.js',
    'knockout.validation'
    ], function ($, _, ko, SammyViewModel, Member) {
  return function () {
    var self = this;

    // Configure knockout validation plugin
    // To decorate form-group elements, use the validationElement binding
    ko.validation.configure({
      decorateElement: true,
      errorElementClass: 'has-error',
      errorMessageClass: 'help-block',
      errorsAsTitle: false
    });

    // Write your code.
    self.editingMember = ko.observable(new Member());
    self.memberList = ko.observableArray();
    self.addMember = function (member) {
      var list = ko.unwrap(self.memberList);
      var has = list.some(function (item) {
        return ko.unwrap(item.name) === ko.unwrap(member.name);
      });
      if (!has) {
        self.memberList.push(new Member(
          ko.unwrap(member.name),
          ko.unwrap(member.tyro)
        ));
      }
    };
    self.removeMember = function (member) {
      self.memberList.remove(member);
    };
    // Add submodels here
    // Sammy view model for local navigation
    self.sammy = new SammyViewModel();

  };
});
