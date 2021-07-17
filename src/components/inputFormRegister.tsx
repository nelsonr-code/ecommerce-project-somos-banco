import * as React from 'react';
import IFormProps from '../shared/interfaces';
import { handleChange } from '../hooks/useHandleFormSubmit';

class InputForm extends React.Component<IFormProps> {

    constructor(props: any) {
        super(props);
    }

    render() {
        const errorMessage = this.props.errorMessage;
        return (
            <div className="">
                <label htmlFor="">{this.props.label} {this.props.isRequired ? '*' : null}</label>
                <input
                    onChange={handleChange}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.value || ''}
                    />
                <span>{errorMessage}</span>
            </div>
        )
    }
}

export default InputForm;