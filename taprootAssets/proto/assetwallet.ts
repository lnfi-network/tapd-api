export interface FundVirtualPsbtRequest {
  psbt?: Uint8Array;
  raw?: TxTemplate;
}

export function encodeFundVirtualPsbtRequest(message: FundVirtualPsbtRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeFundVirtualPsbtRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeFundVirtualPsbtRequest(message: FundVirtualPsbtRequest, bb: ByteBuffer): void {
  // optional bytes psbt = 1;
  let $psbt = message.psbt;
  if ($psbt !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $psbt.length), writeBytes(bb, $psbt);
  }

  // optional TxTemplate raw = 2;
  let $raw = message.raw;
  if ($raw !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeTxTemplate($raw, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeFundVirtualPsbtRequest(binary: Uint8Array): FundVirtualPsbtRequest {
  return _decodeFundVirtualPsbtRequest(wrapByteBuffer(binary));
}

function _decodeFundVirtualPsbtRequest(bb: ByteBuffer): FundVirtualPsbtRequest {
  let message: FundVirtualPsbtRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes psbt = 1;
      case 1: {
        message.psbt = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional TxTemplate raw = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.raw = _decodeTxTemplate(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface FundVirtualPsbtResponse {
  funded_psbt?: Uint8Array;
  change_output_index?: number;
}

export function encodeFundVirtualPsbtResponse(message: FundVirtualPsbtResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeFundVirtualPsbtResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeFundVirtualPsbtResponse(message: FundVirtualPsbtResponse, bb: ByteBuffer): void {
  // optional bytes funded_psbt = 1;
  let $funded_psbt = message.funded_psbt;
  if ($funded_psbt !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $funded_psbt.length), writeBytes(bb, $funded_psbt);
  }

  // optional int32 change_output_index = 2;
  let $change_output_index = message.change_output_index;
  if ($change_output_index !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($change_output_index));
  }
}

export function decodeFundVirtualPsbtResponse(binary: Uint8Array): FundVirtualPsbtResponse {
  return _decodeFundVirtualPsbtResponse(wrapByteBuffer(binary));
}

function _decodeFundVirtualPsbtResponse(bb: ByteBuffer): FundVirtualPsbtResponse {
  let message: FundVirtualPsbtResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes funded_psbt = 1;
      case 1: {
        message.funded_psbt = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional int32 change_output_index = 2;
      case 2: {
        message.change_output_index = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TxTemplate {
  inputs?: PrevId[];
  recipients?: { [key: string]: Long };
}

export function encodeTxTemplate(message: TxTemplate): Uint8Array {
  let bb = popByteBuffer();
  _encodeTxTemplate(message, bb);
  return toUint8Array(bb);
}

function _encodeTxTemplate(message: TxTemplate, bb: ByteBuffer): void {
  // repeated PrevId inputs = 1;
  let array$inputs = message.inputs;
  if (array$inputs !== undefined) {
    for (let value of array$inputs) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodePrevId(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<string, uint64> recipients = 2;
  let map$recipients = message.recipients;
  if (map$recipients !== undefined) {
    for (let key in map$recipients) {
      let nested = popByteBuffer();
      let value = map$recipients[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 18);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeTxTemplate(binary: Uint8Array): TxTemplate {
  return _decodeTxTemplate(wrapByteBuffer(binary));
}

function _decodeTxTemplate(bb: ByteBuffer): TxTemplate {
  let message: TxTemplate = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated PrevId inputs = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.inputs || (message.inputs = []);
        values.push(_decodePrevId(bb));
        bb.limit = limit;
        break;
      }

      // optional map<string, uint64> recipients = 2;
      case 2: {
        let values = message.recipients || (message.recipients = {});
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
          throw new Error("Invalid data for map: recipients");
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

export interface PrevId {
  outpoint?: OutPoint;
  id?: Uint8Array;
  script_key?: Uint8Array;
}

export function encodePrevId(message: PrevId): Uint8Array {
  let bb = popByteBuffer();
  _encodePrevId(message, bb);
  return toUint8Array(bb);
}

function _encodePrevId(message: PrevId, bb: ByteBuffer): void {
  // optional OutPoint outpoint = 1;
  let $outpoint = message.outpoint;
  if ($outpoint !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeOutPoint($outpoint, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bytes id = 2;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $id.length), writeBytes(bb, $id);
  }

  // optional bytes script_key = 3;
  let $script_key = message.script_key;
  if ($script_key !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $script_key.length), writeBytes(bb, $script_key);
  }
}

export function decodePrevId(binary: Uint8Array): PrevId {
  return _decodePrevId(wrapByteBuffer(binary));
}

function _decodePrevId(bb: ByteBuffer): PrevId {
  let message: PrevId = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional OutPoint outpoint = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.outpoint = _decodeOutPoint(bb);
        bb.limit = limit;
        break;
      }

      // optional bytes id = 2;
      case 2: {
        message.id = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes script_key = 3;
      case 3: {
        message.script_key = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface OutPoint {
  txid?: Uint8Array;
  output_index?: number;
}

export function encodeOutPoint(message: OutPoint): Uint8Array {
  let bb = popByteBuffer();
  _encodeOutPoint(message, bb);
  return toUint8Array(bb);
}

function _encodeOutPoint(message: OutPoint, bb: ByteBuffer): void {
  // optional bytes txid = 1;
  let $txid = message.txid;
  if ($txid !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $txid.length), writeBytes(bb, $txid);
  }

  // optional uint32 output_index = 2;
  let $output_index = message.output_index;
  if ($output_index !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, $output_index);
  }
}

export function decodeOutPoint(binary: Uint8Array): OutPoint {
  return _decodeOutPoint(wrapByteBuffer(binary));
}

function _decodeOutPoint(bb: ByteBuffer): OutPoint {
  let message: OutPoint = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes txid = 1;
      case 1: {
        message.txid = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint32 output_index = 2;
      case 2: {
        message.output_index = readVarint32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface SignVirtualPsbtRequest {
  funded_psbt?: Uint8Array;
}

export function encodeSignVirtualPsbtRequest(message: SignVirtualPsbtRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeSignVirtualPsbtRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeSignVirtualPsbtRequest(message: SignVirtualPsbtRequest, bb: ByteBuffer): void {
  // optional bytes funded_psbt = 1;
  let $funded_psbt = message.funded_psbt;
  if ($funded_psbt !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $funded_psbt.length), writeBytes(bb, $funded_psbt);
  }
}

export function decodeSignVirtualPsbtRequest(binary: Uint8Array): SignVirtualPsbtRequest {
  return _decodeSignVirtualPsbtRequest(wrapByteBuffer(binary));
}

function _decodeSignVirtualPsbtRequest(bb: ByteBuffer): SignVirtualPsbtRequest {
  let message: SignVirtualPsbtRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes funded_psbt = 1;
      case 1: {
        message.funded_psbt = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface SignVirtualPsbtResponse {
  signed_psbt?: Uint8Array;
  signed_inputs?: number[];
}

export function encodeSignVirtualPsbtResponse(message: SignVirtualPsbtResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeSignVirtualPsbtResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeSignVirtualPsbtResponse(message: SignVirtualPsbtResponse, bb: ByteBuffer): void {
  // optional bytes signed_psbt = 1;
  let $signed_psbt = message.signed_psbt;
  if ($signed_psbt !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $signed_psbt.length), writeBytes(bb, $signed_psbt);
  }

  // repeated uint32 signed_inputs = 2;
  let array$signed_inputs = message.signed_inputs;
  if (array$signed_inputs !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$signed_inputs) {
      writeVarint32(packed, value);
    }
    writeVarint32(bb, 18);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }
}

export function decodeSignVirtualPsbtResponse(binary: Uint8Array): SignVirtualPsbtResponse {
  return _decodeSignVirtualPsbtResponse(wrapByteBuffer(binary));
}

function _decodeSignVirtualPsbtResponse(bb: ByteBuffer): SignVirtualPsbtResponse {
  let message: SignVirtualPsbtResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes signed_psbt = 1;
      case 1: {
        message.signed_psbt = readBytes(bb, readVarint32(bb));
        break;
      }

      // repeated uint32 signed_inputs = 2;
      case 2: {
        let values = message.signed_inputs || (message.signed_inputs = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb) >>> 0);
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb) >>> 0);
        }
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AnchorVirtualPsbtsRequest {
  virtual_psbts?: Uint8Array[];
}

export function encodeAnchorVirtualPsbtsRequest(message: AnchorVirtualPsbtsRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeAnchorVirtualPsbtsRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeAnchorVirtualPsbtsRequest(message: AnchorVirtualPsbtsRequest, bb: ByteBuffer): void {
  // repeated bytes virtual_psbts = 1;
  let array$virtual_psbts = message.virtual_psbts;
  if (array$virtual_psbts !== undefined) {
    for (let value of array$virtual_psbts) {
      writeVarint32(bb, 10);
      writeVarint32(bb, value.length), writeBytes(bb, value);
    }
  }
}

export function decodeAnchorVirtualPsbtsRequest(binary: Uint8Array): AnchorVirtualPsbtsRequest {
  return _decodeAnchorVirtualPsbtsRequest(wrapByteBuffer(binary));
}

function _decodeAnchorVirtualPsbtsRequest(bb: ByteBuffer): AnchorVirtualPsbtsRequest {
  let message: AnchorVirtualPsbtsRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated bytes virtual_psbts = 1;
      case 1: {
        let values = message.virtual_psbts || (message.virtual_psbts = []);
        values.push(readBytes(bb, readVarint32(bb)));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NextInternalKeyRequest {
  key_family?: number;
}

export function encodeNextInternalKeyRequest(message: NextInternalKeyRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeNextInternalKeyRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeNextInternalKeyRequest(message: NextInternalKeyRequest, bb: ByteBuffer): void {
  // optional uint32 key_family = 1;
  let $key_family = message.key_family;
  if ($key_family !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $key_family);
  }
}

export function decodeNextInternalKeyRequest(binary: Uint8Array): NextInternalKeyRequest {
  return _decodeNextInternalKeyRequest(wrapByteBuffer(binary));
}

function _decodeNextInternalKeyRequest(bb: ByteBuffer): NextInternalKeyRequest {
  let message: NextInternalKeyRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 key_family = 1;
      case 1: {
        message.key_family = readVarint32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NextInternalKeyResponse {
  internal_key?: taprpc.KeyDescriptor;
}

export function encodeNextInternalKeyResponse(message: NextInternalKeyResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeNextInternalKeyResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeNextInternalKeyResponse(message: NextInternalKeyResponse, bb: ByteBuffer): void {
  // optional taprpc.KeyDescriptor internal_key = 1;
  let $internal_key = message.internal_key;
  if ($internal_key !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodetaprpc.KeyDescriptor($internal_key, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNextInternalKeyResponse(binary: Uint8Array): NextInternalKeyResponse {
  return _decodeNextInternalKeyResponse(wrapByteBuffer(binary));
}

function _decodeNextInternalKeyResponse(bb: ByteBuffer): NextInternalKeyResponse {
  let message: NextInternalKeyResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional taprpc.KeyDescriptor internal_key = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.internal_key = _decodetaprpc.KeyDescriptor(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NextScriptKeyRequest {
  key_family?: number;
}

export function encodeNextScriptKeyRequest(message: NextScriptKeyRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeNextScriptKeyRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeNextScriptKeyRequest(message: NextScriptKeyRequest, bb: ByteBuffer): void {
  // optional uint32 key_family = 1;
  let $key_family = message.key_family;
  if ($key_family !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $key_family);
  }
}

export function decodeNextScriptKeyRequest(binary: Uint8Array): NextScriptKeyRequest {
  return _decodeNextScriptKeyRequest(wrapByteBuffer(binary));
}

function _decodeNextScriptKeyRequest(bb: ByteBuffer): NextScriptKeyRequest {
  let message: NextScriptKeyRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 key_family = 1;
      case 1: {
        message.key_family = readVarint32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NextScriptKeyResponse {
  script_key?: taprpc.ScriptKey;
}

export function encodeNextScriptKeyResponse(message: NextScriptKeyResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeNextScriptKeyResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeNextScriptKeyResponse(message: NextScriptKeyResponse, bb: ByteBuffer): void {
  // optional taprpc.ScriptKey script_key = 1;
  let $script_key = message.script_key;
  if ($script_key !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodetaprpc.ScriptKey($script_key, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNextScriptKeyResponse(binary: Uint8Array): NextScriptKeyResponse {
  return _decodeNextScriptKeyResponse(wrapByteBuffer(binary));
}

function _decodeNextScriptKeyResponse(bb: ByteBuffer): NextScriptKeyResponse {
  let message: NextScriptKeyResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional taprpc.ScriptKey script_key = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.script_key = _decodetaprpc.ScriptKey(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ProveAssetOwnershipRequest {
  asset_id?: Uint8Array;
  script_key?: Uint8Array;
}

export function encodeProveAssetOwnershipRequest(message: ProveAssetOwnershipRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeProveAssetOwnershipRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeProveAssetOwnershipRequest(message: ProveAssetOwnershipRequest, bb: ByteBuffer): void {
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

export function decodeProveAssetOwnershipRequest(binary: Uint8Array): ProveAssetOwnershipRequest {
  return _decodeProveAssetOwnershipRequest(wrapByteBuffer(binary));
}

function _decodeProveAssetOwnershipRequest(bb: ByteBuffer): ProveAssetOwnershipRequest {
  let message: ProveAssetOwnershipRequest = {} as any;

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

export interface ProveAssetOwnershipResponse {
  proof_with_witness?: Uint8Array;
}

export function encodeProveAssetOwnershipResponse(message: ProveAssetOwnershipResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeProveAssetOwnershipResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeProveAssetOwnershipResponse(message: ProveAssetOwnershipResponse, bb: ByteBuffer): void {
  // optional bytes proof_with_witness = 1;
  let $proof_with_witness = message.proof_with_witness;
  if ($proof_with_witness !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $proof_with_witness.length), writeBytes(bb, $proof_with_witness);
  }
}

export function decodeProveAssetOwnershipResponse(binary: Uint8Array): ProveAssetOwnershipResponse {
  return _decodeProveAssetOwnershipResponse(wrapByteBuffer(binary));
}

function _decodeProveAssetOwnershipResponse(bb: ByteBuffer): ProveAssetOwnershipResponse {
  let message: ProveAssetOwnershipResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes proof_with_witness = 1;
      case 1: {
        message.proof_with_witness = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface VerifyAssetOwnershipRequest {
  proof_with_witness?: Uint8Array;
}

export function encodeVerifyAssetOwnershipRequest(message: VerifyAssetOwnershipRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeVerifyAssetOwnershipRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeVerifyAssetOwnershipRequest(message: VerifyAssetOwnershipRequest, bb: ByteBuffer): void {
  // optional bytes proof_with_witness = 1;
  let $proof_with_witness = message.proof_with_witness;
  if ($proof_with_witness !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $proof_with_witness.length), writeBytes(bb, $proof_with_witness);
  }
}

export function decodeVerifyAssetOwnershipRequest(binary: Uint8Array): VerifyAssetOwnershipRequest {
  return _decodeVerifyAssetOwnershipRequest(wrapByteBuffer(binary));
}

function _decodeVerifyAssetOwnershipRequest(bb: ByteBuffer): VerifyAssetOwnershipRequest {
  let message: VerifyAssetOwnershipRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes proof_with_witness = 1;
      case 1: {
        message.proof_with_witness = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface VerifyAssetOwnershipResponse {
  valid_proof?: boolean;
}

export function encodeVerifyAssetOwnershipResponse(message: VerifyAssetOwnershipResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeVerifyAssetOwnershipResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeVerifyAssetOwnershipResponse(message: VerifyAssetOwnershipResponse, bb: ByteBuffer): void {
  // optional bool valid_proof = 1;
  let $valid_proof = message.valid_proof;
  if ($valid_proof !== undefined) {
    writeVarint32(bb, 8);
    writeByte(bb, $valid_proof ? 1 : 0);
  }
}

export function decodeVerifyAssetOwnershipResponse(binary: Uint8Array): VerifyAssetOwnershipResponse {
  return _decodeVerifyAssetOwnershipResponse(wrapByteBuffer(binary));
}

function _decodeVerifyAssetOwnershipResponse(bb: ByteBuffer): VerifyAssetOwnershipResponse {
  let message: VerifyAssetOwnershipResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bool valid_proof = 1;
      case 1: {
        message.valid_proof = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RemoveUTXOLeaseRequest {
  outpoint?: OutPoint;
}

export function encodeRemoveUTXOLeaseRequest(message: RemoveUTXOLeaseRequest): Uint8Array {
  let bb = popByteBuffer();
  _encodeRemoveUTXOLeaseRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeRemoveUTXOLeaseRequest(message: RemoveUTXOLeaseRequest, bb: ByteBuffer): void {
  // optional OutPoint outpoint = 1;
  let $outpoint = message.outpoint;
  if ($outpoint !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeOutPoint($outpoint, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeRemoveUTXOLeaseRequest(binary: Uint8Array): RemoveUTXOLeaseRequest {
  return _decodeRemoveUTXOLeaseRequest(wrapByteBuffer(binary));
}

function _decodeRemoveUTXOLeaseRequest(bb: ByteBuffer): RemoveUTXOLeaseRequest {
  let message: RemoveUTXOLeaseRequest = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional OutPoint outpoint = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.outpoint = _decodeOutPoint(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RemoveUTXOLeaseResponse {
}

export function encodeRemoveUTXOLeaseResponse(message: RemoveUTXOLeaseResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeRemoveUTXOLeaseResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeRemoveUTXOLeaseResponse(message: RemoveUTXOLeaseResponse, bb: ByteBuffer): void {
}

export function decodeRemoveUTXOLeaseResponse(binary: Uint8Array): RemoveUTXOLeaseResponse {
  return _decodeRemoveUTXOLeaseResponse(wrapByteBuffer(binary));
}

function _decodeRemoveUTXOLeaseResponse(bb: ByteBuffer): RemoveUTXOLeaseResponse {
  let message: RemoveUTXOLeaseResponse = {} as any;

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
