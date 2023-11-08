export const enum AssetType {
  NORMAL = "NORMAL",
  COLLECTIBLE = "COLLECTIBLE",
}

export const encodeAssetType: { [key: string]: number } = {
  NORMAL: 0,
  COLLECTIBLE: 1,
};

export const decodeAssetType: { [key: number]: AssetType } = {
  0: AssetType.NORMAL,
  1: AssetType.COLLECTIBLE,
};

export const enum AssetMetaType {
  META_TYPE_OPAQUE = "META_TYPE_OPAQUE",
}

export const encodeAssetMetaType: { [key: string]: number } = {
  META_TYPE_OPAQUE: 0,
};

export const decodeAssetMetaType: { [key: number]: AssetMetaType } = {
  0: AssetMetaType.META_TYPE_OPAQUE,
};

export const enum AssetVersion {
  ASSET_VERSION_V0 = "ASSET_VERSION_V0",
  ASSET_VERSION_V1 = "ASSET_VERSION_V1",
}

export const encodeAssetVersion: { [key: string]: number } = {
  ASSET_VERSION_V0: 0,
  ASSET_VERSION_V1: 1,
};

export const decodeAssetVersion: { [key: number]: AssetVersion } = {
  0: AssetVersion.ASSET_VERSION_V0,
  1: AssetVersion.ASSET_VERSION_V1,
};

export const enum OutputType {
  OUTPUT_TYPE_SIMPLE = "OUTPUT_TYPE_SIMPLE",
  OUTPUT_TYPE_SPLIT_ROOT = "OUTPUT_TYPE_SPLIT_ROOT",
  OUTPUT_TYPE_PASSIVE_ASSETS_ONLY = "OUTPUT_TYPE_PASSIVE_ASSETS_ONLY",
  OUTPUT_TYPE_PASSIVE_SPLIT_ROOT = "OUTPUT_TYPE_PASSIVE_SPLIT_ROOT",
  OUTPUT_TYPE_SIMPLE_PASSIVE_ASSETS = "OUTPUT_TYPE_SIMPLE_PASSIVE_ASSETS",
}

export const encodeOutputType: { [key: string]: number } = {
  OUTPUT_TYPE_SIMPLE: 0,
  OUTPUT_TYPE_SPLIT_ROOT: 1,
  OUTPUT_TYPE_PASSIVE_ASSETS_ONLY: 2,
  OUTPUT_TYPE_PASSIVE_SPLIT_ROOT: 3,
  OUTPUT_TYPE_SIMPLE_PASSIVE_ASSETS: 4,
};

export const decodeOutputType: { [key: number]: OutputType } = {
  0: OutputType.OUTPUT_TYPE_SIMPLE,
  1: OutputType.OUTPUT_TYPE_SPLIT_ROOT,
  2: OutputType.OUTPUT_TYPE_PASSIVE_ASSETS_ONLY,
  3: OutputType.OUTPUT_TYPE_PASSIVE_SPLIT_ROOT,
  4: OutputType.OUTPUT_TYPE_SIMPLE_PASSIVE_ASSETS,
};

export const enum AddrEventStatus {
  ADDR_EVENT_STATUS_UNKNOWN = "ADDR_EVENT_STATUS_UNKNOWN",
  ADDR_EVENT_STATUS_TRANSACTION_DETECTED = "ADDR_EVENT_STATUS_TRANSACTION_DETECTED",
  ADDR_EVENT_STATUS_TRANSACTION_CONFIRMED = "ADDR_EVENT_STATUS_TRANSACTION_CONFIRMED",
  ADDR_EVENT_STATUS_PROOF_RECEIVED = "ADDR_EVENT_STATUS_PROOF_RECEIVED",
  ADDR_EVENT_STATUS_COMPLETED = "ADDR_EVENT_STATUS_COMPLETED",
}

export const encodeAddrEventStatus: { [key: string]: number } = {
  ADDR_EVENT_STATUS_UNKNOWN: 0,
  ADDR_EVENT_STATUS_TRANSACTION_DETECTED: 1,
  ADDR_EVENT_STATUS_TRANSACTION_CONFIRMED: 2,
  ADDR_EVENT_STATUS_PROOF_RECEIVED: 3,
  ADDR_EVENT_STATUS_COMPLETED: 4,
};

export const decodeAddrEventStatus: { [key: number]: AddrEventStatus } = {
  0: AddrEventStatus.ADDR_EVENT_STATUS_UNKNOWN,
  1: AddrEventStatus.ADDR_EVENT_STATUS_TRANSACTION_DETECTED,
  2: AddrEventStatus.ADDR_EVENT_STATUS_TRANSACTION_CONFIRMED,
  3: AddrEventStatus.ADDR_EVENT_STATUS_PROOF_RECEIVED,
  4: AddrEventStatus.ADDR_EVENT_STATUS_COMPLETED,
};

export interface AssetMeta {
  data?: Uint8Array;
  type?: AssetMetaType;
  meta_hash?: Uint8Array;
}

export function encodeAssetMeta(message: AssetMeta): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetMeta(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetMeta(message: AssetMeta, bb: ByteBuffer): void {
  // optional bytes data = 1;
  let $data = message.data;
  if ($data !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $data.length), writeBytes(bb, $data);
  }

  // optional AssetMetaType type = 2;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, encodeAssetMetaType[$type]);
  }

  // optional bytes meta_hash = 3;
  let $meta_hash = message.meta_hash;
  if ($meta_hash !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $meta_hash.length), writeBytes(bb, $meta_hash);
  }
}

export function decodeAssetMeta(binary: Uint8Array): AssetMeta {
  return _decodeAssetMeta(wrapByteBuffer(binary));
}

