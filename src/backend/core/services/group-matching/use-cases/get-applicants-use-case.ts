import { Applicant } from '../models/applicant'

export interface GetApplicantsUseCase {
    retrieve(): Promise<Applicant[]>
}
