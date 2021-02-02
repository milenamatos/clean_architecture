import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { created, badRequest } from '@/web-controllers/util'
import { MissingParamError } from '@/web-controllers/errors/missing-param-error'
import { UseCase } from '@/usecases/ports'

export class RegisterUserController {
  private readonly usecase: UseCase

  constructor (usecase: UseCase) {
    this.usecase = usecase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const userData = httpRequest.body
    if (!userData.name || !userData.email) {
      let missingParam = !userData.name ? 'name ' : ''
      missingParam += !userData.email ? 'email' : ''
      return badRequest(new MissingParamError(missingParam.trim()))
    }

    const response = await this.usecase.perform(userData)

    if (response.isLeft()) {
      return badRequest(response.value)
    }

    if (response.isRight()) {
      return created(response.value)
    }
  }
}
