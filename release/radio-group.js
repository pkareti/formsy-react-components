/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRCMixin = require('./mixin');
var Row = require('./row');

var RadioGroup = React.createClass({displayName: "RadioGroup",

    mixins: [Formsy.Mixin, FRCMixin],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.oneOf(['inline', 'stacked']),
        options: React.PropTypes.array.isRequired
    },

    getDefaultProps: function() {
        return {
            type: 'stacked',
            label: '',
            help: null
        };
    },

    changeRadio: function(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement: function() {
        var _this = this;
        var controls = this.props.options.map(function(radio, key) {
            var checked = (_this.getValue() === radio.value);
            var disabled = _this.isFormDisabled() || radio.disabled || _this.props.disabled;
            var className = 'radio' + (disabled ? ' disabled' : '');
            if (_this.props.type === 'inline') {
                return (
                    React.createElement("label", {className: "radio-inline", key: key}, 
                        React.createElement("input", {
                            checked: checked, 
                            type: "radio", 
                            value: radio.value, 
                            onChange: _this.changeRadio, 
                            disabled: disabled}
                        ), " ", radio.label
                    )
                );
            }
            return (
                React.createElement("div", {className: className, key: key}, 
                    React.createElement("label", null, 
                        React.createElement("input", {
                            checked: checked, 
                            type: "radio", 
                            value: radio.value, 
                            onChange: _this.changeRadio, 
                            disabled: disabled}
                        ), " ", radio.label
                    )
                )
            );
        });
        return controls;
    },

    render: function() {

        if (this.props.layout === 'elementOnly') {
            return (
                React.createElement("div", null, this.renderElement())
            );
        }

        return (
            React.createElement(Row, {
                label: this.props.label, 
                required: this.isRequired(), 
                hasErrors: this.showErrors(), 
                layout: this.props.layout, 
                fakeLabel: true
            }, 
                this.renderElement(), 
                this.renderHelp(), 
                this.renderErrorMessage()
            )
        );
    }
});

module.exports = RadioGroup;
