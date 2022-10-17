import { expect, test } from 'vitest'
import { Appointment } from './appointment'
import { getFutureDate } from '../tests/utils/getFutureDate'

test('create an appointment', () => {
  const appointment = new Appointment({
    customer: 'John Doe',
    startsAt: getFutureDate('2022-10-17'),
    endsAt: getFutureDate('2022-10-18')
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toBe('John Doe')
})

test('cannot create an appointment with end date before starts date', () => {
  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-10-17'),
      endsAt: getFutureDate('2022-10-16')
    })
  }).toThrow()
})

test('cannot create an appointment with start date before now', () => {
  const startsAt = new Date()
  const endsAt = new Date()

  startsAt.setDate(startsAt.getDate() - 1)
  endsAt.setDate(endsAt.getDate() + 3)

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startsAt,
      endsAt
    })
  }).toThrow()
})
