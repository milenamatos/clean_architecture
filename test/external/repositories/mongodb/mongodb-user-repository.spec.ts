import { MongoHelper } from '@/external/repositories/mongodb/helper'
import { MongodbUserRepository } from '@/external/repositories/mongodb'

describe('Mongodb User Reposity', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clearCollection('users')
  })

  test('when user is added, it should exist', async () => {
    const userReposity = new MongodbUserRepository()
    const user = {
      name: 'any name',
      email: 'any@email.com'
    }
    await userReposity.add(user)
    expect(await userReposity.exists(user)).toBeTruthy()
  })
})
