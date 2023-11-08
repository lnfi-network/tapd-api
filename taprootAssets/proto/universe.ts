export const enum ProofType {
  PROOF_TYPE_UNSPECIFIED = "PROOF_TYPE_UNSPECIFIED",
  PROOF_TYPE_ISSUANCE = "PROOF_TYPE_ISSUANCE",
  PROOF_TYPE_TRANSFER = "PROOF_TYPE_TRANSFER",
}

export const encodeProofType: { [key: string]: number } = {
  PROOF_TYPE_UNSPECIFIED: 0,
  PROOF_TYPE_ISSUANCE: 1,
  PROOF_TYPE_TRANSFER: 2,
};

export const decodeProofType: { [key: number]: ProofType } = {
  0: ProofType.PROOF_TYPE_UNSPECIFIED,
  1: ProofType.PROOF_TYPE_ISSUANCE,
  2: ProofType.PROOF_TYPE_TRANSFER,
};

export const enum UniverseSyncMode {
  SYNC_ISSUANCE_ONLY = "SYNC_ISSUANCE_ONLY",
  SYNC_FULL = "SYNC_FULL",
}

export const encodeUniverseSyncMode: { [key: string]: number } = {
  SYNC_ISSUANCE_ONLY: 0,
  SYNC_FULL: 1,
};

export const decodeUniverseSyncMode: { [key: number]: UniverseSyncMode } = {
  0: UniverseSyncMode.SYNC_ISSUANCE_ONLY,
  1: UniverseSyncMode.SYNC_FULL,
};

export const enum AssetQuerySort {
  SORT_BY_NONE = "SORT_BY_NONE",
  SORT_BY_ASSET_NAME = "SORT_BY_ASSET_NAME",
  SORT_BY_ASSET_ID = "SORT_BY_ASSET_ID",
  SORT_BY_ASSET_TYPE = "SORT_BY_ASSET_TYPE",
  SORT_BY_TOTAL_SYNCS = "SORT_BY_TOTAL_SYNCS",
  SORT_BY_TOTAL_PROOFS = "SORT_BY_TOTAL_PROOFS",
  SORT_BY_GENESIS_HEIGHT = "SORT_BY_GENESIS_HEIGHT",
  SORT_BY_TOTAL_SUPPLY = "SORT_BY_TOTAL_SUPPLY",
}

export const encodeAssetQuerySort: { [key: string]: number } = {
  SORT_BY_NONE: 0,
  SORT_BY_ASSET_NAME: 1,
  SORT_BY_ASSET_ID: 2,
  SORT_BY_ASSET_TYPE: 3,
  SORT_BY_TOTAL_SYNCS: 4,
  SORT_BY_TOTAL_PROOFS: 5,
  SORT_BY_GENESIS_HEIGHT: 6,
  SORT_BY_TOTAL_SUPPLY: 7,
};

export const decodeAssetQuerySort: { [key: number]: AssetQuerySort } = {
  0: AssetQuerySort.SORT_BY_NONE,
  1: AssetQuerySort.SORT_BY_ASSET_NAME,
  2: AssetQuerySort.SORT_BY_ASSET_ID,
  3: AssetQuerySort.SORT_BY_ASSET_TYPE,
  4: AssetQuerySort.SORT_BY_TOTAL_SYNCS,
  5: AssetQuerySort.SORT_BY_TOTAL_PROOFS,
  6: AssetQuerySort.SORT_BY_GENESIS_HEIGHT,
  7: AssetQuerySort.SORT_BY_TOTAL_SUPPLY,
};

export const enum SortDirection {
  SORT_DIRECTION_ASC = "SORT_DIRECTION_ASC",
  SORT_DIRECTION_DESC = "SORT_DIRECTION_DESC",
}

export const encodeSortDirection: { [key: string]: number } = {
  SORT_DIRECTION_ASC: 0,
  SORT_DIRECTION_DESC: 1,
};

export const decodeSortDirection: { [key: number]: SortDirection } = {
  0: SortDirection.SORT_DIRECTION_ASC,
  1: SortDirection.SORT_DIRECTION_DESC,
};

export const enum AssetTypeFilter {
  FILTER_ASSET_NONE = "FILTER_ASSET_NONE",
  FILTER_ASSET_NORMAL = "FILTER_ASSET_NORMAL",
  FILTER_ASSET_COLLECTIBLE = "FILTER_ASSET_COLLECTIBLE",
}

export const encodeAssetTypeFilter: { [key: string]: number } = {
  FILTER_ASSET_NONE: 0,
  FILTER_ASSET_NORMAL: 1,
  FILTER_ASSET_COLLECTIBLE: 2,
};

export const decodeAssetTypeFilter: { [key: number]: AssetTypeFilter } = {
  0: AssetTypeFilter.FILTER_ASSET_NONE,
  1: AssetTypeFilter.FILTER_ASSET_NORMAL,
  2: AssetTypeFilter.FILTER_ASSET_COLLECTIBLE,
};

export interface AssetRootRequest {
}

export function encodeAssetRootRequest(message: AssetRootRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetRootRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetRootRequest(message: AssetRootRequest, bb: ByteBuffer): void {
}

export function decodeAssetRootRequest(binary: Uint8Array): AssetRootRequest {
  return _decodeAssetRootRequest(wrapByteBuffer(binary));
}

function _decodeAssetRootRequest(bb: ByteBuffer): AssetRootRequest {
  let message: AssetRootRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MerkleSumNode {
  root_hash?: Uint8Array;
  root_sum?: Long;
}

export function encodeMerkleSumNode(message: MerkleSumNode): Uint8Array {
  let bb = popByteBuffer();
  _encodeMerkleSumNode(message, bb);
  return toUint8Array(bb);
}

function _encodeMerkleSumNode(message: MerkleSumNode, bb: ByteBuffer): void {
  // optional bytes root_hash = 1;
  let $root_hash = message.root_hash;
  if ($root_hash !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $root_hash.length), writeBytes(bb, $root_hash);
  }

  // optional int64 root_sum = 2;
  let $root_sum = message.root_sum;
  if ($root_sum !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $root_sum);
  }
}

export function decodeMerkleSumNode(binary: Uint8Array): MerkleSumNode {
  return _decodeMerkleSumNode(wrapByteBuffer(binary));
}

function _decodeMerkleSumNode(bb: ByteBuffer): MerkleSumNode {
  let message: MerkleSumNode = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes root_hash = 1;
      case 1: {
        message.root_hash = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional int64 root_sum = 2;
      case 2: {
        message.root_sum = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ID {
  asset_id?: Uint8Array;
  asset_id_str?: string;
  group_key?: Uint8Array;
  group_key_str?: string;
  proof_type?: ProofType;
}

export function encodeID(message: ID): Uint8Array {
  let bb = popByteBuffer();
  _encodeID(message, bb);
  return toUint8Array(bb);
}

function _encodeID(message: ID, bb: ByteBuffer): void {
  // optional bytes asset_id = 1;
  let $asset_id = message.asset_id;
  if ($asset_id !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $asset_id.length), writeBytes(bb, $asset_id);
  }

  // optional string asset_id_str = 2;
  let $asset_id_str = message.asset_id_str;
  if ($asset_id_str !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $asset_id_str);
  }

  // optional bytes group_key = 3;
  let $group_key = message.group_key;
  if ($group_key !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $group_key.length), writeBytes(bb, $group_key);
  }

  // optional string group_key_str = 4;
  let $group_key_str = message.group_key_str;
  if ($group_key_str !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $group_key_str);
  }

  // optional ProofType proof_type = 5;
  let $proof_type = message.proof_type;
  if ($proof_type !== undefined) {
    writeVarint32(bb, 40);
    writeVarint32(bb, encodeProofType[$proof_type]);
  }
}

