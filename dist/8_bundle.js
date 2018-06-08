(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./client/components/orders/new_order.jsx":
/*!************************************************!*\
  !*** ./client/components/orders/new_order.jsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ \"./node_modules/babel-runtime/regenerator/index.js\");\n\nvar _regenerator2 = _interopRequireDefault(_regenerator);\n\nvar _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ \"./node_modules/babel-runtime/helpers/asyncToGenerator.js\");\n\nvar _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"./node_modules/babel-runtime/helpers/possibleConstructorReturn.js\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"./node_modules/babel-runtime/helpers/inherits.js\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactApollo = __webpack_require__(/*! react-apollo */ \"./node_modules/react-apollo/react-apollo.browser.umd.js\");\n\nvar _moment = __webpack_require__(/*! moment */ \"./node_modules/moment/moment.js\");\n\nvar _moment2 = _interopRequireDefault(_moment);\n\nvar _helpers = __webpack_require__(/*! ../../utils/helpers */ \"./client/utils/helpers.js\");\n\nvar _address_mapper = __webpack_require__(/*! ../addresses/address_mapper */ \"./client/components/addresses/address_mapper.jsx\");\n\nvar _address_mapper2 = _interopRequireDefault(_address_mapper);\n\nvar _apply_discount = __webpack_require__(/*! ../../queries/apply_discount */ \"./client/queries/apply_discount.jsx\");\n\nvar _apply_discount2 = _interopRequireDefault(_apply_discount);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Order = function (_Component) {\n  (0, _inherits3.default)(Order, _Component);\n\n  function Order(props) {\n    (0, _classCallCheck3.default)(this, Order);\n\n    var _this = (0, _possibleConstructorReturn3.default)(this, (Order.__proto__ || Object.getPrototypeOf(Order)).call(this));\n\n    _this.state = {\n      planName: props.plan.name,\n      planPrice: props.actualPrice,\n      checking: false,\n      latLng: [],\n      discountErrors: []\n    };\n\n    _this.handleReturnedLocation = _this.handleReturnedLocation.bind(_this);\n    _this.validateDiscount = _this.validateDiscount.bind(_this);\n    _this.checkDiscountCode = _this.checkDiscountCode.bind(_this);\n    _this.fetchAssociatedMap = _this.fetchAssociatedMap.bind(_this);\n    return _this;\n  }\n\n  (0, _createClass3.default)(Order, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {}\n  }, {\n    key: 'validateDiscount',\n    value: function validateDiscount(discount) {\n      if (discount.appliesTo && discount.appliesTo !== 'all') {\n        this.state.planName !== discount.appliesTo ? this.setState(function (prevState) {\n          return { discountErrors: prevState.discountErrors.concat(\"Discount does not apply.\") };\n        }) : null;\n      }\n      if (discount.maxUsageCount) {\n        discount.usageCount >= discount.maxUsageCount ? this.setState(function (prevState) {\n          return { discountErrors: prevState.discountErrors.concat(\"Discount eligibilty has ended.\") };\n        }) : null;\n      }\n      if (discount.endAt && discount.startsAt) {\n        (0, _moment2.default)().isBetween(discount.startsAt, discount.endAt) ? this.setState(function (prevState) {\n          return { discountErrors: prevState.discountErrors.concat(\"Discount invalid.\") };\n        }) : null;\n      }\n      if (this.state.discountErrors.length > 0) {\n        return false;\n      }\n      return true;\n    }\n  }, {\n    key: 'checkDiscountCode',\n    value: function checkDiscountCode(client, e) {\n      var val = e.currentTarget.value;\n      this.setState({ checking: true, discountErrors: [] }, (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {\n        var _ref2, applyDiscount, valid, updatedPrice;\n\n        return _regenerator2.default.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _context.next = 2;\n                return client.query({\n                  query: _apply_discount2.default,\n                  variables: { input: { code: val } }\n                });\n\n              case 2:\n                _ref2 = _context.sent;\n                applyDiscount = _ref2.data.applyDiscount;\n\n                if (applyDiscount.discount) {\n                  valid = this.validateDiscount(applyDiscount.discount);\n\n                  if (valid) {\n                    updatedPrice = applyDiscount.discount.amount.includes('%') ? (0, _helpers.calcPercentageDiscount)({\n                      base: this.state.planPrice, percent: applyDiscount.discount.amount\n                    }) : (0, _helpers.calcNumberDiscount)({\n                      base: this.state.planPrice, number: applyDiscount.discount.amount\n                    });\n\n                    this.props.handleReturnedPayment({\n                      discountId: applyDiscount.discount.id,\n                      discountedActualPrice: updatedPrice,\n                      discountedPrice: updatedPrice.slice(0, updatedPrice.length - 2) + '.' + updatedPrice.slice(updatedPrice.length - 2, updatedPrice.length) });\n                  }\n                } else {\n                  this.props.handleReturnedPayment({ discountedActualPrice: null, discountedPrice: null, discountId: null });\n                }\n                console.log('err', this.state.discountErrors);\n                this.setState({ checking: false, discount: applyDiscount.discount ? applyDiscount.discount : null });\n\n              case 7:\n              case 'end':\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      })));\n    }\n  }, {\n    key: 'fetchAssociatedMap',\n    value: function () {\n      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {\n        var mapOptions, map;\n        return _regenerator2.default.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                if (!(this.state.latLng.length > 0)) {\n                  _context2.next = 5;\n                  break;\n                }\n\n                mapOptions = {\n                  center: {\n                    lat: this.state.latLng[0],\n                    lng: this.state.latLng[1]\n                  },\n                  zoom: 20,\n                  mapTypeId: 'satellite',\n                  scrollwheel: false\n                };\n                _context2.next = 4;\n                return new google.maps.Map(document.getElementById('mapArea'), mapOptions);\n\n              case 4:\n                map = _context2.sent;\n\n              case 5:\n              case 'end':\n                return _context2.stop();\n            }\n          }\n        }, _callee2, this);\n      }));\n\n      function fetchAssociatedMap() {\n        return _ref3.apply(this, arguments);\n      }\n\n      return fetchAssociatedMap;\n    }()\n  }, {\n    key: 'handleReturnedLocation',\n    value: function handleReturnedLocation(_ref4) {\n      var address1 = _ref4.address1,\n          address2 = _ref4.address2,\n          city = _ref4.city,\n          state = _ref4.state,\n          zip = _ref4.zip,\n          lat = _ref4.lat,\n          lng = _ref4.lng;\n\n      this.setState({ latLng: [lat, lng] }, function () {\n        this.fetchAssociatedMap();\n        this.props.handleReturnedLocation({ address1: address1, address2: address2, city: city, state: state, zip: zip, lat: lat, lng: lng });\n      });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this2 = this;\n\n      return _react2.default.createElement(\n        'div',\n        null,\n        _react2.default.createElement(\n          'div',\n          null,\n          _react2.default.createElement(\n            'div',\n            { className: 'text-sm font-bold' },\n            'Address to film'\n          ),\n          _react2.default.createElement(_address_mapper2.default, { handleReturnedLocation: this.handleReturnedLocation })\n        ),\n        _react2.default.createElement(\n          'div',\n          { className: 'flex' },\n          _react2.default.createElement(\n            'div',\n            { className: 'w-2/5 pt-4' },\n            _react2.default.createElement(\n              'p',\n              { className: 'text-sm font-bold' },\n              'Your order includes...'\n            ),\n            _react2.default.createElement(\n              'ul',\n              { className: 'my-2' },\n              this.props.plan.features.map(function (feat, i) {\n                return _react2.default.createElement(\n                  'li',\n                  { key: 'feature_' + i, className: 'my-3 flex' },\n                  _react2.default.createElement(\n                    'span',\n                    { className: 'block mr-3 pt-1' },\n                    _react2.default.createElement('i', { className: 'far fa-check-circle fa-lg' })\n                  ),\n                  _react2.default.createElement(\n                    'span',\n                    { className: 'block text-sm' },\n                    feat.desc\n                  )\n                );\n              })\n            )\n          ),\n          _react2.default.createElement(\n            'div',\n            { className: 'w-3/5 ml-4 pt-4' },\n            _react2.default.createElement('div', { className: 'signup-map-area rounded', id: 'mapArea' })\n          )\n        ),\n        _react2.default.createElement(\n          'div',\n          { className: 'my-4 flex' },\n          _react2.default.createElement(\n            'div',\n            { className: 'w-1/2' },\n            _react2.default.createElement(\n              _reactApollo.ApolloConsumer,\n              null,\n              function (client) {\n                return _react2.default.createElement(\n                  'div',\n                  null,\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'text-sm font-bold' },\n                    'Do you have a discount code?'\n                  ),\n                  _react2.default.createElement('input', {\n                    type: 'text',\n                    placeholder: 'Discount code',\n                    name: 'discountCode',\n                    onChange: function onChange(e) {\n                      return _this2.checkDiscountCode(client, e);\n                    },\n                    className: 'input' })\n                );\n              }\n            )\n          ),\n          _react2.default.createElement(\n            'div',\n            { className: 'w-1/2 flex ' },\n            _react2.default.createElement(\n              'div',\n              { className: 'flex-1 flex items-end pl-4' },\n              this.state.discountErrors.length > 0 ? this.state.discountErrors.map(function (err, i) {\n                return _react2.default.createElement(\n                  'p',\n                  { className: 'text-sm text-red', key: 'err_' + i },\n                  err\n                );\n              }) : (this.state.discount ? this.state.discount.amount : '') + ' ' + (this.state.discount ? ' off' : '')\n            ),\n            _react2.default.createElement(\n              'div',\n              { className: 'flex text-xl font-bold items-end' },\n              _react2.default.createElement(\n                'span',\n                { className: 'inline-block mb-2 mr-1 text-sm' },\n                '$'\n              ),\n              this.props.price\n            )\n          )\n        ),\n        _react2.default.createElement(\n          'div',\n          { className: 'my-4' },\n          _react2.default.createElement(\n            'div',\n            { className: 'text-sm font-bold' },\n            'Payment'\n          ),\n          _react2.default.createElement('div', { id: 'card-element', className: 'input' })\n        )\n      );\n    }\n  }]);\n  return Order;\n}(_react.Component);\n\nexports.default = Order;\n\n//# sourceURL=webpack:///./client/components/orders/new_order.jsx?");

