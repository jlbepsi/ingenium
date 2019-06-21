import React from "react";
import PropTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


import ClasseSelect from "../../../../share/ClasseSelect";

function FormEPSIContributor(props) {

  function handleChangeMember(event, child) {
    props.onChangeLogin(event.target.value, child.props.children)
  }

  const { classes, loginsql } = props;

  return(

    <div>
      <ClasseSelect classes={classes} classeSelected={'B2'} />

      <FormControl
        fullWidth
        className={classes.formControl}
      >
        <InputLabel shrink htmlFor="member">
          Membre
        </InputLabel>
        <Select
          id="member"
          value={loginsql}
          onChange={handleChangeMember}
        >
          <MenuItem value={'jean.dupont'}>DUPONT Jean</MenuItem>
          <MenuItem value={'j.henry'}>HENRY Jacques</MenuItem>
          <MenuItem value={'paul.marlin'}>MARLIN Paul</MenuItem>
          <MenuItem value={'marc.prangeres'}>PRANGERES Marc</MenuItem>
          <MenuItem value={'pierre.tarmus'}>TARMUS Pierre</MenuItem>
        </Select>
      </FormControl>

    </div>
  );
}


FormEPSIContributor.propTypes = {
  classes: PropTypes.object.isRequired,
  loginsql: PropTypes.string,
  onChangeLogin: PropTypes.func.isRequired,
};

export default FormEPSIContributor;