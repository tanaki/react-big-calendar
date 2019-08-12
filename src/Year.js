import PropTypes from 'prop-types'
import React from 'react'

import * as dates from './utils/dates'
import { navigate } from './utils/constants'

class Year extends React.Component {
  render() {
    let { date } = this.props
    let start = dates.startOf(date, 'year')
    let end = dates.endOf(date, 'year')

    let events = []
    let range = dates.range(start, end, 'month')

    return (
      <div className="rbc-year-view">
        {range.map((month, idx) => this.renderMonth(month, events, idx))}
      </div>
    )
  }

  renderMonth = (month, events, idx) => {
    let { localizer } = this.props

    let start = dates.startOf(month, 'month')
    start = dates.startOf(start, 'week')

    let end = dates.endOf(month, 'month')
    end = dates.endOf(end, 'week')

    let monthRange = dates.range(start, end, 'day')

    return (
      <div className="rbc-month-full" key={idx}>
        <div className="rbc-month-header">
          {localizer.format(start, 'monthFormat')}
        </div>
        <div className="rbc-month-content">
          {monthRange.map((day, idxDay) => this.renderDay(day, events, idxDay))}
        </div>
      </div>
    )
  }

  renderDay = (day, events, idxDay) => {
    let { localizer } = this.props
    return (
      <div className="rbc-day-full" key={idxDay}>
        {localizer.format(day, 'dateFormat')}
      </div>
    )
  }
}

Year.propTypes = {
  events: PropTypes.array,
  date: PropTypes.instanceOf(Date),

  selected: PropTypes.object,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
}

Year.navigate = (date, action) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'year')

    case navigate.NEXT:
      return dates.add(date, 1, 'year')

    default:
      return date
  }
}

Year.title = (start, { localizer }) => {
  return localizer.format(start, 'yearHeaderFormat')
}

export default Year
