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

Editor.propTypes = {
    initialValue: PropTypes.string.isRequired,
    updateValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired
}

export default Editor