export enum ThemeEnum {
    light = 'light',
    dark = 'dark',
    system = 'system'
}

const LIGHT_PRIMARY = '#d35400'
const LIGHT_TEXT = '#515151'
const LIGHT_BACKGROUND = '#d35400'
const LIGHT_BOARDBAR = '#ffffff'
const LIGHT_BOARD_COLUMN = '#ffffff'

const DARK_PRIMARY = '#2c3e50'
const DARK_TEXT = '#ffffff'
const DARK_BACKGROUND = '#2c3e50'
const DARK_BOARDBAR = '#34495e'
const DARK_BOARD_COLUMN = '#323949'

// COMMON USE
export enum LightColor {
    primary = LIGHT_PRIMARY,
    text = LIGHT_TEXT,
    background = LIGHT_BACKGROUND,
    boardbar = LIGHT_BOARDBAR,
    board_column = LIGHT_BOARD_COLUMN
}

export enum DarkColor {
    primary = DARK_PRIMARY,
    text = DARK_TEXT,
    background = DARK_BACKGROUND,
    boardbar = DARK_BOARDBAR,
    board_column = DARK_BOARD_COLUMN
}

// SPECIFIC COMPONENT
export enum ButtonColor {
    light_primary = LIGHT_PRIMARY,
    light_text = LIGHT_TEXT,
    light_border = LIGHT_TEXT,
    dark_primary = '#ffffff',
    dark_text = DARK_TEXT,
    dark_border = DARK_TEXT,
}

export enum InputColor {
    light_primary = LIGHT_PRIMARY,
    light_text = LIGHT_TEXT,
    light_border = LIGHT_TEXT,
    light_placeholder = '#cccccc',
    dark_primary = '#ffffff',
    dark_text = DARK_TEXT,
    dark_border = DARK_TEXT,
    dark_placeholder = '#ecf0f1'
}

export enum DropdownColor {
    text = LIGHT_TEXT,
}

export enum SelectColor {
    light_primary = LIGHT_PRIMARY,
    dark_primary = DARK_PRIMARY,
    dark_text_selected = '#ffffff',
    text = LIGHT_TEXT,
}

export enum CardColor {
    light_primary = LIGHT_PRIMARY,
    light_card = '#fdfbfb',
    light_text = LIGHT_TEXT,
    dark_primary = '#cccccc',
    dark_card = '#212129',
    dark_text = DARK_TEXT,
}