(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./client/components/public/admin/register.jsx":
/*!*****************************************************!*\
  !*** ./client/components/public/admin/register.jsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ \"./node_modules/babel-runtime/regenerator/index.js\");\n\nvar _regenerator2 = _interopRequireDefault(_regenerator);\n\nvar _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ \"./node_modules/babel-runtime/helpers/asyncToGenerator.js\");\n\nvar _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);\n\nvar _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ \"./node_modules/babel-runtime/helpers/defineProperty.js\");\n\nvar _defineProperty3 = _interopRequireDefault(_defineProperty2);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"./node_modules/babel-runtime/helpers/possibleConstructorReturn.js\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"./node_modules/babel-runtime/helpers/inherits.js\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nvar _reactApollo = __webpack_require__(/*! react-apollo */ \"./node_modules/react-apollo/react-apollo.browser.umd.js\");\n\nvar _ramda = __webpack_require__(/*! ramda */ \"./node_modules/ramda/es/index.js\");\n\nvar _reactToastify = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/lib/index.js\");\n\nvar _list = __webpack_require__(/*! ../../contacts/list */ \"./client/components/contacts/list.jsx\");\n\nvar _list2 = _interopRequireDefault(_list);\n\nvar _signup = __webpack_require__(/*! ../../users/signup */ \"./client/components/users/signup.jsx\");\n\nvar _signup2 = _interopRequireDefault(_signup);\n\nvar _drag_drop_uploader = __webpack_require__(/*! ../../assets/drag_drop_uploader */ \"./client/components/assets/drag_drop_uploader.jsx\");\n\nvar _drag_drop_uploader2 = _interopRequireDefault(_drag_drop_uploader);\n\nvar _validators = __webpack_require__(/*! ../../../utils/validators */ \"./client/utils/validators.js\");\n\nvar _create_user = __webpack_require__(/*! ../../../mutations/create_user */ \"./client/mutations/create_user.jsx\");\n\nvar _create_user2 = _interopRequireDefault(_create_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar env = window.location.host.includes(\"homefilming.com\") ? \"production\" : \"development\";\n\nvar CreateUser = function (_Component) {\n  (0, _inherits3.default)(CreateUser, _Component);\n\n  function CreateUser() {\n    (0, _classCallCheck3.default)(this, CreateUser);\n\n    var _this = (0, _possibleConstructorReturn3.default)(this, (CreateUser.__proto__ || Object.getPrototypeOf(CreateUser)).call(this));\n\n    _this.state = {\n      userVerified: false,\n      contactsVerified: false,\n      userTypeOpen: false,\n      loading: false,\n      type: 'unapproved_admin',\n      contacts: [],\n      errors: []\n    };\n\n    _this.toggleUserTypeOpen = _this.toggleUserTypeOpen.bind(_this);\n    _this.userTypeSelect = _this.userTypeSelect.bind(_this);\n    _this.handleInputChange = _this.handleInputChange.bind(_this);\n    _this.checkUserVerified = _this.checkUserVerified.bind(_this);\n    _this.handleReturnedContacts = _this.handleReturnedContacts.bind(_this);\n    _this.renderValidated = _this.renderValidated.bind(_this);\n    _this.runMutation = _this.runMutation.bind(_this);\n    _this.allCriteriaVerified = _this.allCriteriaVerified.bind(_this);\n    _this.handleSubmit = _this.handleSubmit.bind(_this);\n    return _this;\n  }\n\n  (0, _createClass3.default)(CreateUser, [{\n    key: 'renderValidated',\n    value: function renderValidated() {\n      return _react2.default.createElement(\n        'span',\n        {\n          className: '',\n          style: { opacity: '' + (this.state.userVerified ? 1 : 0) } },\n        _react2.default.createElement('i', { className: 'fas fa-check' })\n      );\n    }\n  }, {\n    key: 'toggleUserTypeOpen',\n    value: function toggleUserTypeOpen() {\n      this.setState({ userTypeOpen: !this.state.userTypeOpen });\n    }\n  }, {\n    key: 'userTypeSelect',\n    value: function userTypeSelect(e) {\n      this.setState({ userType: e.currentTarget.getAttribute('value'),\n        userTypeTitle: e.currentTarget.getAttribute('title'),\n        userTypeOpen: !this.state.userTypeOpen });\n    }\n  }, {\n    key: 'handleReturnedUser',\n    value: function handleReturnedUser(verified, _ref) {\n      var name = _ref.name,\n          email = _ref.email,\n          password = _ref.password;\n\n      this.setState({ userVerified: verified, name: name, email: email, password: password });\n    }\n  }, {\n    key: 'handleReturnedContacts',\n    value: function handleReturnedContacts(contacts) {\n      this.setState({ contacts: contacts, contactsVerified: contacts.length > 0 });\n    }\n  }, {\n    key: 'returnUploadInstance',\n    value: function returnUploadInstance() {}\n  }, {\n    key: 'handleInputChange',\n    value: function handleInputChange(e) {\n      var _this2 = this;\n\n      this.setState((0, _defineProperty3.default)({}, e.currentTarget.name, e.currentTarget.value), function () {\n        _this2.checkUserVerified();\n      });\n    }\n  }, {\n    key: 'checkUserVerified',\n    value: function checkUserVerified() {\n      if ((0, _validators.isValidName)(this.state.name) && (0, _validators.isValidEmail)(this.state.email) && (0, _validators.isValidPassword)(this.state.password) && this.state.confirmPassword === this.state.password) {\n        this.setState({ userVerified: true });\n      } else {\n        this.setState({ userVerified: false });\n      }\n    }\n  }, {\n    key: 'allCriteriaVerified',\n    value: function allCriteriaVerified() {\n      return this.state.userVerified && this.state.contactsVerified ? true : false;\n    }\n  }, {\n    key: 'submitErrorCheck',\n    value: function submitErrorCheck() {\n      if (this.allCriteriaVerified()) {\n        return true;\n      } else {\n        if (!this.state.userVerified) {\n          this.setState(function (prevState) {\n            return { errors: prevState.errors.concat({ type: \"user\", section: \"User info\", message: \"Please make sure all your user fields are valid.\" }) };\n          });\n        }\n        if (!this.state.contactsVerified) {\n          this.setState(function (prevState) {\n            return { errors: prevState.errors.concat({ type: \"contacts\", section: \"Contacts\", message: \"Please add at least one valid point of contact.\" }) };\n          });\n        }\n      }\n    }\n  }, {\n    key: 'handleGQLErrors',\n    value: function handleGQLErrors(err) {\n      var _this3 = this;\n\n      console.log(err);\n      err.graphQLErrors.map(function (error) {\n        if (error.message === \"UniqueEmailError\") {\n          _this3.setState(function (prevState) {\n            return { errors: prevState.errors.concat({ type: \"email\", section: \"Email address is taken\",\n                message: \"The email address you entered is already in use. Would you like to login?\" }) };\n          });\n        } else if (error.message === \"RequiredFieldError\") {\n          _this3.setState(function (prevState) {\n            return { errors: prevState.errors.concat({ type: \"user\", section: \"Missing Required Field\",\n                message: \"Please check all your info.\" }) };\n          });\n        }\n      });\n    }\n  }, {\n    key: 'renderErrors',\n    value: function renderErrors() {\n      return _react2.default.createElement(\n        'div',\n        { className: 'error-area hide-error ' + (this.state.errors.length > 0 ? ' show-error' : '') },\n        _react2.default.createElement(\n          'h2',\n          { className: 'text-base font-bold' },\n          'Please correct these errors'\n        ),\n        this.state.errors.map(function (err, i) {\n          return _react2.default.createElement(\n            'div',\n            { key: 'error_' + i, className: 'my-4' },\n            _react2.default.createElement(\n              'h3',\n              { className: 'text-sm font-bold' },\n              err.section\n            ),\n            _react2.default.createElement(\n              'p',\n              { className: 'text-sm' },\n              err.message\n            ),\n            err.type === \"email\" ? _react2.default.createElement(\n              _reactRouterDom.Link,\n              { to: '/login', className: ' action-button button-blue' },\n              _react2.default.createElement('span', { className: ' action-button-overlay' }),\n              'Login'\n            ) : null\n          );\n        })\n      );\n    }\n  }, {\n    key: 'renderButtonText',\n    value: function renderButtonText() {\n      if (this.allCriteriaVerified()) {\n        return \"Submit\";\n      } else {\n        return \"Please enter required info...\";\n      }\n    }\n  }, {\n    key: 'runMutation',\n    value: function runMutation() {\n      var _this4 = this;\n\n      this.setState({ loading: !this.state.loading }, (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {\n        var contacts, resolved, _resolved$data$create, user, auth;\n\n        return _regenerator2.default.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _reactToastify.toast.info('⏱️ Creating order... One moment please.', {\n                  autoClose: false\n                });\n                contacts = _this4.state.contacts.map(function (c) {\n                  return (0, _ramda.pick)(['type', 'content', 'status', 'default'], c);\n                });\n                _context.next = 4;\n                return _this4.props.submitUser({ contacts: contacts, state: _this4.state }).catch(function (err) {\n                  _this4.handleGQLErrors(err);\n                });\n\n              case 4:\n                resolved = _context.sent;\n                _resolved$data$create = resolved.data.createUser, user = _resolved$data$create.user, auth = _resolved$data$create.auth;\n\n                localStorage.setItem('hf_auth_header_token', auth.token);\n                _this4.setState({ loading: !_this4.state.loading }, function () {\n                  var history = this.props.history;\n\n                  history.push('/dashboard');\n                });\n\n              case 8:\n              case 'end':\n                return _context.stop();\n            }\n          }\n        }, _callee, _this4);\n      })));\n    }\n  }, {\n    key: 'handleSubmit',\n    value: function () {\n      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(e) {\n        return _regenerator2.default.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                if (this.state.errors.length > 0) {\n                  this.setState({ errors: [] });\n                }\n\n                if (!this.submitErrorCheck()) {\n                  _context2.next = 5;\n                  break;\n                }\n\n                this.runMutation();_context2.next = 6;\n                break;\n\n              case 5:\n                return _context2.abrupt('return', false);\n\n              case 6:\n              case 'end':\n                return _context2.stop();\n            }\n          }\n        }, _callee2, this);\n      }));\n\n      function handleSubmit(_x) {\n        return _ref3.apply(this, arguments);\n      }\n\n      return handleSubmit;\n    }()\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this5 = this;\n\n      return _react2.default.createElement(\n        'div',\n        null,\n        _react2.default.createElement(\n          'div',\n          { className: 'signup-container' },\n          _react2.default.createElement(\n            'div',\n            { className: 'w-full rounded shadow p-6 border border-grey-dark' },\n            _react2.default.createElement(\n              'div',\n              { className: 'signup-header' },\n              _react2.default.createElement(\n                'div',\n                { className: 'w-48 h-48' },\n                _react2.default.createElement(_drag_drop_uploader2.default, {\n                  header: 'Upload avatar',\n                  circle: true,\n                  fileTypeName: 'photo',\n                  source: 'MainOrder-Avatar',\n                  fieldname: 'avatar',\n                  mimes: 'images',\n                  endpoint: '/uploads/avatar',\n                  returnUploadInstance: this.returnUploadInstance\n                })\n              ),\n              _react2.default.createElement(\n                'div',\n                { className: 'flex-1 -mr-6' },\n                _react2.default.createElement(\n                  'div',\n                  { className: '' },\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'flex' },\n                    _react2.default.createElement('div', { className: 'flex-1' }),\n                    _react2.default.createElement(\n                      _reactRouterDom.Link,\n                      { className: 'w-48 h-6 block', to: '/' },\n                      _react2.default.createElement('img', { src: '/' + __webpack_require__(/*! ../../../assets/images/hf_logo_dark@2x.png */ \"./client/assets/images/hf_logo_dark@2x.png\") })\n                    )\n                  ),\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'text-right text-sm font-bold' },\n                    'Create Admin'\n                  )\n                ),\n                _react2.default.createElement(\n                  'div',\n                  { className: 'ml-6 mt-6 dropdown relative inline-block ' + (this.state.userTypeOpen ? 'is-active' : '') },\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'dropdown-trigger hover:cursor-pointer', onClick: this.toggleUserTypeOpen },\n                    _react2.default.createElement(\n                      'button',\n                      {\n                        className: 'select-faker',\n                        'aria-haspopup': 'true',\n                        'aria-controls': 'dropdown-menu' },\n                      _react2.default.createElement(\n                        'span',\n                        null,\n                        this.state.userTypeTitle ? this.state.userTypeTitle : 'UserType'\n                      ),\n                      _react2.default.createElement(\n                        'span',\n                        { className: 'inline-block ml-6' },\n                        _react2.default.createElement('i', { className: 'fa fa-angle-down', 'aria-hidden': 'true' })\n                      )\n                    )\n                  ),\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'dropdown-menu ' + (this.state.userTypeOpen ? 'block' : 'hidden'), id: 'dropdown-menu', role: 'menu' },\n                    _react2.default.createElement(\n                      'div',\n                      { className: 'p-2 flex flex-wrap bg-white border border-grey rounded' },\n                      [['Agent', 'agent'], ['Pilot', 'pilot'], ['Unapproved Admin', 'unapproved_admin']].map(function (type, i) {\n                        return _react2.default.createElement(\n                          'a',\n                          {\n                            key: 'opts_' + i,\n                            className: 'w-full block px-2 py-1 hover:cursor-pointer',\n                            onClick: _this5.userTypeSelect,\n                            value: type[1],\n                            title: type[0]\n                          },\n                          type[0]\n                        );\n                      })\n                    )\n                  )\n                ),\n                _react2.default.createElement(\n                  'div',\n                  { className: 'px-6 pb-2' },\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'mb-4' },\n                    _react2.default.createElement(\n                      'div',\n                      { className: 'text-sm font-bold mt-4' },\n                      'Full name'\n                    ),\n                    _react2.default.createElement('input', {\n                      onChange: this.handleInputChange,\n                      className: 'input',\n                      name: 'name',\n                      type: 'text',\n                      placeholder: 'Full Name' })\n                  )\n                )\n              )\n            ),\n            _react2.default.createElement(\n              'div',\n              { className: 'border-b' },\n              _react2.default.createElement(\n                'div',\n                { className: 'mb-4' },\n                _react2.default.createElement(\n                  'div',\n                  { className: 'text-xs' },\n                  'Email address'\n                ),\n                _react2.default.createElement('input', {\n                  onChange: this.handleInputChange,\n                  className: 'input',\n                  name: 'email',\n                  type: 'text',\n                  placeholder: 'Email address' })\n              ),\n              _react2.default.createElement(\n                'div',\n                { className: 'flex mb-4 -mx-2' },\n                _react2.default.createElement(\n                  'div',\n                  { className: 'flex-1 mx-2' },\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'text-xs' },\n                    'Create password'\n                  ),\n                  _react2.default.createElement('input', {\n                    onChange: this.handleInputChange,\n                    className: 'input',\n                    name: 'password',\n                    type: 'password',\n                    placeholder: 'Create password' }),\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'text-xs mt-1' },\n                    'Password must be at least 8 characters in with capital and lowercase letters and include at least one number.'\n                  )\n                ),\n                _react2.default.createElement(\n                  'div',\n                  { className: 'flex-1 mx-2' },\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'text-xs' },\n                    'Confirm password'\n                  ),\n                  _react2.default.createElement('input', {\n                    onChange: this.handleInputChange,\n                    className: 'input',\n                    name: 'confirmPassword',\n                    type: 'password',\n                    placeholder: 'Confirm password' })\n                )\n              )\n            ),\n            _react2.default.createElement(\n              'div',\n              { className: 'pb-2' },\n              _react2.default.createElement(\n                'div',\n                { className: 'my-4' },\n                _react2.default.createElement(\n                  'h3',\n                  { className: 'mb-1' },\n                  'Points of contact'\n                )\n              ),\n              _react2.default.createElement(_list2.default, {\n                restrictedMode: true,\n                editMode: true,\n                handleReturnedContacts: this.handleReturnedContacts })\n            ),\n            this.renderErrors(),\n            _react2.default.createElement(\n              'div',\n              { className: 'mt-4' },\n              _react2.default.createElement(\n                'a',\n                {\n                  className: ' action-button button-green',\n                  onClick: this.handleSubmit },\n                _react2.default.createElement('span', { className: ' action-button-overlay' }),\n                this.renderButtonText()\n              )\n            )\n          )\n        )\n      );\n    }\n  }]);\n  return CreateUser;\n}(_react.Component);\n\nexports.default = (0, _reactApollo.graphql)(_create_user2.default, {\n  props: function props(_ref4) {\n    var mutate = _ref4.mutate;\n    return {\n      submitUser: function submitUser(_ref5) {\n        var state = _ref5.state,\n            contacts = _ref5.contacts;\n        return mutate({ variables: {\n            input: {\n              user: {\n                name: state.name,\n                email: state.email,\n                password: state.password,\n                type: state.userType,\n                contacts: contacts\n              }\n            }\n          } });\n      }\n    };\n  }\n})(CreateUser);\n\n//# sourceURL=webpack:///./client/components/public/admin/register.jsx?");