/***/ }),

/***/ "./client/queries/apply_discount.jsx":
/*!*******************************************!*\
  !*** ./client/queries/apply_discount.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _taggedTemplateLiteral2 = __webpack_require__(/*! babel-runtime/helpers/taggedTemplateLiteral */ \"./node_modules/babel-runtime/helpers/taggedTemplateLiteral.js\");\n\nvar _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);\n\nvar _templateObject = (0, _taggedTemplateLiteral3.default)(['\\n  query applyDiscount($input: ApplyDiscountInput){\\n    applyDiscount(input: $input){\\n      discount{\\n        id\\n        code\\n        startsAt\\n        endsAt\\n        appliesTo\\n        usageCount\\n        maxUsageCount\\n        amount\\n      }\\n    }\\n  }\\n'], ['\\n  query applyDiscount($input: ApplyDiscountInput){\\n    applyDiscount(input: $input){\\n      discount{\\n        id\\n        code\\n        startsAt\\n        endsAt\\n        appliesTo\\n        usageCount\\n        maxUsageCount\\n        amount\\n      }\\n    }\\n  }\\n']);\n\nvar _graphqlTag = __webpack_require__(/*! graphql-tag */ \"./node_modules/graphql-tag/src/index.js\");\n\nvar _graphqlTag2 = _interopRequireDefault(_graphqlTag);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar ApplyDiscount = (0, _graphqlTag2.default)(_templateObject);\n\nexports.default = ApplyDiscount;\n\n//# sourceURL=webpack:///./client/queries/apply_discount.jsx?");

/***/ })

}]);