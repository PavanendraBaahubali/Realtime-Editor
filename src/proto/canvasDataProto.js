/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.PathPoint = (function() {

    /**
     * Properties of a PathPoint.
     * @exports IPathPoint
     * @interface IPathPoint
     * @property {number|null} [x] PathPoint x
     * @property {number|null} [y] PathPoint y
     */

    /**
     * Constructs a new PathPoint.
     * @exports PathPoint
     * @classdesc Represents a PathPoint.
     * @implements IPathPoint
     * @constructor
     * @param {IPathPoint=} [properties] Properties to set
     */
    function PathPoint(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PathPoint x.
     * @member {number} x
     * @memberof PathPoint
     * @instance
     */
    PathPoint.prototype.x = 0;

    /**
     * PathPoint y.
     * @member {number} y
     * @memberof PathPoint
     * @instance
     */
    PathPoint.prototype.y = 0;

    /**
     * Creates a new PathPoint instance using the specified properties.
     * @function create
     * @memberof PathPoint
     * @static
     * @param {IPathPoint=} [properties] Properties to set
     * @returns {PathPoint} PathPoint instance
     */
    PathPoint.create = function create(properties) {
        return new PathPoint(properties);
    };

    /**
     * Encodes the specified PathPoint message. Does not implicitly {@link PathPoint.verify|verify} messages.
     * @function encode
     * @memberof PathPoint
     * @static
     * @param {IPathPoint} message PathPoint message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PathPoint.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.x != null && Object.hasOwnProperty.call(message, "x"))
            writer.uint32(/* id 1, wireType 1 =*/9).double(message.x);
        if (message.y != null && Object.hasOwnProperty.call(message, "y"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.y);
        return writer;
    };

    /**
     * Encodes the specified PathPoint message, length delimited. Does not implicitly {@link PathPoint.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PathPoint
     * @static
     * @param {IPathPoint} message PathPoint message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PathPoint.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PathPoint message from the specified reader or buffer.
     * @function decode
     * @memberof PathPoint
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PathPoint} PathPoint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PathPoint.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PathPoint();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.x = reader.double();
                    break;
                }
            case 2: {
                    message.y = reader.double();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PathPoint message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PathPoint
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PathPoint} PathPoint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PathPoint.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PathPoint message.
     * @function verify
     * @memberof PathPoint
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PathPoint.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.x != null && message.hasOwnProperty("x"))
            if (typeof message.x !== "number")
                return "x: number expected";
        if (message.y != null && message.hasOwnProperty("y"))
            if (typeof message.y !== "number")
                return "y: number expected";
        return null;
    };

    /**
     * Creates a PathPoint message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PathPoint
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PathPoint} PathPoint
     */
    PathPoint.fromObject = function fromObject(object) {
        if (object instanceof $root.PathPoint)
            return object;
        var message = new $root.PathPoint();
        if (object.x != null)
            message.x = Number(object.x);
        if (object.y != null)
            message.y = Number(object.y);
        return message;
    };

    /**
     * Creates a plain object from a PathPoint message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PathPoint
     * @static
     * @param {PathPoint} message PathPoint
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PathPoint.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.x = 0;
            object.y = 0;
        }
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
        return object;
    };

    /**
     * Converts this PathPoint to JSON.
     * @function toJSON
     * @memberof PathPoint
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PathPoint.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for PathPoint
     * @function getTypeUrl
     * @memberof PathPoint
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    PathPoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/PathPoint";
    };

    return PathPoint;
})();

$root.DrawingData = (function() {

    /**
     * Properties of a DrawingData.
     * @exports IDrawingData
     * @interface IDrawingData
     * @property {string|null} [strokeColor] DrawingData strokeColor
     * @property {number|null} [strokeWidth] DrawingData strokeWidth
     * @property {Array.<IPathPoint>|null} [paths] DrawingData paths
     */

    /**
     * Constructs a new DrawingData.
     * @exports DrawingData
     * @classdesc Represents a DrawingData.
     * @implements IDrawingData
     * @constructor
     * @param {IDrawingData=} [properties] Properties to set
     */
    function DrawingData(properties) {
        this.paths = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DrawingData strokeColor.
     * @member {string} strokeColor
     * @memberof DrawingData
     * @instance
     */
    DrawingData.prototype.strokeColor = "";

    /**
     * DrawingData strokeWidth.
     * @member {number} strokeWidth
     * @memberof DrawingData
     * @instance
     */
    DrawingData.prototype.strokeWidth = 0;

    /**
     * DrawingData paths.
     * @member {Array.<IPathPoint>} paths
     * @memberof DrawingData
     * @instance
     */
    DrawingData.prototype.paths = $util.emptyArray;

    /**
     * Creates a new DrawingData instance using the specified properties.
     * @function create
     * @memberof DrawingData
     * @static
     * @param {IDrawingData=} [properties] Properties to set
     * @returns {DrawingData} DrawingData instance
     */
    DrawingData.create = function create(properties) {
        return new DrawingData(properties);
    };

    /**
     * Encodes the specified DrawingData message. Does not implicitly {@link DrawingData.verify|verify} messages.
     * @function encode
     * @memberof DrawingData
     * @static
     * @param {IDrawingData} message DrawingData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DrawingData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.strokeColor != null && Object.hasOwnProperty.call(message, "strokeColor"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.strokeColor);
        if (message.strokeWidth != null && Object.hasOwnProperty.call(message, "strokeWidth"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.strokeWidth);
        if (message.paths != null && message.paths.length)
            for (var i = 0; i < message.paths.length; ++i)
                $root.PathPoint.encode(message.paths[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified DrawingData message, length delimited. Does not implicitly {@link DrawingData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DrawingData
     * @static
     * @param {IDrawingData} message DrawingData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DrawingData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DrawingData message from the specified reader or buffer.
     * @function decode
     * @memberof DrawingData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DrawingData} DrawingData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DrawingData.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DrawingData();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.strokeColor = reader.string();
                    break;
                }
            case 2: {
                    message.strokeWidth = reader.int32();
                    break;
                }
            case 3: {
                    if (!(message.paths && message.paths.length))
                        message.paths = [];
                    message.paths.push($root.PathPoint.decode(reader, reader.uint32()));
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DrawingData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DrawingData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DrawingData} DrawingData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DrawingData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DrawingData message.
     * @function verify
     * @memberof DrawingData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DrawingData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.strokeColor != null && message.hasOwnProperty("strokeColor"))
            if (!$util.isString(message.strokeColor))
                return "strokeColor: string expected";
        if (message.strokeWidth != null && message.hasOwnProperty("strokeWidth"))
            if (!$util.isInteger(message.strokeWidth))
                return "strokeWidth: integer expected";
        if (message.paths != null && message.hasOwnProperty("paths")) {
            if (!Array.isArray(message.paths))
                return "paths: array expected";
            for (var i = 0; i < message.paths.length; ++i) {
                var error = $root.PathPoint.verify(message.paths[i]);
                if (error)
                    return "paths." + error;
            }
        }
        return null;
    };

    /**
     * Creates a DrawingData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DrawingData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DrawingData} DrawingData
     */
    DrawingData.fromObject = function fromObject(object) {
        if (object instanceof $root.DrawingData)
            return object;
        var message = new $root.DrawingData();
        if (object.strokeColor != null)
            message.strokeColor = String(object.strokeColor);
        if (object.strokeWidth != null)
            message.strokeWidth = object.strokeWidth | 0;
        if (object.paths) {
            if (!Array.isArray(object.paths))
                throw TypeError(".DrawingData.paths: array expected");
            message.paths = [];
            for (var i = 0; i < object.paths.length; ++i) {
                if (typeof object.paths[i] !== "object")
                    throw TypeError(".DrawingData.paths: object expected");
                message.paths[i] = $root.PathPoint.fromObject(object.paths[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a DrawingData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DrawingData
     * @static
     * @param {DrawingData} message DrawingData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DrawingData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.paths = [];
        if (options.defaults) {
            object.strokeColor = "";
            object.strokeWidth = 0;
        }
        if (message.strokeColor != null && message.hasOwnProperty("strokeColor"))
            object.strokeColor = message.strokeColor;
        if (message.strokeWidth != null && message.hasOwnProperty("strokeWidth"))
            object.strokeWidth = message.strokeWidth;
        if (message.paths && message.paths.length) {
            object.paths = [];
            for (var j = 0; j < message.paths.length; ++j)
                object.paths[j] = $root.PathPoint.toObject(message.paths[j], options);
        }
        return object;
    };

    /**
     * Converts this DrawingData to JSON.
     * @function toJSON
     * @memberof DrawingData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DrawingData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for DrawingData
     * @function getTypeUrl
     * @memberof DrawingData
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    DrawingData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/DrawingData";
    };

    return DrawingData;
})();

module.exports = $root;
