/*
 *Usage:
 *var restrictor = Trait.create(this, new TInputRestrictor())
 *restrictor.restrict($('#tax_rate_txt'), /[0-9.%]/);
 *restrictor.restrict($('#decimal_txt'), /[0-9.%]/, /^-{0,1}\d*[.]?\d{0,2}$/);
 */
function TInputRestrictor() {
  return Trait({

    // Public
    // ----------------------------------------
    /*
     *@param: jQueryObj: JQuery Object representing one or more Input DOM elements (typically of the form $('#myelement'))
     *@param: restrict_regex: RegExp describing a pattern of characters that are permitted to be entered into the Input element/s
     *@param: format_regex (optional): RegExp describing a format that the input element/s value must conform to
     */
    restrict: function(jQueryObj, restrict_regex, format_regex) {
      // default allows any character
      var matcher = _.isUndefined(restrict_regex) ? /./ : restrict_regex;
      var format_matcher = _.isUndefined(format_regex) ? undefined : format_regex;
      var t = this;
      var prev_value;

      var onKeyPress = function(e) {
        var permitted = t._isCharPermitted(e.charCode, matcher);
        prev_value = jQueryObj.val();
        if (!(permitted)) {
          e.preventDefault();
          return;
        }
      };
      jQueryObj.bind("keypress", onKeyPress);

      if(!_.isUndefined(format_matcher)) {
        var onKeyUp = function(e) {
          if(!t._isFormatPermitted(jQueryObj.val(), format_matcher)) {
            // Format not permitted: resets input value to previous value
            jQueryObj.val(prev_value);
          }
        };
        jQueryObj.bind("keyup", onKeyUp);
      }
    },
    // ----------------------------------------

    // Private
    // ----------------------------------------
    _isCharPermitted: function(charCode, matcher) {
      var char = String.fromCharCode(charCode);
      // match returns null if no match is found
      var valid = !(_.isNull(char.match(matcher)));
      return valid;
    },

    _isFormatPermitted: function(value, matcher) {
      var valid = false;
      if(value.length === 0 || !_.isNull(value.match(matcher))) {
        valid = true;
      }
      return valid;
    }
    // ----------------------------------------
  });
}
