"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGroupPermission = void 0;
const typeorm_1 = require("typeorm");
const UserGroup_1 = require("./UserGroup");
const Permission_1 = require("./Permission");
let UserGroupPermission = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _userGroupId_decorators;
    let _userGroupId_initializers = [];
    let _userGroupId_extraInitializers = [];
    let _permissionId_decorators;
    let _permissionId_initializers = [];
    let _permissionId_extraInitializers = [];
    let _userGroup_decorators;
    let _userGroup_initializers = [];
    let _userGroup_extraInitializers = [];
    let _permission_decorators;
    let _permission_initializers = [];
    let _permission_extraInitializers = [];
    var UserGroupPermission = _classThis = class {
        constructor() {
            this.userGroupId = __runInitializers(this, _userGroupId_initializers, void 0);
            this.permissionId = (__runInitializers(this, _userGroupId_extraInitializers), __runInitializers(this, _permissionId_initializers, void 0));
            this.userGroup = (__runInitializers(this, _permissionId_extraInitializers), __runInitializers(this, _userGroup_initializers, void 0));
            this.permission = (__runInitializers(this, _userGroup_extraInitializers), __runInitializers(this, _permission_initializers, void 0));
            __runInitializers(this, _permission_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "UserGroupPermission");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _userGroupId_decorators = [(0, typeorm_1.PrimaryColumn)()];
        _permissionId_decorators = [(0, typeorm_1.PrimaryColumn)()];
        _userGroup_decorators = [(0, typeorm_1.ManyToOne)(() => UserGroup_1.UserGroup, userGroup => userGroup.id)];
        _permission_decorators = [(0, typeorm_1.ManyToOne)(() => Permission_1.Permission, permission => permission.id)];
        __esDecorate(null, null, _userGroupId_decorators, { kind: "field", name: "userGroupId", static: false, private: false, access: { has: obj => "userGroupId" in obj, get: obj => obj.userGroupId, set: (obj, value) => { obj.userGroupId = value; } }, metadata: _metadata }, _userGroupId_initializers, _userGroupId_extraInitializers);
        __esDecorate(null, null, _permissionId_decorators, { kind: "field", name: "permissionId", static: false, private: false, access: { has: obj => "permissionId" in obj, get: obj => obj.permissionId, set: (obj, value) => { obj.permissionId = value; } }, metadata: _metadata }, _permissionId_initializers, _permissionId_extraInitializers);
        __esDecorate(null, null, _userGroup_decorators, { kind: "field", name: "userGroup", static: false, private: false, access: { has: obj => "userGroup" in obj, get: obj => obj.userGroup, set: (obj, value) => { obj.userGroup = value; } }, metadata: _metadata }, _userGroup_initializers, _userGroup_extraInitializers);
        __esDecorate(null, null, _permission_decorators, { kind: "field", name: "permission", static: false, private: false, access: { has: obj => "permission" in obj, get: obj => obj.permission, set: (obj, value) => { obj.permission = value; } }, metadata: _metadata }, _permission_initializers, _permission_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserGroupPermission = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserGroupPermission = _classThis;
})();
exports.UserGroupPermission = UserGroupPermission;
