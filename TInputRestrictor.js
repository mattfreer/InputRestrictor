/*
 *Usage:
 *var restrictor = Trait.create(this, new TInputRestrictor())
 *restrictor.restrict($('#tax_rate'), /[0-9.%]/);
 */
function TInputRestrictor() {
  return Trait({

    // Public
    // ----------------------------------------
    /*
     *@param: jQueryObj: JQuery Object representing one or more Input DOM elements (typically of the form $('#myelement'))
     *@param: regexp: RegExp describing a pattern of characters that are permitted to be entered into the Input element/s
     */
    restrict: function(jQueryObj, regexp) {
      // default allows any character
      var matcher = _.isUndefined(regexp) ? /./ : regexp;
      var t = this;

      var onKeyPress = function(e) {
        var permitted = t._isCharPermitted(e.charCode, matcher);
        if (!(permitted)) {
          e.preventDefault();
          return;
        }
      };
      jQueryObj.bind("keypress", onKeyPress);
    },
    // ----------------------------------------

    // Private
    // ----------------------------------------
    _isCharPermitted: function(charCode, matcher) {
      var char = String.fromCharCode(charCode);
      // match returns null if no match is found
      var valid = !(_.isNull(char.match(matcher)));
      return valid;
    }
    // ----------------------------------------
  });
}