function _decodeAssetMeta(bb: ByteBuffer): AssetMeta {
  let message: AssetMeta = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes data = 1;
      case 1: {
        message.data = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional AssetMetaType type = 2;
      case 2: {
        message.type = decodeAssetMetaType[readVarint32(bb)];
        break;
      }

      // optional bytes meta_hash = 3;
      case 3: {
        message.meta_hash = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ListAssetRequest {
  with_witness?: boolean;
  include_spent?: boolean;
  include_leased?: boolean;
}

export function encodeListAssetRequest(message: ListAssetRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeListAssetRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeListAssetRequest(message: ListAssetRequest, bb: ByteBuffer): void {
  // optional bool with_witness = 1;
  let $with_witness = message.with_witness;
  if ($with_witness !== undefined) {
    writeVarint32(bb, 8);
    writeByte(bb, $with_witness ? 1 : 0);
  }

  // optional bool include_spent = 2;
  let $include_spent = message.include_spent;
  if ($include_spent !== undefined) {
    writeVarint32(bb, 16);
    writeByte(bb, $include_spent ? 1 : 0);
  }

  // optional bool include_leased = 3;
  let $include_leased = message.include_leased;
  if ($include_leased !== undefined) {
    writeVarint32(bb, 24);
    writeByte(bb, $include_leased ? 1 : 0);
  }
}

export function decodeListAssetRequest(binary: Uint8Array): ListAssetRequest {
  return _decodeListAssetRequest(wrapByteBuffer(binary));
}

function _decodeListAssetRequest(bb: ByteBuffer): ListAssetRequest {
  let message: ListAssetRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bool with_witness = 1;
      case 1: {
        message.with_witness = !!readByte(bb);
        break;
      }

      // optional bool include_spent = 2;
      case 2: {
        message.include_spent = !!readByte(bb);
        break;
      }

      // optional bool include_leased = 3;
      case 3: {
        message.include_leased = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AnchorInfo {
  anchor_tx?: Uint8Array;
  anchor_txid?: string;
  anchor_block_hash?: string;
  anchor_outpoint?: string;
  internal_key?: Uint8Array;
  merkle_root?: Uint8Array;
  tapscript_sibling?: Uint8Array;
  block_height?: number;
}

export function encodeAnchorInfo(message: AnchorInfo): Uint8Array {
  let bb = popByteBuffer();
  _encodeAnchorInfo(message, bb);
  return toUint8Array(bb);
}

function _encodeAnchorInfo(message: AnchorInfo, bb: ByteBuffer): void {
  // optional bytes anchor_tx = 1;
  let $anchor_tx = message.anchor_tx;
  if ($anchor_tx !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $anchor_tx.length), writeBytes(bb, $anchor_tx);
  }

  // optional string anchor_txid = 2;
  let $anchor_txid = message.anchor_txid;
  if ($anchor_txid !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $anchor_txid);
  }

  // optional string anchor_block_hash = 3;
  let $anchor_block_hash = message.anchor_block_hash;
  if ($anchor_block_hash !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $anchor_block_hash);
  }

  // optional string anchor_outpoint = 4;
  let $anchor_outpoint = message.anchor_outpoint;
  if ($anchor_outpoint !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $anchor_outpoint);
  }

  // optional bytes internal_key = 5;
  let $internal_key = message.internal_key;
  if ($internal_key !== undefined) {
    writeVarint32(bb, 42);
    writeVarint32(bb, $internal_key.length), writeBytes(bb, $internal_key);
  }

  // optional bytes merkle_root = 6;
  let $merkle_root = message.merkle_root;
  if ($merkle_root !== undefined) {
    writeVarint32(bb, 50);
    writeVarint32(bb, $merkle_root.length), writeBytes(bb, $merkle_root);
  }

  // optional bytes tapscript_sibling = 7;
  let $tapscript_sibling = message.tapscript_sibling;
  if ($tapscript_sibling !== undefined) {
    writeVarint32(bb, 58);
    writeVarint32(bb, $tapscript_sibling.length), writeBytes(bb, $tapscript_sibling);
  }

  // optional uint32 block_height = 8;
  let $block_height = message.block_height;
  if ($block_height !== undefined) {
    writeVarint32(bb, 64);
    writeVarint32(bb, $block_height);
  }
}

export function decodeAnchorInfo(binary: Uint8Array): AnchorInfo {
  return _decodeAnchorInfo(wrapByteBuffer(binary));
}

function _decodeAnchorInfo(bb: ByteBuffer): AnchorInfo {
  let message: AnchorInfo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes anchor_tx = 1;
      case 1: {
        message.anchor_tx = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string anchor_txid = 2;
      case 2: {
        message.anchor_txid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string anchor_block_hash = 3;
      case 3: {
        message.anchor_block_hash = readString(bb, readVarint32(bb));
        break;
      }

      // optional string anchor_outpoint = 4;
      case 4: {
        message.anchor_outpoint = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes internal_key = 5;
      case 5: {
        message.internal_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes merkle_root = 6;
      case 6: {
        message.merkle_root = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes tapscript_sibling = 7;
      case 7: {
        message.tapscript_sibling = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint32 block_height = 8;
      case 8: {
        message.block_height = readVarint32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GenesisInfo {
  genesis_point?: string;
  name?: string;
  meta_hash?: Uint8Array;
  asset_id?: Uint8Array;
  output_index?: number;
  version?: number;
}

export function encodeGenesisInfo(message: GenesisInfo): Uint8Array {
  let bb = popByteBuffer();
  _encodeGenesisInfo(message, bb);
  return toUint8Array(bb);
}

function _encodeGenesisInfo(message: GenesisInfo, bb: ByteBuffer): void {
  // optional string genesis_point = 1;
  let $genesis_point = message.genesis_point;
  if ($genesis_point !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $genesis_point);
  }

  // optional string name = 2;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $name);
  }

  // optional bytes meta_hash = 3;
  let $meta_hash = message.meta_hash;
  if ($meta_hash !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $meta_hash.length), writeBytes(bb, $meta_hash);
  }

  // optional bytes asset_id = 4;
  let $asset_id = message.asset_id;
  if ($asset_id !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $asset_id.length), writeBytes(bb, $asset_id);
  }

  // optional uint32 output_index = 5;
  let $output_index = message.output_index;
  if ($output_index !== undefined) {
    writeVarint32(bb, 40);
    writeVarint32(bb, $output_index);
  }

  // optional int32 version = 6;
  let $version = message.version;
  if ($version !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($version));
  }
}

export function decodeGenesisInfo(binary: Uint8Array): GenesisInfo {
  return _decodeGenesisInfo(wrapByteBuffer(binary));
}

function _decodeGenesisInfo(bb: ByteBuffer): GenesisInfo {
  let message: GenesisInfo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string genesis_point = 1;
      case 1: {
        message.genesis_point = readString(bb, readVarint32(bb));
        break;
      }

      // optional string name = 2;
      case 2: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes meta_hash = 3;
      case 3: {
        message.meta_hash = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes asset_id = 4;
      case 4: {
        message.asset_id = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint32 output_index = 5;
      case 5: {
        message.output_index = readVarint32(bb) >>> 0;
        break;
      }

      // optional int32 version = 6;
      case 6: {
        message.version = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetGroup {
  raw_group_key?: Uint8Array;
  tweaked_group_key?: Uint8Array;
  asset_witness?: Uint8Array;
}

export function encodeAssetGroup(message: AssetGroup): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetGroup(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetGroup(message: AssetGroup, bb: ByteBuffer): void {
  // optional bytes raw_group_key = 1;
  let $raw_group_key = message.raw_group_key;
  if ($raw_group_key !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $raw_group_key.length), writeBytes(bb, $raw_group_key);
  }

  // optional bytes tweaked_group_key = 2;
  let $tweaked_group_key = message.tweaked_group_key;
  if ($tweaked_group_key !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $tweaked_group_key.length), writeBytes(bb, $tweaked_group_key);
  }

  // optional bytes asset_witness = 3;
  let $asset_witness = message.asset_witness;
  if ($asset_witness !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $asset_witness.length), writeBytes(bb, $asset_witness);
  }
}

export function decodeAssetGroup(binary: Uint8Array): AssetGroup {
  return _decodeAssetGroup(wrapByteBuffer(binary));
}

function _decodeAssetGroup(bb: ByteBuffer): AssetGroup {
  let message: AssetGroup = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes raw_group_key = 1;
      case 1: {
        message.raw_group_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes tweaked_group_key = 2;
      case 2: {
        message.tweaked_group_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes asset_witness = 3;
      case 3: {
        message.asset_witness = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GroupKeyReveal {
  raw_group_key?: Uint8Array;
  tapscript_root?: Uint8Array;
}

export function encodeGroupKeyReveal(message: GroupKeyReveal): Uint8Array {
  let bb = popByteBuffer();
  _encodeGroupKeyReveal(message, bb);
  return toUint8Array(bb);
}

function _encodeGroupKeyReveal(message: GroupKeyReveal, bb: ByteBuffer): void {
  // optional bytes raw_group_key = 1;
  let $raw_group_key = message.raw_group_key;
  if ($raw_group_key !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $raw_group_key.length), writeBytes(bb, $raw_group_key);
  }

  // optional bytes tapscript_root = 2;
  let $tapscript_root = message.tapscript_root;
  if ($tapscript_root !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $tapscript_root.length), writeBytes(bb, $tapscript_root);
  }
}

export function decodeGroupKeyReveal(binary: Uint8Array): GroupKeyReveal {
  return _decodeGroupKeyReveal(wrapByteBuffer(binary));
}

function _decodeGroupKeyReveal(bb: ByteBuffer): GroupKeyReveal {
  let message: GroupKeyReveal = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes raw_group_key = 1;
      case 1: {
        message.raw_group_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes tapscript_root = 2;
      case 2: {
        message.tapscript_root = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GenesisReveal {
  genesis_base_reveal?: GenesisInfo;
  asset_type?: AssetType;
}

export function encodeGenesisReveal(message: GenesisReveal): Uint8Array {
  let bb = popByteBuffer();
  _encodeGenesisReveal(message, bb);
  return toUint8Array(bb);
}

function _encodeGenesisReveal(message: GenesisReveal, bb: ByteBuffer): void {
  // optional GenesisInfo genesis_base_reveal = 1;
  let $genesis_base_reveal = message.genesis_base_reveal;
  if ($genesis_base_reveal !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeGenesisInfo($genesis_base_reveal, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AssetType asset_type = 2;
  let $asset_type = message.asset_type;
  if ($asset_type !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, encodeAssetType[$asset_type]);
  }
}

export function decodeGenesisReveal(binary: Uint8Array): GenesisReveal {
  return _decodeGenesisReveal(wrapByteBuffer(binary));
}

function _decodeGenesisReveal(bb: ByteBuffer): GenesisReveal {
  let message: GenesisReveal = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional GenesisInfo genesis_base_reveal = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.genesis_base_reveal = _decodeGenesisInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional AssetType asset_type = 2;
      case 2: {
        message.asset_type = decodeAssetType[readVarint32(bb)];
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Asset {
  version?: AssetVersion;
  asset_genesis?: GenesisInfo;
  asset_type?: AssetType;
  amount?: Long;
  lock_time?: number;
  relative_lock_time?: number;
  script_version?: number;
  script_key?: Uint8Array;
  script_key_is_local?: boolean;
  asset_group?: AssetGroup;
  chain_anchor?: AnchorInfo;
  prev_witnesses?: PrevWitness[];
  is_spent?: boolean;
  lease_owner?: Uint8Array;
  lease_expiry?: Long;
  is_burn?: boolean;
}

export function encodeAsset(message: Asset): Uint8Array {
  let bb = popByteBuffer();
  _encodeAsset(message, bb);
  return toUint8Array(bb);
}

function _encodeAsset(message: Asset, bb: ByteBuffer): void {
  // optional AssetVersion version = 1;
  let $version = message.version;
  if ($version !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, encodeAssetVersion[$version]);
  }

  // optional GenesisInfo asset_genesis = 2;
  let $asset_genesis = message.asset_genesis;
  if ($asset_genesis !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeGenesisInfo($asset_genesis, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AssetType asset_type = 3;
  let $asset_type = message.asset_type;
  if ($asset_type !== undefined) {
    writeVarint32(bb, 24);
    writeVarint32(bb, encodeAssetType[$asset_type]);
  }

  // optional uint64 amount = 4;
  let $amount = message.amount;
  if ($amount !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $amount);
  }

  // optional int32 lock_time = 5;
  let $lock_time = message.lock_time;
  if ($lock_time !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($lock_time));
  }

  // optional int32 relative_lock_time = 6;
  let $relative_lock_time = message.relative_lock_time;
  if ($relative_lock_time !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($relative_lock_time));
  }

  // optional int32 script_version = 7;
  let $script_version = message.script_version;
  if ($script_version !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($script_version));
  }

  // optional bytes script_key = 9;
  let $script_key = message.script_key;
  if ($script_key !== undefined) {
    writeVarint32(bb, 74);
    writeVarint32(bb, $script_key.length), writeBytes(bb, $script_key);
  }

  // optional bool script_key_is_local = 10;
  let $script_key_is_local = message.script_key_is_local;
  if ($script_key_is_local !== undefined) {
    writeVarint32(bb, 80);
    writeByte(bb, $script_key_is_local ? 1 : 0);
  }

  // optional AssetGroup asset_group = 11;
  let $asset_group = message.asset_group;
  if ($asset_group !== undefined) {
    writeVarint32(bb, 90);
    let nested = popByteBuffer();
    _encodeAssetGroup($asset_group, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AnchorInfo chain_anchor = 12;
  let $chain_anchor = message.chain_anchor;
  if ($chain_anchor !== undefined) {
    writeVarint32(bb, 98);
    let nested = popByteBuffer();
    _encodeAnchorInfo($chain_anchor, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PrevWitness prev_witnesses = 13;
  let array$prev_witnesses = message.prev_witnesses;
  if (array$prev_witnesses !== undefined) {
    for (let value of array$prev_witnesses) {
      writeVarint32(bb, 106);
      let nested = popByteBuffer();
      _encodePrevWitness(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional bool is_spent = 14;
  let $is_spent = message.is_spent;
  if ($is_spent !== undefined) {
    writeVarint32(bb, 112);
    writeByte(bb, $is_spent ? 1 : 0);
  }

  // optional bytes lease_owner = 15;
  let $lease_owner = message.lease_owner;
  if ($lease_owner !== undefined) {
    writeVarint32(bb, 122);
    writeVarint32(bb, $lease_owner.length), writeBytes(bb, $lease_owner);
  }

  // optional int64 lease_expiry = 16;
  let $lease_expiry = message.lease_expiry;
  if ($lease_expiry !== undefined) {
    writeVarint32(bb, 128);
    writeVarint64(bb, $lease_expiry);
  }

  // optional bool is_burn = 17;
  let $is_burn = message.is_burn;
  if ($is_burn !== undefined) {
    writeVarint32(bb, 136);
    writeByte(bb, $is_burn ? 1 : 0);
  }
}

export function decodeAsset(binary: Uint8Array): Asset {
  return _decodeAsset(wrapByteBuffer(binary));
}

function _decodeAsset(bb: ByteBuffer): Asset {
  let message: Asset = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional AssetVersion version = 1;
      case 1: {
        message.version = decodeAssetVersion[readVarint32(bb)];
        break;
      }

      // optional GenesisInfo asset_genesis = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.asset_genesis = _decodeGenesisInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional AssetType asset_type = 3;
      case 3: {
        message.asset_type = decodeAssetType[readVarint32(bb)];
        break;
      }

      // optional uint64 amount = 4;
      case 4: {
        message.amount = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional int32 lock_time = 5;
      case 5: {
        message.lock_time = readVarint32(bb);
        break;
      }

      // optional int32 relative_lock_time = 6;
      case 6: {
        message.relative_lock_time = readVarint32(bb);
        break;
      }

      // optional int32 script_version = 7;
      case 7: {
        message.script_version = readVarint32(bb);
        break;
      }

      // optional bytes script_key = 9;
      case 9: {
        message.script_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bool script_key_is_local = 10;
      case 10: {
        message.script_key_is_local = !!readByte(bb);
        break;
      }

      // optional AssetGroup asset_group = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        message.asset_group = _decodeAssetGroup(bb);
        bb.limit = limit;
        break;
      }

      // optional AnchorInfo chain_anchor = 12;
      case 12: {
        let limit = pushTemporaryLength(bb);
        message.chain_anchor = _decodeAnchorInfo(bb);
        bb.limit = limit;
        break;
      }

      // repeated PrevWitness prev_witnesses = 13;
      case 13: {
        let limit = pushTemporaryLength(bb);
        let values = message.prev_witnesses || (message.prev_witnesses = []);
        values.push(_decodePrevWitness(bb));
        bb.limit = limit;
        break;
      }

      // optional bool is_spent = 14;
      case 14: {
        message.is_spent = !!readByte(bb);
        break;
      }

      // optional bytes lease_owner = 15;
      case 15: {
        message.lease_owner = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional int64 lease_expiry = 16;
      case 16: {
        message.lease_expiry = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional bool is_burn = 17;
      case 17: {
        message.is_burn = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface PrevWitness {
  prev_id?: PrevInputAsset;
  tx_witness?: Uint8Array[];
  split_commitment?: SplitCommitment;
}

export function encodePrevWitness(message: PrevWitness): Uint8Array {
  let bb = popByteBuffer();
  _encodePrevWitness(message, bb);
  return toUint8Array(bb);
}

function _encodePrevWitness(message: PrevWitness, bb: ByteBuffer): void {
  // optional PrevInputAsset prev_id = 1;
  let $prev_id = message.prev_id;
  if ($prev_id !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodePrevInputAsset($prev_id, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated bytes tx_witness = 2;
  let array$tx_witness = message.tx_witness;
  if (array$tx_witness !== undefined) {
    for (let value of array$tx_witness) {
      writeVarint32(bb, 18);
      writeVarint32(bb, value.length), writeBytes(bb, value);
    }
  }

  // optional SplitCommitment split_commitment = 3;
  let $split_commitment = message.split_commitment;
  if ($split_commitment !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeSplitCommitment($split_commitment, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodePrevWitness(binary: Uint8Array): PrevWitness {
  return _decodePrevWitness(wrapByteBuffer(binary));
}

function _decodePrevWitness(bb: ByteBuffer): PrevWitness {
  let message: PrevWitness = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional PrevInputAsset prev_id = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.prev_id = _decodePrevInputAsset(bb);
        bb.limit = limit;
        break;
      }

      // repeated bytes tx_witness = 2;
      case 2: {
        let values = message.tx_witness || (message.tx_witness = []);
        values.push(readBytes(bb, readVarint32(bb)));
        break;
      }

      // optional SplitCommitment split_commitment = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.split_commitment = _decodeSplitCommitment(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface SplitCommitment {
  root_asset?: Asset;
}

export function encodeSplitCommitment(message: SplitCommitment): Uint8Array {
  let bb = popByteBuffer();
  _encodeSplitCommitment(message, bb);
  return toUint8Array(bb);
}

function _encodeSplitCommitment(message: SplitCommitment, bb: ByteBuffer): void {
  // optional Asset root_asset = 1;
  let $root_asset = message.root_asset;
  if ($root_asset !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeAsset($root_asset, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeSplitCommitment(binary: Uint8Array): SplitCommitment {
  return _decodeSplitCommitment(wrapByteBuffer(binary));
}

function _decodeSplitCommitment(bb: ByteBuffer): SplitCommitment {
  let message: SplitCommitment = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional Asset root_asset = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.root_asset = _decodeAsset(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ListAssetResponse {
  assets?: Asset[];
}

export function encodeListAssetResponse(message: ListAssetResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeListAssetResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeListAssetResponse(message: ListAssetResponse, bb: ByteBuffer): void {
  // repeated Asset assets = 1;
  let array$assets = message.assets;
  if (array$assets !== undefined) {
    for (let value of array$assets) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeAsset(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeListAssetResponse(binary: Uint8Array): ListAssetResponse {
  return _decodeListAssetResponse(wrapByteBuffer(binary));
}

function _decodeListAssetResponse(bb: ByteBuffer): ListAssetResponse {
  let message: ListAssetResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated Asset assets = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.assets || (message.assets = []);
        values.push(_decodeAsset(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ListUtxosRequest {
  include_leased?: boolean;
}

export function encodeListUtxosRequest(message: ListUtxosRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeListUtxosRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeListUtxosRequest(message: ListUtxosRequest, bb: ByteBuffer): void {
  // optional bool include_leased = 1;
  let $include_leased = message.include_leased;
  if ($include_leased !== undefined) {
    writeVarint32(bb, 8);
    writeByte(bb, $include_leased ? 1 : 0);
  }
}

export function decodeListUtxosRequest(binary: Uint8Array): ListUtxosRequest {
  return _decodeListUtxosRequest(wrapByteBuffer(binary));
}

function _decodeListUtxosRequest(bb: ByteBuffer): ListUtxosRequest {
  let message: ListUtxosRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bool include_leased = 1;
      case 1: {
        message.include_leased = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ManagedUtxo {
  out_point?: string;
  amt_sat?: Long;
  internal_key?: Uint8Array;
  taproot_asset_root?: Uint8Array;
  merkle_root?: Uint8Array;
  assets?: Asset[];
}

export function encodeManagedUtxo(message: ManagedUtxo): Uint8Array {
  let bb = popByteBuffer();
  _encodeManagedUtxo(message, bb);
  return toUint8Array(bb);
}

function _encodeManagedUtxo(message: ManagedUtxo, bb: ByteBuffer): void {
  // optional string out_point = 1;
  let $out_point = message.out_point;
  if ($out_point !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $out_point);
  }

  // optional int64 amt_sat = 2;
  let $amt_sat = message.amt_sat;
  if ($amt_sat !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $amt_sat);
  }

  // optional bytes internal_key = 3;
  let $internal_key = message.internal_key;
  if ($internal_key !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $internal_key.length), writeBytes(bb, $internal_key);
  }

  // optional bytes taproot_asset_root = 4;
  let $taproot_asset_root = message.taproot_asset_root;
  if ($taproot_asset_root !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $taproot_asset_root.length), writeBytes(bb, $taproot_asset_root);
  }

  // optional bytes merkle_root = 5;
  let $merkle_root = message.merkle_root;
  if ($merkle_root !== undefined) {
    writeVarint32(bb, 42);
    writeVarint32(bb, $merkle_root.length), writeBytes(bb, $merkle_root);
  }

  // repeated Asset assets = 6;
  let array$assets = message.assets;
  if (array$assets !== undefined) {
    for (let value of array$assets) {
      writeVarint32(bb, 50);
      let nested = popByteBuffer();
      _encodeAsset(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeManagedUtxo(binary: Uint8Array): ManagedUtxo {
  return _decodeManagedUtxo(wrapByteBuffer(binary));
}

function _decodeManagedUtxo(bb: ByteBuffer): ManagedUtxo {
  let message: ManagedUtxo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string out_point = 1;
      case 1: {
        message.out_point = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 amt_sat = 2;
      case 2: {
        message.amt_sat = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional bytes internal_key = 3;
      case 3: {
        message.internal_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes taproot_asset_root = 4;
      case 4: {
        message.taproot_asset_root = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes merkle_root = 5;
      case 5: {
        message.merkle_root = readBytes(bb, readVarint32(bb));
        break;
      }

      // repeated Asset assets = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        let values = message.assets || (message.assets = []);
        values.push(_decodeAsset(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ListUtxosResponse {
  managed_utxos?: { [key: string]: ManagedUtxo };
}

export function encodeListUtxosResponse(message: ListUtxosResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeListUtxosResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeListUtxosResponse(message: ListUtxosResponse, bb: ByteBuffer): void {
  // optional map<string, ManagedUtxo> managed_utxos = 1;
  let map$managed_utxos = message.managed_utxos;
  if (map$managed_utxos !== undefined) {
    for (let key in map$managed_utxos) {
      let nested = popByteBuffer();
      let value = map$managed_utxos[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodeManagedUtxo(value, nestedValue);
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

export function decodeListUtxosResponse(binary: Uint8Array): ListUtxosResponse {
  return _decodeListUtxosResponse(wrapByteBuffer(binary));
}

function _decodeListUtxosResponse(bb: ByteBuffer): ListUtxosResponse {
  let message: ListUtxosResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional map<string, ManagedUtxo> managed_utxos = 1;
      case 1: {
        let values = message.managed_utxos || (message.managed_utxos = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: string | undefined;
        let value: ManagedUtxo | undefined;
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
              value = _decodeManagedUtxo(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: managed_utxos");
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

export interface ListGroupsRequest {
}

export function encodeListGroupsRequest(message: ListGroupsRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeListGroupsRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeListGroupsRequest(message: ListGroupsRequest, bb: ByteBuffer): void {
}

export function decodeListGroupsRequest(binary: Uint8Array): ListGroupsRequest {
  return _decodeListGroupsRequest(wrapByteBuffer(binary));
}

function _decodeListGroupsRequest(bb: ByteBuffer): ListGroupsRequest {
  let message: ListGroupsRequest = {} as any;

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

export interface AssetHumanReadable {
  id?: Uint8Array;
  amount?: Long;
  lock_time?: number;
  relative_lock_time?: number;
  tag?: string;
  meta_hash?: Uint8Array;
  type?: AssetType;
  version?: AssetVersion;
}

export function encodeAssetHumanReadable(message: AssetHumanReadable): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetHumanReadable(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetHumanReadable(message: AssetHumanReadable, bb: ByteBuffer): void {
  // optional bytes id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $id.length), writeBytes(bb, $id);
  }

  // optional uint64 amount = 2;
  let $amount = message.amount;
  if ($amount !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $amount);
  }

  // optional int32 lock_time = 3;
  let $lock_time = message.lock_time;
  if ($lock_time !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($lock_time));
  }

  // optional int32 relative_lock_time = 4;
  let $relative_lock_time = message.relative_lock_time;
  if ($relative_lock_time !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($relative_lock_time));
  }

  // optional string tag = 5;
  let $tag = message.tag;
  if ($tag !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $tag);
  }

  // optional bytes meta_hash = 6;
  let $meta_hash = message.meta_hash;
  if ($meta_hash !== undefined) {
    writeVarint32(bb, 50);
    writeVarint32(bb, $meta_hash.length), writeBytes(bb, $meta_hash);
  }

  // optional AssetType type = 7;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 56);
    writeVarint32(bb, encodeAssetType[$type]);
  }

  // optional AssetVersion version = 8;
  let $version = message.version;
  if ($version !== undefined) {
    writeVarint32(bb, 64);
    writeVarint32(bb, encodeAssetVersion[$version]);
  }
}

export function decodeAssetHumanReadable(binary: Uint8Array): AssetHumanReadable {
  return _decodeAssetHumanReadable(wrapByteBuffer(binary));
}

function _decodeAssetHumanReadable(bb: ByteBuffer): AssetHumanReadable {
  let message: AssetHumanReadable = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes id = 1;
      case 1: {
        message.id = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint64 amount = 2;
      case 2: {
        message.amount = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional int32 lock_time = 3;
      case 3: {
        message.lock_time = readVarint32(bb);
        break;
      }

      // optional int32 relative_lock_time = 4;
      case 4: {
        message.relative_lock_time = readVarint32(bb);
        break;
      }

      // optional string tag = 5;
      case 5: {
        message.tag = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes meta_hash = 6;
      case 6: {
        message.meta_hash = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional AssetType type = 7;
      case 7: {
        message.type = decodeAssetType[readVarint32(bb)];
        break;
      }

      // optional AssetVersion version = 8;
      case 8: {
        message.version = decodeAssetVersion[readVarint32(bb)];
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GroupedAssets {
  assets?: AssetHumanReadable[];
}

export function encodeGroupedAssets(message: GroupedAssets): Uint8Array {
  let bb = popByteBuffer();
  _encodeGroupedAssets(message, bb);
  return toUint8Array(bb);
}

function _encodeGroupedAssets(message: GroupedAssets, bb: ByteBuffer): void {
  // repeated AssetHumanReadable assets = 1;
  let array$assets = message.assets;
  if (array$assets !== undefined) {
    for (let value of array$assets) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeAssetHumanReadable(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeGroupedAssets(binary: Uint8Array): GroupedAssets {
  return _decodeGroupedAssets(wrapByteBuffer(binary));
}

function _decodeGroupedAssets(bb: ByteBuffer): GroupedAssets {
  let message: GroupedAssets = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated AssetHumanReadable assets = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.assets || (message.assets = []);
        values.push(_decodeAssetHumanReadable(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ListGroupsResponse {
  groups?: { [key: string]: GroupedAssets };
}

export function encodeListGroupsResponse(message: ListGroupsResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeListGroupsResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeListGroupsResponse(message: ListGroupsResponse, bb: ByteBuffer): void {
  // optional map<string, GroupedAssets> groups = 1;
  let map$groups = message.groups;
  if (map$groups !== undefined) {
    for (let key in map$groups) {
      let nested = popByteBuffer();
      let value = map$groups[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodeGroupedAssets(value, nestedValue);
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

export function decodeListGroupsResponse(binary: Uint8Array): ListGroupsResponse {
  return _decodeListGroupsResponse(wrapByteBuffer(binary));
}

function _decodeListGroupsResponse(bb: ByteBuffer): ListGroupsResponse {
  let message: ListGroupsResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional map<string, GroupedAssets> groups = 1;
      case 1: {
        let values = message.groups || (message.groups = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: string | undefined;
        let value: GroupedAssets | undefined;
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
              value = _decodeGroupedAssets(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: groups");
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

export interface ListBalancesRequest {
  asset_id?: boolean;
  group_key?: boolean;
  asset_filter?: Uint8Array;
  group_key_filter?: Uint8Array;
}

export function encodeListBalancesRequest(message: ListBalancesRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeListBalancesRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeListBalancesRequest(message: ListBalancesRequest, bb: ByteBuffer): void {
  // optional bool asset_id = 1;
  let $asset_id = message.asset_id;
  if ($asset_id !== undefined) {
    writeVarint32(bb, 8);
    writeByte(bb, $asset_id ? 1 : 0);
  }

  // optional bool group_key = 2;
  let $group_key = message.group_key;
  if ($group_key !== undefined) {
    writeVarint32(bb, 16);
    writeByte(bb, $group_key ? 1 : 0);
  }

  // optional bytes asset_filter = 3;
  let $asset_filter = message.asset_filter;
  if ($asset_filter !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $asset_filter.length), writeBytes(bb, $asset_filter);
  }

  // optional bytes group_key_filter = 4;
  let $group_key_filter = message.group_key_filter;
  if ($group_key_filter !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $group_key_filter.length), writeBytes(bb, $group_key_filter);
  }
}

export function decodeListBalancesRequest(binary: Uint8Array): ListBalancesRequest {
  return _decodeListBalancesRequest(wrapByteBuffer(binary));
}

function _decodeListBalancesRequest(bb: ByteBuffer): ListBalancesRequest {
  let message: ListBalancesRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bool asset_id = 1;
      case 1: {
        message.asset_id = !!readByte(bb);
        break;
      }

      // optional bool group_key = 2;
      case 2: {
        message.group_key = !!readByte(bb);
        break;
      }

      // optional bytes asset_filter = 3;
      case 3: {
        message.asset_filter = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes group_key_filter = 4;
      case 4: {
        message.group_key_filter = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetBalance {
  asset_genesis?: GenesisInfo;
  asset_type?: AssetType;
  balance?: Long;
}

export function encodeAssetBalance(message: AssetBalance): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetBalance(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetBalance(message: AssetBalance, bb: ByteBuffer): void {
  // optional GenesisInfo asset_genesis = 1;
  let $asset_genesis = message.asset_genesis;
  if ($asset_genesis !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeGenesisInfo($asset_genesis, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AssetType asset_type = 2;
  let $asset_type = message.asset_type;
  if ($asset_type !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, encodeAssetType[$asset_type]);
  }

  // optional uint64 balance = 3;
  let $balance = message.balance;
  if ($balance !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $balance);
  }
}

export function decodeAssetBalance(binary: Uint8Array): AssetBalance {
  return _decodeAssetBalance(wrapByteBuffer(binary));
}

function _decodeAssetBalance(bb: ByteBuffer): AssetBalance {
  let message: AssetBalance = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional GenesisInfo asset_genesis = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.asset_genesis = _decodeGenesisInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional AssetType asset_type = 2;
      case 2: {
        message.asset_type = decodeAssetType[readVarint32(bb)];
        break;
      }

      // optional uint64 balance = 3;
      case 3: {
        message.balance = readVarint64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetGroupBalance {
  group_key?: Uint8Array;
  balance?: Long;
}

export function encodeAssetGroupBalance(message: AssetGroupBalance): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetGroupBalance(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetGroupBalance(message: AssetGroupBalance, bb: ByteBuffer): void {
  // optional bytes group_key = 1;
  let $group_key = message.group_key;
  if ($group_key !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $group_key.length), writeBytes(bb, $group_key);
  }

  // optional uint64 balance = 2;
  let $balance = message.balance;
  if ($balance !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $balance);
  }
}

export function decodeAssetGroupBalance(binary: Uint8Array): AssetGroupBalance {
  return _decodeAssetGroupBalance(wrapByteBuffer(binary));
}

function _decodeAssetGroupBalance(bb: ByteBuffer): AssetGroupBalance {
  let message: AssetGroupBalance = {} as any;

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

      // optional uint64 balance = 2;
      case 2: {
        message.balance = readVarint64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ListBalancesResponse {
  asset_balances?: { [key: string]: AssetBalance };
  asset_group_balances?: { [key: string]: AssetGroupBalance };
}

export function encodeListBalancesResponse(message: ListBalancesResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeListBalancesResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeListBalancesResponse(message: ListBalancesResponse, bb: ByteBuffer): void {
  // optional map<string, AssetBalance> asset_balances = 1;
  let map$asset_balances = message.asset_balances;
  if (map$asset_balances !== undefined) {
    for (let key in map$asset_balances) {
      let nested = popByteBuffer();
      let value = map$asset_balances[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodeAssetBalance(value, nestedValue);
      writeVarint32(nested, nestedValue.limit);
      writeByteBuffer(nested, nestedValue);
      pushByteBuffer(nestedValue);
      writeVarint32(bb, 10);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<string, AssetGroupBalance> asset_group_balances = 2;
  let map$asset_group_balances = message.asset_group_balances;
  if (map$asset_group_balances !== undefined) {
    for (let key in map$asset_group_balances) {
      let nested = popByteBuffer();
      let value = map$asset_group_balances[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodeAssetGroupBalance(value, nestedValue);
      writeVarint32(nested, nestedValue.limit);
      writeByteBuffer(nested, nestedValue);
      pushByteBuffer(nestedValue);
      writeVarint32(bb, 18);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeListBalancesResponse(binary: Uint8Array): ListBalancesResponse {
  return _decodeListBalancesResponse(wrapByteBuffer(binary));
}

function _decodeListBalancesResponse(bb: ByteBuffer): ListBalancesResponse {
  let message: ListBalancesResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional map<string, AssetBalance> asset_balances = 1;
      case 1: {
        let values = message.asset_balances || (message.asset_balances = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: string | undefined;
        let value: AssetBalance | undefined;
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
              value = _decodeAssetBalance(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: asset_balances");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // optional map<string, AssetGroupBalance> asset_group_balances = 2;
      case 2: {
        let values = message.asset_group_balances || (message.asset_group_balances = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: string | undefined;
        let value: AssetGroupBalance | undefined;
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
              value = _decodeAssetGroupBalance(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: asset_group_balances");
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

export interface ListTransfersRequest {
}

export function encodeListTransfersRequest(message: ListTransfersRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeListTransfersRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeListTransfersRequest(message: ListTransfersRequest, bb: ByteBuffer): void {
}

export function decodeListTransfersRequest(binary: Uint8Array): ListTransfersRequest {
  return _decodeListTransfersRequest(wrapByteBuffer(binary));
}

function _decodeListTransfersRequest(bb: ByteBuffer): ListTransfersRequest {
  let message: ListTransfersRequest = {} as any;

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

export interface ListTransfersResponse {
  transfers?: AssetTransfer[];
}

export function encodeListTransfersResponse(message: ListTransfersResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeListTransfersResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeListTransfersResponse(message: ListTransfersResponse, bb: ByteBuffer): void {
  // repeated AssetTransfer transfers = 1;
  let array$transfers = message.transfers;
  if (array$transfers !== undefined) {
    for (let value of array$transfers) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeAssetTransfer(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeListTransfersResponse(binary: Uint8Array): ListTransfersResponse {
  return _decodeListTransfersResponse(wrapByteBuffer(binary));
}

function _decodeListTransfersResponse(bb: ByteBuffer): ListTransfersResponse {
  let message: ListTransfersResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated AssetTransfer transfers = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.transfers || (message.transfers = []);
        values.push(_decodeAssetTransfer(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AssetTransfer {
  transfer_timestamp?: Long;
  anchor_tx_hash?: Uint8Array;
  anchor_tx_height_hint?: number;
  anchor_tx_chain_fees?: Long;
  inputs?: TransferInput[];
  outputs?: TransferOutput[];
}

export function encodeAssetTransfer(message: AssetTransfer): Uint8Array {
  let bb = popByteBuffer();
  _encodeAssetTransfer(message, bb);
  return toUint8Array(bb);
}

function _encodeAssetTransfer(message: AssetTransfer, bb: ByteBuffer): void {
  // optional int64 transfer_timestamp = 1;
  let $transfer_timestamp = message.transfer_timestamp;
  if ($transfer_timestamp !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $transfer_timestamp);
  }

  // optional bytes anchor_tx_hash = 2;
  let $anchor_tx_hash = message.anchor_tx_hash;
  if ($anchor_tx_hash !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $anchor_tx_hash.length), writeBytes(bb, $anchor_tx_hash);
  }

  // optional uint32 anchor_tx_height_hint = 3;
  let $anchor_tx_height_hint = message.anchor_tx_height_hint;
  if ($anchor_tx_height_hint !== undefined) {
    writeVarint32(bb, 24);
    writeVarint32(bb, $anchor_tx_height_hint);
  }

  // optional int64 anchor_tx_chain_fees = 4;
  let $anchor_tx_chain_fees = message.anchor_tx_chain_fees;
  if ($anchor_tx_chain_fees !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $anchor_tx_chain_fees);
  }

  // repeated TransferInput inputs = 5;
  let array$inputs = message.inputs;
  if (array$inputs !== undefined) {
    for (let value of array$inputs) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodeTransferInput(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated TransferOutput outputs = 6;
  let array$outputs = message.outputs;
  if (array$outputs !== undefined) {
    for (let value of array$outputs) {
      writeVarint32(bb, 50);
      let nested = popByteBuffer();
      _encodeTransferOutput(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeAssetTransfer(binary: Uint8Array): AssetTransfer {
  return _decodeAssetTransfer(wrapByteBuffer(binary));
}

function _decodeAssetTransfer(bb: ByteBuffer): AssetTransfer {
  let message: AssetTransfer = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 transfer_timestamp = 1;
      case 1: {
        message.transfer_timestamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional bytes anchor_tx_hash = 2;
      case 2: {
        message.anchor_tx_hash = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint32 anchor_tx_height_hint = 3;
      case 3: {
        message.anchor_tx_height_hint = readVarint32(bb) >>> 0;
        break;
      }

      // optional int64 anchor_tx_chain_fees = 4;
      case 4: {
        message.anchor_tx_chain_fees = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // repeated TransferInput inputs = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.inputs || (message.inputs = []);
        values.push(_decodeTransferInput(bb));
        bb.limit = limit;
        break;
      }

      // repeated TransferOutput outputs = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        let values = message.outputs || (message.outputs = []);
        values.push(_decodeTransferOutput(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TransferInput {
  anchor_point?: string;
  asset_id?: Uint8Array;
  script_key?: Uint8Array;
  amount?: Long;
}

export function encodeTransferInput(message: TransferInput): Uint8Array {
  let bb = popByteBuffer();
  _encodeTransferInput(message, bb);
  return toUint8Array(bb);
}

function _encodeTransferInput(message: TransferInput, bb: ByteBuffer): void {
  // optional string anchor_point = 1;
  let $anchor_point = message.anchor_point;
  if ($anchor_point !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $anchor_point);
  }

  // optional bytes asset_id = 2;
  let $asset_id = message.asset_id;
  if ($asset_id !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $asset_id.length), writeBytes(bb, $asset_id);
  }

  // optional bytes script_key = 3;
  let $script_key = message.script_key;
  if ($script_key !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $script_key.length), writeBytes(bb, $script_key);
  }

  // optional uint64 amount = 4;
  let $amount = message.amount;
  if ($amount !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $amount);
  }
}

export function decodeTransferInput(binary: Uint8Array): TransferInput {
  return _decodeTransferInput(wrapByteBuffer(binary));
}

function _decodeTransferInput(bb: ByteBuffer): TransferInput {
  let message: TransferInput = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string anchor_point = 1;
      case 1: {
        message.anchor_point = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes asset_id = 2;
      case 2: {
        message.asset_id = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes script_key = 3;
      case 3: {
        message.script_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint64 amount = 4;
      case 4: {
        message.amount = readVarint64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TransferOutputAnchor {
  outpoint?: string;
  value?: Long;
  internal_key?: Uint8Array;
  taproot_asset_root?: Uint8Array;
  merkle_root?: Uint8Array;
  tapscript_sibling?: Uint8Array;
  num_passive_assets?: number;
}

export function encodeTransferOutputAnchor(message: TransferOutputAnchor): Uint8Array {
  let bb = popByteBuffer();
  _encodeTransferOutputAnchor(message, bb);
  return toUint8Array(bb);
}

function _encodeTransferOutputAnchor(message: TransferOutputAnchor, bb: ByteBuffer): void {
  // optional string outpoint = 1;
  let $outpoint = message.outpoint;
  if ($outpoint !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $outpoint);
  }

  // optional int64 value = 2;
  let $value = message.value;
  if ($value !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $value);
  }

  // optional bytes internal_key = 3;
  let $internal_key = message.internal_key;
  if ($internal_key !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $internal_key.length), writeBytes(bb, $internal_key);
  }

  // optional bytes taproot_asset_root = 4;
  let $taproot_asset_root = message.taproot_asset_root;
  if ($taproot_asset_root !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $taproot_asset_root.length), writeBytes(bb, $taproot_asset_root);
  }

  // optional bytes merkle_root = 5;
  let $merkle_root = message.merkle_root;
  if ($merkle_root !== undefined) {
    writeVarint32(bb, 42);
    writeVarint32(bb, $merkle_root.length), writeBytes(bb, $merkle_root);
  }

  // optional bytes tapscript_sibling = 6;
  let $tapscript_sibling = message.tapscript_sibling;
  if ($tapscript_sibling !== undefined) {
    writeVarint32(bb, 50);
    writeVarint32(bb, $tapscript_sibling.length), writeBytes(bb, $tapscript_sibling);
  }

  // optional uint32 num_passive_assets = 7;
  let $num_passive_assets = message.num_passive_assets;
  if ($num_passive_assets !== undefined) {
    writeVarint32(bb, 56);
    writeVarint32(bb, $num_passive_assets);
  }
}

export function decodeTransferOutputAnchor(binary: Uint8Array): TransferOutputAnchor {
  return _decodeTransferOutputAnchor(wrapByteBuffer(binary));
}

function _decodeTransferOutputAnchor(bb: ByteBuffer): TransferOutputAnchor {
  let message: TransferOutputAnchor = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string outpoint = 1;
      case 1: {
        message.outpoint = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 value = 2;
      case 2: {
        message.value = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional bytes internal_key = 3;
      case 3: {
        message.internal_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes taproot_asset_root = 4;
      case 4: {
        message.taproot_asset_root = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes merkle_root = 5;
      case 5: {
        message.merkle_root = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes tapscript_sibling = 6;
      case 6: {
        message.tapscript_sibling = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint32 num_passive_assets = 7;
      case 7: {
        message.num_passive_assets = readVarint32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TransferOutput {
  anchor?: TransferOutputAnchor;
  script_key?: Uint8Array;
  script_key_is_local?: boolean;
  amount?: Long;
  new_proof_blob?: Uint8Array;
  split_commit_root_hash?: Uint8Array;
  output_type?: OutputType;
  asset_version?: AssetVersion;
}

export function encodeTransferOutput(message: TransferOutput): Uint8Array {
  let bb = popByteBuffer();
  _encodeTransferOutput(message, bb);
  return toUint8Array(bb);
}

function _encodeTransferOutput(message: TransferOutput, bb: ByteBuffer): void {
  // optional TransferOutputAnchor anchor = 1;
  let $anchor = message.anchor;
  if ($anchor !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeTransferOutputAnchor($anchor, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bytes script_key = 2;
  let $script_key = message.script_key;
  if ($script_key !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $script_key.length), writeBytes(bb, $script_key);
  }

  // optional bool script_key_is_local = 3;
  let $script_key_is_local = message.script_key_is_local;
  if ($script_key_is_local !== undefined) {
    writeVarint32(bb, 24);
    writeByte(bb, $script_key_is_local ? 1 : 0);
  }

  // optional uint64 amount = 4;
  let $amount = message.amount;
  if ($amount !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $amount);
  }

  // optional bytes new_proof_blob = 5;
  let $new_proof_blob = message.new_proof_blob;
  if ($new_proof_blob !== undefined) {
    writeVarint32(bb, 42);
    writeVarint32(bb, $new_proof_blob.length), writeBytes(bb, $new_proof_blob);
  }

  // optional bytes split_commit_root_hash = 6;
  let $split_commit_root_hash = message.split_commit_root_hash;
  if ($split_commit_root_hash !== undefined) {
    writeVarint32(bb, 50);
    writeVarint32(bb, $split_commit_root_hash.length), writeBytes(bb, $split_commit_root_hash);
  }

  // optional OutputType output_type = 7;
  let $output_type = message.output_type;
  if ($output_type !== undefined) {
    writeVarint32(bb, 56);
    writeVarint32(bb, encodeOutputType[$output_type]);
  }

  // optional AssetVersion asset_version = 8;
  let $asset_version = message.asset_version;
  if ($asset_version !== undefined) {
    writeVarint32(bb, 64);
    writeVarint32(bb, encodeAssetVersion[$asset_version]);
  }
}

export function decodeTransferOutput(binary: Uint8Array): TransferOutput {
  return _decodeTransferOutput(wrapByteBuffer(binary));
}

function _decodeTransferOutput(bb: ByteBuffer): TransferOutput {
  let message: TransferOutput = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional TransferOutputAnchor anchor = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.anchor = _decodeTransferOutputAnchor(bb);
        bb.limit = limit;
        break;
      }

      // optional bytes script_key = 2;
      case 2: {
        message.script_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bool script_key_is_local = 3;
      case 3: {
        message.script_key_is_local = !!readByte(bb);
        break;
      }

      // optional uint64 amount = 4;
      case 4: {
        message.amount = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional bytes new_proof_blob = 5;
      case 5: {
        message.new_proof_blob = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes split_commit_root_hash = 6;
      case 6: {
        message.split_commit_root_hash = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional OutputType output_type = 7;
      case 7: {
        message.output_type = decodeOutputType[readVarint32(bb)];
        break;
      }

      // optional AssetVersion asset_version = 8;
      case 8: {
        message.asset_version = decodeAssetVersion[readVarint32(bb)];
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface StopRequest {
}

export function encodeStopRequest(message: StopRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeStopRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeStopRequest(message: StopRequest, bb: ByteBuffer): void {
}

export function decodeStopRequest(binary: Uint8Array): StopRequest {
  return _decodeStopRequest(wrapByteBuffer(binary));
}

function _decodeStopRequest(bb: ByteBuffer): StopRequest {
  let message: StopRequest = {} as any;

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

export interface StopResponse {
}

export function encodeStopResponse(message: StopResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeStopResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeStopResponse(message: StopResponse, bb: ByteBuffer): void {
}

export function decodeStopResponse(binary: Uint8Array): StopResponse {
  return _decodeStopResponse(wrapByteBuffer(binary));
}

function _decodeStopResponse(bb: ByteBuffer): StopResponse {
  let message: StopResponse = {} as any;

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

export interface DebugLevelRequest {
  show?: boolean;
  level_spec?: string;
}

export function encodeDebugLevelRequest(message: DebugLevelRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeDebugLevelRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeDebugLevelRequest(message: DebugLevelRequest, bb: ByteBuffer): void {
  // optional bool show = 1;
  let $show = message.show;
  if ($show !== undefined) {
    writeVarint32(bb, 8);
    writeByte(bb, $show ? 1 : 0);
  }

  // optional string level_spec = 2;
  let $level_spec = message.level_spec;
  if ($level_spec !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $level_spec);
  }
}

export function decodeDebugLevelRequest(binary: Uint8Array): DebugLevelRequest {
  return _decodeDebugLevelRequest(wrapByteBuffer(binary));
}

function _decodeDebugLevelRequest(bb: ByteBuffer): DebugLevelRequest {
  let message: DebugLevelRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bool show = 1;
      case 1: {
        message.show = !!readByte(bb);
        break;
      }

      // optional string level_spec = 2;
      case 2: {
        message.level_spec = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DebugLevelResponse {
  sub_systems?: string;
}

export function encodeDebugLevelResponse(message: DebugLevelResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeDebugLevelResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeDebugLevelResponse(message: DebugLevelResponse, bb: ByteBuffer): void {
  // optional string sub_systems = 1;
  let $sub_systems = message.sub_systems;
  if ($sub_systems !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $sub_systems);
  }
}

export function decodeDebugLevelResponse(binary: Uint8Array): DebugLevelResponse {
  return _decodeDebugLevelResponse(wrapByteBuffer(binary));
}

function _decodeDebugLevelResponse(bb: ByteBuffer): DebugLevelResponse {
  let message: DebugLevelResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string sub_systems = 1;
      case 1: {
        message.sub_systems = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Addr {
  encoded?: string;
  asset_id?: Uint8Array;
  asset_type?: AssetType;
  amount?: Long;
  group_key?: Uint8Array;
  script_key?: Uint8Array;
  internal_key?: Uint8Array;
  tapscript_sibling?: Uint8Array;
  taproot_output_key?: Uint8Array;
  proof_courier_addr?: string;
  asset_version?: AssetVersion;
}

export function encodeAddr(message: Addr): Uint8Array {
  let bb = popByteBuffer();
  _encodeAddr(message, bb);
  return toUint8Array(bb);
}

function _encodeAddr(message: Addr, bb: ByteBuffer): void {
  // optional string encoded = 1;
  let $encoded = message.encoded;
  if ($encoded !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $encoded);
  }

  // optional bytes asset_id = 2;
  let $asset_id = message.asset_id;
  if ($asset_id !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $asset_id.length), writeBytes(bb, $asset_id);
  }

  // optional AssetType asset_type = 3;
  let $asset_type = message.asset_type;
  if ($asset_type !== undefined) {
    writeVarint32(bb, 24);
    writeVarint32(bb, encodeAssetType[$asset_type]);
  }

  // optional uint64 amount = 4;
  let $amount = message.amount;
  if ($amount !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $amount);
  }

  // optional bytes group_key = 5;
  let $group_key = message.group_key;
  if ($group_key !== undefined) {
    writeVarint32(bb, 42);
    writeVarint32(bb, $group_key.length), writeBytes(bb, $group_key);
  }

  // optional bytes script_key = 6;
  let $script_key = message.script_key;
  if ($script_key !== undefined) {
    writeVarint32(bb, 50);
    writeVarint32(bb, $script_key.length), writeBytes(bb, $script_key);
  }

  // optional bytes internal_key = 7;
  let $internal_key = message.internal_key;
  if ($internal_key !== undefined) {
    writeVarint32(bb, 58);
    writeVarint32(bb, $internal_key.length), writeBytes(bb, $internal_key);
  }

  // optional bytes tapscript_sibling = 8;
  let $tapscript_sibling = message.tapscript_sibling;
  if ($tapscript_sibling !== undefined) {
    writeVarint32(bb, 66);
    writeVarint32(bb, $tapscript_sibling.length), writeBytes(bb, $tapscript_sibling);
  }

  // optional bytes taproot_output_key = 9;
  let $taproot_output_key = message.taproot_output_key;
  if ($taproot_output_key !== undefined) {
    writeVarint32(bb, 74);
    writeVarint32(bb, $taproot_output_key.length), writeBytes(bb, $taproot_output_key);
  }

  // optional string proof_courier_addr = 10;
  let $proof_courier_addr = message.proof_courier_addr;
  if ($proof_courier_addr !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $proof_courier_addr);
  }

  // optional AssetVersion asset_version = 11;
  let $asset_version = message.asset_version;
  if ($asset_version !== undefined) {
    writeVarint32(bb, 88);
    writeVarint32(bb, encodeAssetVersion[$asset_version]);
  }
}

export function decodeAddr(binary: Uint8Array): Addr {
  return _decodeAddr(wrapByteBuffer(binary));
}

function _decodeAddr(bb: ByteBuffer): Addr {
  let message: Addr = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string encoded = 1;
      case 1: {
        message.encoded = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes asset_id = 2;
      case 2: {
        message.asset_id = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional AssetType asset_type = 3;
      case 3: {
        message.asset_type = decodeAssetType[readVarint32(bb)];
        break;
      }

      // optional uint64 amount = 4;
      case 4: {
        message.amount = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional bytes group_key = 5;
      case 5: {
        message.group_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes script_key = 6;
      case 6: {
        message.script_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes internal_key = 7;
      case 7: {
        message.internal_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes tapscript_sibling = 8;
      case 8: {
        message.tapscript_sibling = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes taproot_output_key = 9;
      case 9: {
        message.taproot_output_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string proof_courier_addr = 10;
      case 10: {
        message.proof_courier_addr = readString(bb, readVarint32(bb));
        break;
      }

      // optional AssetVersion asset_version = 11;
      case 11: {
        message.asset_version = decodeAssetVersion[readVarint32(bb)];
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface QueryAddrRequest {
  created_after?: Long;
  created_before?: Long;
  limit?: number;
  offset?: number;
}

export function encodeQueryAddrRequest(message: QueryAddrRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeQueryAddrRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeQueryAddrRequest(message: QueryAddrRequest, bb: ByteBuffer): void {
  // optional int64 created_after = 1;
  let $created_after = message.created_after;
  if ($created_after !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $created_after);
  }

  // optional int64 created_before = 2;
  let $created_before = message.created_before;
  if ($created_before !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $created_before);
  }

  // optional int32 limit = 3;
  let $limit = message.limit;
  if ($limit !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($limit));
  }

  // optional int32 offset = 4;
  let $offset = message.offset;
  if ($offset !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($offset));
  }
}

export function decodeQueryAddrRequest(binary: Uint8Array): QueryAddrRequest {
  return _decodeQueryAddrRequest(wrapByteBuffer(binary));
}

function _decodeQueryAddrRequest(bb: ByteBuffer): QueryAddrRequest {
  let message: QueryAddrRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 created_after = 1;
      case 1: {
        message.created_after = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 created_before = 2;
      case 2: {
        message.created_before = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 limit = 3;
      case 3: {
        message.limit = readVarint32(bb);
        break;
      }

      // optional int32 offset = 4;
      case 4: {
        message.offset = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface QueryAddrResponse {
  addrs?: Addr[];
}

export function encodeQueryAddrResponse(message: QueryAddrResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeQueryAddrResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeQueryAddrResponse(message: QueryAddrResponse, bb: ByteBuffer): void {
  // repeated Addr addrs = 1;
  let array$addrs = message.addrs;
  if (array$addrs !== undefined) {
    for (let value of array$addrs) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeAddr(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeQueryAddrResponse(binary: Uint8Array): QueryAddrResponse {
  return _decodeQueryAddrResponse(wrapByteBuffer(binary));
}

function _decodeQueryAddrResponse(bb: ByteBuffer): QueryAddrResponse {
  let message: QueryAddrResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated Addr addrs = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.addrs || (message.addrs = []);
        values.push(_decodeAddr(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NewAddrRequest {
  asset_id?: Uint8Array;
  amt?: Long;
  script_key?: ScriptKey;
  internal_key?: KeyDescriptor;
  tapscript_sibling?: Uint8Array;
  proof_courier_addr?: string;
  asset_version?: AssetVersion;
}

export function encodeNewAddrRequest(message: NewAddrRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeNewAddrRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeNewAddrRequest(message: NewAddrRequest, bb: ByteBuffer): void {
  // optional bytes asset_id = 1;
  let $asset_id = message.asset_id;
  if ($asset_id !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $asset_id.length), writeBytes(bb, $asset_id);
  }

  // optional uint64 amt = 2;
  let $amt = message.amt;
  if ($amt !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $amt);
  }

  // optional ScriptKey script_key = 3;
  let $script_key = message.script_key;
  if ($script_key !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeScriptKey($script_key, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional KeyDescriptor internal_key = 4;
  let $internal_key = message.internal_key;
  if ($internal_key !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeKeyDescriptor($internal_key, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bytes tapscript_sibling = 5;
  let $tapscript_sibling = message.tapscript_sibling;
  if ($tapscript_sibling !== undefined) {
    writeVarint32(bb, 42);
    writeVarint32(bb, $tapscript_sibling.length), writeBytes(bb, $tapscript_sibling);
  }

  // optional string proof_courier_addr = 6;
  let $proof_courier_addr = message.proof_courier_addr;
  if ($proof_courier_addr !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $proof_courier_addr);
  }

  // optional AssetVersion asset_version = 7;
  let $asset_version = message.asset_version;
  if ($asset_version !== undefined) {
    writeVarint32(bb, 56);
    writeVarint32(bb, encodeAssetVersion[$asset_version]);
  }
}

export function decodeNewAddrRequest(binary: Uint8Array): NewAddrRequest {
  return _decodeNewAddrRequest(wrapByteBuffer(binary));
}

function _decodeNewAddrRequest(bb: ByteBuffer): NewAddrRequest {
  let message: NewAddrRequest = {} as any;

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

      // optional uint64 amt = 2;
      case 2: {
        message.amt = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional ScriptKey script_key = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.script_key = _decodeScriptKey(bb);
        bb.limit = limit;
        break;
      }

      // optional KeyDescriptor internal_key = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.internal_key = _decodeKeyDescriptor(bb);
        bb.limit = limit;
        break;
      }

      // optional bytes tapscript_sibling = 5;
      case 5: {
        message.tapscript_sibling = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string proof_courier_addr = 6;
      case 6: {
        message.proof_courier_addr = readString(bb, readVarint32(bb));
        break;
      }

      // optional AssetVersion asset_version = 7;
      case 7: {
        message.asset_version = decodeAssetVersion[readVarint32(bb)];
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ScriptKey {
  pub_key?: Uint8Array;
  key_desc?: KeyDescriptor;
  tap_tweak?: Uint8Array;
}

export function encodeScriptKey(message: ScriptKey): Uint8Array {
  let bb = popByteBuffer();
  _encodeScriptKey(message, bb);
  return toUint8Array(bb);
}

function _encodeScriptKey(message: ScriptKey, bb: ByteBuffer): void {
  // optional bytes pub_key = 1;
  let $pub_key = message.pub_key;
  if ($pub_key !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $pub_key.length), writeBytes(bb, $pub_key);
  }

  // optional KeyDescriptor key_desc = 2;
  let $key_desc = message.key_desc;
  if ($key_desc !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeKeyDescriptor($key_desc, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bytes tap_tweak = 3;
  let $tap_tweak = message.tap_tweak;
  if ($tap_tweak !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $tap_tweak.length), writeBytes(bb, $tap_tweak);
  }
}

export function decodeScriptKey(binary: Uint8Array): ScriptKey {
  return _decodeScriptKey(wrapByteBuffer(binary));
}

function _decodeScriptKey(bb: ByteBuffer): ScriptKey {
  let message: ScriptKey = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes pub_key = 1;
      case 1: {
        message.pub_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional KeyDescriptor key_desc = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.key_desc = _decodeKeyDescriptor(bb);
        bb.limit = limit;
        break;
      }

      // optional bytes tap_tweak = 3;
      case 3: {
        message.tap_tweak = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface KeyLocator {
  key_family?: number;
  key_index?: number;
}

export function encodeKeyLocator(message: KeyLocator): Uint8Array {
  let bb = popByteBuffer();
  _encodeKeyLocator(message, bb);
  return toUint8Array(bb);
}

function _encodeKeyLocator(message: KeyLocator, bb: ByteBuffer): void {
  // optional int32 key_family = 1;
  let $key_family = message.key_family;
  if ($key_family !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($key_family));
  }

  // optional int32 key_index = 2;
  let $key_index = message.key_index;
  if ($key_index !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($key_index));
  }
}

export function decodeKeyLocator(binary: Uint8Array): KeyLocator {
  return _decodeKeyLocator(wrapByteBuffer(binary));
}

function _decodeKeyLocator(bb: ByteBuffer): KeyLocator {
  let message: KeyLocator = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 key_family = 1;
      case 1: {
        message.key_family = readVarint32(bb);
        break;
      }

      // optional int32 key_index = 2;
      case 2: {
        message.key_index = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface KeyDescriptor {
  raw_key_bytes?: Uint8Array;
  key_loc?: KeyLocator;
}

export function encodeKeyDescriptor(message: KeyDescriptor): Uint8Array {
  let bb = popByteBuffer();
  _encodeKeyDescriptor(message, bb);
  return toUint8Array(bb);
}

function _encodeKeyDescriptor(message: KeyDescriptor, bb: ByteBuffer): void {
  // optional bytes raw_key_bytes = 1;
  let $raw_key_bytes = message.raw_key_bytes;
  if ($raw_key_bytes !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $raw_key_bytes.length), writeBytes(bb, $raw_key_bytes);
  }

  // optional KeyLocator key_loc = 2;
  let $key_loc = message.key_loc;
  if ($key_loc !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeKeyLocator($key_loc, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeKeyDescriptor(binary: Uint8Array): KeyDescriptor {
  return _decodeKeyDescriptor(wrapByteBuffer(binary));
}

function _decodeKeyDescriptor(bb: ByteBuffer): KeyDescriptor {
  let message: KeyDescriptor = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes raw_key_bytes = 1;
      case 1: {
        message.raw_key_bytes = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional KeyLocator key_loc = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.key_loc = _decodeKeyLocator(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DecodeAddrRequest {
  addr?: string;
}

export function encodeDecodeAddrRequest(message: DecodeAddrRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeDecodeAddrRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeDecodeAddrRequest(message: DecodeAddrRequest, bb: ByteBuffer): void {
  // optional string addr = 1;
  let $addr = message.addr;
  if ($addr !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $addr);
  }
}

export function decodeDecodeAddrRequest(binary: Uint8Array): DecodeAddrRequest {
  return _decodeDecodeAddrRequest(wrapByteBuffer(binary));
}

function _decodeDecodeAddrRequest(bb: ByteBuffer): DecodeAddrRequest {
  let message: DecodeAddrRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string addr = 1;
      case 1: {
        message.addr = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ProofFile {
  raw_proof_file?: Uint8Array;
  genesis_point?: string;
}

export function encodeProofFile(message: ProofFile): Uint8Array {
  let bb = popByteBuffer();
  _encodeProofFile(message, bb);
  return toUint8Array(bb);
}

function _encodeProofFile(message: ProofFile, bb: ByteBuffer): void {
  // optional bytes raw_proof_file = 1;
  let $raw_proof_file = message.raw_proof_file;
  if ($raw_proof_file !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $raw_proof_file.length), writeBytes(bb, $raw_proof_file);
  }

  // optional string genesis_point = 2;
  let $genesis_point = message.genesis_point;
  if ($genesis_point !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $genesis_point);
  }
}

export function decodeProofFile(binary: Uint8Array): ProofFile {
  return _decodeProofFile(wrapByteBuffer(binary));
}

function _decodeProofFile(bb: ByteBuffer): ProofFile {
  let message: ProofFile = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes raw_proof_file = 1;
      case 1: {
        message.raw_proof_file = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string genesis_point = 2;
      case 2: {
        message.genesis_point = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DecodedProof {
  proof_at_depth?: number;
  number_of_proofs?: number;
  asset?: Asset;
  meta_reveal?: AssetMeta;
  tx_merkle_proof?: Uint8Array;
  inclusion_proof?: Uint8Array;
  exclusion_proofs?: Uint8Array[];
  split_root_proof?: Uint8Array;
  num_additional_inputs?: number;
  challenge_witness?: Uint8Array[];
  is_burn?: boolean;
  genesis_reveal?: GenesisReveal;
  group_key_reveal?: GroupKeyReveal;
}

export function encodeDecodedProof(message: DecodedProof): Uint8Array {
  let bb = popByteBuffer();
  _encodeDecodedProof(message, bb);
  return toUint8Array(bb);
}

function _encodeDecodedProof(message: DecodedProof, bb: ByteBuffer): void {
  // optional uint32 proof_at_depth = 1;
  let $proof_at_depth = message.proof_at_depth;
  if ($proof_at_depth !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $proof_at_depth);
  }

  // optional uint32 number_of_proofs = 2;
  let $number_of_proofs = message.number_of_proofs;
  if ($number_of_proofs !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, $number_of_proofs);
  }

  // optional Asset asset = 3;
  let $asset = message.asset;
  if ($asset !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeAsset($asset, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AssetMeta meta_reveal = 4;
  let $meta_reveal = message.meta_reveal;
  if ($meta_reveal !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeAssetMeta($meta_reveal, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bytes tx_merkle_proof = 5;
  let $tx_merkle_proof = message.tx_merkle_proof;
  if ($tx_merkle_proof !== undefined) {
    writeVarint32(bb, 42);
    writeVarint32(bb, $tx_merkle_proof.length), writeBytes(bb, $tx_merkle_proof);
  }

  // optional bytes inclusion_proof = 6;
  let $inclusion_proof = message.inclusion_proof;
  if ($inclusion_proof !== undefined) {
    writeVarint32(bb, 50);
    writeVarint32(bb, $inclusion_proof.length), writeBytes(bb, $inclusion_proof);
  }

  // repeated bytes exclusion_proofs = 7;
  let array$exclusion_proofs = message.exclusion_proofs;
  if (array$exclusion_proofs !== undefined) {
    for (let value of array$exclusion_proofs) {
      writeVarint32(bb, 58);
      writeVarint32(bb, value.length), writeBytes(bb, value);
    }
  }

  // optional bytes split_root_proof = 8;
  let $split_root_proof = message.split_root_proof;
  if ($split_root_proof !== undefined) {
    writeVarint32(bb, 66);
    writeVarint32(bb, $split_root_proof.length), writeBytes(bb, $split_root_proof);
  }

  // optional uint32 num_additional_inputs = 9;
  let $num_additional_inputs = message.num_additional_inputs;
  if ($num_additional_inputs !== undefined) {
    writeVarint32(bb, 72);
    writeVarint32(bb, $num_additional_inputs);
  }

  // repeated bytes challenge_witness = 10;
  let array$challenge_witness = message.challenge_witness;
  if (array$challenge_witness !== undefined) {
    for (let value of array$challenge_witness) {
      writeVarint32(bb, 82);
      writeVarint32(bb, value.length), writeBytes(bb, value);
    }
  }

  // optional bool is_burn = 11;
  let $is_burn = message.is_burn;
  if ($is_burn !== undefined) {
    writeVarint32(bb, 88);
    writeByte(bb, $is_burn ? 1 : 0);
  }

  // optional GenesisReveal genesis_reveal = 12;
  let $genesis_reveal = message.genesis_reveal;
  if ($genesis_reveal !== undefined) {
    writeVarint32(bb, 98);
    let nested = popByteBuffer();
    _encodeGenesisReveal($genesis_reveal, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional GroupKeyReveal group_key_reveal = 13;
  let $group_key_reveal = message.group_key_reveal;
  if ($group_key_reveal !== undefined) {
    writeVarint32(bb, 106);
    let nested = popByteBuffer();
    _encodeGroupKeyReveal($group_key_reveal, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeDecodedProof(binary: Uint8Array): DecodedProof {
  return _decodeDecodedProof(wrapByteBuffer(binary));
}

function _decodeDecodedProof(bb: ByteBuffer): DecodedProof {
  let message: DecodedProof = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 proof_at_depth = 1;
      case 1: {
        message.proof_at_depth = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 number_of_proofs = 2;
      case 2: {
        message.number_of_proofs = readVarint32(bb) >>> 0;
        break;
      }

      // optional Asset asset = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.asset = _decodeAsset(bb);
        bb.limit = limit;
        break;
      }

      // optional AssetMeta meta_reveal = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.meta_reveal = _decodeAssetMeta(bb);
        bb.limit = limit;
        break;
      }

      // optional bytes tx_merkle_proof = 5;
      case 5: {
        message.tx_merkle_proof = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes inclusion_proof = 6;
      case 6: {
        message.inclusion_proof = readBytes(bb, readVarint32(bb));
        break;
      }

      // repeated bytes exclusion_proofs = 7;
      case 7: {
        let values = message.exclusion_proofs || (message.exclusion_proofs = []);
        values.push(readBytes(bb, readVarint32(bb)));
        break;
      }

      // optional bytes split_root_proof = 8;
      case 8: {
        message.split_root_proof = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint32 num_additional_inputs = 9;
      case 9: {
        message.num_additional_inputs = readVarint32(bb) >>> 0;
        break;
      }

      // repeated bytes challenge_witness = 10;
      case 10: {
        let values = message.challenge_witness || (message.challenge_witness = []);
        values.push(readBytes(bb, readVarint32(bb)));
        break;
      }

      // optional bool is_burn = 11;
      case 11: {
        message.is_burn = !!readByte(bb);
        break;
      }

      // optional GenesisReveal genesis_reveal = 12;
      case 12: {
        let limit = pushTemporaryLength(bb);
        message.genesis_reveal = _decodeGenesisReveal(bb);
        bb.limit = limit;
        break;
      }

      // optional GroupKeyReveal group_key_reveal = 13;
      case 13: {
        let limit = pushTemporaryLength(bb);
        message.group_key_reveal = _decodeGroupKeyReveal(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface VerifyProofResponse {
  valid?: boolean;
  decoded_proof?: DecodedProof;
}

export function encodeVerifyProofResponse(message: VerifyProofResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeVerifyProofResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeVerifyProofResponse(message: VerifyProofResponse, bb: ByteBuffer): void {
  // optional bool valid = 1;
  let $valid = message.valid;
  if ($valid !== undefined) {
    writeVarint32(bb, 8);
    writeByte(bb, $valid ? 1 : 0);
  }

  // optional DecodedProof decoded_proof = 2;
  let $decoded_proof = message.decoded_proof;
  if ($decoded_proof !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeDecodedProof($decoded_proof, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeVerifyProofResponse(binary: Uint8Array): VerifyProofResponse {
  return _decodeVerifyProofResponse(wrapByteBuffer(binary));
}

function _decodeVerifyProofResponse(bb: ByteBuffer): VerifyProofResponse {
  let message: VerifyProofResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bool valid = 1;
      case 1: {
        message.valid = !!readByte(bb);
        break;
      }

      // optional DecodedProof decoded_proof = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.decoded_proof = _decodeDecodedProof(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DecodeProofRequest {
  raw_proof?: Uint8Array;
  proof_at_depth?: number;
  with_prev_witnesses?: boolean;
  with_meta_reveal?: boolean;
}

export function encodeDecodeProofRequest(message: DecodeProofRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeDecodeProofRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeDecodeProofRequest(message: DecodeProofRequest, bb: ByteBuffer): void {
  // optional bytes raw_proof = 1;
  let $raw_proof = message.raw_proof;
  if ($raw_proof !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $raw_proof.length), writeBytes(bb, $raw_proof);
  }

  // optional uint32 proof_at_depth = 2;
  let $proof_at_depth = message.proof_at_depth;
  if ($proof_at_depth !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, $proof_at_depth);
  }

  // optional bool with_prev_witnesses = 3;
  let $with_prev_witnesses = message.with_prev_witnesses;
  if ($with_prev_witnesses !== undefined) {
    writeVarint32(bb, 24);
    writeByte(bb, $with_prev_witnesses ? 1 : 0);
  }

  // optional bool with_meta_reveal = 4;
  let $with_meta_reveal = message.with_meta_reveal;
  if ($with_meta_reveal !== undefined) {
    writeVarint32(bb, 32);
    writeByte(bb, $with_meta_reveal ? 1 : 0);
  }
}

export function decodeDecodeProofRequest(binary: Uint8Array): DecodeProofRequest {
  return _decodeDecodeProofRequest(wrapByteBuffer(binary));
}

function _decodeDecodeProofRequest(bb: ByteBuffer): DecodeProofRequest {
  let message: DecodeProofRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes raw_proof = 1;
      case 1: {
        message.raw_proof = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint32 proof_at_depth = 2;
      case 2: {
        message.proof_at_depth = readVarint32(bb) >>> 0;
        break;
      }

      // optional bool with_prev_witnesses = 3;
      case 3: {
        message.with_prev_witnesses = !!readByte(bb);
        break;
      }

      // optional bool with_meta_reveal = 4;
      case 4: {
        message.with_meta_reveal = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DecodeProofResponse {
  decoded_proof?: DecodedProof;
}

export function encodeDecodeProofResponse(message: DecodeProofResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeDecodeProofResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeDecodeProofResponse(message: DecodeProofResponse, bb: ByteBuffer): void {
  // optional DecodedProof decoded_proof = 1;
  let $decoded_proof = message.decoded_proof;
  if ($decoded_proof !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeDecodedProof($decoded_proof, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeDecodeProofResponse(binary: Uint8Array): DecodeProofResponse {
  return _decodeDecodeProofResponse(wrapByteBuffer(binary));
}

function _decodeDecodeProofResponse(bb: ByteBuffer): DecodeProofResponse {
  let message: DecodeProofResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional DecodedProof decoded_proof = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.decoded_proof = _decodeDecodedProof(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ExportProofRequest {
  asset_id?: Uint8Array;
  script_key?: Uint8Array;
}

export function encodeExportProofRequest(message: ExportProofRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeExportProofRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeExportProofRequest(message: ExportProofRequest, bb: ByteBuffer): void {
  // optional bytes asset_id = 1;
  let $asset_id = message.asset_id;
  if ($asset_id !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $asset_id.length), writeBytes(bb, $asset_id);
  }

  // optional bytes script_key = 2;
  let $script_key = message.script_key;
  if ($script_key !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $script_key.length), writeBytes(bb, $script_key);
  }
}

export function decodeExportProofRequest(binary: Uint8Array): ExportProofRequest {
  return _decodeExportProofRequest(wrapByteBuffer(binary));
}

function _decodeExportProofRequest(bb: ByteBuffer): ExportProofRequest {
  let message: ExportProofRequest = {} as any;

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

      // optional bytes script_key = 2;
      case 2: {
        message.script_key = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AddrEvent {
  creation_time_unix_seconds?: Long;
  addr?: Addr;
  status?: AddrEventStatus;
  outpoint?: string;
  utxo_amt_sat?: Long;
  taproot_sibling?: Uint8Array;
  confirmation_height?: number;
  has_proof?: boolean;
}

export function encodeAddrEvent(message: AddrEvent): Uint8Array {
  let bb = popByteBuffer();
  _encodeAddrEvent(message, bb);
  return toUint8Array(bb);
}

function _encodeAddrEvent(message: AddrEvent, bb: ByteBuffer): void {
  // optional uint64 creation_time_unix_seconds = 1;
  let $creation_time_unix_seconds = message.creation_time_unix_seconds;
  if ($creation_time_unix_seconds !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $creation_time_unix_seconds);
  }

  // optional Addr addr = 2;
  let $addr = message.addr;
  if ($addr !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeAddr($addr, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AddrEventStatus status = 3;
  let $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 24);
    writeVarint32(bb, encodeAddrEventStatus[$status]);
  }

  // optional string outpoint = 4;
  let $outpoint = message.outpoint;
  if ($outpoint !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $outpoint);
  }

  // optional uint64 utxo_amt_sat = 5;
  let $utxo_amt_sat = message.utxo_amt_sat;
  if ($utxo_amt_sat !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $utxo_amt_sat);
  }

  // optional bytes taproot_sibling = 6;
  let $taproot_sibling = message.taproot_sibling;
  if ($taproot_sibling !== undefined) {
    writeVarint32(bb, 50);
    writeVarint32(bb, $taproot_sibling.length), writeBytes(bb, $taproot_sibling);
  }

  // optional uint32 confirmation_height = 7;
  let $confirmation_height = message.confirmation_height;
  if ($confirmation_height !== undefined) {
    writeVarint32(bb, 56);
    writeVarint32(bb, $confirmation_height);
  }

  // optional bool has_proof = 8;
  let $has_proof = message.has_proof;
  if ($has_proof !== undefined) {
    writeVarint32(bb, 64);
    writeByte(bb, $has_proof ? 1 : 0);
  }
}

export function decodeAddrEvent(binary: Uint8Array): AddrEvent {
  return _decodeAddrEvent(wrapByteBuffer(binary));
}

function _decodeAddrEvent(bb: ByteBuffer): AddrEvent {
  let message: AddrEvent = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint64 creation_time_unix_seconds = 1;
      case 1: {
        message.creation_time_unix_seconds = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional Addr addr = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.addr = _decodeAddr(bb);
        bb.limit = limit;
        break;
      }

      // optional AddrEventStatus status = 3;
      case 3: {
        message.status = decodeAddrEventStatus[readVarint32(bb)];
        break;
      }

      // optional string outpoint = 4;
      case 4: {
        message.outpoint = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint64 utxo_amt_sat = 5;
      case 5: {
        message.utxo_amt_sat = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional bytes taproot_sibling = 6;
      case 6: {
        message.taproot_sibling = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint32 confirmation_height = 7;
      case 7: {
        message.confirmation_height = readVarint32(bb) >>> 0;
        break;
      }

      // optional bool has_proof = 8;
      case 8: {
        message.has_proof = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AddrReceivesRequest {
  filter_addr?: string;
  filter_status?: AddrEventStatus;
}

export function encodeAddrReceivesRequest(message: AddrReceivesRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeAddrReceivesRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeAddrReceivesRequest(message: AddrReceivesRequest, bb: ByteBuffer): void {
  // optional string filter_addr = 1;
  let $filter_addr = message.filter_addr;
  if ($filter_addr !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $filter_addr);
  }

  // optional AddrEventStatus filter_status = 2;
  let $filter_status = message.filter_status;
  if ($filter_status !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, encodeAddrEventStatus[$filter_status]);
  }
}

export function decodeAddrReceivesRequest(binary: Uint8Array): AddrReceivesRequest {
  return _decodeAddrReceivesRequest(wrapByteBuffer(binary));
}

function _decodeAddrReceivesRequest(bb: ByteBuffer): AddrReceivesRequest {
  let message: AddrReceivesRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string filter_addr = 1;
      case 1: {
        message.filter_addr = readString(bb, readVarint32(bb));
        break;
      }

      // optional AddrEventStatus filter_status = 2;
      case 2: {
        message.filter_status = decodeAddrEventStatus[readVarint32(bb)];
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AddrReceivesResponse {
  events?: AddrEvent[];
}

export function encodeAddrReceivesResponse(message: AddrReceivesResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeAddrReceivesResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeAddrReceivesResponse(message: AddrReceivesResponse, bb: ByteBuffer): void {
  // repeated AddrEvent events = 1;
  let array$events = message.events;
  if (array$events !== undefined) {
    for (let value of array$events) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeAddrEvent(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeAddrReceivesResponse(binary: Uint8Array): AddrReceivesResponse {
  return _decodeAddrReceivesResponse(wrapByteBuffer(binary));
}

function _decodeAddrReceivesResponse(bb: ByteBuffer): AddrReceivesResponse {
  let message: AddrReceivesResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated AddrEvent events = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.events || (message.events = []);
        values.push(_decodeAddrEvent(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface SendAssetRequest {
  tap_addrs?: string[];
}

export function encodeSendAssetRequest(message: SendAssetRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeSendAssetRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeSendAssetRequest(message: SendAssetRequest, bb: ByteBuffer): void {
  // repeated string tap_addrs = 1;
  let array$tap_addrs = message.tap_addrs;
  if (array$tap_addrs !== undefined) {
    for (let value of array$tap_addrs) {
      writeVarint32(bb, 10);
      writeString(bb, value);
    }
  }
}

export function decodeSendAssetRequest(binary: Uint8Array): SendAssetRequest {
  return _decodeSendAssetRequest(wrapByteBuffer(binary));
}

function _decodeSendAssetRequest(bb: ByteBuffer): SendAssetRequest {
  let message: SendAssetRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated string tap_addrs = 1;
      case 1: {
        let values = message.tap_addrs || (message.tap_addrs = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface PrevInputAsset {
  anchor_point?: string;
  asset_id?: Uint8Array;
  script_key?: Uint8Array;
  amount?: Long;
}

export function encodePrevInputAsset(message: PrevInputAsset): Uint8Array {
  let bb = popByteBuffer();
  _encodePrevInputAsset(message, bb);
  return toUint8Array(bb);
}

function _encodePrevInputAsset(message: PrevInputAsset, bb: ByteBuffer): void {
  // optional string anchor_point = 1;
  let $anchor_point = message.anchor_point;
  if ($anchor_point !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $anchor_point);
  }

  // optional bytes asset_id = 2;
  let $asset_id = message.asset_id;
  if ($asset_id !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $asset_id.length), writeBytes(bb, $asset_id);
  }

  // optional bytes script_key = 3;
  let $script_key = message.script_key;
  if ($script_key !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $script_key.length), writeBytes(bb, $script_key);
  }

  // optional uint64 amount = 4;
  let $amount = message.amount;
  if ($amount !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $amount);
  }
}

export function decodePrevInputAsset(binary: Uint8Array): PrevInputAsset {
  return _decodePrevInputAsset(wrapByteBuffer(binary));
}

function _decodePrevInputAsset(bb: ByteBuffer): PrevInputAsset {
  let message: PrevInputAsset = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string anchor_point = 1;
      case 1: {
        message.anchor_point = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes asset_id = 2;
      case 2: {
        message.asset_id = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes script_key = 3;
      case 3: {
        message.script_key = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint64 amount = 4;
      case 4: {
        message.amount = readVarint64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface SendAssetResponse {
  transfer?: AssetTransfer;
}

export function encodeSendAssetResponse(message: SendAssetResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeSendAssetResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeSendAssetResponse(message: SendAssetResponse, bb: ByteBuffer): void {
  // optional AssetTransfer transfer = 1;
  let $transfer = message.transfer;
  if ($transfer !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeAssetTransfer($transfer, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeSendAssetResponse(binary: Uint8Array): SendAssetResponse {
  return _decodeSendAssetResponse(wrapByteBuffer(binary));
}

function _decodeSendAssetResponse(bb: ByteBuffer): SendAssetResponse {
  let message: SendAssetResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional AssetTransfer transfer = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.transfer = _decodeAssetTransfer(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GetInfoRequest {
}

export function encodeGetInfoRequest(message: GetInfoRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeGetInfoRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeGetInfoRequest(message: GetInfoRequest, bb: ByteBuffer): void {
}

export function decodeGetInfoRequest(binary: Uint8Array): GetInfoRequest {
  return _decodeGetInfoRequest(wrapByteBuffer(binary));
}

function _decodeGetInfoRequest(bb: ByteBuffer): GetInfoRequest {
  let message: GetInfoRequest = {} as any;

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

export interface GetInfoResponse {
  version?: string;
  lnd_version?: string;
  network?: string;
  lnd_identity_pubkey?: string;
  node_alias?: string;
  block_height?: number;
  block_hash?: string;
  sync_to_chain?: boolean;
}

export function encodeGetInfoResponse(message: GetInfoResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeGetInfoResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeGetInfoResponse(message: GetInfoResponse, bb: ByteBuffer): void {
  // optional string version = 1;
  let $version = message.version;
  if ($version !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $version);
  }

  // optional string lnd_version = 2;
  let $lnd_version = message.lnd_version;
  if ($lnd_version !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $lnd_version);
  }

  // optional string network = 3;
  let $network = message.network;
  if ($network !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $network);
  }

  // optional string lnd_identity_pubkey = 4;
  let $lnd_identity_pubkey = message.lnd_identity_pubkey;
  if ($lnd_identity_pubkey !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $lnd_identity_pubkey);
  }

  // optional string node_alias = 5;
  let $node_alias = message.node_alias;
  if ($node_alias !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $node_alias);
  }

  // optional uint32 block_height = 6;
  let $block_height = message.block_height;
  if ($block_height !== undefined) {
    writeVarint32(bb, 48);
    writeVarint32(bb, $block_height);
  }

  // optional string block_hash = 7;
  let $block_hash = message.block_hash;
  if ($block_hash !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $block_hash);
  }

  // optional bool sync_to_chain = 8;
  let $sync_to_chain = message.sync_to_chain;
  if ($sync_to_chain !== undefined) {
    writeVarint32(bb, 64);
    writeByte(bb, $sync_to_chain ? 1 : 0);
  }
}

export function decodeGetInfoResponse(binary: Uint8Array): GetInfoResponse {
  return _decodeGetInfoResponse(wrapByteBuffer(binary));
}

function _decodeGetInfoResponse(bb: ByteBuffer): GetInfoResponse {
  let message: GetInfoResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string version = 1;
      case 1: {
        message.version = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lnd_version = 2;
      case 2: {
        message.lnd_version = readString(bb, readVarint32(bb));
        break;
      }

      // optional string network = 3;
      case 3: {
        message.network = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lnd_identity_pubkey = 4;
      case 4: {
        message.lnd_identity_pubkey = readString(bb, readVarint32(bb));
        break;
      }

      // optional string node_alias = 5;
      case 5: {
        message.node_alias = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint32 block_height = 6;
      case 6: {
        message.block_height = readVarint32(bb) >>> 0;
        break;
      }

      // optional string block_hash = 7;
      case 7: {
        message.block_hash = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool sync_to_chain = 8;
      case 8: {
        message.sync_to_chain = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface SubscribeSendAssetEventNtfnsRequest {
}

export function encodeSubscribeSendAssetEventNtfnsRequest(message: SubscribeSendAssetEventNtfnsRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeSubscribeSendAssetEventNtfnsRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeSubscribeSendAssetEventNtfnsRequest(message: SubscribeSendAssetEventNtfnsRequest, bb: ByteBuffer): void {
}

export function decodeSubscribeSendAssetEventNtfnsRequest(binary: Uint8Array): SubscribeSendAssetEventNtfnsRequest {
  return _decodeSubscribeSendAssetEventNtfnsRequest(wrapByteBuffer(binary));
}

function _decodeSubscribeSendAssetEventNtfnsRequest(bb: ByteBuffer): SubscribeSendAssetEventNtfnsRequest {
  let message: SubscribeSendAssetEventNtfnsRequest = {} as any;

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

export interface SendAssetEvent {
  execute_send_state_event?: ExecuteSendStateEvent;
  receiver_proof_backoff_wait_event?: ReceiverProofBackoffWaitEvent;
}

export function encodeSendAssetEvent(message: SendAssetEvent): Uint8Array {
  let bb = popByteBuffer();
  _encodeSendAssetEvent(message, bb);
  return toUint8Array(bb);
}

function _encodeSendAssetEvent(message: SendAssetEvent, bb: ByteBuffer): void {
  // optional ExecuteSendStateEvent execute_send_state_event = 1;
  let $execute_send_state_event = message.execute_send_state_event;
  if ($execute_send_state_event !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeExecuteSendStateEvent($execute_send_state_event, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ReceiverProofBackoffWaitEvent receiver_proof_backoff_wait_event = 2;
  let $receiver_proof_backoff_wait_event = message.receiver_proof_backoff_wait_event;
  if ($receiver_proof_backoff_wait_event !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeReceiverProofBackoffWaitEvent($receiver_proof_backoff_wait_event, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeSendAssetEvent(binary: Uint8Array): SendAssetEvent {
  return _decodeSendAssetEvent(wrapByteBuffer(binary));
}

function _decodeSendAssetEvent(bb: ByteBuffer): SendAssetEvent {
  let message: SendAssetEvent = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional ExecuteSendStateEvent execute_send_state_event = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.execute_send_state_event = _decodeExecuteSendStateEvent(bb);
        bb.limit = limit;
        break;
      }

      // optional ReceiverProofBackoffWaitEvent receiver_proof_backoff_wait_event = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.receiver_proof_backoff_wait_event = _decodeReceiverProofBackoffWaitEvent(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ExecuteSendStateEvent {
  timestamp?: Long;
  send_state?: string;
}

export function encodeExecuteSendStateEvent(message: ExecuteSendStateEvent): Uint8Array {
  let bb = popByteBuffer();
  _encodeExecuteSendStateEvent(message, bb);
  return toUint8Array(bb);
}

function _encodeExecuteSendStateEvent(message: ExecuteSendStateEvent, bb: ByteBuffer): void {
  // optional int64 timestamp = 1;
  let $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $timestamp);
  }

  // optional string send_state = 2;
  let $send_state = message.send_state;
  if ($send_state !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $send_state);
  }
}

export function decodeExecuteSendStateEvent(binary: Uint8Array): ExecuteSendStateEvent {
  return _decodeExecuteSendStateEvent(wrapByteBuffer(binary));
}

function _decodeExecuteSendStateEvent(bb: ByteBuffer): ExecuteSendStateEvent {
  let message: ExecuteSendStateEvent = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 timestamp = 1;
      case 1: {
        message.timestamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional string send_state = 2;
      case 2: {
        message.send_state = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ReceiverProofBackoffWaitEvent {
  timestamp?: Long;
  backoff?: Long;
  tries_counter?: Long;
}

export function encodeReceiverProofBackoffWaitEvent(message: ReceiverProofBackoffWaitEvent): Uint8Array {
  let bb = popByteBuffer();
  _encodeReceiverProofBackoffWaitEvent(message, bb);
  return toUint8Array(bb);
}

function _encodeReceiverProofBackoffWaitEvent(message: ReceiverProofBackoffWaitEvent, bb: ByteBuffer): void {
  // optional int64 timestamp = 1;
  let $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $timestamp);
  }

  // optional int64 backoff = 2;
  let $backoff = message.backoff;
  if ($backoff !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $backoff);
  }

  // optional int64 tries_counter = 3;
  let $tries_counter = message.tries_counter;
  if ($tries_counter !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $tries_counter);
  }
}

export function decodeReceiverProofBackoffWaitEvent(binary: Uint8Array): ReceiverProofBackoffWaitEvent {
  return _decodeReceiverProofBackoffWaitEvent(wrapByteBuffer(binary));
}

function _decodeReceiverProofBackoffWaitEvent(bb: ByteBuffer): ReceiverProofBackoffWaitEvent {
  let message: ReceiverProofBackoffWaitEvent = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 timestamp = 1;
      case 1: {
        message.timestamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 backoff = 2;
      case 2: {
        message.backoff = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 tries_counter = 3;
      case 3: {
        message.tries_counter = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface FetchAssetMetaRequest {
  asset_id?: Uint8Array;
  meta_hash?: Uint8Array;
  asset_id_str?: string;
  meta_hash_str?: string;
}

export function encodeFetchAssetMetaRequest(message: FetchAssetMetaRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeFetchAssetMetaRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeFetchAssetMetaRequest(message: FetchAssetMetaRequest, bb: ByteBuffer): void {
  // optional bytes asset_id = 1;
  let $asset_id = message.asset_id;
  if ($asset_id !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $asset_id.length), writeBytes(bb, $asset_id);
  }

  // optional bytes meta_hash = 2;
  let $meta_hash = message.meta_hash;
  if ($meta_hash !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $meta_hash.length), writeBytes(bb, $meta_hash);
  }

  // optional string asset_id_str = 3;
  let $asset_id_str = message.asset_id_str;
  if ($asset_id_str !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $asset_id_str);
  }

  // optional string meta_hash_str = 4;
  let $meta_hash_str = message.meta_hash_str;
  if ($meta_hash_str !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $meta_hash_str);
  }
}

export function decodeFetchAssetMetaRequest(binary: Uint8Array): FetchAssetMetaRequest {
  return _decodeFetchAssetMetaRequest(wrapByteBuffer(binary));
}

function _decodeFetchAssetMetaRequest(bb: ByteBuffer): FetchAssetMetaRequest {
  let message: FetchAssetMetaRequest = {} as any;

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

      // optional bytes meta_hash = 2;
      case 2: {
        message.meta_hash = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string asset_id_str = 3;
      case 3: {
        message.asset_id_str = readString(bb, readVarint32(bb));
        break;
      }

      // optional string meta_hash_str = 4;
      case 4: {
        message.meta_hash_str = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface BurnAssetRequest {
  asset_id?: Uint8Array;
  asset_id_str?: string;
  amount_to_burn?: Long;
  confirmation_text?: string;
}

export function encodeBurnAssetRequest(message: BurnAssetRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeBurnAssetRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeBurnAssetRequest(message: BurnAssetRequest, bb: ByteBuffer): void {
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

  // optional uint64 amount_to_burn = 3;
  let $amount_to_burn = message.amount_to_burn;
  if ($amount_to_burn !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $amount_to_burn);
  }

  // optional string confirmation_text = 4;
  let $confirmation_text = message.confirmation_text;
  if ($confirmation_text !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $confirmation_text);
  }
}

export function decodeBurnAssetRequest(binary: Uint8Array): BurnAssetRequest {
  return _decodeBurnAssetRequest(wrapByteBuffer(binary));
}

function _decodeBurnAssetRequest(bb: ByteBuffer): BurnAssetRequest {
  let message: BurnAssetRequest = {} as any;

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

      // optional uint64 amount_to_burn = 3;
      case 3: {
        message.amount_to_burn = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional string confirmation_text = 4;
      case 4: {
        message.confirmation_text = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface BurnAssetResponse {
  burn_transfer?: AssetTransfer;
  burn_proof?: DecodedProof;
}

export function encodeBurnAssetResponse(message: BurnAssetResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeBurnAssetResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeBurnAssetResponse(message: BurnAssetResponse, bb: ByteBuffer): void {
  // optional AssetTransfer burn_transfer = 1;
  let $burn_transfer = message.burn_transfer;
  if ($burn_transfer !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeAssetTransfer($burn_transfer, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DecodedProof burn_proof = 2;
  let $burn_proof = message.burn_proof;
  if ($burn_proof !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeDecodedProof($burn_proof, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeBurnAssetResponse(binary: Uint8Array): BurnAssetResponse {
  return _decodeBurnAssetResponse(wrapByteBuffer(binary));
}

function _decodeBurnAssetResponse(bb: ByteBuffer): BurnAssetResponse {
  let message: BurnAssetResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional AssetTransfer burn_transfer = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.burn_transfer = _decodeAssetTransfer(bb);
        bb.limit = limit;
        break;
      }

      // optional DecodedProof burn_proof = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.burn_proof = _decodeDecodedProof(bb);
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
