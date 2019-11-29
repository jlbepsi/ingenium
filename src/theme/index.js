// Material helpers
import { createMuiTheme } from '@material-ui/core/styles';

import palette from './palette';
import typography from './typography';

export default createMuiTheme({
  typography: typography,
  palette: palette,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