/***/ }),

/***/ "./client/components/users/signup.jsx":
/*!********************************************!*\
  !*** ./client/components/users/signup.jsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ \"./node_modules/babel-runtime/helpers/defineProperty.js\");\n\nvar _defineProperty3 = _interopRequireDefault(_defineProperty2);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"./node_modules/babel-runtime/helpers/possibleConstructorReturn.js\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"./node_modules/babel-runtime/helpers/inherits.js\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _aphrodite = __webpack_require__(/*! aphrodite */ \"./node_modules/aphrodite/lib/index.js\");\n\nvar _common_forms = __webpack_require__(/*! ../../styles/common_forms */ \"./client/styles/common_forms.jsx\");\n\nvar _common_forms2 = _interopRequireDefault(_common_forms);\n\nvar _validators = __webpack_require__(/*! ../../utils/validators */ \"./client/utils/validators.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar UserCreate = function (_Component) {\n  (0, _inherits3.default)(UserCreate, _Component);\n\n  function UserCreate() {\n    (0, _classCallCheck3.default)(this, UserCreate);\n\n    var _this = (0, _possibleConstructorReturn3.default)(this, (UserCreate.__proto__ || Object.getPrototypeOf(UserCreate)).call(this));\n\n    _this.handleInputChange = _this.handleInputChange.bind(_this);\n    return _this;\n  }\n\n  (0, _createClass3.default)(UserCreate, [{\n    key: 'handleInputChange',\n    value: function handleInputChange(e) {\n      var _this2 = this;\n\n      this.setState((0, _defineProperty3.default)({}, e.currentTarget.name, e.currentTarget.value), function () {\n        _this2.checkUserVerified();\n      });\n    }\n  }, {\n    key: 'checkUserVerified',\n    value: function checkUserVerified() {\n      if ((0, _validators.isValidName)(this.state.name) && (0, _validators.isValidEmail)(this.state.email) && (0, _validators.isValidPassword)(this.state.password) && this.state.confirmPassword === this.state.password) {\n        this.props.handleReturnedUser(true, this.state);\n      } else if (this.props.userVerified) {\n        this.props.handleReturnedUser(false, this.state);\n      }\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(\n        'div',\n        null,\n        _react2.default.createElement(\n          'div',\n          { className: 'columns' },\n          _react2.default.createElement(\n            'div',\n            { className: 'field column' },\n            _react2.default.createElement(\n              'div',\n              { className: 'control has-icons-left has-icons-right' },\n              _react2.default.createElement('input', {\n                onChange: this.handleInputChange,\n                className: 'input is-medium',\n                name: 'name',\n                type: 'text',\n                placeholder: 'Full Name' }),\n              _react2.default.createElement(\n                'span',\n                { className: 'icon is-medium is-left' },\n                _react2.default.createElement('i', { className: 'fa fa-user' })\n              )\n            )\n          ),\n          _react2.default.createElement(\n            'div',\n            { className: 'field column' },\n            _react2.default.createElement(\n              'div',\n              { className: 'control has-icons-left has-icons-right' },\n              _react2.default.createElement('input', {\n                onChange: this.handleInputChange,\n                className: 'input is-medium',\n                name: 'email',\n                type: 'email',\n                placeholder: 'Email' }),\n              _react2.default.createElement(\n                'span',\n                { className: 'icon is-medium is-left' },\n                _react2.default.createElement('i', { className: 'fa fa-envelope' })\n              )\n            )\n          )\n        ),\n        _react2.default.createElement(\n          'div',\n          { className: 'columns' },\n          _react2.default.createElement(\n            'div',\n            { className: 'field column' },\n            _react2.default.createElement(\n              'div',\n              { className: 'control has-icons-left has-icons-right' },\n              _react2.default.createElement('input', {\n                onChange: this.handleInputChange,\n                className: 'input is-medium',\n                name: 'password',\n                type: 'password',\n                placeholder: 'Password' }),\n              _react2.default.createElement(\n                'span',\n                { className: 'icon is-medium is-left' },\n                _react2.default.createElement('i', { className: 'fa fa-key' })\n              )\n            )\n          ),\n          _react2.default.createElement(\n            'div',\n            { className: 'field column' },\n            _react2.default.createElement(\n              'div',\n              { className: 'control has-icons-left has-icons-right' },\n              _react2.default.createElement('input', {\n                onChange: this.handleInputChange,\n                className: 'input is-medium',\n                name: 'confirmPassword',\n                type: 'password',\n                placeholder: 'Re-type Password' }),\n              _react2.default.createElement(\n                'span',\n                { className: 'icon is-medium is-left' },\n                _react2.default.createElement('i', { className: 'fa fa-lock' })\n              )\n            )\n          )\n        )\n      );\n    }\n  }]);\n  return UserCreate;\n}(_react.Component);\n\nexports.default = UserCreate;\n\n//# sourceURL=webpack:///./client/components/users/signup.jsx?");

