import {} from '../../Interface/interface';

export interface State {
    txt: string
}

export interface Props {
    onChange?: (data: string) => void,
    onHide?: () => void
}

export interface Data {
}