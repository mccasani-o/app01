import { Menu } from "./menu";

export interface DataResponse {
    fecha: string;
    statusCode: number;
    status: string;
    mensaje: string;
    data: {
        menus: Menu[];
    };
}
