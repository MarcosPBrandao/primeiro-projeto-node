import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';
interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository; 
    
    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({date,provider} : Request): Appointment {
        const AppointmentDate = startOfHour(date);

        const findAppointmentInStateDate = this.appointmentsRepository.findByDate(
            AppointmentDate,
        );
        if (findAppointmentInStateDate) {
            throw Error('This appointment is already bookend');
        }
        const appointment = this.appointmentsRepository.create({
            provider,
            date: AppointmentDate
        });
        return appointment; 
   }
}

export default CreateAppointmentService;