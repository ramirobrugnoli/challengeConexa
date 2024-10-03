"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
let UsersService = class UsersService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(email, password) {
        try {
            const user = this.repo.create({ email, password });
            return await this.repo.save(user);
        }
        catch (error) {
            throw error;
        }
    }
    async find(email) {
        const user = await this.repo.find({ where: { email } });
        return user;
    }
    async findOne(id) {
        const user = await this.repo.findOneBy({ id });
        return user;
    }
    async setAdminStatus(userId, isAdmin) {
        const user = await this.repo.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.role = isAdmin;
        return this.repo.save((0, class_transformer_1.instanceToPlain)(user));
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map