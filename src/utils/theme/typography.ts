import { TypographyOptions } from '@material-ui/core/styles/createTypography'
import palette from './palette'

const defaultHeaderTypographyOptions = {
  color: palette.text.primary,
  fontWeight: 500,
}

const typographyOptions: TypographyOptions = {
  h1: {
    ...defaultHeaderTypographyOptions,
    fontSize: '35px',
    letterSpacing: '-0.24px',
    lineHeight: '40px'
  },
  h2: {
    ...defaultHeaderTypographyOptions,
    fontSize: '29px',
    letterSpacing: '-0.24px',
    lineHeight: '32px'
  },
  h3: {
    ...defaultHeaderTypographyOptions,
    fontSize: '24px',
    letterSpacing: '-0.06px',
    lineHeight: '28px'
  },
  h4: {
    ...defaultHeaderTypographyOptions,
    fontSize: '20px',
    letterSpacing: '-0.06px',
    lineHeight: '24px'
  },
  h5: {
    ...defaultHeaderTypographyOptions,
    fontSize: '16px',
    letterSpacing: '-0.05px',
    lineHeight: '20px'
  },
  h6: {
    ...defaultHeaderTypographyOptions,
    fontSize: '1.25rem',
    letterSpacing: '0.0075em',
    lineHeight: '1.6'
  },
  body1: {
    color: palette.text.primary,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    letterSpacing: '-0.05px',
    lineHeight: '21px'
  },
  body2: {
    color: palette.text.primary,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 400,
  },
  subtitle1: {
    color: palette.text.primary,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px'
  },
  subtitle2: {
    color: palette.text.primary,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    letterSpacing: 0,
    lineHeight: '16px'
  },
  button: {
    color: palette.text.primary,
    fontSize: '14px'
  },
  caption: {
    color: palette.text.secondary,
    fontSize: '12px',
    letterSpacing: '0.3px',
    lineHeight: '16px'
  }
}

export default typographyOptions
