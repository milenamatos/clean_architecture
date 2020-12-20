import { UserData } from './user-data'
import { Either } from '../shared/either'
import { InvalidNameError } from './errors/invalid-name-error'
import { InvalidEmailError } from './errors/invalid-email-error'
import { Name } from './name'
import { Email } from './email'

export class User {
  static create (userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name)
    if (nameOrError.isLeft()) {
      return nameOrError
    }

    const emailOrError = Email.create(userData.email)
    if (emailOrError.isLeft()) {
      return emailOrError
    }
  }
}