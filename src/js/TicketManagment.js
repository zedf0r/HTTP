import { sendRequest } from "./request";
import { showDescription, TicketView } from "./TicketView";

export class TicketManagment {
    constructor() {
        // Удаление тикетов
        this.currentTicket = null;
        this.ticketId = null;
        this.modalDelete = document.querySelector('.remove-ticket');
        this.modalOverlay = document.querySelector('.modal-overlay');

        //Добавление тикетов
        this.modalOverlay = document.querySelector('.modal-overlay');
        this.formAddTicket = document.querySelector('.add-ticket');
        this.longDescriptionInput = this.formAddTicket.querySelector('#long1');
        this.shortDescriptionInput = this.formAddTicket.querySelector('#short1');

        this.modalEdit = document.querySelector('.edit-ticket');
        this.longDescriptionEditInput = this.modalEdit.querySelector('#long2');
        this.shortDescriptionEditInput = this.modalEdit.querySelector('#short2');

        this.currentTicketStatus = false;

        this.init();
        this.submitForm = this.submitForm.bind(this);
    }

    init() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            const ticket = target.closest('.ticket')

            //Алгоритм по удалению тикетов
            
            if (target.closest('.ticket-delete')) {
                this.ticketId = ticket.getAttribute('data-id');
                this.currentTicket = ticket;
                this.openModalsDelete();
            }

            if (target.closest('.js-cancell-button')) {
                this.closeModals();
            }

            if (target.closest('.js-submit-delete')) {
                this.closeModals();
                this.submitModalsDelete(this.currentTicket);
            }

            // Алгоритм по добавлению тикетов

            if (target.closest('.btn-add-ticket')) {
                this.openFormModals();
            }

            // Алгортим загрузки дополнительной информации

            if (ticket && !target.closest('.ticket-delete') && !target.closest('.ticket-edit') && !target.closest('.ticket-status')) {
                const description = ticket.querySelector('.ticket-footer');
                if (!description) {
                    this.getDesicription(ticket, ticket.getAttribute('data-id'));
                } else {
                    description.remove();
                }
            }

            // Алгоритм по редактированию тикетов

            if (target.closest('.ticket-edit')) {
                this.openEditModals(ticket);
                this.currentTicket = ticket;
            }

            // Алгоритм изменения статуса тикета
            if (target.closest('.ticket-status')) {

                this.changeTicketStatus(ticket);
            }
        })
        this.formAddTicket.addEventListener('submit', (event) => this.submitForm(event));
        this.modalEdit.addEventListener('submit', (event) => this.editSubmitForm(event));
    }

    openModalsDelete() {
        this.modalOverlay.classList.remove('hidden');
        this.modalDelete.classList.remove('hidden');
    }

    closeModals() {
        this.modalOverlay.classList.add('hidden');
        this.modalDelete.classList.add('hidden');
        this.formAddTicket.classList.add('hidden');
        this.modalEdit.classList.add('hidden')
    }

    submitModalsDelete(ticket) {
        sendRequest('GET', `?method=deleteById&id=${this.ticketId}`);
        this.modalOverlay.classList.add('hidden');
        this.modalDelete.classList.add('hidden');
        ticket.remove();
    }

    openFormModals() {
        this.modalOverlay.classList.remove('hidden');
        this.formAddTicket.classList.remove('hidden')
    }

    openEditModals(ticket) {
        const ticketId = ticket.getAttribute('data-id')

        sendRequest('GET', `?method=ticketById&id=${ticketId}`)
            .then(response => {
                this.longDescriptionEditInput.value = response.description;
                this.shortDescriptionEditInput.value = response.name;
            })
        this.modalOverlay.classList.remove('hidden');
        this.modalEdit.classList.remove('hidden')
    }

    submitForm(event) {
        event.preventDefault()

        const shortValue = this.shortDescriptionInput.value;
        const longValue = this.longDescriptionInput.value;
        if (!shortValue) {
            alert('Название тикета не может быть пустым')
            return
        }
        const formData = {
            id: null,
            name: shortValue,
            description: longValue,
            status: false,
        }
        event.target.reset();

        sendRequest('POST', '?method=createTicket', formData)
            .then(response => {
                const ticketView = new TicketView()
                ticketView.displayTickets(response)
            })
        this.closeModals();
    }

    editSubmitForm(event) {
        event.preventDefault();
        const ticketId = this.currentTicket.getAttribute('data-id');
        const shortValue = this.shortDescriptionEditInput.value;
        const longValue = this.longDescriptionEditInput.value;
        const formData = {
            id: ticketId,
            name: shortValue,
            description: longValue,
        }

        if (!shortValue) {
            alert('Название тикета не может быть пустым')
            return
        }
        
        this.closeModals();

        sendRequest('POST', `?method=updateById&id=${ticketId}`, formData)
            .then(response => {
                if (response.length > 0) {
                    const ticketHeaderBlock = this.currentTicket.querySelector('.ticket-header');
                    const ticketHeaderText = ticketHeaderBlock.querySelector('span')
                    
                    ticketHeaderText.textContent = shortValue;

                    const ticketFooterBlock = this.currentTicket.querySelector('.ticket-footer');
                    if (ticketFooterBlock) {
                        const ticketFooterText = ticketFooterBlock.querySelector('span')
                        ticketFooterText.textContent = longValue;
                    }
                } else {
                    throw new Error('Ошибка обновления')
                }
            })
            .catch(error => {
                throw new Error('Ошибка отправки запроса', error)
            })
    }

    getDesicription(ticket, id) {
        sendRequest('GET', `?method=ticketById&id=${id}`)
            .then(response => {
                showDescription(ticket, response.description)
        })
    }

    changeTicketStatus(ticket) {
        const ticketId = ticket.getAttribute('data-id');
        const ticketStatus = ticket.querySelector('.ticket-status')
        
        sendRequest('GET', `?method=ticketById&id=${ticketId}`)
            .then(response => {
                if (response.status) {
                    const formData = {
                        id: ticketId,
                        status: false,
                    }
                    sendRequest('POST', `?method=updateById&id=${ticketId}`, formData)
                    ticketStatus.classList.remove('active')
                } else {
                    const formData = {
                        id: ticketId,
                        status: true,
                    }
                    sendRequest('POST', `?method=updateById&id=${ticketId}`, formData)
                    ticketStatus.classList.add('active')
                }
            })
    }
}