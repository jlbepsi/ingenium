import React from "react";
import PropTypes from "prop-types";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";


function ClasseSelect(props) {


  const optionClassesEPSI = [
    { value: 'B1', label: 'B1' },
    { value: 'B2', label: 'B2' },
    { value: 'B3', label: 'B3' },
    { value: 'I1', label: 'I1' },
    { value: 'I2', label: 'I2' },
    { value: '-', label: 'D1' },
    { value: 'WIS1', label: 'WIS1' },
    { value: 'WIS2', label: 'WIS2' },
    { value: 'WIS3', label: 'WIS3' },
    { value: 'WIS4', label: 'WIS4' },
    { value: 'WIS5', label: 'WIS5' },
    { value: '-', label: 'D2' },
    { value: 'POE', label: 'POE' },
    { value: '-', label: 'D3' },
    { value: 'NA', label: 'NA' },
    { value: '-', label: 'D4' },
    { value: 'PROF', label: 'Professeur' },
  ];

  function handleChange(event) {
    props.onChange(event.target.value)
  }


  const { classeSelected, classes, disabled } = props;
  const rows = [];

  optionClassesEPSI.forEach( (option) => {
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
    <FormControl className={classes.container}
                 fullWidth>
      <InputLabel shrink htmlFor="classeEPSI">
        Classe
      </InputLabel>
      <Select
        id="classeEPSI"
        disabled={disabled}
        className={classes.container}
        value={classeSelected}
        onChange={handleChange}
      >
        {rows}
      </Select>
    </FormControl>
  )
}

ClasseSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  classeSelected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ClasseSelect;