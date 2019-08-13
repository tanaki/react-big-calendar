'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var dates = _interopRequireWildcard(require('./utils/dates'))

var _constants = require('./utils/constants')

var Year =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(Year, _React$Component)

    function Year() {
      var _this

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key]
      }

      _this =
        _React$Component.call.apply(_React$Component, [this].concat(args)) ||
        this

      _this.renderMonth = function(month, events, idx) {
        var localizer = _this.props.localizer
        var start = dates.startOf(month, 'month')
        start = dates.startOf(start, 'week')
        var end = dates.endOf(month, 'month')
        end = dates.endOf(end, 'week')
        var monthRange = dates.range(start, end, 'day')
        var daysRange = dates.range(start, dates.endOf(start, 'week'), 'day')
        return _react.default.createElement(
          'div',
          {
            className: 'rbc-month-full',
            key: idx,
          },
          _react.default.createElement(
            'div',
            {
              className: 'rbc-month-header',
            },
            localizer.format(start, 'monthFormat')
          ),
          _react.default.createElement(
            'div',
            {
              className: 'rbc-week-header',
            },
            daysRange.map(function(day, idxLabel) {
              return _this.renderLabel(day, idxLabel)
            })
          ),
          _react.default.createElement(
            'div',
            {
              className: 'rbc-month-content',
            },
            monthRange.map(function(day, idxDay) {
              return _this.renderDay(day, events, idxDay)
            })
          )
        )
      }

      _this.renderLabel = function(day, idxLabel) {
        var localizer = _this.props.localizer
        return _react.default.createElement(
          'div',
          {
            className: 'rbc-day-label',
            key: idxLabel,
          },
          localizer.format(day, 'weekdayFormat')
        )
      }

      _this.renderDay = function(day, events, idxDay) {
        var localizer = _this.props.localizer
        return _react.default.createElement(
          'div',
          {
            className: 'rbc-day-full',
            key: idxDay,
          },
          localizer.format(day, 'dateFormat')
        )
      }

      return _this
    }

    var _proto = Year.prototype

    _proto.render = function render() {
      var _this2 = this

      var date = this.props.date
      var start = dates.startOf(date, 'year')
      var end = dates.endOf(date, 'year')
      var events = []
      var range = dates.range(start, end, 'month')
      return _react.default.createElement(
        'div',
        {
          className: 'rbc-year-view',
        },
        range.map(function(month, idx) {
          return _this2.renderMonth(month, events, idx)
        })
      )
    }

    return Year
  })(_react.default.Component)

Year.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        events: _propTypes.default.array,
        date: _propTypes.default.instanceOf(Date),
        selected: _propTypes.default.object,
        accessors: _propTypes.default.object.isRequired,
        components: _propTypes.default.object.isRequired,
        getters: _propTypes.default.object.isRequired,
        localizer: _propTypes.default.object.isRequired,
      }
    : {}

Year.navigate = function(date, action) {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return dates.add(date, -1, 'year')

    case _constants.navigate.NEXT:
      return dates.add(date, 1, 'year')

    default:
      return date
  }
}

Year.title = function(start, _ref) {
  var localizer = _ref.localizer
  return localizer.format(start, 'yearHeaderFormat')
}

var _default = Year
exports.default = _default
module.exports = exports['default']
