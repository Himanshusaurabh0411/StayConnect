import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { RoommatesModule } from './modules/roommates/roommates.module';
import { EnquiriesModule } from './modules/enquiries/enquiries.module';
import { VerificationModule } from './modules/verification/verification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100, // 100 requests per minute
      },
    ]),
    AuthModule,
    PropertiesModule,
    RoommatesModule,
    EnquiriesModule,
    VerificationModule,
  ],
})
export class AppModule {}
