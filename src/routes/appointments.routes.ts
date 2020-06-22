import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;
    const parsedDate = startOfHour(parseISO(date));
    const findAppointmentInStateDate = appointmentsRepository.findByDate(
        parsedDate,
    );
    if (findAppointmentInStateDate) {
        return response
          .status(400)
          .json({ message: 'This appointment is already bookend' });
    }
    const appointment = appointmentsRepository.create(provider, parsedDate);
   return response.json(appointment); 
})

export default appointmentsRouter;