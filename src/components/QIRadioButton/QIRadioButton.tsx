import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css'; // Keep this import
import '../../styles/tailwindcss/QIRadioButton.scss';

interface RadioObject {
    value: string;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
}

interface QIRadioButtonProps {
    radioObjects: RadioObject[];
    name?: string;
}

export const QIRadioButton: React.FC<QIRadioButtonProps> = ({ radioObjects, name = "radio-group" }) => {
    return (
        <div className="qi-input qi-form-element">
            {radioObjects.map((radioObject, index) => (
                <div key={radioObject.value} className="qi-input_wrapper flex">
                    <input 
                        name={name}
                        onChange={radioObject.onChange} 
                        type="radio" 
                        value={radioObject.value} 
                        checked={radioObject.checked}
                        id={`radio-${name}-${index}`} // Unique ID for each radio
                    />
                    <label 
                        className="qi-input_label" 
                        htmlFor={`radio-${name}-${index}`} // Link label to input
                    >
                        {radioObject.label}
                    </label>
                </div>
            ))}
        </div>
    );
};

QIRadioButton.propTypes = {
    radioObjects: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            onChange: PropTypes.func.isRequired,
            checked: PropTypes.bool.isRequired,
        })
    ).isRequired,
    name: PropTypes.string,
};

