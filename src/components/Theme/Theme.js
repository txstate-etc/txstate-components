import { createTheme, loadTheme } from '@fluentui/react';
import Color from 'color'

export const Theme = {
  maroon: Color('#501214'),
  gold: Color('#6a5638'),
  charcoal: Color('#363534'),
  deepBlue: Color('#005481'),
  lightDeepBlue: Color('#0075B4'),
  sandstone: Color('#e8e3db'),
  river: Color('#a1c1b5'),
  background: Color('#F5F3F0'),
  placeholder: Color('#dedede'),
  trueBlack: Color('#222'),
  lightGray: Color('#d8d8d8'),
  white: Color('#ffffff'),
  input: {
    error: Color('#B30E1B'),
    errorbg: Color('#EBEBEB'),
    focus: Color('#3F84BF'),
    success: Color('#176329'),
    successbg: Color('#F2F2F2')
  }
}

const fluentMaroonTheme = createTheme({
  palette: {
    themePrimary: '#501213',
    themeLighterAlt: '#ead4d4',
    themeLighter: '#d7b0b1',
    themeLight: '#c38f90',
    themeTertiary: '#b07273',
    themeSecondary: '#9c5859',
    themeDarkAlt: '#894143',
    themeDark: '#762e2f',
    themeDarker: '#621e1f',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#ffffff',
  }});

  loadTheme(fluentMaroonTheme)
