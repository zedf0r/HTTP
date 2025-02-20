import { sendRequest } from "./request";
import { TicketView } from "./TicketView";

export class Ticket {
    constructor({id, name, description, status, created}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.created = created;
    }
}

sendRequest('GET', '?method=allTickets')
    .then(data => {
        const tickets = data.map(item => new Ticket(item));
        const ticketsView = new TicketView()
        ticketsView.displayTickets(tickets)
    })
    .catch(err => console.log(err))
