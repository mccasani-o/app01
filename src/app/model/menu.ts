export interface Menu {
    id: number;
    label: string;
    url: string;
    icon: string;
    estado: boolean;
    items: Menu[];
    manipulado : boolean;
}
