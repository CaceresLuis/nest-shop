import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product Title (Unique)',
    nullable: false,
    minLength: 1
  })

  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    description: 'Product price',
    nullable: false
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Product Description',
    nullable: true
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Product Slug'
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'Product Slug'
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock: number;

  @ApiProperty({
    description: 'Product Size'
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({
    description: 'Product Gender'
  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty({
    description: 'Product Tags'
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty({
    description: 'Product Images'
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
