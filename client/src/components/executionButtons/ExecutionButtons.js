import React from 'react'
import PropTypes from 'prop-types'
import './ExecutionButtons.css'

const ExecutionButtons = ({execute, name}) => (
    <div className="col-md-12">
        <button
            type="button"
            className="btn btn-primary pull-right"
            onClick={execute}
        >
            { name }
        </button>
    </div>
)

ExecutionButtons.propTypes = {
    execute: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

export default ExecutionButtons