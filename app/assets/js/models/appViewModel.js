'use strict';

/* global define:true*/
define(['jquery',
    'knockout',
    '../../../assets/js/models/sammyViewModel.js',
    'knockout.validation'
    ], function ($, ko, SammyViewModel) {
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

    // Example observable
    self.status = ko.observable('active');

    // Add submodels here
    // Sammy view model for local navigation
    self.sammy = new SammyViewModel();

  };
});
