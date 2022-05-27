import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Report } from './../../reports/enitity/report.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

}
