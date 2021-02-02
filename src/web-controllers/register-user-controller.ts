import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { created, badRequest } from '@/web-controllers/util'
import { MissingParamError } from '@/web-controllers/errors/missing-param-error'

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList

  constructor (usecase: RegisterUserOnMailingList) {
    this.usecase = usecase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const userData = httpRequest.body
    if (!userData.name || !userData.email) {
      let missingParam = !userData.name ? 'name ' : ''
      missingParam += !userData.email ? 'email' : ''
      return badRequest(new MissingParamError(missingParam.trim()))
    }

    const response = await this.usecase.registerUserOnMailingList(userData)

    if (response.isLeft()) {
      return badRequest(response.value)
    }

    if (response.isRight()) {
      return created(response.value)
    }
  }
}
