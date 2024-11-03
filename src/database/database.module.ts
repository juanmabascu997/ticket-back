import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Acudir2024',
        database: 'ticketapp',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})

export class DatabaseModule {}
