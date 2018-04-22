import React from 'react'
import PropTypes from 'prop-types'
import './Editor.css'

const Editor = ({initialValue, updateValue, placeholder, rows}) => (
    <div className="col-md-12">
        <textarea
            rows={rows}
            placeholder={placeholder}
            defaultValue={initialValue}
            onChange={updateValue}
        />
    </div>
)

const PreviewExecution = ({date, query, changePreviewState}) => {
    return (
        <div
        className="row execution mousable"
        onClick = {() => changePreviewState()}
        >
            <div className="col-md-4 execution-date">
                { date.dayOfWeek }, { date.dayOfMonth } { date.month } { date.year }, { date.hour } : { date.minute } : { date.second }
            </div>
            <div className="col-md-8 query-preview">
                { query }
            </div>
        </div>
    )
}

Editor.propTypes = {
    initialValue: PropTypes.string.isRequired,
    updateValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired
}

export default Editor