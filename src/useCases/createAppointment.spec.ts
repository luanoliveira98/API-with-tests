import { describe, expect, it } from 'vitest'
import { Appointment } from '../entities/appointment'
import { CreateAppointment } from './createAppointment'
import { getFutureDate } from '../tests/utils/getFutureDate'

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    const createAppointment = new CreateAppointment()

    const startsAt = getFutureDate('2022-10-17')
    const endsAt = getFutureDate('2022-10-18')

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt,
        endsAt
      })
    ).resolves.toBeInstanceOf(Appointment)
  })
})
