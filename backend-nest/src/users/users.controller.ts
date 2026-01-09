import { Get } from "@nestjs/common";

export class UsersController {
    @Get()
    getUser() {
        return "User"
    }
}