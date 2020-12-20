import { User } from './user'
import { left } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'

describe('User class entity', () => {
  test('should not create user with invalid email address', () => {
    const error = User.create({ name: 'any_name', email: 'invalid_email' })
    expect(error).toEqual(left(new InvalidEmailError()))
  })
})
