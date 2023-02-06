// import { t } from '../locale/index';

// export default {
//   methods: {
//     t(...args) {
//       return t.apply(this, args);
//     }
//   }
// };


'use strict';

exports.__esModule = true;

var _locale = require('../locale/index');

exports.default = {
  methods: {
    t: function t() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _locale.t.apply(this, args);
    }
  }
};
