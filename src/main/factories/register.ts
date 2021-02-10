import { RegisterUserController } from '@/web-controllers'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { InMemoryUserRepository } from '@test/usecases/register-user-on-mailing-list/repository'

export const makeRegisterUserController = (): RegisterUserController => {
  const inMemoryUserRepository = new InMemoryUserRepository([])
  const registerUserOnMailingList = new RegisterUserOnMailingList(inMemoryUserRepository)
  return new RegisterUserController(registerUserOnMailingList)
}