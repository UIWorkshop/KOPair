'use strict';

/* global define:true*/
define(['jquery',
    'underscore',
    'knockout',
    '../../../assets/js/models/sammyViewModel.js',
    '../../../assets/js/models/Member.js',
    '../../../assets/js/models/Pair.js',
    'knockout.validation'
    ], function ($, _, ko, SammyViewModel, Member, Pair) {
  return function () {
    var self = this;

    // Configure knockout validation plugin
    // To decorate form-group elements, use the validationElement binding
    ko.validation.configure({
      decorateElement: true,
      errorElementClass: '',
      errorMessageClass: 'help-block',
      errorsAsTitle: false
    });

    // Write your code.
    self.editingMember = new Member();
    self.showResults = ko.observable(false);
    self.memberList = ko.observableArray();
    self.pairs = ko.pureComputed(function () {
      var list = ko.unwrap(self.memberList);
      list = _.sample(list, list.length);
      var pairs = [];
      for (var index = 0; index < list.length; index += 2) {
        pairs.push(new Pair(list[index], list[index + 1]));
      }
      return pairs;
    });

    self.addMember = function (member) {
      member.name.isModified(true);
      if (!member.name.isValid()) {
        return;
      }
      var list = ko.unwrap(self.memberList);
      var has = list.some(function (item) {
        return ko.unwrap(item.name) === ko.unwrap(member.name);
      });
      if (!has) {
        self.memberList.push(new Member(
          ko.unwrap(member.name),
          ko.unwrap(member.tyro),
          (new Date()).getTime()
        ));
      }
    };

    self.removeMember = function (member) {
      self.memberList.remove(member);
    };

    self.editMember = function (member) {
      self.editingMember.name(ko.unwrap(member.name));
      self.editingMember.tyro(ko.unwrap(member.tyro));
      self.editingMember.id(ko.unwrap(member.id));
    };

    self.clearMember = function (member) {
      member.name('');
      member.id(0);
      member.tyro(false);
      member.name.isModified(false);
    };

    self.updateMember = function (editingMember) {
      var id = ko.unwrap(editingMember.id);
      _.each(ko.unwrap(self.memberList), function (member) {
        if (ko.unwrap(member.id) === id) {
          member.name(ko.unwrap(editingMember.name));
          member.tyro(ko.unwrap(editingMember.tyro));
        }
      });
      self.clearMember(editingMember);
      self.switchPair();
    };

    self.switchPair = function () {
      var list = ko.unwrap(self.memberList);
      if (list.length) {
        self.showResults(true);
        self.memberList(list);
      }
    };

    // Add submodels here
    // Sammy view model for local navigation
    self.sammy = new SammyViewModel();

  };
});
