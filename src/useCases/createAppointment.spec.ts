import { describe, expect, it } from 'vitest'
import { Appointment } from '../entities/appointment'
import { CreateAppointment } from './createAppointment'
import { getFutureDate } from '../tests/utils/getFutureDate'
import { InMemoryAppointmentsRepository } from '../repositories/inMemory/inMemoryAppointmentsRepository'

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentsRepository)

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

  it('should not be able to create an appointment with overlapping dates', async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentsRepository)

    const startsAt = getFutureDate('2022-10-17')
    const endsAt = getFutureDate('2022-10-20')

    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2022-10-18'),
        endsAt: getFutureDate('2022-10-21')
      })
    ).rejects.toBeInstanceOf(Error)

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2022-10-15'),
        endsAt: getFutureDate('2022-10-19')
      })
    ).rejects.toBeInstanceOf(Error)

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2022-10-15'),
        endsAt: getFutureDate('2022-10-21')
      })
    ).rejects.toBeInstanceOf(Error)

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2022-10-18'),
        endsAt: getFutureDate('2022-10-19')
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
