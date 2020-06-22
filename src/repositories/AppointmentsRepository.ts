import Appointment from '../models/appointment';
import appointmentsRouter from '../routes/appointments.routes';
import appointment from '../models/appointment';
import { isEqual } from 'date-fns';
class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public findByDate(date: Date): appointment | null {
        const findAppointment = this.appointments.find(appointment => 
            isEqual(date, appointment.date),
        )
        return findAppointment || null;
    }
    public all(): Appointment[] {
        return this.appointments;
    } 
 
    public create(provider: string, date: Date): Appointment {
        const appointment = new Appointment(provider, date);

        this.appointments.push(appointment);

        return appointment;
    } 
}

export default AppointmentsRepository;