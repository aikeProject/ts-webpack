import {} from '../../Interface/interface';

export interface State {
    enabled: boolean,
    stop: boolean,
    dom: any
}

export interface Props {
    dom?: any,
    enabled: boolean,
    stop: boolean,
    txt?: boolean,
    loadMore: () => void
}


export interface Data {
    pullUpElement: HTMLElement
}
