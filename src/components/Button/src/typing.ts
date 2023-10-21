type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
type ButtonSize = 'medium' | 'small' | 'mini'
export interface Button {
    type?: ButtonType;
    size?: ButtonSize;
    disabled: boolean;
}