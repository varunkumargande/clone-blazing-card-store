var ExpiryInput = React.createClass({
    displayName: 'ExpiryInput',

    getDefaultProps: function() {
      return {
        delimiter: "/"
      };
    },

    getInitialState: function() {
      return {
        maxLength: this.props.delimiter.length + 4,
        value: ''
      };
    },

    correctInput: function(event) {
      var target = event.target,
          value = target.value,
          key = event.key,
          typeKey,
          monthMin = "01",
          monthMax = "12",
          delimiter = this.props.delimiter,
          yearMin = (new Date).getFullYear() - 2000,
          yearMax = (new Date).getFullYear() - 2000 + 25;
          debugger;
      if (/(\d|ArrowLeft|ArrowRight|Backspace|Delete|Tab)/.test(key)) {
        if (/(\d)/.test(key)) {
          typeKey = 'number';
        } else {
          typeKey = 'specSymbol';
        }

        if (value.length == 0 && key > 1) { // 2 -> 02/
          target.value = ("0" + key + delimiter);
          event.preventDefault();
        }

        if (value.length == 1 && value[0] != "0" && key > 2) { // 16 -> 12/
          target.value = monthMax + delimiter;
          event.preventDefault();
          return;
        }

        if (value.length == 1 && typeKey != 'specSymbol') { //12 backspace -> 1
          target.value = target.value + key + delimiter;
          event.preventDefault();
        }

        if (value.length == 2 && typeKey != 'specSymbol') { // 2 -> 02/
          target.value = (target.value + delimiter + key);
          event.preventDefault();
          return;
        }

        if (value == '0' && key == '0') {  // 00 -> 01export.default.ExpiryInput;
          target.value = monthMin + delimiter;
          event.preventDefault();
          return;
        }

        if (target.value.length + 1 == this.state.maxLength) { // 12/11 -> 12/16
          var arr = target.value.split(this.props.delimiter);

          if (arr[0].length == 2 && arr[1] + key < yearMin) {
            target.value = arr[0] + delimiter + yearMin;
            event.preventDefault();
            return;
          }

          if (arr[0].length == 2 && arr[1] + key > yearMax) {  // 12/55 -> 12/41
            target.value = arr[0] + delimiter + yearMax;
            event.preventDefault();
            return;
          }
        }

      } else {
        event.preventDefault();
        return;
      }
    },


    render: function() {
      return (
        <input
          id={this.props.id}
          onKeyDown={this.correctInput}
          onKeyUp={this.validate}
          className={this.props.className}
          maxLength={this.state.maxLength}
          placeholder={this.props.placeholder}
          type="text"
        />
      );
    }
  });