/***/ }),

/***/ "./client/mutations/create_user.jsx":
/*!******************************************!*\
  !*** ./client/mutations/create_user.jsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _taggedTemplateLiteral2 = __webpack_require__(/*! babel-runtime/helpers/taggedTemplateLiteral */ \"./node_modules/babel-runtime/helpers/taggedTemplateLiteral.js\");\n\nvar _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);\n\nvar _templateObject = (0, _taggedTemplateLiteral3.default)(['\\n  mutation($input: UserInput) {\\n    createUser(input: $input){\\n      user {\\n        id\\n        name\\n        email\\n        type\\n      }\\n      auth {\\n        token\\n      }\\n    }\\n  }\\n'], ['\\n  mutation($input: UserInput) {\\n    createUser(input: $input){\\n      user {\\n        id\\n        name\\n        email\\n        type\\n      }\\n      auth {\\n        token\\n      }\\n    }\\n  }\\n']);\n\nvar _graphqlTag = __webpack_require__(/*! graphql-tag */ \"./node_modules/graphql-tag/src/index.js\");\n\nvar _graphqlTag2 = _interopRequireDefault(_graphqlTag);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar CreatePilot = (0, _graphqlTag2.default)(_templateObject);\nexports.default = CreatePilot;\n\n//# sourceURL=webpack:///./client/mutations/create_user.jsx?");

