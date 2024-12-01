/* tslint:disable */
/* eslint-disable */
export function runrust(): Promise<void>;
export function read_step_file(arr: Uint8Array): Promise<void>;
export function read_lra_commands(arr: Float32Array): Promise<void>;
export function do_bend(): Promise<void>;
export function reverse(): Promise<void>;
export function reverse_dorn(): Promise<void>;
export function change_bend_params(arr: Float32Array): Promise<void>;
export function select_by_table(id: number): Promise<void>;
export function stp_file_request(arr: Float32Array): Promise<void>;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly runrust: () => any;
  readonly read_step_file: (a: any) => any;
  readonly read_lra_commands: (a: any) => any;
  readonly do_bend: () => any;
  readonly reverse: () => any;
  readonly reverse_dorn: () => any;
  readonly change_bend_params: (a: any) => any;
  readonly select_by_table: (a: number) => any;
  readonly stp_file_request: (a: any) => any;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_1: WebAssembly.Table;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_6: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd8edba1c0f893602: (a: number, b: number) => void;
  readonly closure376_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure378_externref_shim: (a: number, b: number, c: any, d: any) => void;
  readonly closure771_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure992_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure1462_externref_shim: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
