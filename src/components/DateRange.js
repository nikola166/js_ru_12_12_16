import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { connect } from 'react-redux'

import { setFilterDate } from '../AC'

class DateRange extends Component {
    handleDayClick = (e, day) => {
        this.props.setFilterDate(day);
    }

    render() {
        const { from, to } = this.props.date;
        const selectedRange = from && to && `${from.toDateString()} - ${to.toDateString()}`
        return (
            <div className="date-range">
                <DayPicker
                    ref="daypicker"
                    selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
                    onDayClick={ this.handleDayClick }
                />
                {selectedRange}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            date: state.filters.date
        }
    }, {setFilterDate}
)(DateRange)