/***/ }),

/***/ "./client/styles/common_forms.jsx":
/*!****************************************!*\
  !*** ./client/styles/common_forms.jsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ \"./node_modules/babel-runtime/helpers/defineProperty.js\");\n\nvar _defineProperty3 = _interopRequireDefault(_defineProperty2);\n\nvar _firstChild, _lastChild;\n\nvar _aphrodite = __webpack_require__(/*! aphrodite */ \"./node_modules/aphrodite/lib/index.js\");\n\nvar _helpers = __webpack_require__(/*! ./helpers */ \"./client/styles/helpers.jsx\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar commonForms = _aphrodite.StyleSheet.create({\n  mainContainer: {\n    maxWidth: '768px',\n    padding: '2rem'\n  },\n  container: {\n    paddingBottom: '2rem'\n  },\n  subtitle: {\n    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',\n    fontSize: '1.2rem',\n    color: _helpers.c.grey,\n    marginBottom: '0px'\n  },\n  row: {\n    display: 'flex',\n    flexWrap: 'wrap',\n    justifyContent: 'space-between'\n  },\n  area: {\n    ':first-child': (_firstChild = {}, (0, _defineProperty3.default)(_firstChild, _helpers.ss.sm, {\n      width: '100%'\n    }), (0, _defineProperty3.default)(_firstChild, _helpers.ss.md, {\n      width: 'calc(50% - 2rem)',\n      marginRight: '2rem'\n    }), _firstChild),\n    ':last-child': (_lastChild = {}, (0, _defineProperty3.default)(_lastChild, _helpers.ss.sm, {\n      width: '100%'\n    }), (0, _defineProperty3.default)(_lastChild, _helpers.ss.md, {\n      width: 'calc(50% - 2rem)',\n      marginLeft: '2rem'\n    }), _lastChild)\n  },\n  element: {\n    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',\n    fontSize: '1rem',\n    width: '100%'\n  },\n  section: {\n    paddingBottom: '3rem'\n  },\n  check: {\n    color: _helpers.c.green,\n    paddingLeft: '20px',\n    transition: 'all .5s ease-in-out'\n  },\n  sectionHeader: {\n    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',\n    fontSize: '2rem',\n    paddingBottom: '1rem',\n    borderBottom: '1px solid ' + _helpers.c.lightGrey\n  }\n\n});\n\nexports.default = commonForms;\n\n//# sourceURL=webpack:///./client/styles/common_forms.jsx?");

/***/ })

}]);