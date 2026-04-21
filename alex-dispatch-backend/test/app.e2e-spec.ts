import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Module } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import { App } from 'supertest/types';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../src/modules/auth/auth.controller';
import { AuthService } from '../src/modules/auth/auth.service';
import {
  DEFAULT_USER_ROLE,
  jwtSecret,
  tokenLifeTime
} from '../src/modules/auth/constants/settings';
import { CustomJwtStrategy } from '../src/modules/auth/model/strategies/custom-jwt.strategy';
import { SignInUserValidationPipe } from '../src/modules/auth/pipes/sign-in-user-validation.pipe';
import { SignUpUserValidationPipe } from '../src/modules/auth/pipes/sign-up-user-validation.pipe';
import {
  CreateUserDto,
  UserDto,
  UserEntity
} from '../src/modules/users/model/domain';
import { UsersService } from '../src/modules/users/users.service';

jest.mock('../src/modules/users/users.service', () => {
  class MockUsersService {}

  return {
    UsersService: MockUsersService
  };
});

jest.mock('../generated/prisma/client', () => ({
  Prisma: {
    PrismaClientKnownRequestError: class PrismaClientKnownRequestError extends Error {
      public code: string;

      constructor(code: string) {
        super(code);
        this.code = code;
      }
    }
  }
}));

class FakeUsersService {
  private users: UserDto[] = [];
  private nextId = 1;

  public reset(): void {
    this.users = [];
    this.nextId = 1;
  }

  public getUserById(id: number): Promise<UserEntity> {
    const user = this.users.find((currentUser) => currentUser.id === id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    const { passwordHash: _, ...restUser } = user;

    return Promise.resolve(restUser);
  }

  public getUserByEmail(email: string): Promise<UserDto | null> {
    return Promise.resolve(
      this.users.find((user) => user.email === email) ?? null
    );
  }

  public createUser(createUserDto: Omit<UserDto, 'id'>): Promise<UserEntity> {
    const user: UserDto = {
      id: this.nextId++,
      ...createUserDto
    };

    this.users.push(user);

    const { passwordHash: _, ...restUser } = user;

    return Promise.resolve(restUser);
  }
}

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: tokenLifeTime }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    CustomJwtStrategy,
    SignInUserValidationPipe,
    SignUpUserValidationPipe,
    {
      provide: UsersService,
      useClass: FakeUsersService
    }
  ]
})
class TestAuthModule {}

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;
  let usersService: FakeUsersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAuthModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();

    usersService = moduleFixture.get(UsersService);
    usersService.reset();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/registration creates user and sets auth cookie', async () => {
    const response = await request(app.getHttpServer())
      .post('/signup')
      .send({
        email: 'alex@example.com',
        password: 'secret123',
        firstName: 'Alex',
        lastName: 'Dispatch',
        phone: '+10000000000',
        updatedAt: null
      } satisfies CreateUserDto);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: 1,
      email: 'alex@example.com',
      role: DEFAULT_USER_ROLE,
      firstName: 'Alex',
      lastName: 'Dispatch',
      phone: '+10000000000'
    });
    expect(response.body).not.toHaveProperty('passwordHash');
    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([expect.stringContaining('access_token=')])
    );
  });

  it('/registration rejects duplicate email', async () => {
    const user = {
      email: 'alex@example.com',
      password: 'secret123',
      firstName: 'Alex',
      lastName: 'Dispatch',
      phone: '+10000000000',
      updatedAt: null
    } satisfies CreateUserDto;

    await request(app.getHttpServer()).post('/signup').send(user).expect(201);
    await request(app.getHttpServer()).post('/signup').send(user).expect(409);
  });

  it('/signin authenticates existing user and sets auth cookie', async () => {
    await request(app.getHttpServer())
      .post('/signup')
      .send({
        email: 'alex@example.com',
        password: 'secret123',
        firstName: 'Alex',
        lastName: 'Dispatch',
        phone: '+10000000000',
        updatedAt: null
      } satisfies CreateUserDto);

    const response = await request(app.getHttpServer()).post('/signin').send({
      username: 'alex@example.com',
      password: 'secret123'
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Logged in successfully' });
    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([expect.stringContaining('access_token=')])
    );
  });

  it('/signin rejects invalid password', async () => {
    await request(app.getHttpServer())
      .post('/signup')
      .send({
        email: 'alex@example.com',
        password: 'secret123',
        firstName: 'Alex',
        lastName: 'Dispatch',
        phone: '+10000000000',
        updatedAt: null
      } satisfies CreateUserDto);

    await request(app.getHttpServer())
      .post('/signin')
      .send({
        username: 'alex@example.com',
        password: 'wrong-password'
      })
      .expect(401);
  });

  it('/auth/me requires auth cookie', async () => {
    await request(app.getHttpServer()).get('/auth/me').expect(401);
  });

  it('/auth/me authenticates by cookie', async () => {
    const signupResponse = await request(app.getHttpServer())
      .post('/signup')
      .send({
        email: 'alex@example.com',
        password: 'secret123',
        firstName: 'Alex',
        lastName: 'Dispatch',
        phone: '+10000000000',
        updatedAt: null
      } satisfies CreateUserDto)
      .expect(201);

    const authCookie = signupResponse.headers['set-cookie'];

    const response = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Cookie', authCookie)
      .expect(200);

    expect(response.body).toMatchObject({
      id: 1,
      email: 'alex@example.com',
      role: DEFAULT_USER_ROLE,
      firstName: 'Alex',
      lastName: 'Dispatch',
      phone: '+10000000000'
    });
    expect(response.body).not.toHaveProperty('passwordHash');
  });
});
