export interface Producto {
    idProducto: number;
    nombreProducto: string;
    descripcion: string;
    precioCompra: number;
    precioVenta: number;
    stockActual: number;
}

export interface DataResponse {
    fecha: string;
    statusCode: number;
    status: string;
    mensaje: string;
    data: {
      producto: Producto[];
      total: number;
    };
  }