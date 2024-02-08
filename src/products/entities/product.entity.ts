import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'products'})
export class Product {
  @ApiProperty({
    example: '0043e1f6-1bb2-49bd-9b83-1379595c2355',
    description: 'Product Id',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Kids Scribble T Logo Tee',
    description: 'Product Title'
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: '25',
    description: 'Product price'
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    example: 'The Kids Scribble T Logo Tee is made from 100% Peruvian cotton and features a Tesla T sketched logo for every young artist to wear.',
    description: 'Product Description'
  })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({
    example: 'kids_scribble_t_logo_tee',
    description: 'Product Slug'
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    example: '5',
    description: 'Product Stock'
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    example: ["XS", "S", "M"],
    description: 'Product Size'
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: 'kid',
    description: 'Product Gender'
  })
  @Column('text')
  gender: string;

  @ApiProperty({
    example: ["shirt"],
    description: 'Product Tags'
  })
  @Column('text', {array: true, default: []})
  tags: string[]

  @OneToMany(
    () => ProductImage,
    ( productImage ) => productImage.product,
    { cascade: true, eager: true} )
  images?: ProductImage[];

  @ManyToOne(
    () => User,
    (user) => user.product,
    {eager: true}
  )
  user: User

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) this.slug = this.title;

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate(){
    this.checkSlugInsert()
  }
}
