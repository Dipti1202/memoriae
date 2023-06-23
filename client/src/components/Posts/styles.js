import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { styled } from '@mui/material/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    // justifyContent:"space-between",
    // alignItems: 'center',
  },
  smMargin: {
    // margin: theme.spacing(1),
    // margin: spacing(1)
    margin:"20px"
  },
  actionDiv: {
    textAlign: 'center',
  },
}));