export function decodeID(binary: Uint8Array): ID {
  return _decodeID(wrapByteBuffer(binary));
}

function _decodeID(bb: ByteBuffer): ID {
  let message: ID = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes asset_id = 1;
      case 1: {
        message.asset_id = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string asset_id_str = 2;
      case 2: {
        message.asset_id_str = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes group_key = 3;
      case 3: {
        message.group_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string group_key_str = 4;
      case 4: {
        message.group_key_str = readString(bb, readVarint32(bb));
        break;
      }

      // optional ProofType proof_type = 5;
      case 5: {
        message.proof_type = decodeProofType[readVarint32(bb)];
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UniverseRoot {
  id?: ID;
  mssmt_root?: MerkleSumNode;
  asset_name?: string;
  amounts_by_asset_id?: { [key: string]: Long };
}

export function encodeUniverseRoot(message: UniverseRoot): Uint8Array {
  let bb = popByteBuffer();
  _encodeUniverseRoot(message, bb);
  return toUint8Array(bb);
}

function _encodeUniverseRoot(message: UniverseRoot, bb: ByteBuffer): void {
  // optional ID id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeID($id, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional MerkleSumNode mssmt_root = 3;
  let $mssmt_root = message.mssmt_root;
  if ($mssmt_root !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeMerkleSumNode($mssmt_root, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string asset_name = 4;
  let $asset_name = message.asset_name;
  if ($asset_name !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $asset_name);
  }

  // optional map<string, uint64> amounts_by_asset_id = 5;
  let map$amounts_by_asset_id = message.amounts_by_asset_id;
  if (map$amounts_by_asset_id !== undefined) {
    for (let key in map$amounts_by_asset_id) {
      let nested = popByteBuffer();
      let value = map$amounts_by_asset_id[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 42);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeUniverseRoot(binary: Uint8Array): UniverseRoot {
  return _decodeUniverseRoot(wrapByteBuffer(binary));
}

function _decodeUniverseRoot(bb: ByteBuffer): UniverseRoot {
  let message: UniverseRoot = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional ID id = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.id = _decodeID(bb);
        bb.limit = limit;
        break;
      }

      // optional MerkleSumNode mssmt_root = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.mssmt_root = _decodeMerkleSumNode(bb);
        bb.limit = limit;
        break;
      }

      // optional string asset_name = 4;
      case 4: {
        message.asset_name = readString(bb, readVarint32(bb));
        break;
      }

      // optional map<string, uint64> amounts_by_asset_id = 5;
      case 5: {
        let values = message.amounts_by_asset_id || (message.amounts_by_asset_id = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: string | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readString(bb, readVarint32(bb));
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ true);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: amounts_by_asset_id");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetRootResponse {
  universe_roots?: { [key: string]: UniverseRoot };
}

export function encodeAssetRootResponse(message: AssetRootResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetRootResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetRootResponse(message: AssetRootResponse, bb: ByteBuffer): void {
  // optional map<string, UniverseRoot> universe_roots = 1;
  let map$universe_roots = message.universe_roots;
  if (map$universe_roots !== undefined) {
    for (let key in map$universe_roots) {
      let nested = popByteBuffer();
      let value = map$universe_roots[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodeUniverseRoot(value, nestedValue);
      writeVarint32(nested, nestedValue.limit);
      writeByteBuffer(nested, nestedValue);
      pushByteBuffer(nestedValue);
      writeVarint32(bb, 10);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeAssetRootResponse(binary: Uint8Array): AssetRootResponse {
  return _decodeAssetRootResponse(wrapByteBuffer(binary));
}

function _decodeAssetRootResponse(bb: ByteBuffer): AssetRootResponse {
  let message: AssetRootResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional map<string, UniverseRoot> universe_roots = 1;
      case 1: {
        let values = message.universe_roots || (message.universe_roots = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: string | undefined;
        let value: UniverseRoot | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readString(bb, readVarint32(bb));
              break;
            }
            case 2: {
              let valueLimit = pushTemporaryLength(bb);
              value = _decodeUniverseRoot(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: universe_roots");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetRootQuery {
  id?: ID;
}

export function encodeAssetRootQuery(message: AssetRootQuery): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetRootQuery(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetRootQuery(message: AssetRootQuery, bb: ByteBuffer): void {
  // optional ID id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeID($id, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeAssetRootQuery(binary: Uint8Array): AssetRootQuery {
  return _decodeAssetRootQuery(wrapByteBuffer(binary));
}

function _decodeAssetRootQuery(bb: ByteBuffer): AssetRootQuery {
  let message: AssetRootQuery = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional ID id = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.id = _decodeID(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface QueryRootResponse {
  issuance_root?: UniverseRoot;
  transfer_root?: UniverseRoot;
}

export function encodeQueryRootResponse(message: QueryRootResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeQueryRootResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeQueryRootResponse(message: QueryRootResponse, bb: ByteBuffer): void {
  // optional UniverseRoot issuance_root = 1;
  let $issuance_root = message.issuance_root;
  if ($issuance_root !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeUniverseRoot($issuance_root, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional UniverseRoot transfer_root = 2;
  let $transfer_root = message.transfer_root;
  if ($transfer_root !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeUniverseRoot($transfer_root, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeQueryRootResponse(binary: Uint8Array): QueryRootResponse {
  return _decodeQueryRootResponse(wrapByteBuffer(binary));
}

function _decodeQueryRootResponse(bb: ByteBuffer): QueryRootResponse {
  let message: QueryRootResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional UniverseRoot issuance_root = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.issuance_root = _decodeUniverseRoot(bb);
        bb.limit = limit;
        break;
      }

      // optional UniverseRoot transfer_root = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.transfer_root = _decodeUniverseRoot(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DeleteRootQuery {
  id?: ID;
}

export function encodeDeleteRootQuery(message: DeleteRootQuery): Uint8Array {
  let bb = popByteBuffer();
  _encodeDeleteRootQuery(message, bb);
  return toUint8Array(bb);
}

function _encodeDeleteRootQuery(message: DeleteRootQuery, bb: ByteBuffer): void {
  // optional ID id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeID($id, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeDeleteRootQuery(binary: Uint8Array): DeleteRootQuery {
  return _decodeDeleteRootQuery(wrapByteBuffer(binary));
}

function _decodeDeleteRootQuery(bb: ByteBuffer): DeleteRootQuery {
  let message: DeleteRootQuery = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional ID id = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.id = _decodeID(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DeleteRootResponse {
}

export function encodeDeleteRootResponse(message: DeleteRootResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeDeleteRootResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeDeleteRootResponse(message: DeleteRootResponse, bb: ByteBuffer): void {
}

export function decodeDeleteRootResponse(binary: Uint8Array): DeleteRootResponse {
  return _decodeDeleteRootResponse(wrapByteBuffer(binary));
}

function _decodeDeleteRootResponse(bb: ByteBuffer): DeleteRootResponse {
  let message: DeleteRootResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Outpoint {
  hash_str?: string;
  index?: number;
}

export function encodeOutpoint(message: Outpoint): Uint8Array {
  let bb = popByteBuffer();
  _encodeOutpoint(message, bb);
  return toUint8Array(bb);
}

function _encodeOutpoint(message: Outpoint, bb: ByteBuffer): void {
  // optional string hash_str = 1;
  let $hash_str = message.hash_str;
  if ($hash_str !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $hash_str);
  }

  // optional int32 index = 2;
  let $index = message.index;
  if ($index !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($index));
  }
}

export function decodeOutpoint(binary: Uint8Array): Outpoint {
  return _decodeOutpoint(wrapByteBuffer(binary));
}

function _decodeOutpoint(bb: ByteBuffer): Outpoint {
  let message: Outpoint = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string hash_str = 1;
      case 1: {
        message.hash_str = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 index = 2;
      case 2: {
        message.index = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetKey {
  op_str?: string;
  op?: Outpoint;
  script_key_bytes?: Uint8Array;
  script_key_str?: string;
}

export function encodeAssetKey(message: AssetKey): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetKey(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetKey(message: AssetKey, bb: ByteBuffer): void {
  // optional string op_str = 1;
  let $op_str = message.op_str;
  if ($op_str !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $op_str);
  }

  // optional Outpoint op = 2;
  let $op = message.op;
  if ($op !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeOutpoint($op, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bytes script_key_bytes = 3;
  let $script_key_bytes = message.script_key_bytes;
  if ($script_key_bytes !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $script_key_bytes.length), writeBytes(bb, $script_key_bytes);
  }

  // optional string script_key_str = 4;
  let $script_key_str = message.script_key_str;
  if ($script_key_str !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $script_key_str);
  }
}

export function decodeAssetKey(binary: Uint8Array): AssetKey {
  return _decodeAssetKey(wrapByteBuffer(binary));
}

function _decodeAssetKey(bb: ByteBuffer): AssetKey {
  let message: AssetKey = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string op_str = 1;
      case 1: {
        message.op_str = readString(bb, readVarint32(bb));
        break;
      }

      // optional Outpoint op = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.op = _decodeOutpoint(bb);
        bb.limit = limit;
        break;
      }

      // optional bytes script_key_bytes = 3;
      case 3: {
        message.script_key_bytes = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string script_key_str = 4;
      case 4: {
        message.script_key_str = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetLeafKeyResponse {
  asset_keys?: AssetKey[];
}

export function encodeAssetLeafKeyResponse(message: AssetLeafKeyResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetLeafKeyResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetLeafKeyResponse(message: AssetLeafKeyResponse, bb: ByteBuffer): void {
  // repeated AssetKey asset_keys = 1;
  let array$asset_keys = message.asset_keys;
  if (array$asset_keys !== undefined) {
    for (let value of array$asset_keys) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeAssetKey(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeAssetLeafKeyResponse(binary: Uint8Array): AssetLeafKeyResponse {
  return _decodeAssetLeafKeyResponse(wrapByteBuffer(binary));
}

function _decodeAssetLeafKeyResponse(bb: ByteBuffer): AssetLeafKeyResponse {
  let message: AssetLeafKeyResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated AssetKey asset_keys = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.asset_keys || (message.asset_keys = []);
        values.push(_decodeAssetKey(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetLeaf {
  asset?: taprpc.Asset;
  issuance_proof?: Uint8Array;
}

export function encodeAssetLeaf(message: AssetLeaf): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetLeaf(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetLeaf(message: AssetLeaf, bb: ByteBuffer): void {
  // optional taprpc.Asset asset = 1;
  let $asset = message.asset;
  if ($asset !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodetaprpc.Asset($asset, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bytes issuance_proof = 2;
  let $issuance_proof = message.issuance_proof;
  if ($issuance_proof !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $issuance_proof.length), writeBytes(bb, $issuance_proof);
  }
}

export function decodeAssetLeaf(binary: Uint8Array): AssetLeaf {
  return _decodeAssetLeaf(wrapByteBuffer(binary));
}

function _decodeAssetLeaf(bb: ByteBuffer): AssetLeaf {
  let message: AssetLeaf = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional taprpc.Asset asset = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.asset = _decodetaprpc.Asset(bb);
        bb.limit = limit;
        break;
      }

      // optional bytes issuance_proof = 2;
      case 2: {
        message.issuance_proof = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetLeafResponse {
  leaves?: AssetLeaf[];
}

export function encodeAssetLeafResponse(message: AssetLeafResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetLeafResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetLeafResponse(message: AssetLeafResponse, bb: ByteBuffer): void {
  // repeated AssetLeaf leaves = 1;
  let array$leaves = message.leaves;
  if (array$leaves !== undefined) {
    for (let value of array$leaves) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeAssetLeaf(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeAssetLeafResponse(binary: Uint8Array): AssetLeafResponse {
  return _decodeAssetLeafResponse(wrapByteBuffer(binary));
}

function _decodeAssetLeafResponse(bb: ByteBuffer): AssetLeafResponse {
  let message: AssetLeafResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated AssetLeaf leaves = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.leaves || (message.leaves = []);
        values.push(_decodeAssetLeaf(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UniverseKey {
  id?: ID;
  leaf_key?: AssetKey;
}

export function encodeUniverseKey(message: UniverseKey): Uint8Array {
  let bb = popByteBuffer();
  _encodeUniverseKey(message, bb);
  return toUint8Array(bb);
}

function _encodeUniverseKey(message: UniverseKey, bb: ByteBuffer): void {
  // optional ID id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeID($id, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AssetKey leaf_key = 2;
  let $leaf_key = message.leaf_key;
  if ($leaf_key !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeAssetKey($leaf_key, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeUniverseKey(binary: Uint8Array): UniverseKey {
  return _decodeUniverseKey(wrapByteBuffer(binary));
}

function _decodeUniverseKey(bb: ByteBuffer): UniverseKey {
  let message: UniverseKey = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional ID id = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.id = _decodeID(bb);
        bb.limit = limit;
        break;
      }

      // optional AssetKey leaf_key = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.leaf_key = _decodeAssetKey(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetProofResponse {
  req?: UniverseKey;
  universe_root?: UniverseRoot;
  universe_inclusion_proof?: Uint8Array;
  asset_leaf?: AssetLeaf;
  multiverse_root?: MerkleSumNode;
  multiverse_inclusion_proof?: Uint8Array;
}

export function encodeAssetProofResponse(message: AssetProofResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetProofResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetProofResponse(message: AssetProofResponse, bb: ByteBuffer): void {
  // optional UniverseKey req = 1;
  let $req = message.req;
  if ($req !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeUniverseKey($req, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional UniverseRoot universe_root = 2;
  let $universe_root = message.universe_root;
  if ($universe_root !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeUniverseRoot($universe_root, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bytes universe_inclusion_proof = 3;
  let $universe_inclusion_proof = message.universe_inclusion_proof;
  if ($universe_inclusion_proof !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $universe_inclusion_proof.length), writeBytes(bb, $universe_inclusion_proof);
  }

  // optional AssetLeaf asset_leaf = 4;
  let $asset_leaf = message.asset_leaf;
  if ($asset_leaf !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeAssetLeaf($asset_leaf, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional MerkleSumNode multiverse_root = 5;
  let $multiverse_root = message.multiverse_root;
  if ($multiverse_root !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeMerkleSumNode($multiverse_root, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bytes multiverse_inclusion_proof = 6;
  let $multiverse_inclusion_proof = message.multiverse_inclusion_proof;
  if ($multiverse_inclusion_proof !== undefined) {
    writeVarint32(bb, 50);
    writeVarint32(bb, $multiverse_inclusion_proof.length), writeBytes(bb, $multiverse_inclusion_proof);
  }
}

export function decodeAssetProofResponse(binary: Uint8Array): AssetProofResponse {
  return _decodeAssetProofResponse(wrapByteBuffer(binary));
}

function _decodeAssetProofResponse(bb: ByteBuffer): AssetProofResponse {
  let message: AssetProofResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional UniverseKey req = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.req = _decodeUniverseKey(bb);
        bb.limit = limit;
        break;
      }

      // optional UniverseRoot universe_root = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.universe_root = _decodeUniverseRoot(bb);
        bb.limit = limit;
        break;
      }

      // optional bytes universe_inclusion_proof = 3;
      case 3: {
        message.universe_inclusion_proof = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional AssetLeaf asset_leaf = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.asset_leaf = _decodeAssetLeaf(bb);
        bb.limit = limit;
        break;
      }

      // optional MerkleSumNode multiverse_root = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.multiverse_root = _decodeMerkleSumNode(bb);
        bb.limit = limit;
        break;
      }

      // optional bytes multiverse_inclusion_proof = 6;
      case 6: {
        message.multiverse_inclusion_proof = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetProof {
  key?: UniverseKey;
  asset_leaf?: AssetLeaf;
}

export function encodeAssetProof(message: AssetProof): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetProof(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetProof(message: AssetProof, bb: ByteBuffer): void {
  // optional UniverseKey key = 1;
  let $key = message.key;
  if ($key !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeUniverseKey($key, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AssetLeaf asset_leaf = 4;
  let $asset_leaf = message.asset_leaf;
  if ($asset_leaf !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeAssetLeaf($asset_leaf, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeAssetProof(binary: Uint8Array): AssetProof {
  return _decodeAssetProof(wrapByteBuffer(binary));
}

function _decodeAssetProof(bb: ByteBuffer): AssetProof {
  let message: AssetProof = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional UniverseKey key = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.key = _decodeUniverseKey(bb);
        bb.limit = limit;
        break;
      }

      // optional AssetLeaf asset_leaf = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.asset_leaf = _decodeAssetLeaf(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface InfoRequest {
}

export function encodeInfoRequest(message: InfoRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeInfoRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeInfoRequest(message: InfoRequest, bb: ByteBuffer): void {
}

export function decodeInfoRequest(binary: Uint8Array): InfoRequest {
  return _decodeInfoRequest(wrapByteBuffer(binary));
}

function _decodeInfoRequest(bb: ByteBuffer): InfoRequest {
  let message: InfoRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface InfoResponse {
  runtime_id?: Long;
  num_assets?: Long;
}

export function encodeInfoResponse(message: InfoResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeInfoResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeInfoResponse(message: InfoResponse, bb: ByteBuffer): void {
  // optional int64 runtime_id = 1;
  let $runtime_id = message.runtime_id;
  if ($runtime_id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $runtime_id);
  }

  // optional uint64 num_assets = 2;
  let $num_assets = message.num_assets;
  if ($num_assets !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $num_assets);
  }
}

export function decodeInfoResponse(binary: Uint8Array): InfoResponse {
  return _decodeInfoResponse(wrapByteBuffer(binary));
}

function _decodeInfoResponse(bb: ByteBuffer): InfoResponse {
  let message: InfoResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 runtime_id = 1;
      case 1: {
        message.runtime_id = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional uint64 num_assets = 2;
      case 2: {
        message.num_assets = readVarint64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface SyncTarget {
  id?: ID;
}

export function encodeSyncTarget(message: SyncTarget): Uint8Array {
  let bb = popByteBuffer();
  _encodeSyncTarget(message, bb);
  return toUint8Array(bb);
}

function _encodeSyncTarget(message: SyncTarget, bb: ByteBuffer): void {
  // optional ID id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeID($id, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeSyncTarget(binary: Uint8Array): SyncTarget {
  return _decodeSyncTarget(wrapByteBuffer(binary));
}

function _decodeSyncTarget(bb: ByteBuffer): SyncTarget {
  let message: SyncTarget = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional ID id = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.id = _decodeID(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface SyncRequest {
  universe_host?: string;
  sync_mode?: UniverseSyncMode;
  sync_targets?: SyncTarget[];
}

export function encodeSyncRequest(message: SyncRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeSyncRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeSyncRequest(message: SyncRequest, bb: ByteBuffer): void {
  // optional string universe_host = 1;
  let $universe_host = message.universe_host;
  if ($universe_host !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $universe_host);
  }

  // optional UniverseSyncMode sync_mode = 2;
  let $sync_mode = message.sync_mode;
  if ($sync_mode !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, encodeUniverseSyncMode[$sync_mode]);
  }

  // repeated SyncTarget sync_targets = 3;
  let array$sync_targets = message.sync_targets;
  if (array$sync_targets !== undefined) {
    for (let value of array$sync_targets) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodeSyncTarget(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeSyncRequest(binary: Uint8Array): SyncRequest {
  return _decodeSyncRequest(wrapByteBuffer(binary));
}

function _decodeSyncRequest(bb: ByteBuffer): SyncRequest {
  let message: SyncRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string universe_host = 1;
      case 1: {
        message.universe_host = readString(bb, readVarint32(bb));
        break;
      }

      // optional UniverseSyncMode sync_mode = 2;
      case 2: {
        message.sync_mode = decodeUniverseSyncMode[readVarint32(bb)];
        break;
      }

      // repeated SyncTarget sync_targets = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.sync_targets || (message.sync_targets = []);
        values.push(_decodeSyncTarget(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface SyncedUniverse {
  old_asset_root?: UniverseRoot;
  new_asset_root?: UniverseRoot;
  new_asset_leaves?: AssetLeaf[];
}

export function encodeSyncedUniverse(message: SyncedUniverse): Uint8Array {
  let bb = popByteBuffer();
  _encodeSyncedUniverse(message, bb);
  return toUint8Array(bb);
}

function _encodeSyncedUniverse(message: SyncedUniverse, bb: ByteBuffer): void {
  // optional UniverseRoot old_asset_root = 1;
  let $old_asset_root = message.old_asset_root;
  if ($old_asset_root !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeUniverseRoot($old_asset_root, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional UniverseRoot new_asset_root = 2;
  let $new_asset_root = message.new_asset_root;
  if ($new_asset_root !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeUniverseRoot($new_asset_root, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated AssetLeaf new_asset_leaves = 3;
  let array$new_asset_leaves = message.new_asset_leaves;
  if (array$new_asset_leaves !== undefined) {
    for (let value of array$new_asset_leaves) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodeAssetLeaf(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeSyncedUniverse(binary: Uint8Array): SyncedUniverse {
  return _decodeSyncedUniverse(wrapByteBuffer(binary));
}

function _decodeSyncedUniverse(bb: ByteBuffer): SyncedUniverse {
  let message: SyncedUniverse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional UniverseRoot old_asset_root = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.old_asset_root = _decodeUniverseRoot(bb);
        bb.limit = limit;
        break;
      }

      // optional UniverseRoot new_asset_root = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.new_asset_root = _decodeUniverseRoot(bb);
        bb.limit = limit;
        break;
      }

      // repeated AssetLeaf new_asset_leaves = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.new_asset_leaves || (message.new_asset_leaves = []);
        values.push(_decodeAssetLeaf(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface StatsRequest {
}

export function encodeStatsRequest(message: StatsRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeStatsRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeStatsRequest(message: StatsRequest, bb: ByteBuffer): void {
}

export function decodeStatsRequest(binary: Uint8Array): StatsRequest {
  return _decodeStatsRequest(wrapByteBuffer(binary));
}

function _decodeStatsRequest(bb: ByteBuffer): StatsRequest {
  let message: StatsRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface SyncResponse {
  synced_universes?: SyncedUniverse[];
}

export function encodeSyncResponse(message: SyncResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeSyncResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeSyncResponse(message: SyncResponse, bb: ByteBuffer): void {
  // repeated SyncedUniverse synced_universes = 1;
  let array$synced_universes = message.synced_universes;
  if (array$synced_universes !== undefined) {
    for (let value of array$synced_universes) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeSyncedUniverse(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeSyncResponse(binary: Uint8Array): SyncResponse {
  return _decodeSyncResponse(wrapByteBuffer(binary));
}

function _decodeSyncResponse(bb: ByteBuffer): SyncResponse {
  let message: SyncResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated SyncedUniverse synced_universes = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.synced_universes || (message.synced_universes = []);
        values.push(_decodeSyncedUniverse(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UniverseFederationServer {
  host?: string;
  id?: number;
}

export function encodeUniverseFederationServer(message: UniverseFederationServer): Uint8Array {
  let bb = popByteBuffer();
  _encodeUniverseFederationServer(message, bb);
  return toUint8Array(bb);
}

function _encodeUniverseFederationServer(message: UniverseFederationServer, bb: ByteBuffer): void {
  // optional string host = 1;
  let $host = message.host;
  if ($host !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $host);
  }

  // optional int32 id = 2;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($id));
  }
}

export function decodeUniverseFederationServer(binary: Uint8Array): UniverseFederationServer {
  return _decodeUniverseFederationServer(wrapByteBuffer(binary));
}

function _decodeUniverseFederationServer(bb: ByteBuffer): UniverseFederationServer {
  let message: UniverseFederationServer = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string host = 1;
      case 1: {
        message.host = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 id = 2;
      case 2: {
        message.id = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ListFederationServersRequest {
}

export function encodeListFederationServersRequest(message: ListFederationServersRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeListFederationServersRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeListFederationServersRequest(message: ListFederationServersRequest, bb: ByteBuffer): void {
}

export function decodeListFederationServersRequest(binary: Uint8Array): ListFederationServersRequest {
  return _decodeListFederationServersRequest(wrapByteBuffer(binary));
}

function _decodeListFederationServersRequest(bb: ByteBuffer): ListFederationServersRequest {
  let message: ListFederationServersRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ListFederationServersResponse {
  servers?: UniverseFederationServer[];
}

export function encodeListFederationServersResponse(message: ListFederationServersResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeListFederationServersResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeListFederationServersResponse(message: ListFederationServersResponse, bb: ByteBuffer): void {
  // repeated UniverseFederationServer servers = 1;
  let array$servers = message.servers;
  if (array$servers !== undefined) {
    for (let value of array$servers) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeUniverseFederationServer(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeListFederationServersResponse(binary: Uint8Array): ListFederationServersResponse {
  return _decodeListFederationServersResponse(wrapByteBuffer(binary));
}

function _decodeListFederationServersResponse(bb: ByteBuffer): ListFederationServersResponse {
  let message: ListFederationServersResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated UniverseFederationServer servers = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.servers || (message.servers = []);
        values.push(_decodeUniverseFederationServer(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AddFederationServerRequest {
  servers?: UniverseFederationServer[];
}

export function encodeAddFederationServerRequest(message: AddFederationServerRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeAddFederationServerRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeAddFederationServerRequest(message: AddFederationServerRequest, bb: ByteBuffer): void {
  // repeated UniverseFederationServer servers = 1;
  let array$servers = message.servers;
  if (array$servers !== undefined) {
    for (let value of array$servers) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeUniverseFederationServer(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeAddFederationServerRequest(binary: Uint8Array): AddFederationServerRequest {
  return _decodeAddFederationServerRequest(wrapByteBuffer(binary));
}

function _decodeAddFederationServerRequest(bb: ByteBuffer): AddFederationServerRequest {
  let message: AddFederationServerRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated UniverseFederationServer servers = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.servers || (message.servers = []);
        values.push(_decodeUniverseFederationServer(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AddFederationServerResponse {
}

export function encodeAddFederationServerResponse(message: AddFederationServerResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeAddFederationServerResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeAddFederationServerResponse(message: AddFederationServerResponse, bb: ByteBuffer): void {
}

export function decodeAddFederationServerResponse(binary: Uint8Array): AddFederationServerResponse {
  return _decodeAddFederationServerResponse(wrapByteBuffer(binary));
}

function _decodeAddFederationServerResponse(bb: ByteBuffer): AddFederationServerResponse {
  let message: AddFederationServerResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DeleteFederationServerRequest {
  servers?: UniverseFederationServer[];
}

export function encodeDeleteFederationServerRequest(message: DeleteFederationServerRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeDeleteFederationServerRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeDeleteFederationServerRequest(message: DeleteFederationServerRequest, bb: ByteBuffer): void {
  // repeated UniverseFederationServer servers = 1;
  let array$servers = message.servers;
  if (array$servers !== undefined) {
    for (let value of array$servers) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeUniverseFederationServer(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeDeleteFederationServerRequest(binary: Uint8Array): DeleteFederationServerRequest {
  return _decodeDeleteFederationServerRequest(wrapByteBuffer(binary));
}

function _decodeDeleteFederationServerRequest(bb: ByteBuffer): DeleteFederationServerRequest {
  let message: DeleteFederationServerRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated UniverseFederationServer servers = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.servers || (message.servers = []);
        values.push(_decodeUniverseFederationServer(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DeleteFederationServerResponse {
}

export function encodeDeleteFederationServerResponse(message: DeleteFederationServerResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeDeleteFederationServerResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeDeleteFederationServerResponse(message: DeleteFederationServerResponse, bb: ByteBuffer): void {
}

export function decodeDeleteFederationServerResponse(binary: Uint8Array): DeleteFederationServerResponse {
  return _decodeDeleteFederationServerResponse(wrapByteBuffer(binary));
}

function _decodeDeleteFederationServerResponse(bb: ByteBuffer): DeleteFederationServerResponse {
  let message: DeleteFederationServerResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface StatsResponse {
  num_total_assets?: Long;
  num_total_groups?: Long;
  num_total_syncs?: Long;
  num_total_proofs?: Long;
}

export function encodeStatsResponse(message: StatsResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeStatsResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeStatsResponse(message: StatsResponse, bb: ByteBuffer): void {
  // optional int64 num_total_assets = 1;
  let $num_total_assets = message.num_total_assets;
  if ($num_total_assets !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $num_total_assets);
  }

  // optional int64 num_total_groups = 2;
  let $num_total_groups = message.num_total_groups;
  if ($num_total_groups !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $num_total_groups);
  }

  // optional int64 num_total_syncs = 3;
  let $num_total_syncs = message.num_total_syncs;
  if ($num_total_syncs !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $num_total_syncs);
  }

  // optional int64 num_total_proofs = 4;
  let $num_total_proofs = message.num_total_proofs;
  if ($num_total_proofs !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $num_total_proofs);
  }
}

export function decodeStatsResponse(binary: Uint8Array): StatsResponse {
  return _decodeStatsResponse(wrapByteBuffer(binary));
}

function _decodeStatsResponse(bb: ByteBuffer): StatsResponse {
  let message: StatsResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 num_total_assets = 1;
      case 1: {
        message.num_total_assets = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 num_total_groups = 2;
      case 2: {
        message.num_total_groups = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 num_total_syncs = 3;
      case 3: {
        message.num_total_syncs = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 num_total_proofs = 4;
      case 4: {
        message.num_total_proofs = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetStatsQuery {
  asset_name_filter?: string;
  asset_id_filter?: Uint8Array;
  asset_type_filter?: AssetTypeFilter;
  sort_by?: AssetQuerySort;
  offset?: number;
  limit?: number;
  direction?: SortDirection;
}

export function encodeAssetStatsQuery(message: AssetStatsQuery): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetStatsQuery(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetStatsQuery(message: AssetStatsQuery, bb: ByteBuffer): void {
  // optional string asset_name_filter = 1;
  let $asset_name_filter = message.asset_name_filter;
  if ($asset_name_filter !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $asset_name_filter);
  }

  // optional bytes asset_id_filter = 2;
  let $asset_id_filter = message.asset_id_filter;
  if ($asset_id_filter !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $asset_id_filter.length), writeBytes(bb, $asset_id_filter);
  }

  // optional AssetTypeFilter asset_type_filter = 3;
  let $asset_type_filter = message.asset_type_filter;
  if ($asset_type_filter !== undefined) {
    writeVarint32(bb, 24);
    writeVarint32(bb, encodeAssetTypeFilter[$asset_type_filter]);
  }

  // optional AssetQuerySort sort_by = 4;
  let $sort_by = message.sort_by;
  if ($sort_by !== undefined) {
    writeVarint32(bb, 32);
    writeVarint32(bb, encodeAssetQuerySort[$sort_by]);
  }

  // optional int32 offset = 5;
  let $offset = message.offset;
  if ($offset !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($offset));
  }

  // optional int32 limit = 6;
  let $limit = message.limit;
  if ($limit !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($limit));
  }

  // optional SortDirection direction = 7;
  let $direction = message.direction;
  if ($direction !== undefined) {
    writeVarint32(bb, 56);
    writeVarint32(bb, encodeSortDirection[$direction]);
  }
}

export function decodeAssetStatsQuery(binary: Uint8Array): AssetStatsQuery {
  return _decodeAssetStatsQuery(wrapByteBuffer(binary));
}

function _decodeAssetStatsQuery(bb: ByteBuffer): AssetStatsQuery {
  let message: AssetStatsQuery = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string asset_name_filter = 1;
      case 1: {
        message.asset_name_filter = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes asset_id_filter = 2;
      case 2: {
        message.asset_id_filter = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional AssetTypeFilter asset_type_filter = 3;
      case 3: {
        message.asset_type_filter = decodeAssetTypeFilter[readVarint32(bb)];
        break;
      }

      // optional AssetQuerySort sort_by = 4;
      case 4: {
        message.sort_by = decodeAssetQuerySort[readVarint32(bb)];
        break;
      }

      // optional int32 offset = 5;
      case 5: {
        message.offset = readVarint32(bb);
        break;
      }

      // optional int32 limit = 6;
      case 6: {
        message.limit = readVarint32(bb);
        break;
      }

      // optional SortDirection direction = 7;
      case 7: {
        message.direction = decodeSortDirection[readVarint32(bb)];
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetStatsSnapshot {
  group_key?: Uint8Array;
  group_supply?: Long;
  group_anchor?: AssetStatsAsset;
  asset?: AssetStatsAsset;
  total_syncs?: Long;
  total_proofs?: Long;
}

export function encodeAssetStatsSnapshot(message: AssetStatsSnapshot): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetStatsSnapshot(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetStatsSnapshot(message: AssetStatsSnapshot, bb: ByteBuffer): void {
  // optional bytes group_key = 1;
  let $group_key = message.group_key;
  if ($group_key !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $group_key.length), writeBytes(bb, $group_key);
  }

  // optional int64 group_supply = 2;
  let $group_supply = message.group_supply;
  if ($group_supply !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $group_supply);
  }

  // optional AssetStatsAsset group_anchor = 3;
  let $group_anchor = message.group_anchor;
  if ($group_anchor !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeAssetStatsAsset($group_anchor, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AssetStatsAsset asset = 4;
  let $asset = message.asset;
  if ($asset !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeAssetStatsAsset($asset, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int64 total_syncs = 5;
  let $total_syncs = message.total_syncs;
  if ($total_syncs !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $total_syncs);
  }

  // optional int64 total_proofs = 6;
  let $total_proofs = message.total_proofs;
  if ($total_proofs !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $total_proofs);
  }
}

export function decodeAssetStatsSnapshot(binary: Uint8Array): AssetStatsSnapshot {
  return _decodeAssetStatsSnapshot(wrapByteBuffer(binary));
}

function _decodeAssetStatsSnapshot(bb: ByteBuffer): AssetStatsSnapshot {
  let message: AssetStatsSnapshot = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes group_key = 1;
      case 1: {
        message.group_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional int64 group_supply = 2;
      case 2: {
        message.group_supply = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional AssetStatsAsset group_anchor = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.group_anchor = _decodeAssetStatsAsset(bb);
        bb.limit = limit;
        break;
      }

      // optional AssetStatsAsset asset = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.asset = _decodeAssetStatsAsset(bb);
        bb.limit = limit;
        break;
      }

      // optional int64 total_syncs = 5;
      case 5: {
        message.total_syncs = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 total_proofs = 6;
      case 6: {
        message.total_proofs = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetStatsAsset {
  asset_id?: Uint8Array;
  genesis_point?: string;
  total_supply?: Long;
  asset_name?: string;
  asset_type?: taprpc.AssetType;
  genesis_height?: number;
  genesis_timestamp?: Long;
}

export function encodeAssetStatsAsset(message: AssetStatsAsset): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetStatsAsset(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetStatsAsset(message: AssetStatsAsset, bb: ByteBuffer): void {
  // optional bytes asset_id = 1;
  let $asset_id = message.asset_id;
  if ($asset_id !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $asset_id.length), writeBytes(bb, $asset_id);
  }

  // optional string genesis_point = 2;
  let $genesis_point = message.genesis_point;
  if ($genesis_point !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $genesis_point);
  }

  // optional int64 total_supply = 3;
  let $total_supply = message.total_supply;
  if ($total_supply !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $total_supply);
  }

  // optional string asset_name = 4;
  let $asset_name = message.asset_name;
  if ($asset_name !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $asset_name);
  }

  // optional taprpc.AssetType asset_type = 5;
  let $asset_type = message.asset_type;
  if ($asset_type !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodetaprpc.AssetType($asset_type, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int32 genesis_height = 6;
  let $genesis_height = message.genesis_height;
  if ($genesis_height !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($genesis_height));
  }

  // optional int64 genesis_timestamp = 7;
  let $genesis_timestamp = message.genesis_timestamp;
  if ($genesis_timestamp !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $genesis_timestamp);
  }
}

export function decodeAssetStatsAsset(binary: Uint8Array): AssetStatsAsset {
  return _decodeAssetStatsAsset(wrapByteBuffer(binary));
}

function _decodeAssetStatsAsset(bb: ByteBuffer): AssetStatsAsset {
  let message: AssetStatsAsset = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes asset_id = 1;
      case 1: {
        message.asset_id = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string genesis_point = 2;
      case 2: {
        message.genesis_point = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 total_supply = 3;
      case 3: {
        message.total_supply = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional string asset_name = 4;
      case 4: {
        message.asset_name = readString(bb, readVarint32(bb));
        break;
      }

      // optional taprpc.AssetType asset_type = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.asset_type = _decodetaprpc.AssetType(bb);
        bb.limit = limit;
        break;
      }

      // optional int32 genesis_height = 6;
      case 6: {
        message.genesis_height = readVarint32(bb);
        break;
      }

      // optional int64 genesis_timestamp = 7;
      case 7: {
        message.genesis_timestamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UniverseAssetStats {
  asset_stats?: AssetStatsSnapshot[];
}

export function encodeUniverseAssetStats(message: UniverseAssetStats): Uint8Array {
  let bb = popByteBuffer();
  _encodeUniverseAssetStats(message, bb);
  return toUint8Array(bb);
}

function _encodeUniverseAssetStats(message: UniverseAssetStats, bb: ByteBuffer): void {
  // repeated AssetStatsSnapshot asset_stats = 1;
  let array$asset_stats = message.asset_stats;
  if (array$asset_stats !== undefined) {
    for (let value of array$asset_stats) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeAssetStatsSnapshot(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeUniverseAssetStats(binary: Uint8Array): UniverseAssetStats {
  return _decodeUniverseAssetStats(wrapByteBuffer(binary));
}

function _decodeUniverseAssetStats(bb: ByteBuffer): UniverseAssetStats {
  let message: UniverseAssetStats = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated AssetStatsSnapshot asset_stats = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.asset_stats || (message.asset_stats = []);
        values.push(_decodeAssetStatsSnapshot(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface QueryEventsRequest {
  start_timestamp?: Long;
  end_timestamp?: Long;
}

export function encodeQueryEventsRequest(message: QueryEventsRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeQueryEventsRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeQueryEventsRequest(message: QueryEventsRequest, bb: ByteBuffer): void {
  // optional int64 start_timestamp = 1;
  let $start_timestamp = message.start_timestamp;
  if ($start_timestamp !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $start_timestamp);
  }

  // optional int64 end_timestamp = 2;
  let $end_timestamp = message.end_timestamp;
  if ($end_timestamp !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $end_timestamp);
  }
}

export function decodeQueryEventsRequest(binary: Uint8Array): QueryEventsRequest {
  return _decodeQueryEventsRequest(wrapByteBuffer(binary));
}

function _decodeQueryEventsRequest(bb: ByteBuffer): QueryEventsRequest {
  let message: QueryEventsRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 start_timestamp = 1;
      case 1: {
        message.start_timestamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 end_timestamp = 2;
      case 2: {
        message.end_timestamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface QueryEventsResponse {
  events?: GroupedUniverseEvents[];
}

export function encodeQueryEventsResponse(message: QueryEventsResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeQueryEventsResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeQueryEventsResponse(message: QueryEventsResponse, bb: ByteBuffer): void {
  // repeated GroupedUniverseEvents events = 1;
  let array$events = message.events;
  if (array$events !== undefined) {
    for (let value of array$events) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeGroupedUniverseEvents(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeQueryEventsResponse(binary: Uint8Array): QueryEventsResponse {
  return _decodeQueryEventsResponse(wrapByteBuffer(binary));
}

function _decodeQueryEventsResponse(bb: ByteBuffer): QueryEventsResponse {
  let message: QueryEventsResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated GroupedUniverseEvents events = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.events || (message.events = []);
        values.push(_decodeGroupedUniverseEvents(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GroupedUniverseEvents {
  date?: string;
  sync_events?: Long;
  new_proof_events?: Long;
}

export function encodeGroupedUniverseEvents(message: GroupedUniverseEvents): Uint8Array {
  let bb = popByteBuffer();
  _encodeGroupedUniverseEvents(message, bb);
  return toUint8Array(bb);
}

function _encodeGroupedUniverseEvents(message: GroupedUniverseEvents, bb: ByteBuffer): void {
  // optional string date = 1;
  let $date = message.date;
  if ($date !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $date);
  }

  // optional uint64 sync_events = 2;
  let $sync_events = message.sync_events;
  if ($sync_events !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $sync_events);
  }

  // optional uint64 new_proof_events = 3;
  let $new_proof_events = message.new_proof_events;
  if ($new_proof_events !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $new_proof_events);
  }
}

export function decodeGroupedUniverseEvents(binary: Uint8Array): GroupedUniverseEvents {
  return _decodeGroupedUniverseEvents(wrapByteBuffer(binary));
}

function _decodeGroupedUniverseEvents(bb: ByteBuffer): GroupedUniverseEvents {
  let message: GroupedUniverseEvents = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string date = 1;
      case 1: {
        message.date = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint64 sync_events = 2;
      case 2: {
        message.sync_events = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional uint64 new_proof_events = 3;
      case 3: {
        message.new_proof_events = readVarint64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface SetFederationSyncConfigRequest {
  global_sync_configs?: GlobalFederationSyncConfig[];
  asset_sync_configs?: AssetFederationSyncConfig[];
}

export function encodeSetFederationSyncConfigRequest(message: SetFederationSyncConfigRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeSetFederationSyncConfigRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeSetFederationSyncConfigRequest(message: SetFederationSyncConfigRequest, bb: ByteBuffer): void {
  // repeated GlobalFederationSyncConfig global_sync_configs = 1;
  let array$global_sync_configs = message.global_sync_configs;
  if (array$global_sync_configs !== undefined) {
    for (let value of array$global_sync_configs) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeGlobalFederationSyncConfig(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated AssetFederationSyncConfig asset_sync_configs = 2;
  let array$asset_sync_configs = message.asset_sync_configs;
  if (array$asset_sync_configs !== undefined) {
    for (let value of array$asset_sync_configs) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeAssetFederationSyncConfig(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeSetFederationSyncConfigRequest(binary: Uint8Array): SetFederationSyncConfigRequest {
  return _decodeSetFederationSyncConfigRequest(wrapByteBuffer(binary));
}

function _decodeSetFederationSyncConfigRequest(bb: ByteBuffer): SetFederationSyncConfigRequest {
  let message: SetFederationSyncConfigRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated GlobalFederationSyncConfig global_sync_configs = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.global_sync_configs || (message.global_sync_configs = []);
        values.push(_decodeGlobalFederationSyncConfig(bb));
        bb.limit = limit;
        break;
      }

      // repeated AssetFederationSyncConfig asset_sync_configs = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.asset_sync_configs || (message.asset_sync_configs = []);
        values.push(_decodeAssetFederationSyncConfig(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface SetFederationSyncConfigResponse {
}

export function encodeSetFederationSyncConfigResponse(message: SetFederationSyncConfigResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeSetFederationSyncConfigResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeSetFederationSyncConfigResponse(message: SetFederationSyncConfigResponse, bb: ByteBuffer): void {
}

export function decodeSetFederationSyncConfigResponse(binary: Uint8Array): SetFederationSyncConfigResponse {
  return _decodeSetFederationSyncConfigResponse(wrapByteBuffer(binary));
}

function _decodeSetFederationSyncConfigResponse(bb: ByteBuffer): SetFederationSyncConfigResponse {
  let message: SetFederationSyncConfigResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GlobalFederationSyncConfig {
  proof_type?: ProofType;
  allow_sync_insert?: boolean;
  allow_sync_export?: boolean;
}

export function encodeGlobalFederationSyncConfig(message: GlobalFederationSyncConfig): Uint8Array {
  let bb = popByteBuffer();
  _encodeGlobalFederationSyncConfig(message, bb);
  return toUint8Array(bb);
}

function _encodeGlobalFederationSyncConfig(message: GlobalFederationSyncConfig, bb: ByteBuffer): void {
  // optional ProofType proof_type = 1;
  let $proof_type = message.proof_type;
  if ($proof_type !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, encodeProofType[$proof_type]);
  }

  // optional bool allow_sync_insert = 2;
  let $allow_sync_insert = message.allow_sync_insert;
  if ($allow_sync_insert !== undefined) {
    writeVarint32(bb, 16);
    writeByte(bb, $allow_sync_insert ? 1 : 0);
  }

  // optional bool allow_sync_export = 3;
  let $allow_sync_export = message.allow_sync_export;
  if ($allow_sync_export !== undefined) {
    writeVarint32(bb, 24);
    writeByte(bb, $allow_sync_export ? 1 : 0);
  }
}

export function decodeGlobalFederationSyncConfig(binary: Uint8Array): GlobalFederationSyncConfig {
  return _decodeGlobalFederationSyncConfig(wrapByteBuffer(binary));
}

function _decodeGlobalFederationSyncConfig(bb: ByteBuffer): GlobalFederationSyncConfig {
  let message: GlobalFederationSyncConfig = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional ProofType proof_type = 1;
      case 1: {
        message.proof_type = decodeProofType[readVarint32(bb)];
        break;
      }

      // optional bool allow_sync_insert = 2;
      case 2: {
        message.allow_sync_insert = !!readByte(bb);
        break;
      }

      // optional bool allow_sync_export = 3;
      case 3: {
        message.allow_sync_export = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetFederationSyncConfig {
  id?: ID;
  allow_sync_insert?: boolean;
  allow_sync_export?: boolean;
}

export function encodeAssetFederationSyncConfig(message: AssetFederationSyncConfig): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetFederationSyncConfig(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetFederationSyncConfig(message: AssetFederationSyncConfig, bb: ByteBuffer): void {
  // optional ID id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeID($id, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bool allow_sync_insert = 2;
  let $allow_sync_insert = message.allow_sync_insert;
  if ($allow_sync_insert !== undefined) {
    writeVarint32(bb, 16);
    writeByte(bb, $allow_sync_insert ? 1 : 0);
  }

  // optional bool allow_sync_export = 3;
  let $allow_sync_export = message.allow_sync_export;
  if ($allow_sync_export !== undefined) {
    writeVarint32(bb, 24);
    writeByte(bb, $allow_sync_export ? 1 : 0);
  }
}

export function decodeAssetFederationSyncConfig(binary: Uint8Array): AssetFederationSyncConfig {
  return _decodeAssetFederationSyncConfig(wrapByteBuffer(binary));
}

function _decodeAssetFederationSyncConfig(bb: ByteBuffer): AssetFederationSyncConfig {
  let message: AssetFederationSyncConfig = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional ID id = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.id = _decodeID(bb);
        bb.limit = limit;
        break;
      }

      // optional bool allow_sync_insert = 2;
      case 2: {
        message.allow_sync_insert = !!readByte(bb);
        break;
      }

      // optional bool allow_sync_export = 3;
      case 3: {
        message.allow_sync_export = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface QueryFederationSyncConfigRequest {
  id?: ID[];
}

export function encodeQueryFederationSyncConfigRequest(message: QueryFederationSyncConfigRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeQueryFederationSyncConfigRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeQueryFederationSyncConfigRequest(message: QueryFederationSyncConfigRequest, bb: ByteBuffer): void {
  // repeated ID id = 1;
  let array$id = message.id;
  if (array$id !== undefined) {
    for (let value of array$id) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeID(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeQueryFederationSyncConfigRequest(binary: Uint8Array): QueryFederationSyncConfigRequest {
  return _decodeQueryFederationSyncConfigRequest(wrapByteBuffer(binary));
}

function _decodeQueryFederationSyncConfigRequest(bb: ByteBuffer): QueryFederationSyncConfigRequest {
  let message: QueryFederationSyncConfigRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated ID id = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.id || (message.id = []);
        values.push(_decodeID(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface QueryFederationSyncConfigResponse {
  global_sync_configs?: GlobalFederationSyncConfig[];
  asset_sync_configs?: AssetFederationSyncConfig[];
}

export function encodeQueryFederationSyncConfigResponse(message: QueryFederationSyncConfigResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeQueryFederationSyncConfigResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeQueryFederationSyncConfigResponse(message: QueryFederationSyncConfigResponse, bb: ByteBuffer): void {
  // repeated GlobalFederationSyncConfig global_sync_configs = 1;
  let array$global_sync_configs = message.global_sync_configs;
  if (array$global_sync_configs !== undefined) {
    for (let value of array$global_sync_configs) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeGlobalFederationSyncConfig(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated AssetFederationSyncConfig asset_sync_configs = 2;
  let array$asset_sync_configs = message.asset_sync_configs;
  if (array$asset_sync_configs !== undefined) {
    for (let value of array$asset_sync_configs) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeAssetFederationSyncConfig(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeQueryFederationSyncConfigResponse(binary: Uint8Array): QueryFederationSyncConfigResponse {
  return _decodeQueryFederationSyncConfigResponse(wrapByteBuffer(binary));
}

function _decodeQueryFederationSyncConfigResponse(bb: ByteBuffer): QueryFederationSyncConfigResponse {
  let message: QueryFederationSyncConfigResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated GlobalFederationSyncConfig global_sync_configs = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.global_sync_configs || (message.global_sync_configs = []);
        values.push(_decodeGlobalFederationSyncConfig(bb));
        bb.limit = limit;
        break;
      }

      // repeated AssetFederationSyncConfig asset_sync_configs = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.asset_sync_configs || (message.asset_sync_configs = []);
        values.push(_decodeAssetFederationSyncConfig(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Long {
  low: number;
  high: number;
  unsigned: boolean;
}

interface ByteBuffer {
  bytes: Uint8Array;
  offset: number;
  limit: number;
}

function pushTemporaryLength(bb: ByteBuffer): number {
  let length = readVarint32(bb);
  let limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb: ByteBuffer, type: number): void {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value: string): Long {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value: Long): string {
  let low = value.low;
  let high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

let f32 = new Float32Array(1);
let f32_u8 = new Uint8Array(f32.buffer);

let f64 = new Float64Array(1);
let f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value: number): Long {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

let bbStack: ByteBuffer[] = [];

function popByteBuffer(): ByteBuffer {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb: ByteBuffer): void {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes: Uint8Array): ByteBuffer {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb: ByteBuffer): Uint8Array {
  let bytes = bb.bytes;
  let limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb: ByteBuffer, offset: number): void {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb: ByteBuffer): boolean {
  return bb.offset >= bb.limit;
}

function grow(bb: ByteBuffer, count: number): number {
  let bytes = bb.bytes;
  let offset = bb.offset;
  let limit = bb.limit;
  let finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    let newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb: ByteBuffer, count: number): number {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb: ByteBuffer, count: number): Uint8Array {
  let offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb: ByteBuffer, buffer: Uint8Array): void {
  let offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb: ByteBuffer, count: number): string {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2: number, c3: number, c4: number, c: number;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb: ByteBuffer, text: string): void {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  let n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  let bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb: ByteBuffer, buffer: ByteBuffer): void {
  let offset = grow(bb, buffer.limit);
  let from = bb.bytes;
  let to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb: ByteBuffer): number {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb: ByteBuffer): number {
  let offset = advance(bb, 8);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 8);
  let bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb: ByteBuffer, unsigned: boolean): Long {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb: ByteBuffer, value: Long): void {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb: ByteBuffer): number {
  let c = 0;
  let value = 0;
  let b: number;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb: ByteBuffer, value: number): void {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb: ByteBuffer, unsigned: boolean): Long {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b: number;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb: ByteBuffer, value: Long): void {
  let part0 = value.low >>> 0;
  let part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  let part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  let size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  let offset = grow(bb, size);
  let bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb: ByteBuffer): number {
  let value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb: ByteBuffer, value: number): void {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb: ByteBuffer): Long {
  let value = readVarint64(bb, /* unsigned */ false);
  let low = value.low;
  let high = value.high;
  let flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb: ByteBuffer, value: Long): void {
  let low = value.low;
  let high = value.high;
  let flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
