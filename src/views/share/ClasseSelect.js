import React, {Component} from "react";
import PropTypes from "prop-types";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";


class ClasseSelect extends Component {


  static optionClassesEPSI = [
    { value: 'B1', label: 'B1' },
    { value: 'B2', label: 'B2' },
    { value: 'B3', label: 'B3' },
    { value: 'I4', label: 'I4' },
    { value: 'I5', label: 'I5' },
    { value: '-', label: 'D1' },
    { value: 'W1', label: 'WIS1' },
    { value: 'W2', label: 'WIS2' },
    { value: 'W3', label: 'WIS3' },
    { value: 'W4', label: 'WIS4' },
    { value: 'W5', label: 'WIS5' },
    { value: '-', label: 'D2' },
    { value: 'POS', label: 'POE' },
    { value: '-', label: 'D3' },
    { value: 'NA', label: 'NA' },
  ];

  handleChange = name => event => {
    this.props.onChange(name, event.target.value)
  };


  render() {
    const { classeSelected, classes, disabled } = this.props;
    const rows = [];

    ClasseSelect.optionClassesEPSI.forEach( (option) => {
      if (option.value === '-') {
        rows.push(
          <Divider key={option.label} />
        );
      } else {
        rows.push(
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        );
      }
    });

    return (
      <FormControl
        fullWidth
        className={classes.formControl}
      >
        <InputLabel shrink htmlFor="classeEPSI">
          Classe
        </InputLabel>
        <Select
          id="classeEPSI"
          disabled={disabled}
          value={classeSelected}
        >
          {rows}
        </Select>
      </FormControl>
    )}
}

ClasseSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  classeSelected: PropTypes.string.isRequired,
};

export default ClasseSelect;