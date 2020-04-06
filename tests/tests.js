/* global Fingerprint */
/* eslint-disable no-alert, no-console */

exports.defineAutoTests = function() {
  describe("Fingerprint Object", function () {
    it("should exist", function() {
      expect(window.Fingerprint).toBeDefined();
    });
  });

  describe("isAvailable", function () {
    it("isAvailable should be defined", function () {
      expect(window.Fingerprint.isAvailable).toBeDefined();
    });

    it("isAvailable should return an result or error in callback", function (done) {
      window.Fingerprint.isAvailable( function (result) {
        expect(result).toBeDefined();
        done();
      }, function(result) {
        expect(result).toBeDefined();
        done();
      });
    });
  });

  describe("show", function () {
    it("show should be defined", function () {
      expect(window.Fingerprint.show).toBeDefined();
    });
  });

  describe("saveSecret", function () {
    it("saveSecret should be defined", function () {
      expect(window.Fingerprint.saveSecret).toBeDefined();
    });
  });
};

exports.defineManualTests = function (contentEl, createActionButton) {

  createActionButton("isAvailable", function () {
    window.Fingerprint.isAvailable(isAvailableSuccess, isAvailableError);

    function isAvailableSuccess(result) {
      console.log(result);
      alert("Fingerprint available (" + result + ")");
    }

    function isAvailableError(error) {
      console.log(error);
      alert(error.message);
    }
  });

  createActionButton("show", function () {
    Fingerprint.show({
      disableBackup: false
    }, successCallback, errorCallback);

    function successCallback() {
      alert("Authentication successful");
    }

    function errorCallback(err) {
      alert("Authentication invalid " + JSON.stringify(err));
    }
  });

  createActionButton("show-disablebackup", function () {
    Fingerprint.show({
      disableBackup: true,
      cancelButtonTitle: "Abbrechen"
    }, successCallback, errorCallback);

    function successCallback() {
      alert("Authentication successful");
    }

    function errorCallback(err) {
      alert("Authentication invalid " + JSON.stringify(err));
    }
  });

  createActionButton("show-loadsecret", function () {
    Fingerprint.show({
      disableBackup: true,
      loadSecret: true,
    }, successCallback, errorCallback);

    function successCallback(secret) {
      alert("Secret loaded successfully: " + secret);
    }

    function errorCallback(err) {
      alert("Error while loading secret: " + JSON.stringify(err));
    }
  });

  createActionButton("saveSecret", function () {
    Fingerprint.saveSecret({
      secret: "secret"
    }, successCallback, errorCallback);

    function successCallback() {
      alert("Secret saved successfully");
    }

    function errorCallback(err) {
      alert("Error while saving secret: " + JSON.stringify(err));
    }
  });
};
