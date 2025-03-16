import { IPaginationOptions } from './pagination-options.interface';
import { IUser } from './user.interface';
import { ICatalog } from './catalog.interface';

export interface IVariables {
  id?: string | number;
  active?: string;
  filterName?: string;
  offer?: boolean;
  withImages?: boolean;
  isAdmin?: boolean;
  filterBranch?: string;
  slug?: string;
  pagination?: IPaginationOptions;
  user?: IUser;
  admin?: boolean;
  brand?: ICatalog;
  brands?: ICatalog[];
  model?: ICatalog;
  categorie?: ICatalog;
  categories?: ICatalog[];
  subCategories?: ICatalog[];
  subcategorie?: ICatalog;
  tag?: ICatalog;
  group?: ICatalog;
  groups?: ICatalog[];
  supplierId?: string;
  weekNumber?: number;
  c_pais?: string;
  name?: string;
  typeApi?: string;
  nameApi?: string;
  deliveryId?: string;
  role?: string;
  // 99minutos Token
  origin?: string;
  destination?: string;
  deliveryType?: string;
  // 99minutos Shipping Rate
  size?: string;
  originZipcode?: string;
  originCountry?: string;
  destinationZipcode?: string;
  destinationCountry?: string;
  // Ct Shipping
  destinoCt?: string;
  // Ct Order
  idPedido?: number;
  almacen?: string;
  tipoPago?: string;
  cfdi?: string;
  // Ct Status
  folio?: string;
  // Ct Volumen
  codigo?: string;
  // Cva Shipping
  paqueteria?: number;
  cp?: number;
  cp_sucursal?: string;
  // CVa Pedido Detalle
  pedido?: string;
  // CVa  Pedido Alta
  // CVA Grupos
  // CVA Precios
  brandName?: string;
  groupName?: string;
  codigoCva?: string;
  // Openpay
  idCardOpenpay?: string;
  idCustomerOpenpay?: string;
  idChargeOpenpay?: string;
  idTransactionOpenpay?: string;
  idPayoutOpenpay?: string;
  email?: String;
  //icecat
  brandIcecat?: string;
  productIcecat?: string;
  upcIcecat?: string;
  // ingram
  ingramPartNumber?: string;
  vendorPartNumber?: string;
  upc?: string;
  allRecords?: Boolean;
  imSKU?: string;
  idOrderIngram?: string;
  // BDI
  type?: string;
  // products
  partnumber?: string;
  // icommkt
  // searchs
  year?: number;
  month?: string;
  // syscom
  paisName?: string;
  coloniaName?: string;
  sucursalName?: string;
  categoryId?: string;
  productId?: string;
  facturaId?: string;
  // daisytek
  partNumberDaisytek?: string;
  // inttelec
  partNumberInttelec?: string;
  info?: IPaginationOptions;
  // fedex
}