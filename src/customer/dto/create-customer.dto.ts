import { IsString, IsInt, IsDate } from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    readonly first_name: string;

    @IsString()
    readonly last_name: string;

    @IsString()
    readonly email: string;

    @IsInt()
    readonly phone: number;

    @IsString()
    readonly address: string;

    @IsString()
    readonly description: string;
    readonly created_at: Date
}