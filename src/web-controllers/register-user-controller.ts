import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { created, badRequest } from '@/web-controllers/util'

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList

  constructor (usecase: RegisterUserOnMailingList) {
    this.usecase = usecase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const userData = httpRequest.body
    const response = await this.usecase.registerUserOnMailingList(userData)

    if (response.isLeft()) {
      return badRequest(response.value)
    }

    if (response.isRight()) {
      return created(response.value)
    }
  }
}
