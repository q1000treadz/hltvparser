import {IsNumber, IsString} from "class-validator";

export class AuthDto {
    @IsString({message: "Должно быть строкой"})
    readonly value: string;
    @IsNumber({}, {message: "Должно быть строкой"})
    readonly userId: number;
}