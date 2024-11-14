/* tslint:disable */
/* eslint-disable */
/**
 * @param {Uint8Array} arr
 * @returns {Promise<void>}
 */
export function read_step_file(arr: Uint8Array): Promise<void>;
/**
 * @param {Float32Array} arr
 * @returns {Promise<void>}
 */
export function read_lra_commands(arr: Float32Array): Promise<void>;
/**
 * @returns {Promise<void>}
 */
export function do_bend(): Promise<void>;
/**
 * @returns {Promise<void>}
 */
export function reverse(): Promise<void>;
/**
 * @returns {Promise<void>}
 */
export function reverse_dorn(): Promise<void>;
/**
 * @param {Float32Array} arr
 * @returns {Promise<void>}
 */
export function change_bend_params(arr: Float32Array): Promise<void>;
/**
 * @param {number} id
 * @returns {Promise<void>}
 */
export function select_by_table(id: number): Promise<void>;
/**
 * @returns {Promise<void>}
 */
export function runrust(): Promise<void>;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly read_step_file: (a: number) => number;
  readonly read_lra_commands: (a: number) => number;
  readonly do_bend: () => number;
  readonly reverse: () => number;
  readonly reverse_dorn: () => number;
  readonly change_bend_params: (a: number) => number;
  readonly select_by_table: (a: number) => number;
  readonly runrust: () => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly closure523_externref_shim: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__he7c3e466d2a745b0: (a: number, b: number) => void;
  readonly closure528_externref_shim: (a: number, b: number, c: number, d: number) => void;
  readonly closure1326_externref_shim: (a: number, b: number, c: number) => void;
  readonly closure1730_externref_shim: (a: number, b: number, c: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly closure3304_externref_shim: (a: number, b: number, c: number, d: number) => void;
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
